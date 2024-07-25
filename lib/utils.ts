import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEV: string | undefined = process.env.EXPO_PUBLIC_DEVELOPMENT_BACKEND_URL;
const PROD: string | undefined = process.env.EXPO_PUBLIC_PRODUCTION_BACKEND_URL; 

export const API_URL: string | undefined = DEV;