"use client";

import { useState, useCallback } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  }, [email]);

  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Mantente Actualizado</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Suscríbete a nuestro boletín y recibe las últimas noticias, lanzamientos y ofertas exclusivas.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
            aria-label="Introduce tu correo electrónico para suscribirte"
          />
          <button
            type="submit"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!email.trim() || status === "loading"}
          >
            {status === "loading" ? "Enviando..." : "Suscribirse"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-300 text-sm" aria-live="polite">
            ¡Te has suscrito con éxito!
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-300 text-sm" aria-live="polite">
            Ocurrió un error. Inténtalo nuevamente.
          </p>
        )}
      </div>
    </section>
  );
}
