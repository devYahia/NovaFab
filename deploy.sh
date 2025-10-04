#!/bin/bash

# NovaFab Deployment Script for Coolify
# This script handles the deployment process including database migrations

set -e  # Exit on any error

echo "🚀 Starting NovaFab deployment..."

# Check if required environment variables are set
required_vars=(
    "DATABASE_URL"
    "NEXTAUTH_SECRET"
    "NEXTAUTH_URL"
    "CLOUDINARY_CLOUD_NAME"
    "CLOUDINARY_API_KEY"
    "CLOUDINARY_API_SECRET"
)

echo "✅ Checking required environment variables..."
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Error: $var is not set"
        exit 1
    fi
done

echo "✅ All required environment variables are set"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Seed the database (optional, only if seed script exists)
if [ -f "prisma/seed.ts" ] || [ -f "prisma/seed.js" ]; then
    echo "🌱 Seeding database..."
    npx prisma db seed
fi

# Build the application
echo "🏗️ Building application..."
npm run build

echo "✅ Deployment completed successfully!"
echo "🎉 NovaFab is ready to serve!"

# Health check
echo "🔍 Running health check..."
if [ -f ".next/standalone/server.js" ]; then
    echo "✅ Standalone server file found"
else
    echo "❌ Standalone server file not found"
    exit 1
fi

echo "🚀 Starting application..."
exec node .next/standalone/server.js