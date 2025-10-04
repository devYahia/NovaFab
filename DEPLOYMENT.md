# NovaFab Deployment Guide

This guide covers deploying NovaFab using Docker and Coolify.

## 🐳 Docker Deployment

### Prerequisites

- Docker and Docker Compose installed
- PostgreSQL database (can be containerized)
- Environment variables configured

### Quick Start with Docker Compose

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd novafab
   ```

2. **Configure environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

3. **Start the services**

   ```bash
   docker-compose up -d
   ```

4. **Run database migrations**
   ```bash
   docker-compose exec app npx prisma migrate deploy
   docker-compose exec app npx prisma db seed
   ```

### Building Docker Image

```bash
# Build the image
docker build -t novafab:latest .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  -e NEXTAUTH_URL="http://localhost:3000" \
  novafab:latest
```

## ☁️ Coolify Deployment

### Prerequisites

- Coolify instance running
- Domain name configured
- SSL certificate (Let's Encrypt recommended)

### Deployment Steps

1. **Create a new project in Coolify**
   - Go to your Coolify dashboard
   - Click "New Project"
   - Choose "Docker Compose" or "Dockerfile"

2. **Configure the repository**
   - Connect your Git repository
   - Set the branch (usually `main` or `master`)
   - Set the build context to `/`

3. **Environment Variables**

   Set the following environment variables in Coolify:

   ```env
   # Database
   DATABASE_URL=postgresql://username:password@host:5432/database_name

   # NextAuth
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-super-secret-key-here

   # OAuth Providers
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret

   # Email
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=noreply@your-domain.com

   # Stripe
   STRIPE_PUBLISHABLE_KEY=pk_live_your-publishable-key
   STRIPE_SECRET_KEY=sk_live_your-secret-key
   STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

   # Redis (if using external Redis)
   REDIS_URL=redis://your-redis-host:6379
   ```

4. **Database Setup**

   If using an external database:

   ```bash
   # Connect to your database and run migrations
   npx prisma migrate deploy
   npx prisma db seed
   ```

5. **Deploy**
   - Click "Deploy" in Coolify
   - Monitor the build logs
   - Once deployed, access your application at your configured domain

### Custom Deployment Script

The repository includes deployment scripts:

- `deploy.sh` - For Linux/Unix systems
- `deploy.bat` - For Windows systems

These scripts handle:

- Dependency installation
- Prisma client generation
- Database migrations
- Database seeding
- Application building
- Health checks

## 🔧 Configuration

### Required Environment Variables

| Variable                | Description                  | Example                               |
| ----------------------- | ---------------------------- | ------------------------------------- |
| `DATABASE_URL`          | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET`       | Secret for NextAuth.js       | `your-super-secret-key`               |
| `NEXTAUTH_URL`          | Base URL of your application | `https://your-domain.com`             |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name        | `your-cloud-name`                     |
| `CLOUDINARY_API_KEY`    | Cloudinary API key           | `123456789012345`                     |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret        | `your-api-secret`                     |

### Optional Environment Variables

| Variable                 | Description             | Default          |
| ------------------------ | ----------------------- | ---------------- |
| `REDIS_URL`              | Redis connection string | Not used         |
| `EMAIL_SERVER_HOST`      | SMTP server host        | `smtp.gmail.com` |
| `EMAIL_SERVER_PORT`      | SMTP server port        | `587`            |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key  | Not used         |
| `STRIPE_SECRET_KEY`      | Stripe secret key       | Not used         |

## 🚀 Production Considerations

### Performance

- Enable Redis for session storage and caching
- Configure CDN for static assets
- Use PostgreSQL with connection pooling
- Enable gzip compression

### Security

- Use strong secrets for `NEXTAUTH_SECRET`
- Enable HTTPS/SSL
- Configure CORS properly
- Use environment variables for all secrets
- Enable rate limiting

### Monitoring

- Set up application monitoring (e.g., Sentry)
- Configure log aggregation
- Monitor database performance
- Set up uptime monitoring

### Backup

- Regular database backups
- Backup uploaded files (Cloudinary handles this)
- Version control for code

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Issues**

   ```bash
   # Check database connectivity
   npx prisma db pull
   ```

2. **Build Failures**

   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

3. **Prisma Issues**

   ```bash
   # Regenerate Prisma client
   npx prisma generate
   ```

4. **Environment Variables**
   ```bash
   # Check if variables are loaded
   node -e "console.log(process.env.DATABASE_URL)"
   ```

### Logs

- Application logs: Check Coolify dashboard
- Database logs: Check your database provider
- Build logs: Available in Coolify build section

## 📞 Support

For deployment issues:

1. Check the logs in Coolify dashboard
2. Verify all environment variables are set
3. Ensure database is accessible
4. Check domain and SSL configuration

## 🔄 Updates

To update the application:

1. Push changes to your Git repository
2. Coolify will automatically detect changes
3. Trigger a new deployment
4. Run any new database migrations if needed

```bash
# If manual migration is needed
npx prisma migrate deploy
```
