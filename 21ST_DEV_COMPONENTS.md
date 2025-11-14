# 21st.dev Components - Implementation Guide
## Component Selection for InventoryFlow SaaS

**Updated**: November 2025 (Based on actual 21st.dev research)

This document lists the actual components available from 21st.dev that we'll use to build the InventoryFlow platform.

---

## 📊 21st.dev Platform Overview

**What is 21st.dev?**
- Open-source community registry of React UI components
- Based on shadcn/ui (Radix UI + Tailwind CSS)
- Install any component with: `npx shadcn@latest add "https://21st.dev/r/[component-path]"`
- Thousands of high-quality React components from the community
- Fully customizable and production-ready

**Key Features:**
- Lightweight, minimal components
- TypeScript support out of the box
- Dark mode compatible
- Accessible (WCAG compliant)
- No vendor lock-in (you own the code)

---

## 📦 Actual Component Inventory (From 21st.dev)

Based on research conducted November 2025, here are the **real component counts** available on 21st.dev:

### Core UI Components
| Category | Count | Priority for Our App |
|----------|-------|---------------------|
| **Buttons** | 130 | High - Navigation, actions |
| **Inputs** | 102 | High - Forms everywhere |
| **Cards** | 79 | High - Item displays |
| **Hero Sections** | 73 | Medium - Landing page |
| **Selects** | 62 | High - Dropdowns |
| **Sliders** | 45 | Low - Range inputs |
| **Tabs** | 38 | High - Navigation |
| **Dialogs/Modals** | 37 | High - Confirmations |
| **Calendars** | 34 | High - Event scheduling |
| **Tables** | 30 | High - Data display |
| **Tooltips** | 28 | Medium - Help text |
| **Dropdowns** | 25 | High - Menus |
| **Popovers** | 23 | Medium - Contextual info |
| **Forms** | 23 | High - Data entry |
| **Radio Groups** | 22 | Medium - Selections |
| **Text Areas** | 22 | Medium - Long text input |
| **Spinner Loaders** | 21 | High - Loading states |
| **Paginations** | 20 | High - Table navigation |
| **Checkboxes** | 19 | High - Multi-select |
| **Menus** | 18 | High - Navigation |
| **Numbers** | 18 | Medium - Numeric input |
| **Carousels** | 16 | Low - Image galleries |
| **Links** | 13 | Medium - Navigation |
| **Date Pickers** | 12 | High - Date selection |
| **Navigation Menus** | 11 | High - Top nav |
| **Sidebars** | 10 | High - Side navigation |
| **Icons** | 10 | Medium - Visual indicators |
| **File Uploads** | 7 | High - Document upload |
| **Tags** | 6 | Medium - Categories |
| **Notifications** | 5 | High - Alerts |
| **Sign Ins** | 4 | High - Authentication |
| **Sign Ups** | 4 | High - Registration |
| **Toasts** | 2 | High - Feedback |
| **File Trees** | 2 | Low - Folder structure |
| **Empty States** | 1 | Medium - No data display |

### Landing Page Components
| Category | Count | Priority |
|----------|-------|----------|
| **Pricing Sections** | 17 | High - Subscription plans |
| **Testimonials** | 15 | Medium - Social proof |

**Total Components Available**: ~1,000+ components across all categories

---

## 🎯 Component Selection for InventoryFlow

### Phase 1: Core Application (Week 1-2)
**Essential components to get started**

#### 1. Authentication (4-6 components needed)
- **Sign In Forms** (4 available) - Choose 1-2
- **Sign Up Forms** (4 available) - Choose 1
- **Buttons** (130 available) - Standard buttons

**Recommended Installation:**
```bash
# Browse and select specific sign-in component from:
# https://21st.dev/s/sign-in

# Browse and select specific sign-up component from:
# https://21st.dev/s/registration-signup

# Install base shadcn components
npx shadcn@latest add button input label card
```

#### 2. Layout & Navigation (8-10 components)
- **Sidebars** (10 available) - Choose 1 collapsible sidebar
- **Navigation Menus** (11 available) - Choose 1 top nav
- **Buttons** - For navigation actions

