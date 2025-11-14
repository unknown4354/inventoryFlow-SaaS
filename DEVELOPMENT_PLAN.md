# InventoryFlow SaaS - Web Development Plan
## Comprehensive Frontend Implementation Strategy

**Project**: InventoryFlow / WedTech SaaS Platform
**Timeline**: 4 Months (16 Weeks)
**Approach**: Structured, Documented, Best Practices
**Component Library**: 21st.dev (shadcn/ui-based)
**Created**: November 2025

---

## 🎯 Executive Summary

This plan outlines a systematic approach to building a production-ready, enterprise-grade SaaS web application for the wedding industry in India. We'll leverage modern frameworks, pre-built components from 21st.dev, and follow industry best practices to deliver quickly without compromising quality.

### Key Principles
1. ✅ **Component-First**: Use 21st.dev components to avoid reinventing the wheel
2. ✅ **Type-Safe**: Full TypeScript coverage for reliability
3. ✅ **Mobile-First**: Responsive design from day one
4. ✅ **Documented**: Every feature, component, and decision documented
5. ✅ **Tested**: Unit tests, integration tests, E2E tests
6. ✅ **Accessible**: WCAG 2.1 AA compliant
7. ✅ **Performant**: Core Web Vitals optimization
8. ✅ **Scalable**: Built to handle 10,000+ concurrent users

---

## 🏗️ Technology Stack

### Core Framework
```
Next.js 15.0+ (App Router)
├── React 19
├── TypeScript 5.3+
├── Tailwind CSS 4.0
└── Server Components + RSC
```

### UI Components (from 21st.dev)
```
shadcn/ui + 21st.dev Community Components
├── Radix UI primitives
├── Tailwind CSS styling
├── Fully customizable
└── TypeScript support
```

### State Management
```
React Server Components (default)
├── Zustand (client state)
├── React Query v5 (server state)
└── React Hook Form (form state)
```

### Backend Integration
```
tRPC v11
├── Type-safe API calls
├── Auto-generated types
└── React Query integration
```

### Database
```
Prisma ORM
├── PostgreSQL 16
├── Multi-tenant schema
└── Type-safe queries
```

### Authentication
```
NextAuth.js v5
├── JWT tokens
├── Session management
├── Multi-tenant aware
└── Role-based access control
```

### Deployment
```
Vercel (Web)
├── Edge Functions
├── Auto-scaling
├── Global CDN
└── GitHub integration
```

---

## 📦 21st.dev Components Library Selection

Based on our requirements, here are the specific component categories and components we'll use from 21st.dev:

### 1. **Authentication & Onboarding Components**
```bash
# Login/Signup Forms
npx shadcn@latest add "https://21st.dev/r/animated-login-form"
npx shadcn@latest add "https://21st.dev/r/signup-wizard"

# Multi-step Onboarding
npx shadcn@latest add "https://21st.dev/r/stepper-component"
npx shadcn@latest add "https://21st.dev/r/progress-indicator"
```

**Use Cases:**
- User login/registration
- Tenant onboarding wizard
- Setup progress tracking

### 2. **Dashboard & Layout Components**
```bash
# Responsive Dashboard Layouts
npx shadcn@latest add "https://21st.dev/r/dashboard-sidebar"
npx shadcn@latest add "https://21st.dev/r/responsive-navbar"
npx shadcn@latest add "https://21st.dev/r/collapsible-sidebar"

# Stats Cards
npx shadcn@latest add "https://21st.dev/r/metric-card"
npx shadcn@latest add "https://21st.dev/r/stats-grid"
npx shadcn@latest add "https://21st.dev/r/trend-card"
```

**Use Cases:**
- Main dashboard layout
- Navigation structure
- KPI displays
- Quick stats overview

### 3. **Data Display Components**
```bash
# Advanced Tables
npx shadcn@latest add "https://21st.dev/r/data-table-advanced"
npx shadcn@latest add "https://21st.dev/r/sortable-table"
npx shadcn@latest add "https://21st.dev/r/filterable-table"

# List Views
npx shadcn@latest add "https://21st.dev/r/virtual-list"
npx shadcn@latest add "https://21st.dev/r/infinite-scroll-list"

# Cards
npx shadcn@latest add "https://21st.dev/r/inventory-card"
npx shadcn@latest add "https://21st.dev/r/product-card"
```

**Use Cases:**
- Inventory item listings
- Wedding event lists
- Client management tables
- Vendor directories

