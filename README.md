# Novafab Platform

A comprehensive service management platform designed for modern businesses. Built with Next.js 15 and TypeScript, Novafab provides a complete solution for service ordering, customer management, and business administration.

## Overview

Novafab is a full-stack web application that enables businesses to showcase their services, manage customer orders, and streamline operations through an intuitive admin interface. The platform features secure authentication, real-time order tracking, and a responsive design that works seamlessly across all devices.

## Key Features

### For Customers
- **Service Catalog**: Browse and explore available services with detailed descriptions
- **Secure Ordering**: Place orders with integrated payment processing
- **User Dashboard**: Track order status and manage account settings
- **Gallery**: View portfolio and previous work examples
- **Contact System**: Direct communication with service providers

### For Administrators
- **Order Management**: Complete order lifecycle management
- **Service Administration**: Add, edit, and manage service offerings
- **Customer Management**: User account administration and support
- **Analytics Dashboard**: Business insights and performance metrics
- **Content Management**: Update gallery, reviews, and site content

### Technical Features
- **Modern Architecture**: Built with Next.js 15 and React 18
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Prisma ORM
- **Authentication**: Secure JWT-based authentication with NextAuth.js
- **File Management**: Cloudinary integration for image uploads
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: shadcn/ui for consistent UI components

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui, Radix UI
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary
- **Email**: SMTP integration

### Development & Deployment
- **Package Manager**: npm
- **Linting**: ESLint with TypeScript rules
- **Containerization**: Docker with multi-stage builds
- **Deployment**: Optimized for Coolify platform
- **Monitoring**: Built-in health checks and logging

## Getting Started

### Prerequisites

Before running this project, ensure you have:

- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **PostgreSQL** 14.0 or higher (for production)
- **Git** for version control

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/novafab.git
   cd novafab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   ```
   
   Configure the following required variables in your `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/novafab"
   NEXTAUTH_SECRET="your-secure-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Database setup**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - API Health Check: http://localhost:3000/api/health

### Default Admin Credentials

After seeding the database, you can access the admin panel with:
- **Email**: admin@novafab.com
- **Password**: admin123 (change immediately in production)

## Project Architecture

```
novafab/
├── prisma/                 # Database schema and migrations
│   ├── migrations/         # Database migration files
│   ├── schema.prisma      # Prisma schema definition
│   └── seed.ts            # Database seeding script
├── public/                # Static assets
│   ├── uploads/           # User uploaded files
│   └── *.svg             # Icon assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin panel routes
│   │   ├── api/          # API endpoints
│   │   ├── dashboard/    # User dashboard
│   │   ├── gallery/      # Portfolio gallery
│   │   ├── services/     # Service catalog
│   │   └── layout.tsx    # Root layout component
│   ├── components/       # Reusable UI components
│   │   └── ui/          # shadcn/ui components
│   ├── lib/             # Utility functions and configurations
│   │   ├── auth.ts      # Authentication configuration
│   │   ├── prisma.ts    # Database client
│   │   └── utils.ts     # Helper functions
│   └── middleware.ts    # Route protection middleware
├── Dockerfile           # Container configuration
├── COOLIFY_DEPLOYMENT.md # Deployment guide
└── package.json         # Project dependencies
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/signin` - User authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User logout

### Service Management
- `GET /api/services` - Retrieve all services
- `POST /api/services` - Create new service (admin only)
- `PUT /api/services/[id]` - Update service (admin only)
- `DELETE /api/services/[id]` - Delete service (admin only)

### Order Management
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/[id]` - Update order status (admin only)

### System Endpoints
- `GET /api/health` - Application health check
- `GET /api/stats` - System statistics (admin only)

## Environment Variables

### Required Variables
```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Optional Variables
```env
# Email Configuration
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"

# Payment Processing
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_SECRET_KEY="sk_live_..."

# Monitoring
SENTRY_DSN="your-sentry-dsn"
```

## Deployment

### Production Deployment with Coolify

This application is optimized for deployment on Coolify. For detailed deployment instructions, see [COOLIFY_DEPLOYMENT.md](./COOLIFY_DEPLOYMENT.md).

### Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t novafab .

# Run the container
docker run -p 3000:3000 --env-file .env novafab
```

## Contributing

We welcome contributions to improve Novafab. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## Security

- All user inputs are validated and sanitized
- Authentication uses secure JWT tokens
- Database queries use Prisma's built-in protection against SQL injection
- File uploads are validated and processed securely
- Environment variables are used for sensitive configuration

## Support

For support and questions:

- Create an issue on GitHub
- Check the documentation in `/docs`
- Review the deployment guide for common issues

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

**Novafab Platform** - Streamlining service management for modern businesses.
