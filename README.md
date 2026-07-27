# Estately - Frontend

A modern, responsive real estate rental platform built with Next.js and React. Estately allows users to browse, book, and manage rental properties with an intuitive interface and seamless user experience.

## Live URL

[https://estately-frontend.vercel.app](https://estately-frontend.vercel.app)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Library**: HeroUI 3
- **Auth**: Better Auth
- **Payments**: Stripe
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide, Heroicons, Gravity UI, Iconify

## Key Features

- **Authentication**: Secure login/signup via Better Auth with MongoDB adapter
- **Property Browsing**: Browse properties with advanced filtering (location, type, price range)
- **Property Details**: Image galleries, amenities, owner profiles, and reviews
- **Pagination**: All Properties page shows 3 cards per page with badge-style pagination navigation
- **Booking System**: Modal-based property reservations with Stripe payment integration
- **Favorites**: Save and manage favorite properties
- **User Dashboards**:
  - **Tenant Dashboard**: View bookings, manage favorites, track spending
  - **Owner Dashboard**: Manage property listings, view booking requests, track earnings
  - **Admin Dashboard**: User management, platform analytics, transaction monitoring
- **Reviews**: Leave and read property reviews
- **Responsive Design**: Fully responsive with dark theme
- **Animations**: Framer Motion page transitions and scroll animations
- **Charts**: Monthly earning analytics with Recharts

## NPM Packages

### Core
- **next** (16.2.9), **react** (19.2.4), **typescript** (5)

### UI & Styling
- **@heroui/react** (3.2.1), **tailwindcss** (4), **lucide-react**, **heroicons**, **@gravity-ui/icons**, **@iconify/react**

### Auth & Data
- **better-auth** (1.6.20), **@better-auth/mongo-adapter**, **mongodb** (7.3.0)

### Payments
- **stripe**, **@stripe/react-stripe-js**, **@stripe/stripe-js**

### Animation & Charts
- **framer-motion** (12.40.0), **recharts** (3.9.0)

### Notifications
- **react-toastify** (11.1.0)

## Getting Started

### Prerequisites
- Node.js 18+
- Running backend server (see `backend/README.md`)

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── all-properties/         # Property listing with pagination
├── components/
│   ├── homepage/           # FeaturedProperties, Hero, etc.
│   ├── properties/         # PropertyCard, PropertyFilter, PaginationWrapper,
│   │                       # PropertyGallery, BookingModal, etc.
│   └── ui/                 # Shared UI components
├── dashboard/
│   ├── admin/              # Admin dashboard pages
│   ├── owner/              # Owner dashboard pages
│   └── tenant/             # Tenant dashboard pages
├── lib/
│   ├── api/                # API client functions
│   └── core/               # Auth config, server actions
└── types/                  # TypeScript type & enum definitions
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [HeroUI](https://www.heroui.com)
- [Better Auth](https://www.better-auth.com)

## Deployment

Optimized for Vercel. Configure environment variables in the Vercel dashboard.
