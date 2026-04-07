import { useState, useEffect } from "react";
import { fetchAndParseCSV } from "../utils/csvFetcher";

const FEES_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT3gW4N4WWsDZdaZe-7uaSYn0JTCw5Hpu0qWxGHYSFZHG5nw9KuZEHvfrsh-yws6eESXnvXcKF8Mb9E/pub?gid=0&single=true&output=csv";

export default function Dashboard({ onLogout, user }) {
  const [cuotas, setCuotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAcumulado, setTotalAcumulado] = useState(0);
  const [totalActividades, setTotalActividades] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const loadFees = async () => {
      setLoading(true);
      const data = await fetchAndParseCSV(FEES_CSV_URL);

      if (data && user) {
        // Encontrar la fila del usuario actual por ID o Nombre Alumno
        const userRow = data.find(
          (row) =>
            row.ID === user.ID ||
            row["Nombre Alumno"]?.trim().toLowerCase() ===
              user["Nombre "]?.trim().toLowerCase(),
        );

        if (userRow) {
          // Procesar valor de Actividades
          const actividadesVal = userRow["Actividades"];
          const actividadesAmount = actividadesVal
            ? parseFloat(
                actividadesVal.replace("$", "").replace(",", "").trim(),
              )
            : 0;
          setTotalActividades(actividadesAmount);

          const months = [
            "Marzo 2025",
            "Abril 2025",
            "Mayo 2025",
            "Junio 2025",
            "Julio 2025",
            "Agosto 2025",
            "Septiembre 2025",
            "Octubre 2025",
            "Noviembre 2025",
            "Diciembre 2025",
          ];

          let total = 0;
          const transformedCuotas = months.map((monthName) => {
            const val = userRow[monthName];
            const amount = val ? parseFloat(val.replace("$", "").trim()) : 0;
            total += amount;

            return {
              mes: monthName.replace(" 2025", ""),
              monto: amount > 0 ? `$${amount.toFixed(2)}` : "-",
              estado: amount > 0 ? "Pagado" : "Pendiente",
            };
          });

          setCuotas(transformedCuotas);
          setTotalAcumulado(total);
        }
      }
      setLoading(false);
    };

    loadFees();
  }, [user]);

  const fullName = user
    ? `${user["Nombre "] ?? user.Nombre ?? ""} ${user.Apellido ?? ""}`.trim()
    : "Usuario";

  return (
    <div className="flex bg-surface min-h-screen w-full relative overflow-x-hidden">
      {/* Sidebar Backdrop (Mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SideNavBar Component */}
      <aside
        className={`fixed left-0 top-0 h-full flex flex-col py-8 bg-surface-container-low w-64 border-r-0 font-headline font-semibold z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="px-6 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-lg">
                account_circle
              </span>
            </div>
            <div>
              <p className="text-on-surface font-bold text-sm leading-tight">
                {fullName}
              </p>
              <p className="text-on-surface-variant text-xs font-medium">
                Estudiante
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          <a
            className="flex items-center gap-3 px-4 py-3 transition-transform duration-200 hover:translate-x-1 bg-surface-container-lowest text-primary rounded-r-xl scale-95"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </a>
          {/* <a className="flex items-center gap-3 px-4 py-3 transition-transform duration-200 hover:translate-x-1 text-secondary hover:bg-surface-highest/50" href="#">
            <span className="material-symbols-outlined">receipt_long</span>
            <span>Historial</span>
          </a> */}
        </nav>

        <div className="px-4 mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 transition-transform duration-200 hover:translate-x-1 text-secondary hover:bg-surface-highest/50"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col w-full">
        {/* TopNavBar Component */}
        <header className="bg-glass docked full-width top-0 sticky z-10">
          <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-full">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center text-primary rounded-xl hover:bg-primary/10 transition-colors"
                aria-label="Open menu"
              >
                <span className="material-symbols-outlined text-2xl">menu</span>
              </button>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-primary truncate max-w-[200px] xs:max-w-none">
                Control de Mensualidades Año 2026
              </span>
            </div>
            {/* <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8">
                <a
                  className="font-headline font-bold text-lg text-primary border-b-2 border-primary transition-colors duration-300"
                  href="#"
                >
                  Resumen
                </a>
                <a
                  className="font-headline font-bold text-lg text-secondary hover:text-primary transition-colors duration-300"
                  href="#"
                >
                  Reportes
                </a>
              </nav>
              <div className="flex items-center text-primary cursor-pointer active:opacity-80 transition-opacity">
                <span className="material-symbols-outlined text-3xl">
                  account_circle
                </span>
              </div>
            </div> */}
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-6xl mx-auto w-full overflow-hidden">
          {/* Page Heading Section */}
          <section className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-2">
              Resumen Cuotas 1° Año Medio
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg">
              Visualización detallada del estado de pagos del periodo actual.
            </p>
          </section>

          {/* Bento Layout Content */}
          <div className="grid grid-cols-12 gap-8">
            {/* Summary Spotlight Card */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
              <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col justify-center border-none shadow-ambient relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-secondary font-bold text-sm uppercase tracking-widest mb-2">
                  Total Acumulado
                </p>
                <h2 className="text-5xl font-extrabold text-primary mb-4">
                  {loading
                    ? "..."
                    : `$${totalAcumulado.toLocaleString("en-US", { minimumFractionDigits: 0 })}`}
                </h2>
                <div className="flex items-center gap-2 text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-green-600">
                    trending_up
                  </span>
                  <span>
                    {cuotas.filter((c) => c.estado === "Pagado").length} cuotas
                    liquidadas
                  </span>
                </div>
              </div>

              <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-ambient flex flex-col justify-center">
                <p className="text-on-primary/80 font-bold text-sm uppercase tracking-widest mb-2">
                  Total Cuotas Actividades
                </p>
                <h3 className="text-4xl font-extrabold">
                  {loading
                    ? "..."
                    : `$${totalActividades.toLocaleString("en-US", { minimumFractionDigits: 0 })}`}
                </h3>
              </div>
            </div>

            {/* Main Data Table Card */}
            <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl shadow-ambient overflow-hidden flex flex-col">
              <div className="px-8 py-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-primary">
                  Detalle de Cuotas
                </h2>
                {loading && (
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <span className="material-symbols-outlined animate-spin">
                      sync
                    </span>
                    <span className="text-sm font-bold">Cargando datos...</span>
                  </div>
                )}
              </div>
              <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-8 py-4 text-left text-secondary font-bold text-xs uppercase tracking-wider">
                        Mes / Concepto
                      </th>
                      <th className="px-8 py-4 text-left text-secondary font-bold text-xs uppercase tracking-wider">
                        Monto
                      </th>
                      <th className="px-8 py-4 text-right text-secondary font-bold text-xs uppercase tracking-wider">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container-low">
                    {!loading &&
                      cuotas.map((cuota, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-surface-container-low/30 transition-colors"
                        >
                          <td
                            className={`px-8 py-4 font-semibold ${cuota.mes.includes("Diciembre") ? "text-primary font-bold" : "text-on-surface"}`}
                          >
                            {cuota.mes}
                          </td>
                          <td className="px-8 py-4 text-on-surface-variant font-medium">
                            {cuota.monto}
                          </td>
                          <td className="px-8 py-4 text-right">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                cuota.estado === "Pagado"
                                  ? "bg-green-50 text-green-700 border-green-100"
                                  : "bg-amber-50 text-amber-700 border-amber-100"
                              }`}
                            >
                              <span className="material-symbols-outlined text-xs">
                                {cuota.estado === "Pagado"
                                  ? "check_circle"
                                  : "pending"}
                              </span>
                              {cuota.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    {!loading && cuotas.length === 0 && (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-8 py-12 text-center text-on-surface-variant italic"
                        >
                          No se encontraron registros de cuotas para este
                          usuario.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-auto bg-surface-container-low p-8 border-t border-tertiary-container/10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-secondary font-bold text-sm tracking-tight">
                      Total acumulado pagado:
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Ciclo Anual 2026
                    </p>
                  </div>
                  <span className="text-4xl font-extrabold text-primary">
                    {loading
                      ? "$0.00"
                      : `$${totalAcumulado.toLocaleString("en-US", { minimumFractionDigits: 0 })}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contextual Actions */}
          {/* <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <span className="material-symbols-outlined">history</span>
              </div>
              <div>
                <p className="font-bold text-primary">Ver Historial</p>
                <p className="text-sm text-on-surface-variant">
                  Años anteriores
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div>
                <p className="font-bold text-primary">Métodos de Pago</p>
                <p className="text-sm text-on-surface-variant">
                  Configurar tarjetas
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <span className="material-symbols-outlined">help_outline</span>
              </div>
              <div>
                <p className="font-bold text-primary">Ayuda y Soporte</p>
                <p className="text-sm text-on-surface-variant">
                  Contactar asesor
                </p>
              </div>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
}
