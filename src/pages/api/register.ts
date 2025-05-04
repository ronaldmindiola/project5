import type { APIRoute } from "astro";
import { register } from "@api/auth/register";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
	const { username, email, password } = await request.json();

	try {
		const data = await register(username, email, password);
		cookies.set("authToken", data.jwt, {
			httpOnly: true,
			path: "/",
			sameSite: "strict",
			secure: import.meta.env.PROD,
			maxAge: 60 * 60 * 24 * 7,
		});
		return redirect("/dashboard");
	} catch {
		return new Response(JSON.stringify({ error: "Registration failed" }), {
			status: 400,
		});
	}
};
