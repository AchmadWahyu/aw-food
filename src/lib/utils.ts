import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatIDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export const FLAVOUR_TEXT: Record<string, string> = {
  salted: 'Gorengan',
  fried: 'Gorengan',
  sweet: 'Manis',
};

/**
 * Returns the CSS background-position-x percentage for the fallback
 * sprite based on the snack's tag. The sprite has 3 frames:
 *   0% = fried snack, 50% = donut (sweet), 100% = snack box (default)
 */
export function getFallbackSpritePosition(
  tag?: string
): string {
  if (tag === 'fried' || tag === 'salted') return '0%';
  if (tag === 'sweet') return '50%';
  return '100%';
}