**Recommended Installation:**
```bash
# Browse sidebars at: https://21st.dev/s/sidebar
# Browse navigation at: https://21st.dev/s/navbar-navigation

# Install base components
npx shadcn@latest add sidebar navigation-menu avatar dropdown-menu
```

#### 3. Dashboard UI (10-12 components)
- **Cards** (79 available) - Metric cards, stat cards
- **Tables** (30 available) - Data display
- **Buttons** - Actions
- **Tooltips** (28 available) - Help text

**Recommended Installation:**
```bash
# Browse dashboard components at: https://21st.dev/s/dashboard
# Browse cards at: https://21st.dev/s/card

# Install base components
npx shadcn@latest add card table badge tooltip
```

#### 4. Feedback & Loading (6-8 components)
- **Toasts** (2 available) - Success/error messages
- **Spinner Loaders** (21 available) - Loading states
- **Notifications** (5 available) - Alerts
- **Dialogs** (37 available) - Confirmations

**Recommended Installation:**
```bash
# Browse at respective category pages
npx shadcn@latest add toast dialog alert-dialog skeleton
```

---

### Phase 2: Inventory Management (Week 3-6)
**Components for core inventory features**

#### 5. Data Display (15-20 components)
- **Tables** (30 available) - Main inventory list
  - Sortable tables
  - Filterable tables
  - Paginated tables
- **Cards** (79 available) - Item cards
- **Paginations** (20 available) - Table navigation
- **Empty States** (1 available) - No data view

**Recommended Installation:**
```bash
# Browse tables: https://21st.dev/s/table
# Browse cards: https://21st.dev/s/card

npx shadcn@latest add table data-table pagination card
```

#### 6. Forms & Input (20-25 components)
- **Forms** (23 available) - Inventory forms
- **Inputs** (102 available) - Text inputs
- **Selects** (62 available) - Dropdowns
- **Text Areas** (22 available) - Descriptions
- **Checkboxes** (19 available) - Multi-select
- **Radio Groups** (22 available) - Single select
- **Date Pickers** (12 available) - Date selection
- **File Uploads** (7 available) - Image/document upload

**Recommended Installation:**
```bash
# Browse forms: https://21st.dev/s/form
# Browse inputs: https://21st.dev/s/input
# Browse selects: https://21st.dev/s/select
# Browse file uploads: https://21st.dev/s/file-upload

npx shadcn@latest add form input textarea select checkbox radio-group calendar
```

#### 7. Search & Filter (8-10 components)
- **Inputs** - Search inputs with icons
- **Selects** - Filter dropdowns
- **Popovers** (23 available) - Filter panels
- **Buttons** - Filter actions

**Recommended Installation:**
```bash
npx shadcn@latest add input select popover command
```

#### 8. Actions & Modals (10-12 components)
- **Dialogs** (37 available) - Edit/delete confirmations
- **Dropdowns** (25 available) - Action menus
- **Buttons** - Primary actions
- **Menus** (18 available) - Context menus

**Recommended Installation:**
```bash
# Browse dialogs: https://21st.dev/s/dialog
# Browse dropdowns: https://21st.dev/s/dropdown

npx shadcn@latest add dialog dropdown-menu context-menu sheet
```

---

### Phase 3: Calendar & Events (Week 7-8)
**Wedding management components**

#### 9. Calendar Components (8-10 components)
- **Calendars** (34 available) - Event calendar
- **Date Pickers** (12 available) - Date range selection
- **Cards** - Event cards
- **Dialogs** - Event details

**Recommended Installation:**
```bash
# Browse calendars: https://21st.dev/s/calendar
# Browse date pickers: https://21st.dev/s/date-picker

npx shadcn@latest add calendar date-picker popover
```

#### 10. Task Management (6-8 components)
- **Checkboxes** - Task completion
- **Cards** - Task cards
- **Tabs** (38 available) - Task categories
- **Tags** (6 available) - Task labels

**Recommended Installation:**
```bash
npx shadcn@latest add checkbox tabs badge
```

---