### 4. **Form Components**
```bash
# Complex Forms
npx shadcn@latest add "https://21st.dev/r/multi-step-form"
npx shadcn@latest add "https://21st.dev/r/dynamic-form"
npx shadcn@latest add "https://21st.dev/r/conditional-fields"

# Input Components
npx shadcn@latest add "https://21st.dev/r/search-input"
npx shadcn@latest add "https://21st.dev/r/autocomplete"
npx shadcn@latest add "https://21st.dev/r/rich-select"
npx shadcn@latest add "https://21st.dev/r/date-range-picker"
npx shadcn@latest add "https://21st.dev/r/time-picker"

# File Uploads
npx shadcn@latest add "https://21st.dev/r/dropzone"
npx shadcn@latest add "https://21st.dev/r/image-upload"
npx shadcn@latest add "https://21st.dev/r/file-preview"
```

**Use Cases:**
- Inventory item creation
- Wedding event forms
- Client intake forms
- Vendor onboarding
- Document uploads
- Floor plan uploads

### 5. **Calendar & Scheduling**
```bash
# Calendar Components
npx shadcn@latest add "https://21st.dev/r/event-calendar"
npx shadcn@latest add "https://21st.dev/r/date-picker-range"
npx shadcn@latest add "https://21st.dev/r/timeline-view"
npx shadcn@latest add "https://21st.dev/r/gantt-chart"
```

**Use Cases:**
- Wedding event calendar
- Equipment availability
- Booking management
- Task timelines

### 6. **Charts & Analytics**
```bash
# Visualization Components
npx shadcn@latest add "https://21st.dev/r/bar-chart"
npx shadcn@latest add "https://21st.dev/r/line-chart"
npx shadcn@latest add "https://21st.dev/r/pie-chart"
npx shadcn@latest add "https://21st.dev/r/area-chart"
npx shadcn@latest add "https://21st.dev/r/sparkline"
npx shadcn@latest add "https://21st.dev/r/heatmap"
```

**Use Cases:**
- Revenue analytics
- Inventory utilization
- Usage trends
- Performance metrics

### 7. **Modal & Overlay Components**
```bash
# Dialogs & Modals
npx shadcn@latest add "https://21st.dev/r/drawer"
npx shadcn@latest add "https://21st.dev/r/sheet"
npx shadcn@latest add "https://21st.dev/r/command-palette"
npx shadcn@latest add "https://21st.dev/r/confirmation-dialog"
```

**Use Cases:**
- Quick actions
- Item details view
- Delete confirmations
- Command search (Cmd+K)

### 8. **Notification & Feedback**
```bash
# Toast & Alerts
npx shadcn@latest add "https://21st.dev/r/toast-advanced"
npx shadcn@latest add "https://21st.dev/r/alert-banner"
npx shadcn@latest add "https://21st.dev/r/notification-center"

# Loading States
npx shadcn@latest add "https://21st.dev/r/skeleton-loader"
npx shadcn@latest add "https://21st.dev/r/progress-bar"
npx shadcn@latest add "https://21st.dev/r/spinner"
```

**Use Cases:**
- Success/error messages
- System notifications
- Loading states
- Empty states

### 9. **E-commerce & Pricing**
```bash
# Pricing Components
npx shadcn@latest add "https://21st.dev/r/pricing-table"
npx shadcn@latest add "https://21st.dev/r/feature-comparison"
npx shadcn@latest add "https://21st.dev/r/subscription-card"
```

**Use Cases:**
- Pricing page
- Plan selection
- Feature comparison
- Upgrade prompts

### 10. **Advanced Workflow Components**
```bash
# Kanban & Task Management
npx shadcn@latest add "https://21st.dev/r/kanban-board"
npx shadcn@latest add "https://21st.dev/r/drag-drop-list"
npx shadcn@latest add "https://21st.dev/r/task-card"

# Visual Builders
npx shadcn@latest add "https://21st.dev/r/floor-plan-viewer"
npx shadcn@latest add "https://21st.dev/r/image-annotator"
```

**Use Cases:**
- Task management
- Workflow boards
- Floor plan visualization
- Location mapping

### 11. **Search & Filter**
```bash
# Search Components
npx shadcn@latest add "https://21st.dev/r/global-search"
npx shadcn@latest add "https://21st.dev/r/faceted-search"
npx shadcn@latest add "https://21st.dev/r/filter-panel"
```

**Use Cases:**
- Global inventory search
- Advanced filtering
- Faceted navigation

### 12. **User Management**
```bash
# User Components
npx shadcn@latest add "https://21st.dev/r/user-avatar"
npx shadcn@latest add "https://21st.dev/r/user-menu"
npx shadcn@latest add "https://21st.dev/r/team-switcher"
npx shadcn@latest add "https://21st.dev/r/role-badge"
```

**Use Cases:**
- User profiles
- Team management
- Role indicators
- Tenant switching

---

## 📁 Project Structure

