'use client'

import React from 'react'
import { useActionState } from 'react'
import { authenticate } from '@/lib/actions'
import { useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  )

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <form action={formAction} className="w-100" style={{ maxWidth: '400px' }}>
        <div className="rounded bg-white border border-light px-4 py-5 shadow">
          <h1 className="text-center mb-3 fw-bold text-purple fs-2">
            Aura Beauty
          </h1>
          <h2 className="text-center mb-4 fs-6 text-muted">
            Iniciá sesión para continuar
          </h2>

          {/* Campo Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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
            <label htmlFor="contrasena" className="form-label">
              Contraseña
            </label>
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
          <input type="hidden" name="redirectTo" value={callbackUrl} />
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
            <div
              className="alert alert-danger mt-3 d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-circle me-2"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Link de registro */}
          <div className="text-center mt-4">
            <small>
              ¿Aún no te registraste?{' '}
              <a
                href="/registro"
                className="text-decoration-underline text-primary"
              >
                Registrate
              </a>
            </small>
          </div>
        </div>
      </form>
    </div>
  )
}
