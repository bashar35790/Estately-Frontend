# Estately - Frontend

A modern, responsive real estate rental platform built with Next.js and React. Estately allows users to browse, book, and manage rental properties with an intuitive interface and seamless user experience.

## Project Purpose

Estately is a comprehensive property rental management system that connects property owners with potential tenants. It provides features for property discovery, booking management, user authentication, and payment processing through an integrated payment gateway.

## Live URL

[https://estately-frontend.vercel.app](https://estately-frontend.vercel.app) 

## Key Features

- **User Authentication**: Secure login and signup with email/password authentication via Better Auth
- **Property Browsing**: Browse featured properties with advanced filtering and search capabilities
- **Property Details**: View detailed property information with image galleries, amenities, and owner profiles
- **Booking System**: Easy-to-use booking modal for property reservations with date selection
- **Payment Integration**: Secure payment processing with Stripe integration
- **Favorites Management**: Save favorite properties for quick access
- **User Dashboard**: 
  - **Tenant Dashboard**: View bookings and manage favorites
  - **Owner Dashboard**: Manage properties and view bookings
  - **Admin Dashboard**: Full control with user and transaction management
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Animations**: Smooth animations and transitions with Framer Motion
- **Analytics**: Interactive charts and statistics using Recharts
- **Reviews System**: View and leave property reviews

## NPM Packages Used

### Core Dependencies
- **next** (16.2.9): React framework for production
- **react** (19.2.4): JavaScript library for building user interfaces
- **react-dom** (19.2.4): React package for DOM manipulation
- **typescript** (5): Typed superset of JavaScript

### Authentication & Database
- **better-auth** (1.6.20): Authentication library with flexible integrations
- **@better-auth/mongo-adapter** (1.6.20): MongoDB adapter for Better Auth
- **mongodb** (7.3.0): MongoDB driver for database operations

### UI & Styling
- **@heroui/react** (3.2.1): Modern React UI component library
- **@heroui/styles** (3.2.1): HeroUI styling components
- **tailwindcss** (4): Utility-first CSS framework
- **@tailwindcss/postcss** (4): PostCSS plugin for Tailwind CSS
- **lucide-react** (1.21.0): Beautiful icon library
- **heroicons** (2.2.0): Heroicons icon set
- **@gravity-ui/icons** (2.18.0): Gravity UI icon collection
- **@iconify/react** (6.0.2): Universal icon library

### Payments
- **stripe** (22.2.3): Stripe payment processing library
- **@stripe/react-stripe-js** (6.6.0): React components for Stripe integration
- **@stripe/stripe-js** (9.8.0): Stripe JavaScript library

### Animation & Effects
- **framer-motion** (12.40.0): Production-ready animation library

### Charts & Visualization
- **recharts** (3.9.0): Composable charting library built on React

### Notifications
- **react-toastify** (11.1.0): Toast notification library

### Dev Dependencies
- **eslint** (9): JavaScript linter
- **eslint-config-next** (16.2.9): ESLint configuration for Next.js
- **@types/node** (20): TypeScript types for Node.js
- **@types/react** (19): TypeScript types for React
- **@types/react-dom** (19): TypeScript types for React DOM

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with required environment variables:
```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Project Structure

- `/app` - Next.js app directory with pages and layouts
- `/app/components` - Reusable React components (navbar, footer, properties, etc.)
- `/app/lib` - Utility functions, API calls, and authentication logic
- `/app/dashboard` - Protected dashboard pages for tenants, owners, and admins
- `/app/types` - TypeScript type definitions
- `/public` - Static assets and images

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Stripe Documentation](https://stripe.com/docs)
- [Better Auth](https://www.better-auth.com)

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com), the platform created by the Next.js team. For other deployment options, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