```
inventoryFlow-web/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Continuous Integration
│       ├── deploy.yml                # Deployment pipeline
│       └── lighthouse.yml            # Performance monitoring
│
├── docs/
│   ├── ARCHITECTURE.md               # System architecture
│   ├── COMPONENTS.md                 # Component documentation
│   ├── API.md                        # API documentation
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── CONTRIBUTING.md               # Contribution guidelines
│
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   ├── migrations/                   # Database migrations
│   └── seed.ts                       # Seed data
│
├── src/
│   ├── app/                          # Next.js 15 App Router
│   │   ├── (auth)/                   # Auth group
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── onboarding/
│   │   │
│   │   ├── (dashboard)/              # Main app group
│   │   │   ├── layout.tsx            # Dashboard layout
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   │
│   │   │   ├── weddings/             # Wedding management
│   │   │   │   ├── page.tsx          # List view
│   │   │   │   ├── [id]/             # Detail view
│   │   │   │   └── new/              # Create new
│   │   │   │
│   │   │   ├── inventory/            # Inventory management
│   │   │   │   ├── page.tsx          # Inventory list
│   │   │   │   ├── [id]/             # Item details
│   │   │   │   ├── new/              # Add item
│   │   │   │   ├── categories/       # Category management
│   │   │   │   ├── warehouses/       # Warehouse management
│   │   │   │   └── check-out/        # Check-out workflow
│   │   │   │
│   │   │   ├── clients/              # Client CRM
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   └── new/
│   │   │   │
│   │   │   ├── vendors/              # Vendor management
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   └── new/
│   │   │   │
│   │   │   ├── tasks/                # Task management
│   │   │   ├── analytics/            # Analytics dashboard
│   │   │   ├── financial/            # Financial module
│   │   │   ├── settings/             # Settings
│   │   │   └── team/                 # Team management
│   │   │
│   │   ├── (marketing)/              # Marketing pages
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── pricing/
│   │   │   ├── features/
│   │   │   └── about/
│   │   │
│   │   ├── api/                      # API routes
│   │   │   ├── trpc/[trpc]/          # tRPC handler
│   │   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   │   └── webhooks/             # Webhook handlers
│   │   │
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React components
│   │   ├── ui/                       # 21st.dev components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...                   # All shadcn/ui components
│   │   │
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── inventory/                # Inventory-specific
│   │   │   ├── InventoryCard.tsx
│   │   │   ├── InventoryTable.tsx
│   │   │   ├── InventoryForm.tsx
│   │   │   ├── VendorTypeSelector.tsx
│   │   │   ├── CheckOutDialog.tsx
│   │   │   ├── CheckInDialog.tsx
│   │   │   └── FloorPlanViewer.tsx
│   │   │
│   │   ├── wedding/                  # Wedding-specific
│   │   │   ├── WeddingCard.tsx
│   │   │   ├── WeddingTimeline.tsx
│   │   │   └── EventCalendar.tsx
│   │   │
│   │   ├── client/                   # Client-specific
│   │   ├── vendor/                   # Vendor-specific
│   │   ├── analytics/                # Analytics components
│   │   └── shared/                   # Shared components
│   │       ├── DataTable.tsx
│   │       ├── SearchBar.tsx
│   │       ├── FilterPanel.tsx
│   │       └── EmptyState.tsx
│   │
│   ├── server/                       # Server-side code
│   │   ├── api/                      # tRPC routers
│   │   │   ├── root.ts               # Root router
│   │   │   └── routers/
│   │   │       ├── auth.ts
│   │   │       ├── tenant.ts
│   │   │       ├── inventory.ts
│   │   │       ├── wedding.ts
│   │   │       ├── client.ts
│   │   │       ├── vendor.ts
│   │   │       └── analytics.ts
│   │   │
│   │   ├── db/                       # Database
│   │   │   ├── client.ts             # Prisma client
│   │   │   └── multi-tenant.ts       # Multi-tenant helpers
│   │   │
│   │   └── auth/                     # Authentication
│   │       ├── config.ts
│   │       └── permissions.ts
│   │
│   ├── lib/                          # Utilities & helpers
│   │   ├── utils.ts                  # General utilities
│   │   ├── validators.ts             # Zod schemas
│   │   ├── constants.ts              # App constants
│   │   ├── date.ts                   # Date utilities
│   │   ├── format.ts                 # Formatters
│   │   └── api/                      # API helpers
│   │       └── client.ts             # tRPC client
│   │
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-tenant.ts
│   │   ├── use-inventory.ts
│   │   ├── use-debounce.ts
│   │   └── use-toast.ts
│   │
│   ├── stores/                       # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── ui-store.ts
│   │   └── filter-store.ts
│   │
│   ├── types/                        # TypeScript types
│   │   ├── index.ts
│   │   ├── inventory.ts
│   │   ├── wedding.ts
│   │   └── api.ts
│   │
│   └── config/                       # Configuration
│       ├── site.ts                   # Site config
│       └── navigation.ts             # Navigation config
│
├── tests/                            # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example                      # Environment variables template
├── .env.local                        # Local environment (gitignored)
├── .eslintrc.json                    # ESLint config
├── .prettierrc                       # Prettier config
├── next.config.js                    # Next.js config
├── package.json
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind config
└── README.md
```

