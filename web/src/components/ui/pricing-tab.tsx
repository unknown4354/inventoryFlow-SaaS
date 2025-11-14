"use client"

import * as React from "react"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (text: string) => void
  discount?: boolean
}

export function Tab({ text, selected, setSelected, discount }: TabProps) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`relative rounded-full px-6 py-2 text-sm font-medium transition-colors ${
        selected
          ? "text-white"
          : "text-black hover:text-black dark:text-black dark:hover:text-white"
      }`}
    >
      {selected && (
        <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-black to-black dark:from-white0 dark:to-white0" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {text}
        {discount && (
          <span className="rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
            Save 20%
          </span>
        )}
      </span>
    </button>
  )
}