### Phase 4: Analytics & Pricing (Week 9-10)
**Data visualization and monetization**

#### 11. Charts & Visualization (Requires Additional Library)
**Note**: 21st.dev doesn't have native chart components. We'll use **Recharts** or **Chart.js** with shadcn/ui styling.

```bash
# Install chart library
npm install recharts
# or
npm install react-chartjs-2 chart.js

# Then create custom chart components styled with shadcn/ui
```

**Custom Charts to Build:**
- Bar charts - Revenue by category
- Line charts - Trend analysis
- Pie charts - Inventory distribution
- Area charts - Cumulative metrics

#### 12. Pricing & Marketing (4-6 components)
- **Pricing Sections** (17 available) - Subscription plans
- **Hero Sections** (73 available) - Landing page
- **Testimonials** (15 available) - Social proof
- **Cards** - Feature comparison

**Recommended Installation:**
```bash
# Browse pricing: https://21st.dev/s/pricing-section
# Browse hero: https://21st.dev/s/hero

npx shadcn@latest add card button badge
```

---

### Phase 5: Advanced Features (Week 11-12)
**Polish and optimization**

#### 13. Advanced UI (8-10 components)
- **Tooltips** (28 available) - Contextual help
- **Popovers** (23 available) - Additional info
- **Carousels** (16 available) - Image galleries
- **Sliders** (45 available) - Range inputs (if needed)

**Recommended Installation:**
```bash
npx shadcn@latest add tooltip popover carousel slider
```

#### 14. User Experience (6-8 components)
- **Empty States** - No data views
- **Spinner Loaders** - Better loading states
- **Notifications** - System alerts
- **Icons** - Better visual communication

**Recommended Installation:**
```bash
npx shadcn@latest add icons skeleton separator progress
```

---

## 🚀 Installation Strategy

### Step 1: Initialize shadcn/ui (First Time Setup)

```bash
# In your Next.js project
npx shadcn@latest init

# Follow prompts:
# - TypeScript: Yes
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
# - Tailwind config: Yes
# - Import alias: @/components
```

### Step 2: Install Base Components (Week 1)

```bash
# Essential UI components
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add label
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add skeleton
```

### Step 3: Add 21st.dev Community Components

```bash
# Browse 21st.dev for specific components
# Example: If you find a great sidebar at 21st.dev/username/sidebar-name

npx shadcn@latest add "https://21st.dev/r/username/sidebar-name"

# This will:
# 1. Download the component
# 2. Add it to your project
# 3. Install dependencies
# 4. Update Tailwind config if needed
```

### Step 4: Form Components (Week 3)

```bash
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add switch
npx shadcn@latest add slider
npx shadcn@latest add calendar
```

### Step 5: Data Display (Week 4-5)

```bash
npx shadcn@latest add table
npx shadcn@latest add data-table
npx shadcn@latest add pagination
npx shadcn@latest add tabs
npx shadcn@latest add accordion
npx shadcn@latest add separator
```

### Step 6: Navigation & Layout (Week 2)

```bash
npx shadcn@latest add navigation-menu
npx shadcn@latest add menubar
npx shadcn@latest add context-menu
npx shadcn@latest add breadcrumb
npx shadcn@latest add sidebar
npx shadcn@latest add sheet
```

### Step 7: Feedback & Overlay (Week 2-3)

```bash
npx shadcn@latest add alert
npx shadcn@latest add alert-dialog
npx shadcn@latest add toast
npx shadcn@latest add tooltip
npx shadcn@latest add popover
npx shadcn@latest add hover-card
npx shadcn@latest add progress
```

### Step 8: Advanced Components (Week 6+)

```bash
npx shadcn@latest add command
npx shadcn@latest add combobox
npx shadcn@latest add carousel
npx shadcn@latest add collapsible
npx shadcn@latest add aspect-ratio
npx shadcn@latest add resizable
npx shadcn@latest add scroll-area
```

---

## 📋 Component Mapping to Features

