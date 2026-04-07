import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencySymbol(currency: string): string {
  const symbols: Record<string, string> = {
    CRC: "₡",
    USD: "$",
    EUR: "€",
    GBP: "£",
    MXN: "$MX",
  };
  return symbols[currency] ?? "₡";
}