---

## 🎨 Page-by-Page Breakdown

### Phase 1: Authentication & Onboarding (Week 1-2)

#### 1.1 Login Page (`/login`)
**Components:**
- AnimatedLoginForm (21st.dev)
- SocialAuthButtons
- ForgotPasswordLink

**Features:**
- Email/password authentication
- Social login (Google, Microsoft)
- Remember me
- Error handling
- Loading states

**Code Pattern:**
```tsx
// src/app/(auth)/login/page.tsx
import { AnimatedLoginForm } from '@/components/ui/animated-login-form'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatedLoginForm
        onSubmit={async (data) => {
          await signIn('credentials', data)
        }}
      />
    </div>
  )
}
```

#### 1.2 Registration Page (`/register`)
**Components:**
- SignupWizard (21st.dev)
- StepperComponent (21st.dev)

**Steps:**
1. Company details
2. Admin user creation
3. Plan selection
4. Payment (optional)
5. Confirmation

#### 1.3 Onboarding Wizard (`/onboarding`)
**Components:**
- MultiStepForm (21st.dev)
- ProgressIndicator (21st.dev)

**Steps:**
1. Warehouse setup
2. Inventory categories
3. Team invites
4. Sample data import
5. Quick tour

---

### Phase 2: Dashboard & Core Layout (Week 2-3)

#### 2.1 Main Dashboard (`/dashboard`)
**Components:**
- DashboardSidebar (21st.dev)
- MetricCard (21st.dev)
- StatsGrid (21st.dev)
- RecentActivity (custom)

**Sections:**
1. **Key Metrics**
   - Total inventory value
   - Items in use
   - Available items
   - Upcoming events

2. **Charts**
   - Utilization trends (7/30/90 days)
   - Revenue by category
   - Top performing items

3. **Quick Actions**
   - Add inventory item
   - Create wedding
   - Check-out equipment
   - Generate report

4. **Recent Activity Feed**
   - Latest check-outs
   - New clients
   - Upcoming tasks

**Layout:**
```tsx
// src/app/(dashboard)/layout.tsx
import { DashboardSidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

---

### Phase 3: Inventory Management (Week 3-6)

#### 3.1 Inventory List Page (`/inventory`)
**Components:**
- DataTableAdvanced (21st.dev)
- FilterPanel (21st.dev)
- SearchInput (21st.dev)
- InventoryCard (custom)

**Features:**
1. **Table View**
   - Sortable columns
   - Filterable by:
     - Vendor type
     - Status (available, in-use, maintenance)
     - Location/warehouse
     - Category
   - Bulk actions (export, delete, assign)
   - Column visibility toggle

2. **Card View** (alternative)
   - Grid layout
   - Image thumbnails
   - Quick actions
   - Status badges

3. **Search**
   - Full-text search
   - Search by SKU, name, category
   - Recent searches
   - Saved filters

**Code Pattern:**
```tsx
// src/app/(dashboard)/inventory/page.tsx
'use client'

import { DataTableAdvanced } from '@/components/ui/data-table-advanced'
import { FilterPanel } from '@/components/ui/filter-panel'
import { trpc } from '@/lib/api/client'

