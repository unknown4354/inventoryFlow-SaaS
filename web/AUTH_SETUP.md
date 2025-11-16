# Authentication Setup Guide

Complete guide to set up authentication for InventoryFlow SaaS.

## ✅ What's Already Implemented

Your authentication system is now fully implemented with:

- ✅ NextAuth.js v5 with JWT sessions
- ✅ Google OAuth integration
- ✅ Email/password authentication with bcrypt
- ✅ Email verification flow
- ✅ Password reset functionality
- ✅ Remember me feature
- ✅ Animated auth pages matching your design
- ✅ Route protection middleware
- ✅ Toast notifications
- ✅ Full TypeScript support

## 🚀 Setup Instructions

### Step 1: Database Setup

1. **Install PostgreSQL** (if not already installed):
   ```bash
   # macOS
   brew install postgresql@16
   brew services start postgresql@16

   # Or use Docker
   docker run --name inventoryflow-postgres \
     -e POSTGRES_PASSWORD=your_password \
     -e POSTGRES_DB=inventoryflow \
     -p 5432:5432 -d postgres:16
   ```

2. **Update `.env.local`** with your database connection string:
   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/inventoryflow"
   ```

3. **Run Prisma migrations**:
   ```bash
   cd /Users/vedant/Desktop/Projects/InventoryFlow-SaaS/web
   npx prisma migrate dev --name init
   npx prisma generate
   ```

### Step 2: NextAuth Configuration

1. **Generate NextAuth Secret**:
   ```bash
   openssl rand -base64 32
   ```

2. **Update `.env.local`**:
   ```bash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET="<your-generated-secret>"
   ```

### Step 3: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)

2. Create a new project or select existing one

3. Enable Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://yourdomain.com/api/auth/callback/google` (production)

5. **Update `.env.local`**:
   ```bash
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

### Step 4: Email Service Setup (Resend)

1. Sign up at [Resend](https://resend.com)

2. Get your API key from the dashboard

3. **Update `.env.local`**:
   ```bash
   RESEND_API_KEY="re_xxxxxxxxxxxxx"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

4. **Verify your domain** in Resend dashboard for production

### Step 5: Start Development Server

```bash
npm run dev
```

Your auth system is now ready at `http://localhost:3000`!

## 📁 File Structure

```
/web
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── layout.tsx              # Auth layout with animations
│   │   │   ├── login/page.tsx           # Login page
│   │   │   ├── signup/page.tsx          # Signup page
│   │   │   ├── forgot-password/page.tsx # Password reset request
│   │   │   ├── reset-password/page.tsx  # Password reset form
│   │   │   └── verify-email/page.tsx    # Email verification
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── [...nextauth]/route.ts    # NextAuth API
│   │   │       ├── signup/route.ts           # User registration
│   │   │       ├── verify-email/route.ts     # Email verification
│   │   │       ├── forgot-password/route.ts  # Password reset request
│   │   │       └── reset-password/route.ts   # Password reset
│   │   └── dashboard/                  # Protected route
│   ├── components/
│   │   ├── auth/
│   │   │   ├── auth-layout.tsx         # Animated auth layout
│   │   │   ├── floating-paths.tsx      # SVG animation
│   │   │   ├── google-button.tsx       # Google OAuth button
│   │   │   ├── auth-separator.tsx      # "OR" separator
│   │   │   ├── password-input.tsx      # Password with show/hide
│   │   │   └── auth-provider.tsx       # SessionProvider wrapper
│   │   └── ui/
│   │       ├── form.tsx                # Form components
│   │       ├── checkbox.tsx            # Checkbox
│   │       ├── separator.tsx           # Separator
│   │       └── sonner.tsx              # Toast notifications
│   ├── lib/
│   │   ├── auth.ts                     # NextAuth config
│   │   ├── db.ts                       # Prisma client
│   │   ├── email.ts                    # Email service
│   │   └── validations/
│   │       └── auth.ts                 # Zod schemas
│   ├── types/
│   │   └── next-auth.d.ts              # TypeScript types
│   └── middleware.ts                   # Route protection
├── prisma/
│   └── schema.prisma                   # Database schema
└── .env.local                          # Environment variables
```

## 🧪 Testing the Authentication Flow

### 1. Sign Up Flow
1. Navigate to `http://localhost:3000/signup`
2. Fill in the form and submit
3. Check your email for verification link
4. Click the verification link
5. You'll be redirected to login

### 2. Login Flow
1. Navigate to `http://localhost:3000/login`
2. Enter your credentials
3. Click "Sign In"
4. You'll be redirected to `/dashboard`

### 3. Google OAuth
1. Click "Continue with Google" on login/signup
2. Select your Google account
3. You'll be redirected to `/dashboard`

### 4. Password Reset
1. Navigate to `http://localhost:3000/forgot-password`
2. Enter your email
3. Check your email for reset link
4. Click the link and set new password
5. Sign in with new password

## 🎨 Design Features

Your auth pages include:

- ✨ Animated FloatingPaths SVG background
- 🌊 Radial gradient effects with orange accents
- 🌗 Full dark/light mode support
- 📱 Mobile responsive design
- ⚡ Smooth transitions and animations
- 🎯 Orange accent color (#ea580c) throughout
- 💎 Glass-morphism effects

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ Email verification required
- ✅ Password strength validation
- ✅ CSRF protection (NextAuth)
- ✅ Secure JWT tokens
- ✅ HTTP-only cookies
- ✅ Rate limiting on email sends
- ✅ Token expiration (24h for verification, 1h for reset)

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Test connection
psql -U your_username -d inventoryflow
```

### Prisma Issues
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Regenerate Prisma client
npx prisma generate
```

### Email Not Sending
- Check RESEND_API_KEY is correct
- Verify domain in Resend dashboard
- Check spam folder
- Review server logs for errors

### Google OAuth Issues
- Verify redirect URIs match exactly
- Check if Google+ API is enabled
- Ensure credentials are for "Web application"

## 📝 Next Steps

1. **Set up production database** (Supabase, Neon, or Railway)
2. **Configure production environment variables** in Vercel
3. **Set up custom email domain** in Resend
4. **Add production Google OAuth credentials**
5. **Test complete flow in production**

## 🔗 Useful Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# View Prisma Studio (database GUI)
npx prisma studio

# Create new migration
npx prisma migrate dev --name your_migration_name

# Push schema changes without migration
npx prisma db push

# Generate Prisma client
npx prisma generate
```

## 📚 Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Resend Documentation](https://resend.com/docs)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

## ✅ Completion Checklist

Before going to production:

- [ ] Database set up and migrated
- [ ] All environment variables configured
- [ ] Google OAuth credentials created
- [ ] Email service configured and domain verified
- [ ] Tested signup flow
- [ ] Tested login flow
- [ ] Tested Google OAuth
- [ ] Tested email verification
- [ ] Tested password reset
- [ ] Tested protected routes
- [ ] Production database configured
- [ ] Production environment variables in Vercel
- [ ] Custom domain configured for emails

---

**Your authentication system is now complete and ready to use!** 🎉
