'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      email: HTMLInputElement;
      contrasena: HTMLInputElement;
    };

    const email = formElements.email.value;
    const contrasena = formElements.contrasena.value;

    setIsPending(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: contrasena }),
      });

      if (!res.ok) {
        const error = await res.json();
        setErrorMessage(error.error || 'Credenciales inválidas');
      } else {
        setErrorMessage(null);
        router.push('/');
      }
    } catch (error) {
      setErrorMessage('Error del servidor');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
        <div className="rounded bg-white border border-light px-4 py-5 shadow">
          <h1 className="text-center mb-3 fw-bold text-purple fs-2">Aura Beauty</h1>
          <h2 className="text-center mb-4 fs-6 text-muted">
            Iniciá sesión para continuar
          </h2>

          {/* Campo Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="mb-3">
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                id="contrasena"
                name="contrasena"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Botón login */}
          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-primary fw-bold"
              disabled={isPending}
            >
              {isPending ? 'Cargando...' : 'Iniciar sesión'}
            </button>
          </div>

          {/* Mensaje de error */}
          {errorMessage && (
            <div className="alert alert-danger mt-3 d-flex align-items-center" role="alert">
              <i className="bi bi-exclamation-circle me-2"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Link de registro */}
          <div className="text-center mt-4">
            <small>
              ¿Aún no te registraste?{' '}
              <a href="/registro" className="text-decoration-underline text-primary">
                Registrate
              </a>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
}