export default function InventoryPage() {
  const { data, isLoading } = trpc.inventory.list.useQuery()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Button href="/inventory/new">Add Item</Button>
      </div>

      <FilterPanel />

      <DataTableAdvanced
        data={data}
        columns={inventoryColumns}
        loading={isLoading}
      />
    </div>
  )
}
```

#### 3.2 Add/Edit Inventory Item (`/inventory/new`, `/inventory/[id]/edit`)
**Components:**
- DynamicForm (21st.dev)
- ConditionalFields (21st.dev)
- ImageUpload (21st.dev)
- VendorTypeSelector (custom)

**Form Sections:**
1. **Basic Information**
   - Item name
   - SKU/Barcode
   - Category
   - Vendor type (determines additional fields)

2. **Vendor-Specific Fields**
   - Electrical: voltage, wattage, etc.
   - Structures: dimensions, weight, etc.
   - AV: resolution, power, etc.
   - Decor: colors, material, etc.
   - Furniture: dimensions, capacity
   - Catering: capacity, type

3. **Inventory Details**
   - Quantity
   - Purchase price
   - Rental price
   - Supplier
   - Purchase date

4. **Location & Storage**
   - Warehouse
   - Location within warehouse
   - Floor plan visualization

5. **Media**
   - Photos (multiple)
   - Documents (manuals, certificates)
   - Videos

6. **Maintenance**
   - Maintenance schedule
   - Last service date
   - Warranty info

**Dynamic Field Rendering:**
```tsx
// src/components/inventory/VendorTypeFields.tsx
export function VendorTypeFields({ type }: { type: VendorType }) {
  switch (type) {
    case 'ELECTRICAL':
      return <ElectricalFields />
    case 'STRUCTURES':
      return <StructureFields />
    case 'AV':
      return <AVFields />
    // ... other types
  }
}
```

#### 3.3 Inventory Item Details (`/inventory/[id]`)
**Components:**
- Tabs (shadcn/ui)
- ImageGallery (21st.dev)
- HistoryTimeline (21st.dev)
- MaintenanceLog (custom)

**Tabs:**
1. **Overview**
   - All item details
   - Current status
   - Location
   - Quick actions

2. **Usage History**
   - Past assignments
   - Check-out/in logs
   - Timeline view

3. **Maintenance**
   - Service history
   - Scheduled maintenance
   - Issues/repairs

4. **Financial**
   - Purchase info
   - Rental history
   - ROI calculation

5. **Documents**
   - Manuals
   - Certificates
   - Invoices

#### 3.4 Check-Out Workflow (`/inventory/check-out`)
**Components:**
- MultiStepForm (21st.dev)
- ItemSelector (custom)
- DateRangePicker (21st.dev)
- ConditionChecker (custom)

**Steps:**
1. **Select Items**
   - Search inventory
   - Check availability
   - Add to assignment
   - Quantity selection

2. **Assignment Details**
   - Wedding/Event
   - Check-out date
   - Expected return date
   - Assigned to (team member)

3. **Condition Check**
   - Pre-check-out inspection
   - Photo documentation
   - Notes

4. **Confirmation**
   - Review assignment
   - Generate checklist
   - Print QR codes

#### 3.5 Check-In Workflow (`/inventory/check-in`)
**Components:**
- QRScanner (21st.dev)
- ConditionForm (custom)
- DamageReporter (custom)

**Steps:**
1. **Scan Items**
   - QR/barcode scanning
   - Manual selection

2. **Condition Assessment**
   - Visual inspection
   - Functional tests
   - Damage photos

3. **Maintenance Needs**
   - Flag for maintenance
   - Schedule repairs
   - Update status

4. **Complete Return**
   - Update inventory
   - Close assignment
   - Trigger maintenance if needed

---

### Phase 4: Wedding Management (Week 6-8)

#### 4.1 Wedding List (`/weddings`)
**Components:**
- EventCalendar (21st.dev)
- KanbanBoard (21st.dev) - optional view
- WeddingCard (custom)

**Views:**
1. **Calendar View**
   - Monthly/weekly/daily
   - Color-coded by status
   - Drag to reschedule

2. **List View**
   - Sortable table
   - Filter by status, date
   - Search

3. **Kanban View**
   - Pipeline stages
   - Drag & drop
   - Status updates

#### 4.2 Wedding Details (`/weddings/[id]`)
**Components:**
- Tabs
- Timeline (21st.dev)
- TaskBoard (custom)
- InventoryAssignment (custom)

**Sections:**
1. **Overview**
   - Client details
   - Event date/time
   - Venue
   - Status

2. **Tasks**
   - Task list with assignments
   - Deadlines
   - Dependencies

3. **Inventory**
   - Assigned equipment
   - Availability check
   - Return status

4. **Team**
   - Assigned coordinators
   - Roles
   - Contact info

5. **Financial**
   - Estimate
   - Invoices
   - Payments

---

### Phase 5: Client & Vendor Management (Week 8-9)

#### 5.1 Client CRM (`/clients`)
**Components:**
- DataTable (21st.dev)
- ClientCard (custom)
- CommunicationLog (custom)

**Features:**
- Client directory
- Contact information
- Wedding history
- Communication tracking
- Document storage

#### 5.2 Vendor Directory (`/vendors`)
**Components:**
- VendorCard (custom)
- RatingDisplay (21st.dev)
- ContractManager (custom)

**Features:**
- Vendor profiles
- Categories
- Ratings & reviews
- Contract management
- Communication history

---

### Phase 6: Analytics & Reporting (Week 9-10)

#### 6.1 Analytics Dashboard (`/analytics`)
**Components:**
- BarChart (21st.dev)
- LineChart (21st.dev)
- PieChart (21st.dev)
- Heatmap (21st.dev)
- MetricCard (21st.dev)

**Sections:**
1. **Financial Analytics**
   - Revenue trends
   - Profit margins
   - Outstanding payments

2. **Inventory Analytics**
   - Utilization rates
   - ROI by item
   - Underutilized items
   - Maintenance costs

3. **Operational Analytics**
   - Events per month
   - Team performance
   - Client acquisition

4. **Custom Reports**
   - Report builder
   - Scheduled exports
   - Email delivery

---

### Phase 7: Settings & Administration (Week 10-11)

#### 7.1 Settings (`/settings`)
**Components:**
- TabGroup
- Form components

**Sections:**
1. **General**
   - Company info
   - Branding
   - Time zone

2. **Team**
   - User management
   - Roles & permissions
   - Invitations

3. **Billing**
   - Subscription plan
   - Payment method
   - Invoices

4. **Integrations**
   - Connected services
   - API keys
   - Webhooks

5. **Notifications**
   - Email preferences
   - SMS settings
   - Push notifications

---

## 🔧 Implementation Strategy

### Week-by-Week Breakdown

#### **Week 1: Foundation**
**Days 1-2: Project Setup**
```bash
# Initialize Next.js project
npx create-next-app@latest inventoryflow-web \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd inventoryflow-web

