# 21st.dev Components - Implementation Guide
## Component Selection for InventoryFlow SaaS

This document lists all the components from 21st.dev that we'll use to build the InventoryFlow platform.

---

## 🎨 Component Categories & Usage

### 1. Authentication & Onboarding (5 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Animated Login Form | `npx shadcn@latest add "https://21st.dev/r/animated-login-form"` | Login page with smooth animations | High |
| Signup Wizard | `npx shadcn@latest add "https://21st.dev/r/signup-wizard"` | Multi-step registration | High |
| Stepper Component | `npx shadcn@latest add "https://21st.dev/r/stepper-component"` | Onboarding progress | High |
| Progress Indicator | `npx shadcn@latest add "https://21st.dev/r/progress-indicator"` | Setup completion tracking | Medium |

**Total for Category**: 4 components

---

### 2. Dashboard & Layout (6 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Dashboard Sidebar | `npx shadcn@latest add "https://21st.dev/r/dashboard-sidebar"` | Main navigation | High |
| Responsive Navbar | `npx shadcn@latest add "https://21st.dev/r/responsive-navbar"` | Top header | High |
| Collapsible Sidebar | `npx shadcn@latest add "https://21st.dev/r/collapsible-sidebar"` | Expandable nav | Medium |
| Metric Card | `npx shadcn@latest add "https://21st.dev/r/metric-card"` | Dashboard KPIs | High |
| Stats Grid | `npx shadcn@latest add "https://21st.dev/r/stats-grid"` | Metrics overview | High |
| Trend Card | `npx shadcn@latest add "https://21st.dev/r/trend-card"` | Trending data display | Medium |

**Total for Category**: 6 components

---

### 3. Data Display (8 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Data Table Advanced | `npx shadcn@latest add "https://21st.dev/r/data-table-advanced"` | Main inventory table | High |
| Sortable Table | `npx shadcn@latest add "https://21st.dev/r/sortable-table"` | Sortable lists | High |
| Filterable Table | `npx shadcn@latest add "https://21st.dev/r/filterable-table"` | Filtered views | High |
| Virtual List | `npx shadcn@latest add "https://21st.dev/r/virtual-list"` | Large lists performance | Medium |
| Infinite Scroll List | `npx shadcn@latest add "https://21st.dev/r/infinite-scroll-list"` | Paginated data | Medium |
| Inventory Card | `npx shadcn@latest add "https://21st.dev/r/inventory-card"` | Item card view | High |
| Product Card | `npx shadcn@latest add "https://21st.dev/r/product-card"` | Item showcase | Medium |

**Total for Category**: 7 components

---

### 4. Form Components (12 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Multi-step Form | `npx shadcn@latest add "https://21st.dev/r/multi-step-form"` | Complex workflows | High |
| Dynamic Form | `npx shadcn@latest add "https://21st.dev/r/dynamic-form"` | Vendor-specific fields | High |
| Conditional Fields | `npx shadcn@latest add "https://21st.dev/r/conditional-fields"` | Show/hide based on input | High |
| Search Input | `npx shadcn@latest add "https://21st.dev/r/search-input"` | Global search | High |
| Autocomplete | `npx shadcn@latest add "https://21st.dev/r/autocomplete"` | Smart suggestions | High |
| Rich Select | `npx shadcn@latest add "https://21st.dev/r/rich-select"` | Enhanced dropdowns | Medium |
| Date Range Picker | `npx shadcn@latest add "https://21st.dev/r/date-range-picker"` | Event dates | High |
| Time Picker | `npx shadcn@latest add "https://21st.dev/r/time-picker"` | Time selection | Medium |
| Dropzone | `npx shadcn@latest add "https://21st.dev/r/dropzone"` | File uploads | High |
| Image Upload | `npx shadcn@latest add "https://21st.dev/r/image-upload"` | Photo uploads | High |
| File Preview | `npx shadcn@latest add "https://21st.dev/r/file-preview"` | Document preview | Medium |

**Total for Category**: 11 components

---

