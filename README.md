# NovaFab - Digital Manufacturing Platform

A comprehensive digital manufacturing and 3D printing service platform built with Next.js 15, featuring customer order management, admin dashboard, and file upload capabilities.

## 🚀 Features

### Customer Features

- **User Registration & Authentication** - Secure account creation and login
- **Service Browsing** - Explore 3D printing, laser cutting, CNC machining services
- **Order Management** - Place orders, track progress, view history
- **File Upload** - Upload design files with drag-and-drop interface
- **Profile Management** - Update personal information and preferences
- **Order Tracking** - Real-time status updates and notifications

### Admin Features

- **Admin Dashboard** - Comprehensive overview of orders and customers
- **Order Management** - View, update, and track all customer orders
- **Customer Management** - Manage customer accounts and information
- **Gallery Management** - Upload and manage portfolio images
- **Receipt Generation** - Print professional order receipts
- **Settings Panel** - Configure system settings and preferences

### Technical Features

- **Responsive Design** - Mobile-first approach with modern UI
- **File Upload System** - Local file storage with validation
- **Authentication System** - JWT-based secure authentication
- **Database Integration** - SQLite with Prisma ORM
- **Real-time Updates** - Dynamic content updates
- **Print Functionality** - Generate and print order receipts

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens
- **File Upload**: Local file system storage
- **Icons**: Lucide React
- **Deployment**: Docker support included

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/novafab.git
   cd novafab
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:

   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-jwt-secret-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ADMIN_EMAIL="admin@novafab.com"
   ADMIN_PASSWORD="change-this-password"
   ```

4. **Set up the database**

   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 👥 Default Accounts

### Admin Account

- **Email**: admin@novafab.com
- **Password**: change-this-password

### Customer Accounts

- **Email**: omar.hassan@email.com | **Password**: password123
- **Email**: fatima.ahmed@email.com | **Password**: password123
- **Email**: mohamed.ali@email.com | **Password**: password123
- **Email**: sara.mahmoud@email.com | **Password**: password123

## 📁 Project Structure

```
novafab/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── admin/             # Admin panel pages
│   │   ├── api/               # API routes
│   │   ├── dashboard/         # Customer dashboard
│   │   ├── services/          # Service pages
│   │   └── ...
│   ├── components/            # Reusable components
│   │   └── ui/               # shadcn/ui components
│   ├── lib/                  # Utility functions
│   └── middleware.ts         # Authentication middleware
├── prisma/                   # Database schema and migrations
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── docker-compose.yml       # Docker configuration
└── README.md               # Project documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma database studio
- `npx prisma db seed` - Seed database with sample data

## 🐳 Docker Deployment

1. **Build and run with Docker Compose**

   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Application: http://localhost:3000
   - Database: SQLite file in container

## 🌟 Key Pages

- **Homepage** (`/`) - Landing page with service overview
- **Services** (`/services`) - Detailed service information
- **Login** (`/login`) - Customer authentication
- **Register** (`/register`) - New customer registration
- **Dashboard** (`/dashboard`) - Customer order management
- **Admin Login** (`/admin/login`) - Admin authentication
- **Admin Dashboard** (`/admin/dashboard`) - Admin panel
- **Gallery** (`/gallery`) - Portfolio showcase
- **Contact** (`/contact`) - Contact information

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Protected routes with middleware
- Secure file upload handling
- Environment variable protection

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Project Link**: [https://github.com/yourusername/novafab](https://github.com/yourusername/novafab)
- **Demo**: [Live Demo Link](https://your-demo-link.com)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Prisma](https://prisma.io/) - Database ORM
- [Lucide](https://lucide.dev/) - Icon library
