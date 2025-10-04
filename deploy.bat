@echo off
REM NovaFab Deployment Script for Coolify (Windows)
REM This script handles the deployment process including database migrations

echo 🚀 Starting NovaFab deployment...

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: Node.js is not installed or not in PATH
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Error: npm is not installed or not in PATH
    exit /b 1
)

echo ✅ Node.js and npm are available

REM Install dependencies
echo 📦 Installing dependencies...
call npm ci --only=production
if errorlevel 1 (
    echo ❌ Error: Failed to install dependencies
    exit /b 1
)

REM Generate Prisma client
echo 🔧 Generating Prisma client...
call npx prisma generate
if errorlevel 1 (
    echo ❌ Error: Failed to generate Prisma client
    exit /b 1
)

REM Run database migrations
echo 🗄️ Running database migrations...
call npx prisma migrate deploy
if errorlevel 1 (
    echo ❌ Error: Failed to run database migrations
    exit /b 1
)

REM Seed the database (optional)
if exist "prisma\seed.ts" (
    echo 🌱 Seeding database...
    call npx prisma db seed
) else if exist "prisma\seed.js" (
    echo 🌱 Seeding database...
    call npx prisma db seed
)

REM Build the application
echo 🏗️ Building application...
call npm run build
if errorlevel 1 (
    echo ❌ Error: Failed to build application
    exit /b 1
)

echo ✅ Deployment completed successfully!
echo 🎉 NovaFab is ready to serve!

REM Health check
echo 🔍 Running health check...
if exist ".next\standalone\server.js" (
    echo ✅ Standalone server file found
) else (
    echo ❌ Standalone server file not found
    exit /b 1
)

echo 🚀 Starting application...
node .next\standalone\server.js