### 5. Calendar & Scheduling (4 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Event Calendar | `npx shadcn@latest add "https://21st.dev/r/event-calendar"` | Wedding calendar | High |
| Date Picker Range | `npx shadcn@latest add "https://21st.dev/r/date-picker-range"` | Date selection | High |
| Timeline View | `npx shadcn@latest add "https://21st.dev/r/timeline-view"` | Event timeline | High |
| Gantt Chart | `npx shadcn@latest add "https://21st.dev/r/gantt-chart"` | Project planning | Low |

**Total for Category**: 4 components

---

### 6. Charts & Analytics (7 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Bar Chart | `npx shadcn@latest add "https://21st.dev/r/bar-chart"` | Revenue charts | High |
| Line Chart | `npx shadcn@latest add "https://21st.dev/r/line-chart"` | Trend analysis | High |
| Pie Chart | `npx shadcn@latest add "https://21st.dev/r/pie-chart"` | Category breakdown | Medium |
| Area Chart | `npx shadcn@latest add "https://21st.dev/r/area-chart"` | Cumulative data | Medium |
| Sparkline | `npx shadcn@latest add "https://21st.dev/r/sparkline"` | Inline trends | Low |
| Heatmap | `npx shadcn@latest add "https://21st.dev/r/heatmap"` | Usage patterns | Medium |

**Total for Category**: 6 components

---

### 7. Modal & Overlay (4 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Drawer | `npx shadcn@latest add "https://21st.dev/r/drawer"` | Side panels | High |
| Sheet | `npx shadcn@latest add "https://21st.dev/r/sheet"` | Details overlay | High |
| Command Palette | `npx shadcn@latest add "https://21st.dev/r/command-palette"` | Quick search (Cmd+K) | Medium |
| Confirmation Dialog | `npx shadcn@latest add "https://21st.dev/r/confirmation-dialog"` | Delete confirmations | High |

**Total for Category**: 4 components

---

### 8. Notification & Feedback (6 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Toast Advanced | `npx shadcn@latest add "https://21st.dev/r/toast-advanced"` | Success/error messages | High |
| Alert Banner | `npx shadcn@latest add "https://21st.dev/r/alert-banner"` | Important notices | Medium |
| Notification Center | `npx shadcn@latest add "https://21st.dev/r/notification-center"` | Activity feed | Medium |
| Skeleton Loader | `npx shadcn@latest add "https://21st.dev/r/skeleton-loader"` | Loading states | High |
| Progress Bar | `npx shadcn@latest add "https://21st.dev/r/progress-bar"` | Upload progress | Medium |
| Spinner | `npx shadcn@latest add "https://21st.dev/r/spinner"` | Loading indicator | High |

**Total for Category**: 6 components

---

### 9. E-commerce & Pricing (3 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Pricing Table | `npx shadcn@latest add "https://21st.dev/r/pricing-table"` | Subscription plans | High |
| Feature Comparison | `npx shadcn@latest add "https://21st.dev/r/feature-comparison"` | Plan comparison | Medium |
| Subscription Card | `npx shadcn@latest add "https://21st.dev/r/subscription-card"` | Plan display | Medium |

**Total for Category**: 3 components

---

### 10. Advanced Workflow (5 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Kanban Board | `npx shadcn@latest add "https://21st.dev/r/kanban-board"` | Task management | Medium |
| Drag Drop List | `npx shadcn@latest add "https://21st.dev/r/drag-drop-list"` | Reorderable lists | Low |
| Task Card | `npx shadcn@latest add "https://21st.dev/r/task-card"` | Task items | Medium |
| Floor Plan Viewer | `npx shadcn@latest add "https://21st.dev/r/floor-plan-viewer"` | Warehouse layout | High |
| Image Annotator | `npx shadcn@latest add "https://21st.dev/r/image-annotator"` | Location marking | Medium |

**Total for Category**: 5 components

---

