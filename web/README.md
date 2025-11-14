# InventoryFlow Web Application

Smart inventory management SaaS for event, production, and rental businesses.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **UI Components**: shadcn/ui (21st.dev components)
- **State Management**: React Query + Zustand
- **Forms**: React Hook Form + Zod
- **Database**: Prisma + PostgreSQL
- **Authentication**: NextAuth.js v5
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
web/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── custom/      # Custom components
│   ├── lib/             # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript types
├── public/              # Static assets
└── prisma/              # Database schema (coming soon)
```

## Development Progress

- [x] Next.js 16 setup with TypeScript
- [x] Tailwind CSS 4.1 configuration
- [x] Basic project structure
- [ ] shadcn/ui component installation
- [ ] Prisma database setup
- [ ] Authentication pages
- [ ] Dashboard layout
- [ ] Inventory management UI

## Features (Planned)

### Phase 1: Core Inventory
- Track inventory across warehouses
- Barcode/QR scanning
- Check-out/check-in workflow
- Real-time availability

### Phase 2: Vendor Management
- Vendor-specific inventory types (6 types)
- Dynamic forms for different equipment
- Maintenance tracking
- Location management

### Phase 3: Analytics & AI
- Usage analytics
- AI-powered suggestions
- Predictive maintenance
- Optimization recommendations

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [21st.dev Components](https://21st.dev)

## License

MIT
