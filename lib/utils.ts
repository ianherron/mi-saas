import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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
