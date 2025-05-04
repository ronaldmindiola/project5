// Utility functions to connect with Strapi
const jwt = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;

const defaultHeaders: HeadersInit = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${jwt || import.meta.env.STRAPI_API_TOKEN || ""}`,
};

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

// Get the Strapi URL based on environment
export function getStrapiURL(path = "") {
	return `${import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337"}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI<T>(path: string, options = {}): Promise<T> {
	const defaultOptions = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${import.meta.env.STRAPI_API_TOKEN || ""}`,
		},
	};

	const mergedOptions = {
		...defaultOptions,
		...options,
	};

	const requestUrl = getStrapiURL(path);
	const response = await fetch(requestUrl, mergedOptions);

	if (!response.ok) {
		throw new Error(`Error fetching from Strapi: ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

