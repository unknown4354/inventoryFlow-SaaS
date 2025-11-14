"use client"

import Component from "@/components/ui/saa-s-template";
import { Features } from "@/components/ui/features-8";
import { PricingSection } from "@/components/ui/pricing-section";
import type { PricingTier } from "@/components/ui/pricing-card";
import { StackedCircularFooter } from "@/components/ui/stacked-circular-footer";

// Pricing tiers for demo
const demoTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for small businesses",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: ["Up to 500 products", "Basic tracking", "Email support"],
    cta: "Start Free Trial"
  },
  {
    name: "Professional",
    description: "For growing businesses",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: ["Up to 5,000 products", "Advanced analytics", "Priority support"],
    highlighted: true,
    cta: "Start Free Trial"
  },
  {
    name: "Business",
    description: "Advanced features",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    features: ["Up to 25,000 products", "Custom reporting", "Dedicated manager"],
    cta: "Start Free Trial"
  },
  {
    name: "Enterprise",
    description: "Unlimited scale",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: ["Unlimited products", "AI insights", "24/7 support"],
    cta: "Contact Sales"
  }
];

export default function DemoPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Navigation */}
      <section id="hero">
        <Component />
      </section>

      {/* Additional Features */}
      <section id="features">
        <Features />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white dark:bg-black">
        <PricingSection
          title="Simple, Transparent Pricing"
          subtitle="Choose the perfect plan for your business"
          tiers={demoTiers}
          frequencies={["Monthly", "Yearly"]}
        />
      </section>

      {/* Footer */}
      <section id="footer">
        <StackedCircularFooter />
      </section>
    </main>
  );
}
