# 🏔️ Special Project

**A modern web platform for a mountain tourism organization**, built with Next.js, integrating multiple third-party services for booking, payments, weather, and maps. Users can explore, filter, and book guided tours, while admins manage trip offerings and monitor statistics via a secure admin panel.

---

## 🔑 Features

- 🔐 **Authentication & Authorization**  
  Email/password login, OAuth (Google), JWT-based sessions, and optional 2FA using NextAuth.js.

- 🌐 **Multilingual Interface**  
  Full localization support with i18next (Ukrainian / English), including dynamic locale routing.

- 🧭 **Tour Search & Booking**  
  Filter tours by destination, date, and difficulty. Bookings are stored in PostgreSQL and validated for availability.

- 💼 **Admin Dashboard**  
  Secure admin interface to create, edit, delete tours and view aggregated booking statistics.

- 💳 **Secure Payments**  
  Integrated Stripe or PayPal checkout for tour purchases, with backend validation and status tracking.

- ☁️ **Live Weather Data**  
  Real-time weather information for tour destinations via OpenWeather API.

- 🗺️ **Interactive Maps**  
  Tour locations visualized with interactive maps using Leaflet or Mapbox.

- 📱 **Responsive Design**  
  Mobile-first layout using Tailwind CSS and Shadcn UI components, enhanced with Framer Motion animations.

- 🧪 **Testing & Security**  
  Unit testing for key modules. Follows modern security practices: CSRF/XSS protection, input validation, and encrypted passwords.

---

## 🛠️ Tech Stack

- **Frontend/Backend**: Next.js 14 (App Router) + TypeScript  
- **Authentication**: NextAuth.js (JWT, OAuth, Email)  
- **Database**: PostgreSQL + Prisma ORM  
- **Styling**: Tailwind CSS + Shadcn UI + Framer Motion  
- **Localization**: i18next (server + client)  
- **Third-party integrations**: Stripe, PayPal, OpenWeather, Leaflet/Mapbox  

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/mountain-trips.git
cd mountain-trips

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Fill in the required credentials

# Run the dev server
pnpm dev