### 11. Search & Filter (3 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| Global Search | `npx shadcn@latest add "https://21st.dev/r/global-search"` | Site-wide search | High |
| Faceted Search | `npx shadcn@latest add "https://21st.dev/r/faceted-search"` | Advanced filtering | High |
| Filter Panel | `npx shadcn@latest add "https://21st.dev/r/filter-panel"` | Filter UI | High |

**Total for Category**: 3 components

---

### 12. User Management (4 components)

| Component | Install Command | Use Case | Priority |
|-----------|----------------|----------|----------|
| User Avatar | `npx shadcn@latest add "https://21st.dev/r/user-avatar"` | Profile pictures | High |
| User Menu | `npx shadcn@latest add "https://21st.dev/r/user-menu"` | Account dropdown | High |
| Team Switcher | `npx shadcn@latest add "https://21st.dev/r/team-switcher"` | Multi-tenant switching | High |
| Role Badge | `npx shadcn@latest add "https://21st.dev/r/role-badge"` | Role indicators | Medium |

**Total for Category**: 4 components

---

## 📊 Summary Statistics

### Total Components: ~65 components

### Priority Breakdown:
- **High Priority**: 42 components (MVP essentials)
- **Medium Priority**: 20 components (Enhanced UX)
- **Low Priority**: 3 components (Nice to have)

### Installation Strategy:

#### Phase 1 (Week 1-2): Core Components (15)
```bash
# Authentication
npx shadcn@latest add "https://21st.dev/r/animated-login-form"
npx shadcn@latest add "https://21st.dev/r/signup-wizard"
npx shadcn@latest add "https://21st.dev/r/stepper-component"

# Layout
npx shadcn@latest add "https://21st.dev/r/dashboard-sidebar"
npx shadcn@latest add "https://21st.dev/r/responsive-navbar"
npx shadcn@latest add "https://21st.dev/r/metric-card"
npx shadcn@latest add "https://21st.dev/r/stats-grid"

# User
npx shadcn@latest add "https://21st.dev/r/user-avatar"
npx shadcn@latest add "https://21st.dev/r/user-menu"
npx shadcn@latest add "https://21st.dev/r/team-switcher"

# Feedback
npx shadcn@latest add "https://21st.dev/r/toast-advanced"
npx shadcn@latest add "https://21st.dev/r/skeleton-loader"
npx shadcn@latest add "https://21st.dev/r/spinner"

# Modals
npx shadcn@latest add "https://21st.dev/r/drawer"
npx shadcn@latest add "https://21st.dev/r/confirmation-dialog"
```

#### Phase 2 (Week 3-6): Inventory Components (20)
```bash
# Data Display
npx shadcn@latest add "https://21st.dev/r/data-table-advanced"
npx shadcn@latest add "https://21st.dev/r/sortable-table"
npx shadcn@latest add "https://21st.dev/r/filterable-table"
npx shadcn@latest add "https://21st.dev/r/inventory-card"

# Forms
npx shadcn@latest add "https://21st.dev/r/multi-step-form"
npx shadcn@latest add "https://21st.dev/r/dynamic-form"
npx shadcn@latest add "https://21st.dev/r/conditional-fields"
npx shadcn@latest add "https://21st.dev/r/search-input"
npx shadcn@latest add "https://21st.dev/r/autocomplete"
npx shadcn@latest add "https://21st.dev/r/date-range-picker"
npx shadcn@latest add "https://21st.dev/r/dropzone"
npx shadcn@latest add "https://21st.dev/r/image-upload"

# Search & Filter
npx shadcn@latest add "https://21st.dev/r/global-search"
npx shadcn@latest add "https://21st.dev/r/faceted-search"
npx shadcn@latest add "https://21st.dev/r/filter-panel"

# Workflow
npx shadcn@latest add "https://21st.dev/r/floor-plan-viewer"
npx shadcn@latest add "https://21st.dev/r/image-annotator"
npx shadcn@latest add "https://21st.dev/r/sheet"
npx shadcn@latest add "https://21st.dev/r/command-palette"
npx shadcn@latest add "https://21st.dev/r/progress-indicator"
```