# Install core dependencies
npm install @prisma/client @trpc/server @trpc/client @trpc/react-query
npm install @tanstack/react-query next-auth zod
npm install zustand date-fns class-variance-authority clsx tailwind-merge

# Install dev dependencies
npm install -D prisma @types/node tsx
npm install -D eslint-config-next @typescript-eslint/parser
npm install -D prettier prettier-plugin-tailwindcss

# Initialize shadcn/ui
npx shadcn-ui@latest init

# Setup Prisma
npx prisma init
```

**Days 3-4: Core Configuration**
- Configure TypeScript (strict mode)
- Setup ESLint + Prettier
- Configure Tailwind CSS
- Setup environment variables
- Create folder structure

**Days 5-7: Authentication Base**
- NextAuth.js setup
- Multi-tenant middleware
- Protected route wrapper
- Login/register pages

**Deliverable:** Working authentication system

---

#### **Week 2: Dashboard Layout**
**Days 8-10: Layout Components**
- Dashboard sidebar (21st.dev)
- Header with user menu
- Mobile responsive navigation
- Theme switcher (light/dark)

**Days 11-12: Dashboard Home**
- Metrics cards
- Quick actions
- Activity feed
- Basic charts

**Days 13-14: Database Setup**
- Complete Prisma schema
- Migrations
- Seed data
- tRPC router setup

**Deliverable:** Functional dashboard with dummy data

---

#### **Week 3-4: Inventory Module - Part 1**
**Days 15-18: Inventory List**
- Data table with sorting/filtering
- Search functionality
- Bulk actions
- Export functionality

**Days 19-22: Add Inventory Form**
- Basic information fields
- Vendor type selector
- Dynamic field rendering
- Image upload
- Form validation (Zod)

**Days 23-28: Vendor-Specific Forms**
- Electrical equipment fields
- Structure equipment fields
- AV equipment fields
- Decor item fields
- Furniture fields
- Catering equipment fields

**Deliverable:** Complete inventory CRUD operations

---

#### **Week 5-6: Inventory Module - Part 2**
**Days 29-32: Item Details Page**
- Detail view with tabs
- Image gallery
- Edit mode
- Delete confirmation

**Days 33-36: Check-Out Workflow**
- Multi-step form
- Item availability check
- Assignment creation
- QR code generation

**Days 37-42: Check-In Workflow**
- QR scanner integration
- Condition assessment
- Damage reporting
- Maintenance flagging

**Deliverable:** Complete inventory workflow

---

#### **Week 7-8: Wedding Management**
**Days 43-46: Wedding List**
- Calendar view
- List view
- Kanban board
- Create wedding form

**Days 47-50: Wedding Details**
- Overview section
- Task management
- Inventory assignment
- Team assignment

**Days 51-56: Wedding Workflow**
- Client linking
- Venue management
- Timeline creation
- Status updates

**Deliverable:** Complete wedding management

---

#### **Week 9: Client & Vendor Management**
**Days 57-60: Client CRM**
- Client list
- Client details
- Communication log
- Document management

**Days 61-63: Vendor Directory**
- Vendor list
- Vendor profiles
- Category management
- Rating system

**Deliverable:** CRM functionality

---

#### **Week 10: Analytics & Reporting**
**Days 64-67: Analytics Dashboard**
- Revenue charts
- Utilization metrics
- Custom date ranges
- Export reports

**Days 68-70: Report Builder**
- Custom report creation
- Scheduled reports
- Email delivery

**Deliverable:** Analytics module

---

#### **Week 11: Settings & Polish**
**Days 71-73: Settings Pages**
- General settings
- Team management
- Billing management
- Integration settings

**Days 74-77: UI/UX Polish**
- Loading states everywhere
- Error boundaries
- Empty states
- Tooltips & help text
- Keyboard shortcuts

**Deliverable:** Complete settings & polished UI

---

#### **Week 12: Testing & Optimization**
**Days 78-80: Testing**
- Unit tests (core functions)
- Integration tests (API routes)
- E2E tests (critical paths)
- Accessibility audit

**Days 81-83: Performance**
- Image optimization
- Code splitting
- Lazy loading
- Caching strategy

**Days 84: Documentation**
- User guide
- API documentation
- Component documentation

**Deliverable:** Production-ready application

---

## 📝 Documentation Standards

### Code Documentation

#### Component Documentation
```tsx
/**
 * InventoryCard - Display inventory item in card format
 *
 * @component
 * @example
 * ```tsx
 * <InventoryCard
 *   item={inventoryItem}
 *   onEdit={handleEdit}
 *   onDelete={handleDelete}
 * />
 * ```
 *
 * @param {InventoryItem} item - The inventory item to display
 * @param {Function} onEdit - Callback when edit is clicked
 * @param {Function} onDelete - Callback when delete is clicked
 */
