// Auth.ts
// Authentication utilities for Astro

import { login as apiLogin, type AuthResponse, type User } from "./apiClient";

// Save auth data to localStorage
export function saveAuthData(authData: AuthResponse): void {
	console.log("Saving auth data", authData);
	
	if (typeof localStorage !== "undefined") {
		localStorage.setItem("token", authData.jwt);
		localStorage.setItem("user", JSON.stringify(authData.user));
		// Opcional: Guardar timestamp de login
		localStorage.setItem("login_at", Date.now().toString());
	}
}

// Get current user from localStorage
export function getStoredUser(): User | null {
	console.log("Getting stored user");
	if (typeof localStorage !== "undefined") {
		const userJson = localStorage.getItem("user");
		if (userJson) {
			try {
				return JSON.parse(userJson) as User;
			} catch (e) {
				console.error("Error parsing user data", e);
			}
		}
	}
	return null;
}

// Check if user is logged in
export function isLoggedIn(): boolean {
	console.log("Checking if user is logged in");
	if (typeof localStorage !== "undefined") {
		const token = localStorage.getItem("token");
		const loginAt = localStorage.getItem("login_at");
		const sessionDuration = 1000 * 60 * 60 * 4; // 4 horas

		if (token && loginAt) {
			const isExpired = Date.now() - parseInt(loginAt) > sessionDuration;
			if (isExpired) logout(); // logout automático
			return !isExpired;
		}

		return !!token;
	}
	return false;
}

// Logout user
export function logout(): void {
	console.log("Logging out user");
	if (typeof localStorage !== "undefined") {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		localStorage.removeItem("login_at");
		location.replace("/"); // mejor que window.location.href
	}
}

// Login and save data
export async function login(
	identifier: string,
	password: string,
): Promise<AuthResponse> {
	console.log("Logging in user", identifier);
	try {
		const response = await apiLogin(identifier, password);
		saveAuthData(response);
		return response;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Error al iniciar sesión");
	}
}

// Get token
export function getToken(): string | null {
	console.log("Getting token");
	if (typeof localStorage !== "undefined") {
		return localStorage.getItem("token");
	}
	return null;
}

// Get user ID
export function getUserRole(): string | null {
	console.log("Getting user role");
	const user = getStoredUser();
	return user?.role?.name ?? null;
}