#### Phase 3 (Week 7-8): Calendar & Events (8)
```bash
# Calendar
npx shadcn@latest add "https://21st.dev/r/event-calendar"
npx shadcn@latest add "https://21st.dev/r/date-picker-range"
npx shadcn@latest add "https://21st.dev/r/timeline-view"
npx shadcn@latest add "https://21st.dev/r/time-picker"

# Workflow
npx shadcn@latest add "https://21st.dev/r/kanban-board"
npx shadcn@latest add "https://21st.dev/r/task-card"

# Forms
npx shadcn@latest add "https://21st.dev/r/rich-select"
npx shadcn@latest add "https://21st.dev/r/file-preview"
```

#### Phase 4 (Week 9-10): Analytics & Pricing (12)
```bash
# Charts
npx shadcn@latest add "https://21st.dev/r/bar-chart"
npx shadcn@latest add "https://21st.dev/r/line-chart"
npx shadcn@latest add "https://21st.dev/r/pie-chart"
npx shadcn@latest add "https://21st.dev/r/area-chart"
npx shadcn@latest add "https://21st.dev/r/heatmap"

# Pricing
npx shadcn@latest add "https://21st.dev/r/pricing-table"
npx shadcn@latest add "https://21st.dev/r/feature-comparison"
npx shadcn@latest add "https://21st.dev/r/subscription-card"

# Advanced UI
npx shadcn@latest add "https://21st.dev/r/trend-card"
npx shadcn@latest add "https://21st.dev/r/alert-banner"
npx shadcn@latest add "https://21st.dev/r/notification-center"
npx shadcn@latest add "https://21st.dev/r/role-badge"
```

#### Phase 5 (Week 11-12): Polish & Optimization (10)
```bash
# Advanced
npx shadcn@latest add "https://21st.dev/r/virtual-list"
npx shadcn@latest add "https://21st.dev/r/infinite-scroll-list"
npx shadcn@latest add "https://21st.dev/r/product-card"
npx shadcn@latest add "https://21st.dev/r/collapsible-sidebar"
npx shadcn@latest add "https://21st.dev/r/drag-drop-list"
npx shadcn@latest add "https://21st.dev/r/sparkline"
npx shadcn@latest add "https://21st.dev/r/progress-bar"
npx shadcn@latest add "https://21st.dev/r/gantt-chart"
```

---

## 🎯 Component Customization Strategy

### All 21st.dev components are fully customizable:

1. **Styling**: Tailwind CSS classes can be modified
2. **Behavior**: Component logic can be extended
3. **Variants**: Create new variants as needed
4. **Theming**: Support for light/dark modes

### Example Customization:
```tsx
// Original component
<Button>Click me</Button>

// Customized for our brand
<Button
  variant="primary"
  size="lg"
  className="bg-purple-600 hover:bg-purple-700"
>
  Click me
</Button>
```

---

## 💡 Best Practices

### 1. Component Organization
```
src/components/
├── ui/              # 21st.dev components (don't modify)
└── custom/          # Your custom components (extend ui/)
```

### 2. Import Pattern
```tsx
// ✅ Good: Import from central location
import { Button, Input } from '@/components/ui'

// ❌ Bad: Import from individual files
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
```

### 3. Composition Over Configuration
```tsx
// ✅ Good: Compose components
<Card>
  <CardHeader>
    <CardTitle>Inventory Item</CardTitle>
  </CardHeader>
  <CardContent>
    {/* content */}
  </CardContent>
</Card>

// ❌ Bad: Single mega component
<InventoryCard title="..." content="..." footer="..." />
```

---

## 📝 Notes

### Fallback Strategy
If any specific component from 21st.dev is not available:
1. Use base shadcn/ui component
2. Build custom component
3. Find alternative from 21st.dev community

### Version Control
- Lock component versions in `package.json`
- Document any modifications in `COMPONENTS.md`
- Keep original component code for reference

### Updates
- Check 21st.dev quarterly for new components
- Review community components for improvements
- Test updates in staging before production

---

**Component Selection Complete!** ✅

Ready to start building with these amazing components from 21st.dev!
