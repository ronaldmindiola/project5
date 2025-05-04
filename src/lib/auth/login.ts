import type { LoginResponse } from "./types";

export async function login(identifier: string, password: string): Promise<LoginResponse> {
  const res = await fetch("http://localhost:1337/api/auth/local", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  const data = await res.json();
  return data;
}
