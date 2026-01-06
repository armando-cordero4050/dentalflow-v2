# DentalFlow 2.0 - Setup Guide

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Git

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/armando-cordero4050/dentalflow-v2.git
cd dentalflow-v2
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

The Supabase credentials are already configured in the example file:
- **URL**: https://irjyilrbcfvwheffjkug.supabase.co
- **Anon Key**: (included in .env.local.example)

### 3. Database Setup

#### A. Run Migrations

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and execute the entire content of:
   - `supabase/migrations/001_initial_schema.sql`

This creates 27 tables including:
- Auth & Permissions (roles, permissions, views, etc.)
- Clinics & Patients
- Lab System (orders, stages, materials)
- Financial (invoices, payments)
- Logistics & Odoo Sync

#### B. Seed Initial Data

1. In the same SQL Editor, execute:
   - `supabase/seed.sql`

This populates:
- 16 predefined roles (Core, Lab, Clinic, Logistics)
- 10 KAMBA lab stages
- Default permissions and views
- Sample clinics and services
- Dental findings catalog

### 4. Create Dev Users

Go to **Supabase Dashboard** → **Authentication** → **Users**

Create the following test users:

| Email | Password | Role |
|-------|----------|------|
| admin@dentalflow.com | admin123 | super_admin |
| dr.julio@clinica1.com | doctor123 | doctor |
| dr.celeste@clinica1.com | doctor123 | doctor |
| lab.admin@dentalflow.com | lab123 | lab_admin |
| tecnico@dentalflow.com | tecnico123 | lab_man |

**Important**: After creating each user in Supabase Auth, you need to link them to the `users` table and assign roles. You can do this via SQL:

```sql
-- Example for admin user (get the UUID from Supabase Auth)
INSERT INTO users (id, email, full_name, role_id)
VALUES (
  'USER_UUID_FROM_SUPABASE_AUTH',
  'admin@dentalflow.com',
  'Super Admin',
  (SELECT id FROM roles WHERE name = 'super_admin')
);
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎯 Testing the Application

### Landing Page
1. Visit `http://localhost:3000`
2. You should see the modern landing page with:
   - Navbar with "Iniciar Sesión" button
   - Hero section with 3D tooth illustration
   - 5 feature cards
   - Footer

### Login Page
1. Click "Iniciar Sesión" or visit `http://localhost:3000/login`
2. You'll see:
   - Two tabs: **Clínica** and **Laboratorio**
   - Email and Password fields
   - **DEV QUICK LOGIN** section (only in development)

### DEV Quick Login
1. Select the **Clínica** tab
2. Click any dev user button (e.g., "Super Admin")
3. You'll be automatically logged in and redirected to the appropriate dashboard

### Dashboard Access
After login:
- **Super Admin** → `/dashboard/admin`
- **Doctors** → `/dashboard/medical`
- **Lab Users** → `/dashboard/lab`

## 📁 Project Structure

```
dentalflow-v2/
├── app/                          # Next.js App Router
│   ├── page.tsx                 # Landing page
│   ├── login/                   # Login page
│   └── dashboard/               # Protected dashboards
│       ├── admin/
│       ├── medical/
│       └── lab/
├── components/
│   ├── landing/                 # Landing page components
│   ├── auth/                    # Auth components
│   ├── layout/                  # Sidebar, Header
│   └── ui/                      # shadcn/ui components
├── lib/
│   ├── supabase/               # Supabase utilities
│   └── permissions/            # Permission system
├── hooks/                       # React hooks
├── types/                       # TypeScript types
├── stores/                      # Zustand stores
└── supabase/
    ├── migrations/             # Database schema
    └── seed.sql               # Initial data
```

## 🔧 Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### "User not found" error after login
- Make sure you've created the user in both:
  1. Supabase Auth (Authentication panel)
  2. `users` table (with proper role_id)

### Dashboard redirects to login
- Check that middleware is running
- Verify Supabase environment variables are correct
- Ensure user exists in `users` table

### DEV Quick Login not visible
- Make sure `NODE_ENV=development` in your environment
- Check browser console for errors

### Build fails
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Try `npm run build` again

## 📚 Key Features

### Authentication
- ✅ Supabase Auth integration
- ✅ No public registration (admin-only user creation)
- ✅ DEV Quick Login for rapid testing
- ✅ Protected routes with middleware

### Permissions System
- ✅ Dynamic role-based access control
- ✅ CRUD permissions matrix
- ✅ View-based navigation
- ✅ User-specific overrides

### Database
- ✅ 27 tables with proper relationships
- ✅ Row Level Security (RLS) enabled
- ✅ 16 predefined roles
- ✅ 10 KAMBA lab stages

### UI/UX
- ✅ Modern glassmorphism design
- ✅ Framer Motion animations
- ✅ Mobile responsive
- ✅ Spanish language throughout

## 🎨 Design System

### Colors
- **Primary Blue**: #3B82F6
- **Purple**: #8B5CF6  
- **Cyan**: #06B6D4
- **Background**: Dark gradient (slate → purple → slate)

### Typography
- System fonts (sans-serif)
- Clean, modern appearance

### Effects
- Glassmorphism (backdrop blur + transparency)
- Subtle animations on hover
- Smooth transitions

## 📄 License

© 2025 DentalFlow. All rights reserved.

## 🆘 Support

For issues or questions:
1. Check this setup guide
2. Review the code comments
3. Check Supabase dashboard for DB/Auth status
4. Verify environment variables are set correctly
