# FundRise - Crowdfunding Platform (Client)

**Live Site:** [https://a11-fundrise-client.vercel.app](https://a11-fundrise-client.vercel.app)

## Admin Credentials
- **Email:** admin@fundrise.com
- **Password:** Admin@123

## Features

- **Role-Based Dashboards** — Dedicated dashboards for Supporters, Creators, and Admins with tailored navigation and functionality
- **Campaign Management** — Creators can create, update, and delete campaigns; Admins approve or reject pending campaigns
- **Credit-Based Contribution System** — Supporters purchase credits (10 credits = $1) and contribute them to campaigns they believe in
- **Real-Time Notifications** — In-app notification system for contribution approvals/rejections, campaign status updates, and withdrawal processing
- **Withdrawal System** — Creators withdraw raised funds at a 20 credits = $1 rate with admin approval workflow
- **Authentication** — Email/password registration and login with Google OAuth support via better-auth
- **JWT Authorization** — Secure token-based authentication with role-based access control (Supporter, Creator, Admin)
- **Responsive Design** — Fully responsive layouts for mobile, tablet, and desktop across all pages including dashboards
- **Animated UI** — Framer Motion animations on the homepage hero slider, section transitions, and interactive elements
- **Report System** — Supporters can report suspicious campaigns; Admins can suspend or delete reported content
- **Pagination** — Paginated data tables for contributions, campaigns, users, and payments
- **Stripe Integration** — Credit purchase flow with Stripe Checkout for secure payment processing

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion (animations)
- Swiper.js (hero slider & testimonials)
- React Router DOM v7
- React Hot Toast (notifications)
- better-auth client (Google OAuth)
- Native Fetch API (no Axios)

## Getting Started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.