### For Inventory Management:
| Feature | Components Needed | Available on 21st.dev |
|---------|------------------|----------------------|
| Inventory List | Table, Pagination, Card | ✅ 30 tables, 79 cards |
| Add Item Form | Form, Input, Select, File Upload | ✅ 23 forms, 102 inputs, 7 uploads |
| Item Details | Card, Tabs, Badge, Dialog | ✅ 79 cards, 38 tabs, 37 dialogs |
| Search & Filter | Input, Select, Popover, Command | ✅ 102 inputs, 62 selects, 23 popovers |
| Check-out/In | Dialog, Form, Calendar | ✅ 37 dialogs, 23 forms, 34 calendars |
| Floor Plan View | Custom (build with Canvas) | ❌ Need to build custom |
| Barcode Scanner | Custom (use library) | ❌ Use @zxing/library |

### For Wedding Management:
| Feature | Components Needed | Available on 21st.dev |
|---------|------------------|----------------------|
| Event Calendar | Calendar, Card | ✅ 34 calendars |
| Wedding List | Table, Card | ✅ 30 tables, 79 cards |
| Timeline View | Custom Timeline | ⚠️ Build with Cards + Lines |
| Task Board | Tabs, Checkbox, Card | ✅ 38 tabs, 19 checkboxes |
| Client Details | Card, Tabs, Dialog | ✅ 79 cards, 38 tabs |

### For Dashboard:
| Feature | Components Needed | Available on 21st.dev |
|---------|------------------|----------------------|
| Metrics Cards | Card, Badge | ✅ 79 cards |
| Charts | Custom (Recharts) | ❌ Use Recharts library |
| Activity Feed | Card, Separator | ✅ 79 cards |
| Quick Actions | Button, Dialog | ✅ 130 buttons, 37 dialogs |

### For Authentication:
| Feature | Components Needed | Available on 21st.dev |
|---------|------------------|----------------------|
| Login Page | Sign In Forms | ✅ 4 sign-in components |
| Registration | Sign Up Forms | ✅ 4 sign-up components |
| Onboarding | Custom Stepper | ⚠️ Build with Cards + Progress |

---

## 🎨 Customization Guide

### All components from 21st.dev are fully customizable:

#### 1. **Modify Tailwind Classes**
```tsx
// Original
<Button>Click me</Button>

// Customized
<Button className="bg-purple-600 hover:bg-purple-700 text-white">
  Click me
</Button>
```

#### 2. **Extend Component Logic**
```tsx
// Extend button with loading state
export function ButtonWithLoading({
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Spinner className="mr-2" />}
      {children}
    </Button>
  )
}
```

#### 3. **Create Variants**
```tsx
// Use class-variance-authority (included in shadcn)
const buttonVariants = cva(
  "base-button-classes",
  {
    variants: {
      intent: {
        primary: "bg-purple-600 text-white",
        secondary: "bg-gray-200 text-gray-900",
        danger: "bg-red-600 text-white"
      },
      size: {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg"
      }
    }
  }
)
```

#### 4. **Compose Components**
```tsx
// Build complex UIs by composing simple components
<Card>
  <CardHeader>
    <CardTitle>Inventory Item</CardTitle>
    <CardDescription>LED Moving Head Light</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <Badge variant="success">Available</Badge>
      <p className="text-sm text-muted-foreground">
        Located in Warehouse A
      </p>
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="outline">Edit</Button>
    <Button>Check Out</Button>
  </CardFooter>
</Card>
```

---

## 🔧 Best Practices

### 1. Component Organization
```
src/components/
├── ui/                    # shadcn/ui + 21st.dev components (don't modify)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
│
├── custom/               # Your custom components (extend ui/)
│   ├── inventory-card.tsx
│   ├── metric-card.tsx
│   └── ...
│
└── features/            # Feature-specific compositions
    ├── inventory/
    │   ├── inventory-table.tsx
    │   └── check-out-dialog.tsx
    └── dashboard/
        └── stats-grid.tsx
```

### 2. Import Pattern
```tsx
// ✅ Good: Import UI components from ui/
import { Button, Card, Input } from '@/components/ui'
import { InventoryCard } from '@/components/custom/inventory-card'

// ❌ Avoid: Don't modify files in ui/ directly
// Instead, create wrapper components in custom/
```

