import type { APIRoute } from "astro";
import { logout } from "@api/auth/logout";

export const prerender = false;

export const POST: APIRoute = async ({ cookies, redirect }) => {
	logout(cookies);
	return redirect("/login");
};