export function InventoryCard({ item, onEdit, onDelete }: Props) {
  // ...
}
```

#### Function Documentation
```tsx
/**
 * Calculate inventory item utilization rate
 *
 * @param {string} itemId - Inventory item ID
 * @param {Date} startDate - Start of period
 * @param {Date} endDate - End of period
 * @returns {Promise<number>} Utilization percentage (0-100)
 *
 * @example
 * const utilization = await calculateUtilization('item-123', startDate, endDate)
 * console.log(`Item is ${utilization}% utilized`)
 */
async function calculateUtilization(
  itemId: string,
  startDate: Date,
  endDate: Date
): Promise<number> {
  // ...
}
```

### API Documentation

#### tRPC Procedure Documentation
```typescript
/**
 * Get inventory item by ID
 *
 * @route inventory.getById
 * @access Protected - requires authentication
 * @permissions INVENTORY_VIEW
 *
 * @input
 * - id: string - Inventory item ID
 *
 * @output InventoryItem | null
 *
 * @throws TRPCError NOT_FOUND if item doesn't exist
 * @throws TRPCError FORBIDDEN if user lacks permissions
 *
 * @example
 * ```ts
 * const item = await trpc.inventory.getById.query({ id: 'item-123' })
 * ```
 */
export const inventoryRouter = router({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      // ...
    }),
})
```

### Feature Documentation

Each major feature should have a dedicated markdown file in `docs/features/`:

```markdown
# Inventory Check-Out Workflow

## Overview
The check-out workflow allows users to assign inventory items to events...

## User Flow
1. User navigates to Check-Out page
2. Searches for items
3. Selects items and quantities
4. Specifies event and dates
5. Reviews and confirms

## Technical Implementation
- Uses multi-step form from 21st.dev
- Validates availability via tRPC
- Generates QR codes for tracking
- Sends notifications to assigned team

## Components Used
- `MultiStepForm` (21st.dev)
- `ItemSelector` (custom)
- `DateRangePicker` (21st.dev)
- `QRCodeGenerator` (custom)

## API Endpoints
- `POST /api/trpc/checkout.create`
- `GET /api/trpc/inventory.checkAvailability`

## Database Changes
- Creates `Assignment` record
- Updates `InventoryItem` status
- Logs to `AuditLog`

## Testing
See `tests/e2e/inventory/checkout.spec.ts`
```

---

## ✅ Code Quality Standards

### TypeScript
```typescript
// ✅ Good: Explicit types, proper nullability
interface InventoryItem {
  id: string
  name: string
  quantity: number
  status: 'available' | 'in-use' | 'maintenance'
  warehouse: Warehouse | null
  createdAt: Date
}

// ❌ Bad: Any types, unclear structure
interface InventoryItem {
  id: any
  data: any
}
```

### React Components
```tsx
// ✅ Good: Typed props, proper error handling
interface Props {
  itemId: string
  onSave: (item: InventoryItem) => Promise<void>
}

