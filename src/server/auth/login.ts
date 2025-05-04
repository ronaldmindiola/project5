// src/server/auth/login.ts
export async function loginToStrapi(identifier: string, password: string) {
	try {
		const response = await fetch("http://localhost:1337/api/auth/local", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ identifier, password }),
		});

		if (!response.ok) {
			const error = await response.json();
			throw new Error(error?.error?.message || "Login failed");
		}

		return await response.json();
	} catch (error) {
		console.error("Login error:", error);
		throw new Error("Unable to connect to Strapi");
	}
}
