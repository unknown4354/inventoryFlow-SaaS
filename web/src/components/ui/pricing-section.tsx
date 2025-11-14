"use client"

import * as React from "react"
import { PricingCard, type PricingTier } from "@/components/ui/pricing-card"
import { Tab } from "@/components/ui/pricing-tab"

interface PricingSectionProps {
  title: string
  subtitle: string
  tiers: PricingTier[]
  frequencies: string[]
}

export function PricingSection({
  title,
  subtitle,
  tiers,
  frequencies,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = React.useState(frequencies[0])

  return (
    <section className="flex flex-col items-center gap-10 py-20 lg:py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-6">
        <div className="space-y-7 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-medium md:text-5xl text-black dark:text-white">{title}</h1>
            <p className="text-muted-foreground text-black dark:text-black max-w-2xl mx-auto">{subtitle}</p>
          </div>
          <div className="mx-auto flex w-fit rounded-full bg-muted dark:bg-black p-1">
            {frequencies.map((freq) => (
              <Tab
                key={freq}
                text={freq}
                selected={selectedFrequency === freq}
                setSelected={setSelectedFrequency}
                discount={freq === "Yearly"}
              />
            ))}
          </div>
        </div>

        <div className="grid w-full max-w-6xl mx-auto gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-12">
          {tiers.map((tier) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              paymentFrequency={selectedFrequency}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
