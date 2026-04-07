import { useState } from "react";

export default function Login({ onLogin, users }) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    const formData = new FormData(e.target);
    const usernameInput = formData.get("username")?.trim().toLowerCase();
    const passwordInput = formData.get("password")?.trim();

    // Buscar el usuario en la lista cargada
    const user = users.find(
      (u) =>
        u.User?.toLowerCase() === usernameInput && u.Password === passwordInput,
    );

    if (user) {
      onLogin(user); // Pasar el usuario autenticado al componente padre
    } else {
      setError(
        "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.",
      );
    }
  };

  return (
    <main className="grow flex items-center justify-center px-6 py-12 relative overflow-hidden min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl p-6 xs:p-8 md:p-12 shadow-[0_24px_40px_rgba(10,25,49,0.05)] z-10 transition-all duration-300">
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary-container rounded-xl flex items-center justify-center mb-4 md:mb-6">
            <span className="material-symbols-outlined text-white text-2xl md:text-3xl" aria-hidden="true">
              payments
            </span>
          </div>
          <h1 className="font-headline font-bold text-2xl md:text-3xl tracking-tight text-primary">
            Iniciar Sesión
          </h1>
          <p className="text-on-surface-variant text-xs md:text-sm mt-2 font-medium">
            Control de Mensualidades
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Message */}
          {error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <span className="material-symbols-outlined text-error" aria-hidden="true">
                error
              </span>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Username Field */}
          <div className="relative">
            <label
              className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1"
              htmlFor="username"
            >
              Nombre de usuario
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-0 text-outline text-lg" aria-hidden="true">
                person
              </span>
              <input
                className="bg-ghost-border border-b border-t-0 border-l-0 border-r-0 focus:border-b-secondary focus:bg-surface-container-low/50 focus:ring-0 w-full py-3 pl-8 bg-transparent text-on-surface placeholder:text-outline-variant/60 outline-none transition-all"
                id="username"
                name="username"
                placeholder="Introduce tu usuario"
                required
                type="text"
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              className="block text-[11px] font-bold uppercase tracking-wider text-secondary mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-0 text-outline text-lg" aria-hidden="true">
                lock
              </span>
              <input
                className="bg-ghost-border border-b border-t-0 border-l-0 border-r-0 focus:border-b-secondary focus:bg-surface-container-low/50 focus:ring-0 w-full py-3 pl-8 pr-10 bg-transparent text-on-surface placeholder:text-outline-variant/60 outline-none transition-all"
                id="password"
                name="password"
                placeholder="••••••••"
                required
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 text-outline hover:text-secondary transition-colors focus:outline-none"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Ver contraseña"
                }
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              className="w-full py-4 bg-primary text-white font-headline font-bold rounded-xl shadow-[0_8px_20px_rgba(10,25,49,0.15)] hover:opacity-90 transition-all duration-300 active:scale-[0.98]"
              type="submit"
            >
              Ingresar
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex items-center justify-between pt-6">
            <a
              className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline underline-offset-4 decoration-1"
              href="mailto:tomytool@gmail.com?subject=Recuperación de Contraseña - Sistema de Cuotas"
            >
              ¿Olvidaste tu clave?
            </a>
            {/* <a
              className="text-xs font-bold text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
              href="#"
            >
              Ayuda
            </a> */}
          </div>
        </form>
      </div>

      {/* Decorative Branding Spotlight */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline opacity-40">
          Premium Quota System © 2026
        </span>
      </div>

      {/* Background Image with Editorial Feel */}
      <div className="hidden lg:block fixed top-0 right-0 w-[30%] h-full bg-surface-container-low overflow-hidden -z-10">
        <img
          alt="Minimal architectural detail"
          className="w-full h-full object-cover mix-blend-soft-light opacity-30 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7WN4nnG-QVbl_3I1PR8w6cW8lM-QfY8G2We49IzOLXfBsV1ispxfEYND5kOS--TErfsyAlttTLE2Ef8i76ija1tC-tJ-5gp_m92DSPn8FPst0IN61RenNygw0qN3g0JEU67xJ5GRDIzimmiALOiehDTUYQxjdLr3r-SCWHj7bhvsTQh3qviYmEPvEslLEo46AV1PG9mCNIZL-a8nX_dj67tXadE9Ha-1bxr2bqHHXgvRuvpA5TiZCNX2YQINbv-fXDUSFXrXuq2sO"
        />
      </div>
    </main>
  );
}
