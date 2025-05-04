import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const API_URL = import.meta.env.PUBLIC_STRAPI_API_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format the date to a string
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'short', day: 'numeric'
  };
  return new Date(date).toLocaleDateString(undefined, options);
}

// Obtener el nombre del día de la semana
export function getDayName(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return new Date(date).toLocaleDateString(undefined, options);
}

// Capitalize the first letter of a string
export const capitalize = (str: string): string => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

// Capitalize the first letter
export function capitalize1(str:string): string {
  if ( typeof str !== 'string' || str.length === 0 ) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 
// Función para realizar login y obtener el token
export const login = async (identifier: string, password: string) => {
	try {
		const response = await fetch(`${API_URL}/auth/local`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ identifier, password }),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const data = await response.json();
		return data.jwt;
	} catch (error) {
		console.error("Login error:", error);
		throw error;
	}
};

// Función para hacer peticiones autenticadas
export const fetchWithAuth = async (endpoint: string, token: string) => {
	try {
		const response = await fetch(`${API_URL}${endpoint}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};