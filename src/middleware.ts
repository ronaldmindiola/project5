// src/middleware.ts
import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, url, redirect } = context;

  const isLoginPage = url.pathname === "/login";
  const token = getTokenFromCookie(request.headers.get("cookie"));

  // Si no hay token y no estamos en la página de login, redirigir a login
  if (!token && !isLoginPage) {
    // return redirect("/login");
  }

  // Si hay token, validarlo con Strapi
  if (token) {
    const isValid = await verifyTokenWithStrapi(token);

    if (!isValid && !isLoginPage) {
      return redirect("/login");
    }
  }

  return next();
});

// Función para obtener el token desde las cookies
function getTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/authToken=([^;]+)/);
  return match ? match[1] : null;
}

// Función para verificar el token con Strapi
async function verifyTokenWithStrapi(token: string): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:1337/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Error de validación con Strapi", res.status);
      return false;
    }

    const data = await res.json();
    // Si Strapi responde correctamente, el token es válido
    return !!data;
  } catch (error) {
    console.error("Error al verificar el token", error);
    return false;
  }
}
 