import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(
  err: unknown,
  fallback = "Something went wrong.",
): string {
  if (err instanceof Error) return err.message;
  return fallback;
}

export const logger = ({
  message,
  title = "LOGGER",
  data,
  type = "log",
}: {
  message?: string;
  title?: string;
  data?: unknown;
  type?: "log" | "warn" | "error" | "info";
}) => {
  if (process.env.NEXT_PUBLIC_ENVIRONMENT) return;
  const time = new Date().toLocaleTimeString();
  console[type](`[${type.toUpperCase()}] ${title.toUpperCase()} - ${time}`);
  if (message) {
    console[type](message);
  }
  if (data !== undefined) {
    console[type](data);
  }
};