"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-white dark:bg-black animate-pulse" />
    )
  }

  const currentTheme = resolvedTheme || theme

  return (
    <motion.button
      onClick={() => {
        const newTheme = currentTheme === "dark" ? "light" : "dark"
        console.log('Current theme:', currentTheme, 'Setting to:', newTheme)
        setTheme(newTheme)

        // Manually toggle the class as a fallback
        if (typeof document !== 'undefined') {
          // Remove both classes first to ensure clean state
          document.documentElement.classList.remove('light', 'dark')
          // Then add only the new theme class
          if (newTheme === 'dark') {
            document.documentElement.classList.add('dark')
          }
          console.log('HTML classes after manual toggle:', document.documentElement.className)
        }
      }}
      className="relative w-14 h-14 rounded-full flex items-center justify-center bg-white dark:bg-black border-2 border-white dark:border-black hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-300 group overflow-hidden shadow-sm"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label="Toggle theme"
    >
      {/* Sun icon (light mode) */}
      <motion.div
        initial={false}
        animate={{
          scale: currentTheme === "dark" ? 0 : 1,
          rotate: currentTheme === "dark" ? 180 : 0,
          opacity: currentTheme === "dark" ? 0 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-black" />
      </motion.div>

      {/* Moon icon (dark mode) */}
      <motion.div
        initial={false}
        animate={{
          scale: currentTheme === "dark" ? 1 : 0,
          rotate: currentTheme === "dark" ? 0 : -180,
          opacity: currentTheme === "dark" ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-white" />
      </motion.div>

      {/* Ripple effect on click - orange accent */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'rgba(234, 88, 12, 0.3)' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  )
}
