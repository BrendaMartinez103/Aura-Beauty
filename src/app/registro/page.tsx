'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistroForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & {
      nombre: HTMLInputElement;
      documento: HTMLInputElement;
      telefono: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    const nuevoCliente = {
      nombre: formElements.nombre.value,
      documento: formElements.documento.value,
      telefono: formElements.telefono.value,
      email: formElements.email.value,
      password: formElements.password.value,
    };

    setIsPending(true);

    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente),
      });

      if (!response.ok) throw new Error('No se pudo registrar el usuario');
      setSuccessMessage('Registro exitoso. Redirigiendo al login ...');
      setTimeout(() =>
      router.push('/login'),2000);
    } catch {
      setErrorMessage('Error al registrar. Verificá los datos.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4">
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '500px' }}>
        <div className="rounded bg-white border border-light px-4 py-5 shadow">
          <h1 className="text-center mb-4 fw-bold text-purple fs-2">Crear cuenta</h1>

          {/* Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input type="text" className="form-control" id="nombre" name="nombre" required />
          </div>

          {/* Documento */}
          <div className="mb-3">
            <label htmlFor="documento" className="form-label">Documento</label>
            <input type="text" className="form-control" id="documento" name="documento" required />
          </div>

          {/* Teléfono */}
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="tel" className="form-control" id="telefono" name="telefono" required />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" name="email" required />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" required />
          </div>

          {/* Botón */}
          <div className="d-grid mt-4">
            <button type="submit" className="btn btn-primary fw-bold" disabled={isPending}>
              {isPending ? 'Registrando...' : 'Registrarme'}
            </button>
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>
          )}
           {/* EXITO */}
           {successMessage && (
            <div className="alert alert-sucess mt-3 " role="alert">
              {successMessage}
            </div>
          )}

          <div className="text-center mt-3">
            <small>
              ¿Ya tenés cuenta?{' '}
              <a href="/login" className="text-decoration-underline text-primary">Iniciar sesión</a>
            </small>
          </div>
        </div>
      </form>
    </div>
  );
}
