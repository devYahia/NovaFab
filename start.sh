#!/bin/bash

# NovaFab Production Startup Script
# This script starts the application in production mode with proper error handling

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] SUCCESS:${NC} $1"
}

warning() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1"
}

# Trap function for cleanup
cleanup() {
    log "Shutting down NovaFab..."
    # Kill any background processes if needed
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

log "🚀 Starting NovaFab in production mode..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if the build exists
if [ ! -d ".next" ]; then
    error "Build directory not found. Please run 'npm run build' first."
    exit 1
fi

# Check if standalone build exists
if [ ! -f ".next/standalone/server.js" ]; then
    error "Standalone server not found. Please ensure 'output: standalone' is set in next.config.js and rebuild."
    exit 1
fi

# Check required environment variables
required_vars=(
    "DATABASE_URL"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
)

log "Checking required environment variables..."
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        error "Required environment variable $var is not set"
        exit 1
    fi
done
success "All required environment variables are set"

# Check database connectivity
log "Checking database connectivity..."
if command -v npx >/dev/null 2>&1; then
    if npx prisma db pull --schema=./prisma/schema.prisma >/dev/null 2>&1; then
        success "Database connection successful"
    else
        warning "Database connection check failed, but continuing..."
    fi
else
    warning "npx not found, skipping database check"
fi

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-3000}
export HOSTNAME=${HOSTNAME:-"0.0.0.0"}

log "Starting NovaFab on ${HOSTNAME}:${PORT}..."

# Start the application
cd .next/standalone

# Health check function
health_check() {
    local max_attempts=30
    local attempt=1
    
    log "Waiting for application to start..."
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s "http://localhost:${PORT}/api/health" >/dev/null 2>&1; then
            success "Application is healthy and ready!"
            return 0
        fi
        
        log "Health check attempt $attempt/$max_attempts failed, retrying in 2 seconds..."
        sleep 2
        attempt=$((attempt + 1))
    done
    
    error "Application failed to start properly after $max_attempts attempts"
    return 1
}

# Start the server in background for health check
node server.js &
SERVER_PID=$!

# Run health check
if health_check; then
    # Kill the background process
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
    
    # Start the server in foreground
    log "Starting server in production mode..."
    exec node server.js
else
    # Kill the background process if health check failed
    kill $SERVER_PID 2>/dev/null || true
    wait $SERVER_PID 2>/dev/null || true
    error "Failed to start NovaFab"
    exit 1
fi