import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getTimestamp = (createdAt: Date): string => {
  const seconds = Math.floor(
    (new Date().getTime() - createdAt.getTime()) / 1000
  );

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} year${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} month${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} day${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} hour${interval > 1 ? "s" : ""} ago`;
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} minute${interval > 1 ? "s" : ""} ago`;
  }

  return `${Math.floor(seconds)} second${seconds > 1 ? "s" : ""} ago`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    const millions = num / 1000000;
    return `${millions.toFixed(1)}M`;
  } else if (num >= 1000) {
    const thousands = num / 1000;
    return `${thousands.toFixed(1)}K`;
  } else {
    return num.toString();
  }
};
