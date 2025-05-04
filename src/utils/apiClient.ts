// Utility for making API requests to Strapi

// Get the Strapi URL based on environment
export const getApiUrl = (path = "") => {
	const baseUrl = import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
	console.log("baseUrl",baseUrl);
	
	return `${baseUrl}${path}`;
};

// Types for roles
export interface Role {
	id: number;
	name: string;
	type: string;
	description?: string;
}

// Types for authentication
export interface User {
	id: number;
	username: string;
	email: string;
	confirmed: boolean;
	blocked: boolean;
	role: Role;
}

export interface AuthResponse {
	jwt: string;
	user: User;
}

// Helper to make authenticated requests to Strapi
export async function fetchData<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const url = getApiUrl(endpoint);

	// Get token from localStorage if available
	const token =
		typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

	const headers: HeadersInit = {
		"Content-Type": "application/json",
		...options.headers,
	};

	// Add authorization header if token exists
	if (token) {
		(headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
	}

	const response = await fetch(url, {
		...options,
		headers,
	});

	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ message: "An error occurred" }));
		throw new Error(
			error.message || `Error ${response.status}: ${response.statusText}`,
		);
	}

	return (await response.json()) as T;
}

// Authentication functions
export async function login(
	identifier: string,
	password: string,
): Promise<AuthResponse> {
	return fetchData<AuthResponse>("/api/auth/local", {
		method: "POST",
		body: JSON.stringify({ identifier, password }),
	});
}

export async function register(
	username: string,
	email: string,
	password: string,
): Promise<AuthResponse> {
	return fetchData<AuthResponse>("/api/auth/local/register", {
		method: "POST",
		body: JSON.stringify({ username, email, password }),
	});
}

export async function getCurrentUser(): Promise<User | null> {
	try {
		return await fetchData<User>("/api/users/me");
	} catch (error) {
		return null;
	}
}

// Content type interfaces (customize based on your Strapi models)
export interface StrapiResponse<T> {
	data: Array<{
		id: number;
		attributes: T;
	}>;
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export interface StrapiSingleResponse<T> {
	data: {
		id: number;
		attributes: T;
	};
	meta: {};
}

// Example content type
export interface Post {
	title: string;
	content: string;
	slug: string;
	publishedAt: string;
	// Add other fields from your Strapi model
}

// Content fetching functions
export async function getPosts(params = {}): Promise<StrapiResponse<Post>> {
	const queryParams = new URLSearchParams(params as Record<string, string>);
	return fetchData<StrapiResponse<Post>>(`/api/posts?${queryParams}`);
}

export async function getPost(
	slug: string,
): Promise<StrapiSingleResponse<Post>> {
	return fetchData<StrapiSingleResponse<Post>>(
		`/api/posts?filters[slug][$eq]=${slug}&populate=*`,
	);
}
