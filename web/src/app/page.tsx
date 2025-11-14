"use client"

import { Features } from "@/components/ui/features-8";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";
import { PricingSection } from "@/components/ui/pricing-section";
import type { PricingTier } from "@/components/ui/pricing-card";
import { TestimonialStack, Testimonial } from "@/components/ui/glass-testimonial-swiper";
import { TextRevealByWord } from "@/components/ui/text-reveal";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { Users, Calendar, ThumbsUp, ShieldCheck, Clock, Share, Rocket, Zap, Gem, Menu, X, ArrowRight } from 'lucide-react';
import React from "react";

// Inline Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      default: "bg-black dark:bg-black text-white hover:bg-black dark:hover:bg-black hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-shadow",
      secondary: "bg-white dark:bg-black text-black dark:text-white hover:bg-white dark:hover:bg-black border-2 border-black dark:border-white hover:border-orange-500 dark:hover:border-orange-500",
      ghost: "hover:bg-white dark:hover:bg-black text-black dark:text-white",
      gradient: "bg-gradient-to-b from-black via-black to-black dark:from-black dark:via-black dark:to-black text-white hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(234,88,12,0.4)] hover:shadow-[0_0_40px_rgba(234,88,12,0.6)]"
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base"
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

// Navigation Component
const Navigation = React.memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white dark:border-black bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-[0_4px_20px_rgba(234,88,12,0.1)]">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-black dark:text-white">InventoryFlow</div>

          <div className="hidden md:flex items-center justify-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a href="#home" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              Home
            </a>
            <a href="#features" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-sm text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-500 transition-colors">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button type="button" variant="ghost" size="sm">
              Sign in
            </Button>
            <Button type="button" variant="default" size="sm">
              Sign Up
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden text-black dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-white dark:border-black animate-[slideDown_0.3s_ease-out]">
          <div className="px-6 py-4 flex flex-col gap-4">
            <a
              href="#home"
              className="text-sm text-black dark:text-black hover:text-black dark:hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#features"
              className="text-sm text-black dark:text-black hover:text-black dark:hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm text-black dark:text-black hover:text-black dark:hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-sm text-black dark:text-black hover:text-black dark:hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-white dark:border-black">
              <div className="flex justify-center py-2">
                <ThemeToggle />
              </div>
              <Button type="button" variant="ghost" size="sm">
                Sign in
              </Button>
              <Button type="button" variant="default" size="sm">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

Navigation.displayName = "Navigation";