### 3. Type Safety
```tsx
// Extend component props properly
import { ButtonProps } from '@/components/ui/button'

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean
  icon?: React.ReactNode
}

export function CustomButton({
  isLoading,
  icon,
  children,
  ...props
}: CustomButtonProps) {
  // ...
}
```

### 4. Theme Configuration
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        // Your brand colors
        brand: {
          50: '#f5f3ff',
          // ... purple shades
          900: '#4c1d95',
        }
      }
    }
  }
}
```

---

## 📊 Component Budget

### Estimated Component Usage:
- **Base shadcn/ui components**: ~40 components
- **21st.dev community components**: ~15-20 specialized components
- **Custom components**: ~30-40 feature-specific components

### Total Development Time Saved:
- **Without component library**: ~200-250 hours (UI development from scratch)
- **With 21st.dev components**: ~50-75 hours (customization + integration)
- **Time saved**: **~150-175 hours** ⭐

---

## 🚨 Important Notes

### Components We Need to Build Custom:
Since these aren't available on 21st.dev, we'll build them:

1. **Floor Plan Viewer** - Canvas-based warehouse layout
2. **Barcode Scanner** - Camera + @zxing/library integration
3. **QR Code Generator** - qrcode library
4. **Charts** - Recharts integration
5. **Timeline View** - Custom component with animations
6. **Kanban Board** - Drag-and-drop with dnd-kit
7. **Rich Text Editor** - Tiptap integration
8. **Image Annotator** - For marking locations on floor plans

### External Libraries to Add:
```bash
npm install recharts                    # Charts
npm install @zxing/library             # Barcode scanning
npm install qrcode                      # QR code generation
npm install @dnd-kit/core @dnd-kit/sortable  # Drag and drop
npm install @tiptap/react @tiptap/starter-kit # Rich text
npm install date-fns                    # Date utilities
npm install react-hook-form zod        # Form handling
npm install @tanstack/react-query      # Data fetching
```

---

## ✅ Installation Checklist

### Week 1: Core Setup
- [ ] Initialize shadcn/ui
- [ ] Install base components (button, input, card, etc.)
- [ ] Browse 21st.dev for sign-in component
- [ ] Install selected authentication components
- [ ] Install navigation components (sidebar, navbar)
- [ ] Install feedback components (toast, dialog, skeleton)

### Week 2: Layout & Dashboard
- [ ] Install dashboard components
- [ ] Install layout components
- [ ] Install metric/card components
- [ ] Customize theme colors
- [ ] Test dark mode

### Week 3-4: Forms & Data
- [ ] Install all form components
- [ ] Install table components
- [ ] Install date/time pickers
- [ ] Install file upload components
- [ ] Test form validation

### Week 5-6: Inventory Features
- [ ] Install calendar components
- [ ] Install advanced table features
- [ ] Install command palette
- [ ] Build custom floor plan viewer
- [ ] Integrate barcode scanning

### Week 7-8: Polish
- [ ] Install remaining UI components
- [ ] Build custom chart components
- [ ] Add animations
- [ ] Accessibility audit
- [ ] Performance optimization

---

## 🎯 Summary

### What 21st.dev Provides:
✅ **1,000+** ready-made React components
✅ **TypeScript** support out of the box
✅ **Tailwind CSS** styling
✅ **Accessible** components (Radix UI)
✅ **Customizable** - you own the code
✅ **Free & Open Source**

### What We Need to Build:
❌ Floor plan visualization (Canvas-based)
❌ Barcode/QR scanning (Camera integration)
❌ Charts & analytics (Recharts)
❌ Drag-and-drop boards (dnd-kit)
❌ Rich text editing (Tiptap)

### The Strategy:
1. **Use 21st.dev** for 80% of UI components
2. **Build custom** for 20% specialized features
3. **Save 150+ hours** of development time
4. **Focus on** business logic, not UI primitives

---

**Component library selection complete!** ✅

Ready to build an insane UI with minimal effort! 🚀

*Last Updated: November 2025*
*Based on actual 21st.dev research*
