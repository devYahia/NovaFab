# Coolify Deployment Guide for Novafab

This guide provides step-by-step instructions for deploying the Novafab project using Coolify.

## Prerequisites

- Coolify instance running on your server
- Domain name (optional but recommended)
- PostgreSQL database (can be created through Coolify)

## Deployment Steps

### 1. Create a New Project in Coolify

1. Log into your Coolify dashboard
2. Click "New Project" or "Add Project"
3. Choose "Git Repository" as the source
4. Connect your GitHub repository containing the Novafab project

### 2. Configure Build Settings

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: `3000`
- **Node Version**: `18` or higher

### 3. Set Up Database

#### Option A: Create PostgreSQL through Coolify
1. Go to "Databases" in your Coolify dashboard
2. Click "Add Database"
3. Select "PostgreSQL"
4. Note the connection details for environment variables

#### Option B: Use External Database
- Prepare your PostgreSQL connection string

### 4. Configure Environment Variables

In Coolify's environment variables section, add the following:

```
# Database
DATABASE_URL=postgresql://username:password@host:port/database_name

# NextAuth Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.com

# Optional: Additional configurations
NODE_ENV=production
```

**Important Notes:**
- Generate a strong `NEXTAUTH_SECRET` using: `openssl rand -base64 32`
- Replace `your-domain.com` with your actual domain
- Ensure `DATABASE_URL` points to your PostgreSQL instance

### 5. Deploy

1. Click "Deploy" in your Coolify project
2. Monitor the build logs for any errors
3. Wait for deployment to complete

### 6. Post-Deployment Setup

#### Database Migration
After successful deployment, run database migrations:

1. Access your application's terminal in Coolify
2. Run: `npx prisma migrate deploy`
3. Optionally seed the database: `npx prisma db seed`

#### Verify Deployment
- Visit your application URL
- Check the health endpoint: `https://your-domain.com/api/health`
- Test user registration and login functionality

## Domain Configuration

### Custom Domain Setup
1. In Coolify, go to your project settings
2. Add your custom domain
3. Enable SSL certificate (Let's Encrypt)
4. Update `NEXTAUTH_URL` environment variable with your domain

## Monitoring and Maintenance

### Health Checks
- Coolify automatically monitors your application
- Health endpoint: `/api/health`
- Check logs regularly for any issues

### Database Backups
- Configure automatic backups in Coolify's database settings
- Test backup restoration periodically

### Updates and Maintenance
1. Push changes to your Git repository
2. Coolify will automatically redeploy (if auto-deploy is enabled)
3. Monitor deployment logs for any issues

## Troubleshooting

### Common Issues

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are listed in `package.json`
- Review build logs for specific errors

**Database Connection Issues:**
- Verify `DATABASE_URL` format and credentials
- Ensure database is accessible from your application
- Check firewall settings

**Authentication Problems:**
- Verify `NEXTAUTH_SECRET` is set and secure
- Ensure `NEXTAUTH_URL` matches your domain exactly
- Check SSL certificate is properly configured

**Performance Issues:**
- Monitor resource usage in Coolify dashboard
- Consider upgrading server resources if needed
- Optimize database queries if necessary

### Getting Help

1. Check Coolify documentation: https://coolify.io/docs
2. Review application logs in Coolify dashboard
3. Check the health endpoint for system status
4. Verify environment variables are correctly set

## Security Considerations

- Always use HTTPS in production
- Keep `NEXTAUTH_SECRET` secure and never expose it
- Regularly update dependencies
- Monitor access logs for suspicious activity
- Use strong database passwords
- Enable database connection encryption

## Performance Optimization

- Enable Coolify's built-in caching if available
- Monitor response times through the health endpoint
- Consider using a CDN for static assets
- Optimize database queries and indexes

---

**Note**: This guide assumes you have a working Coolify instance. For Coolify installation and setup, refer to the official Coolify documentation.