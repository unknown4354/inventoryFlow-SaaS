import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 * Used throughout the app for conditional class application
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
