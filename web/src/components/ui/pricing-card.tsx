"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface PricingTier {
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  highlighted?: boolean
  cta: string
}

interface PricingCardProps {
  tier: PricingTier
  paymentFrequency: string
}

export function PricingCard({ tier, paymentFrequency }: PricingCardProps) {
  const isYearly = paymentFrequency.toLowerCase() === "yearly"
  const price = isYearly ? tier.yearlyPrice : tier.monthlyPrice
  const monthlyEquivalent = isYearly ? tier.yearlyPrice / 12 : tier.monthlyPrice

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:scale-[1.02] ${
        tier.highlighted
          ? "border-orange-500 bg-white dark:bg-black shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:shadow-[0_0_40px_rgba(234,88,12,0.5)]"
          : "border-black dark:border-white bg-white dark:bg-black hover:shadow-[0_0_20px_rgba(234,88,12,0.15)] hover:border-orange-500"
      }`}
    >
      {tier.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-black to-black px-4 py-1 text-xs font-semibold text-white shadow-[0_0_20px_rgba(234,88,12,0.6)]">
            MOST POPULAR
          </span>
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          {tier.name}
        </h3>
        <p className="mt-2 text-sm text-black dark:text-black">
          {tier.description}
        </p>

        <div className="mt-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-black dark:text-white">
              ₹{monthlyEquivalent.toFixed(0)}
            </span>
            <span className="text-sm text-black dark:text-black">
              /month
            </span>
          </div>
          {isYearly && (
            <p className="mt-1 text-sm text-black dark:text-black">
              Billed ₹{price.toLocaleString('en-IN')}/year
            </p>
          )}
        </div>

        <ul className="mt-8 space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 shrink-0 text-black dark:text-white0" />
              <span className="text-sm text-black dark:text-white">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className={`mt-8 w-full ${
          tier.highlighted
            ? "bg-gradient-to-r from-black to-black hover:from-black hover:to-black text-white shadow-md"
            : "border-white0 text-black hover:bg-white dark:border-black dark:text-white0 dark:hover:bg-black"
        }`}
        variant={tier.highlighted ? "default" : "outline"}
      >
        {tier.cta}
      </Button>
    </div>
  )
}
