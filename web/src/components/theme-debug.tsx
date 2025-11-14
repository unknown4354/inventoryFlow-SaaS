"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [htmlClass, setHtmlClass] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const updateClass = () => {
      setHtmlClass(document.documentElement.className)
    }
    updateClass()
    const observer = new MutationObserver(updateClass)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-black border-2 border-white0 p-4 rounded-lg shadow-lg z-50 text-xs max-w-xs">
      <div className="font-bold mb-2 text-black">Theme Debug</div>
      <div className="space-y-1 mb-2">
        <div>Theme: <span className="font-mono">{theme}</span></div>
        <div>Resolved: <span className="font-mono">{resolvedTheme}</span></div>
        <div>HTML class: <span className="font-mono break-all">{htmlClass || '(empty)'}</span></div>
        <div>LocalStorage: <span className="font-mono">{typeof window !== 'undefined' ? localStorage.getItem('inventoryflow-theme') || 'null' : 'N/A'}</span></div>
      </div>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => {
            console.log('Setting to light')
            setTheme('light')
          }}
          className="px-2 py-1 bg-white rounded hover:bg-white"
        >
          Light
        </button>
        <button
          onClick={() => {
            console.log('Setting to dark')
            setTheme('dark')
          }}
          className="px-2 py-1 bg-black text-white rounded hover:bg-black"
        >
          Dark
        </button>
      </div>
      <div className="mt-2 text-[10px] opacity-60">
        This box should change color when you toggle
      </div>
    </div>
  )
}
