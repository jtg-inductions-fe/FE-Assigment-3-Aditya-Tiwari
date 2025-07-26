import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names conditionally and intelligently merges Tailwind CSS classes.
 *
 * This utility uses `clsx` to conditionally join class names and `tailwind-merge` to resolve conflicts
 * in Tailwind classes (e.g., `p-2` vs `p-4`).
 *
 * @param inputs - A list of class values that can be strings, arrays, objects, etc., as supported by `clsx`.
 * @returns A single string of merged class names with Tailwind conflict resolution.
 *
 * @example
 * ```ts
 * cn("p-2", isActive && "bg-blue-500", "p-4"); // => "bg-blue-500 p-4"
 * ```
 */
const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export { cn };