export function InventoryForm({ itemId, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      setError(null)
      await onSave(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert variant="error">{error}</Alert>}
      {/* form fields */}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}

// ❌ Bad: No error handling, unclear state
export function InventoryForm({ itemId }: any) {
  const handleSubmit = (data: any) => {
    fetch('/api/save', { body: data })
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### Error Handling
```typescript
// ✅ Good: Specific error types, user-friendly messages
try {
  await updateInventory(id, data)
  toast.success('Inventory item updated')
} catch (error) {
  if (error instanceof ValidationError) {
    toast.error('Please check your input')
  } else if (error instanceof NotFoundError) {
    toast.error('Item not found')
  } else if (error instanceof PermissionError) {
    toast.error('You don't have permission to edit this item')
  } else {
    toast.error('Something went wrong. Please try again.')
    Sentry.captureException(error)
  }
}
```

### Naming Conventions
```typescript
// ✅ Components: PascalCase
export function InventoryCard() {}

// ✅ Hooks: camelCase with 'use' prefix
export function useInventory() {}

// ✅ Utils: camelCase
export function formatCurrency() {}

// ✅ Constants: UPPER_SNAKE_CASE
export const MAX_UPLOAD_SIZE = 10_000_000

// ✅ Types/Interfaces: PascalCase
interface InventoryItem {}
type Status = 'active' | 'inactive'
```

---

## 🧪 Testing Strategy

### Unit Tests
```typescript
// tests/unit/lib/format.test.ts
import { formatCurrency } from '@/lib/format'

describe('formatCurrency', () => {
  it('formats Indian currency correctly', () => {
    expect(formatCurrency(1000)).toBe('₹1,000')
    expect(formatCurrency(100000)).toBe('₹1,00,000')
  })

  it('handles decimals', () => {
    expect(formatCurrency(1234.56)).toBe('₹1,234.56')
  })
})
```

### Integration Tests
```typescript
// tests/integration/api/inventory.test.ts
import { appRouter } from '@/server/api/root'

describe('inventory router', () => {
  it('creates inventory item', async () => {
    const caller = appRouter.createCaller(mockContext)

    const item = await caller.inventory.create({
      name: 'LED Light',
      quantity: 10,
      vendorType: 'ELECTRICAL',
    })

    expect(item.id).toBeDefined()
    expect(item.name).toBe('LED Light')
  })
})
```

### E2E Tests
```typescript
// tests/e2e/inventory/crud.spec.ts
import { test, expect } from '@playwright/test'

test('user can create inventory item', async ({ page }) => {
  await page.goto('/inventory/new')

  await page.fill('[name="name"]', 'Test Light')
  await page.fill('[name="quantity"]', '5')
  await page.selectOption('[name="vendorType"]', 'ELECTRICAL')

  await page.click('button[type="submit"]')

  await expect(page.locator('text=Item created')).toBeVisible()
})
```

---

## 🚀 Deployment Strategy

### Environment Variables
```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/inventoryflow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Email
EMAIL_SERVER="smtp://user:pass@smtp.sendgrid.net:587"
EMAIL_FROM="noreply@inventoryflow.com"

# Storage
CLOUDFLARE_R2_BUCKET="inventoryflow-uploads"
CLOUDFLARE_R2_ACCESS_KEY_ID="xxx"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="xxx"

# AI
ANTHROPIC_API_KEY="sk-ant-xxx"
OPENAI_API_KEY="sk-xxx"

# Analytics
SENTRY_DSN="https://xxx@sentry.io/xxx"
```

### Build Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['r2.inventoryflow.com'],
    formats: ['image/avif', 'image/webp'],
  },

  experimental: {
    serverActions: true,
    typedRoutes: true,
  },

  // Environment variables available to browser
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
}

module.exports = nextConfig
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📊 Success Metrics

### Performance Targets
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Lighthouse Score**: > 90

### Quality Targets
- **TypeScript Coverage**: 100%
- **Test Coverage**: > 80%
- **Accessibility Score**: 100 (Lighthouse)
- **ESLint Errors**: 0
- **Bundle Size**: < 200KB (initial)

### User Experience Targets
- **Page Load Time**: < 2s (3G)
- **Form Submission**: < 500ms
- **Search Results**: < 200ms
- **Uptime**: 99.9%

---

## 🎯 Decision Log

All major technical decisions will be documented here:

### Decision 001: Next.js App Router
**Date**: 2025-11-14
**Decision**: Use Next.js 15 App Router instead of Pages Router
**Rationale**:
- Better performance with React Server Components
- Improved routing with layouts
- Built-in loading and error states
- Future-proof approach

### Decision 002: tRPC over REST
**Date**: 2025-11-14
**Decision**: Use tRPC for API layer
**Rationale**:
- End-to-end type safety
- No code generation needed
- Better DX with autocomplete
- Smaller bundle size than GraphQL

### Decision 003: Database-Per-Tenant
**Date**: 2025-11-14
**Decision**: Use database-per-tenant for multi-tenancy
**Rationale**:
- Complete data isolation
- Easier compliance (data residency)
- Customer-specific backups
- Better security posture

---

## 📚 Learning Resources

### For Development Team
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [21st.dev Component Registry](https://21st.dev)

### Best Practices
- [React Best Practices](https://react.dev/learn)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## ✅ Pre-Implementation Checklist

Before starting development:

- [ ] All team members have reviewed this plan
- [ ] Technology stack approved
- [ ] Design system/mockups ready
- [ ] Database schema finalized
- [ ] Development environment setup
- [ ] GitHub repository created
- [ ] CI/CD pipeline configured
- [ ] Project management tool setup (Linear/Jira)
- [ ] Communication channels established
- [ ] Budget approved
- [ ] Timeline confirmed with stakeholders

---

## 🎉 Next Steps

1. **Get Approval**: Review this plan with stakeholders
2. **Setup Repository**: Initialize Git repo and project structure
3. **Design Handoff**: Get final designs from design team
4. **Sprint Planning**: Break down Week 1 into daily tasks
5. **Kickoff Meeting**: Align team on goals and expectations
6. **Start Development**: Begin Week 1, Day 1!

---

**Ready to build something amazing? Let's do this! 🚀**

*Last Updated: 2025-11-14*
*Version: 1.0*
*Author: Claude (Anthropic)*
