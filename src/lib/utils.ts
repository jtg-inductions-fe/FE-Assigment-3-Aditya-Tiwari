import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using `clsx` and merges Tailwind classes with `tailwind-merge`.
 *
 * @param inputs - Class names as strings, arrays, or objects.
 * @returns Merged class string.
 */
const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export { cn };