// Hero Component
const HeroSection = React.memo(() => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-start px-6 py-20 md:py-24 bg-white dark:bg-black"
      style={{
        animation: "fadeIn 0.6s ease-out"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <aside className="mb-8 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full border border-white dark:border-black bg-white dark:bg-black backdrop-blur-sm max-w-full">
        <span className="text-xs text-center whitespace-nowrap text-black dark:text-black">
          🎉 New AI-powered features released!
        </span>
        <a
          href="#features"
          className="flex items-center gap-1 text-xs hover:text-black dark:hover:text-white transition-all active:scale-95 whitespace-nowrap text-black dark:text-black"
          aria-label="Read more about the new features"
        >
          Read more
          <ArrowRight size={12} />
        </a>
      </aside>

      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-medium text-center max-w-3xl px-6 leading-tight mb-6"
        style={{
          background: "linear-gradient(to bottom, #111827, #374151, rgba(107, 114, 128, 0.8))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.05em"
        }}
      >
        Smart Inventory Management for Modern Businesses
      </h1>

      <p className="text-sm md:text-base text-center max-w-2xl px-6 mb-10 text-black dark:text-black">
        Streamline your inventory operations with AI-powered insights, <br />real-time tracking, and automated workflows.
      </p>

      <div className="flex items-center gap-4 relative z-10 mb-16">
        <Button
          type="button"
          variant="gradient"
          size="lg"
          className="rounded-lg flex items-center justify-center"
          aria-label="Get started with InventoryFlow"
        >
          Get started
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="rounded-lg flex items-center justify-center"
          aria-label="Watch demo"
        >
          Watch Demo
        </Button>
      </div>

      <div className="w-full max-w-5xl relative pb-20">
        <div
          className="absolute left-1/2 w-[90%] pointer-events-none z-0"
          style={{
            top: "-23%",
            transform: "translateX(-50%)"
          }}
          aria-hidden="true"
        >
          <img
            src="https://i.postimg.cc/Ss6yShGy/glows.png"
            alt=""
            className="w-full h-auto opacity-60"
            loading="eager"
          />
        </div>

        <div className="relative z-10">
          <img
            src="https://i.postimg.cc/SKcdVTr1/Dashboard2.png"
            alt="Dashboard preview showing analytics and metrics interface"
            className="w-full h-auto rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_60px_rgba(234,88,12,0.2)] hover:shadow-[0_25px_80px_rgba(0,0,0,0.4),0_0_80px_rgba(234,88,12,0.3)] transition-shadow duration-500"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

// Pricing data - India-focused for Wedding Industry
const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for small vendors and individual decorators starting their wedding business",
    monthlyPrice: 2999,
    yearlyPrice: 28790,
    features: [
      "Up to 1,000 items",
      "Vendor-specific inventory types",
      "1 warehouse location",
      "3 team members",
      "Barcode/QR scanning",
      "Mobile app (Android & iOS)",
      "Email support",
      "GST-compliant billing"
    ],
    cta: "Start 14-Day Free Trial"
  },
  {
    name: "Professional",
    description: "For growing wedding businesses managing multiple events and warehouses",
    monthlyPrice: 7999,
    yearlyPrice: 76790,
    features: [
      "Up to 10,000 items",
      "All vendor categories (Electrical, Decor, Catering, etc.)",
      "3 warehouse locations",
      "10 team members",
      "Advanced barcode/QR scanning",
      "Check-out/Check-in workflow",
      "AI-powered suggestions",
      "Mobile apps with offline mode",
      "Priority support",
      "Custom reports & analytics",
      "WhatsApp notifications",
      "GST invoicing & reports"
    ],
    highlighted: true,
    cta: "Start 14-Day Free Trial"
  },
  {
    name: "Business",
    description: "Enterprise-grade solution for established wedding companies and multi-city operations",
    monthlyPrice: 14999,
    yearlyPrice: 143990,
    features: [
      "Unlimited items",
      "All vendor categories + custom types",
      "Unlimited warehouse locations",
      "25 team members",
      "Visual warehouse management",
      "Event-wise inventory allocation",
      "Advanced AI optimization",
      "White-label mobile apps",
      "Multi-location sync",
      "Dedicated account manager",
      "Phone & WhatsApp support",
      "Custom integrations",
      "Advanced GST compliance",
      "Vendor payment tracking",
      "Client billing integration"
    ],
    cta: "Start 14-Day Free Trial"
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large wedding corporations and franchise operations",
    monthlyPrice: 24999,
    yearlyPrice: 239990,
    features: [
      "Everything in Business, plus:",
      "Multi-tenant for franchise operations",
      "Unlimited users & locations",
      "On-premise deployment option",
      "24/7 premium support",
      "Dedicated success team",
      "Custom feature development",
      "API access for integrations",
      "Advanced analytics & BI",
      "Multi-currency support",
      "Custom workflows & automations",
      "SLA guarantees (99.9% uptime)",
      "Quarterly business reviews",
      "Priority feature requests"
    ],
    cta: "Contact Sales"
  }
];

// Testimonials data
const testimonialsData: Testimonial[] = [
  {
    id: 1,
    initials: 'SM',
    name: 'Sarah Mitchell',
    role: 'VP of Operations at TechFlow',
    quote: "InventoryFlow has completely transformed how we manage our warehouse. The real-time tracking and AI-powered analytics have reduced our inventory costs by 40%. Best investment we've made this year.",
    tags: [{ text: 'FEATURED', type: 'featured' }, { text: 'Enterprise', type: 'default' }],
    stats: [{ icon: Users, text: '200+ team' }, { icon: Calendar, text: '2 years customer' }],
    avatarGradient: 'linear-gradient(135deg, #5e6ad2, #8b5cf6)',
  },
  {
    id: 2,
    initials: 'MC',
    name: 'Marcus Chen',
    role: 'Supply Chain Manager at GlobalRetail',
    quote: "The automated reordering features are game-changing. Our stock-outs decreased by 85% and our team can focus on strategic decisions rather than manual inventory counts.",
    tags: [{ text: 'Retail', type: 'default' }, { text: 'Multi-location', type: 'default' }],
    stats: [{ icon: ThumbsUp, text: 'Helpful' }, { icon: ShieldCheck, text: 'Verified' }],
    avatarGradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    id: 3,
    initials: 'AR',
    name: 'Alex Rodriguez',
    role: 'CTO at StartupFlow',
    quote: "Incredible performance and the API integration was seamless. We scaled from 1,000 to 50,000 SKUs without any issues. The support team is responsive and the feature roadmap is exactly what we need.",
    tags: [{ text: 'Startup', type: 'default' }, { text: 'API User', type: 'default' }],
    stats: [{ icon: Clock, text: '6 months ago' }, { icon: Share, text: 'Shared 12 times' }],
    avatarGradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
  {
    id: 4,
    initials: 'EJ',
    name: 'Emily Johnson',
    role: 'Founder of EcoMart',
    quote: "As a growing e-commerce business, speed is everything. InventoryFlow allowed us to scale our operations 3x faster without adding headcount. The mobile app is perfect for on-the-go management.",
    tags: [{ text: 'E-commerce', type: 'default' }, { text: 'Growth', type: 'featured' }],
    stats: [{ icon: Rocket, text: 'Scaled 3x' }, { icon: Zap, text: 'Fast Setup' }],
    avatarGradient: 'linear-gradient(135deg, #ec4899, #d946ef)',
  },
  {
    id: 5,
    initials: 'DW',
    name: 'David Wong',
    role: 'Operations Director at ManufacturePro',
    quote: "The user interface is not just beautiful, it's incredibly intuitive. Our warehouse staff adopted it instantly with zero training. The barcode scanning and batch processing features save us hours daily.",
    tags: [{ text: 'Manufacturing', type: 'default' }],
    stats: [{ icon: Gem, text: 'Top UI/UX' }],
    avatarGradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  }
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />


      {/* Inventory Operations Workflow */}
      <section className="relative py-24 md:py-32 bg-white dark:bg-black">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header - Tighter spacing */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/50 dark:border-white0/30 bg-white/80 dark:bg-black/80 backdrop-blur-sm mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white0 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black dark:bg-white0"></span>
              </span>
              <span className="text-xs font-semibold text-black dark:text-black tracking-wide uppercase">Live Sync Active</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              <span className="text-black dark:text-white">Real-Time Inventory</span>
              <br />
              <span className="bg-gradient-to-r from-black via-white0 to-black dark:from-white0 dark:via-black dark:to-white0 bg-clip-text text-transparent">
                Operations at Scale
              </span>
            </h2>

            <p className="text-base md:text-lg text-black dark:text-black max-w-2xl mx-auto leading-relaxed">
              Sync inventory across warehouses, stores, and online platforms in milliseconds.
              Built for enterprise scale with 99.9% uptime.
            </p>
          </div>

          {/* Main Content Container - Better visual hierarchy */}
          <div className="max-w-6xl mx-auto">
            {/* Stats Bar - Integrated design */}
            <div className="bg-white dark:bg-black rounded-2xl border border-white/80 dark:border-black shadow-lg shadow-white0/5 dark:shadow-white0/10 p-6 mb-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center lg:border-r border-white/60 dark:border-black last:border-r-0">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-black to-black dark:from-white0 dark:to-black bg-clip-text text-transparent mb-1">
                    99.9%
                  </div>
                  <div className="text-sm text-black dark:text-black font-medium">Guaranteed Uptime</div>
                </div>
                <div className="text-center lg:border-r border-white/60 dark:border-black last:border-r-0">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-black to-black dark:from-white0 dark:to-black bg-clip-text text-transparent mb-1">
                    &lt;50ms
                  </div>
                  <div className="text-sm text-black dark:text-black font-medium">Sync Latency</div>
                </div>
                <div className="text-center lg:border-r border-white/60 dark:border-black last:border-r-0">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-white0 to-black dark:from-black dark:to-white0 bg-clip-text text-transparent mb-1">
                    10M+
                  </div>
                  <div className="text-sm text-black dark:text-black font-medium">Operations/Day</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-br from-black to-black dark:from-white0 dark:to-white0 bg-clip-text text-transparent mb-1">
                    ∞
                  </div>
                  <div className="text-sm text-black dark:text-black font-medium">Scale Capacity</div>
                </div>
              </div>
            </div>

            {/* Workflow Diagram - Larger and more prominent */}
            <div className="bg-white/50 dark:bg-black/50 rounded-3xl border border-white/80 dark:border-black p-8 md:p-12 mb-10">
              <div className="flex justify-center transform hover:scale-[1.02] transition-transform duration-300">
                <DatabaseWithRestApi
                  title="Automated inventory sync across all locations"
                  circleText="Inventory"
                  badgeTexts={{
                    first: "Stock",
                    second: "Add",
                    third: "Update",
                    fourth: "Remove"
                  }}
                  buttonTexts={{
                    first: "InventoryFlow",
                    second: "Live"
                  }}
                  lightColor="#ea580c"
                />
              </div>
            </div>

            {/* Feature Cards - Premium redesign */}
            <div className="grid md:grid-cols-3 gap-5">
              <div className="group relative bg-white dark:bg-black rounded-2xl border border-white/80 dark:border-black p-6 hover:shadow-lg hover:shadow-white0/10 dark:hover:shadow-white0/20 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-black/30 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-br from-white0 to-black dark:from-black dark:to-black rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-white0/30">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Lightning Fast</h3>
                  <p className="text-sm text-black dark:text-black leading-relaxed">
                    Sub-50ms sync speed ensures your inventory is always up-to-date across all channels
                  </p>
                </div>
              </div>

              <div className="group relative bg-white dark:bg-black rounded-2xl border border-white/80 dark:border-black p-6 hover:shadow-lg hover:shadow-white0/10 dark:hover:shadow-white0/20 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-black/30 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-br from-white0 to-black dark:from-black dark:to-black rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-white0/30">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">Bank-Level Security</h3>
                  <p className="text-sm text-black dark:text-black leading-relaxed">
                    Enterprise-grade encryption with automated backups and instant failover protection
                  </p>
                </div>
              </div>

              <div className="group relative bg-white dark:bg-black rounded-2xl border border-white/80 dark:border-black p-6 hover:shadow-lg hover:shadow-white0/10 dark:hover:shadow-white0/20 transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-black/30 dark:to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-11 h-11 bg-gradient-to-br from-black to-black dark:from-black dark:to-black rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-white0/30">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-2">AI-Powered Insights</h3>
                  <p className="text-sm text-black dark:text-black leading-relaxed">
                    Predictive analytics optimize stock levels and reduce waste by up to 40%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Text Reveal Section */}
      <section className="bg-gradient-to-b from-white to-white dark:from-black dark:to-black">
        <TextRevealByWord text="Transform your inventory management with intelligent automation and real-time insights that drive efficiency and growth." />
      </section>

      {/* Additional Features */}
      <section className="bg-gradient-to-b from-white to-white dark:from-black dark:to-black">
        <Features />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white dark:bg-black">
        <PricingSection
          title="Pricing Built for Indian Wedding Businesses"
          subtitle="Start with a 14-day free trial. No credit card required. Cancel anytime."
          tiers={pricingTiers}
          frequencies={["Monthly", "Yearly"]}
        />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 dark:bg-white0/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/20 dark:bg-white0/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black dark:text-white">Loved by Teams Worldwide</h2>
            <p className="text-lg text-black dark:text-black max-w-2xl mx-auto">
              Join thousands of businesses that trust InventoryFlow for their inventory management
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <TestimonialStack testimonials={testimonialsData} visibleBehind={2} />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-white0 to-black dark:from-black dark:via-black dark:to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Inventory?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your free 14-day trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button type="button" size="lg" variant="secondary" className="rounded-lg px-8 bg-white text-black hover:bg-white hover:text-black">
              Get Started Free
            </Button>
            <Button type="button" size="lg" variant="ghost" className="rounded-lg px-8 border-2 border-white text-white hover:bg-white/20">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section id="contact">
        <StackedCircularFooter />
      </section>
    </main>
  );
}
