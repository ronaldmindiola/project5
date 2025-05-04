// hooks/useLoginForm.ts
import { useState } from "react";
import { login } from "@utils/auth";

export function useLoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Error al iniciar sesión");
        return;
      }

      const response = await login(email, password);
      if (response) {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      console.error("Error en el login", err);
      setError(err.message || "Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleSubmit };
}
