import type { APIRoute } from "astro";
import { getUserFromToken } from "@lib/auth/get-user";

export const GET: APIRoute = async ({ cookies }) => {
  const token = cookies.get("authToken")?.value;

  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  try {
    const user = await getUserFromToken(token);
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }
};
