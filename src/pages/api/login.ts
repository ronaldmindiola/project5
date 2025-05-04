import type { APIRoute } from "astro";
import { login } from "@lib/auth/login";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect, cookies }) => {
  try {
    const { identifier, password } = await request.json();
    const data = await login(identifier, password);

    cookies.set("authToken", data.jwt, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 7,
    });

    return redirect("/dashboard");
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
    });
  }
};
