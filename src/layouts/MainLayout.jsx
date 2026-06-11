import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../estilos/MainLayout.css";

const NAV_ITEMS = [
  { to: "/vehiculos", icono: "🚗", label: "Vehículos" },
  { to: "/presupuestos", icono: "📋", label: "Presupuestos" },
  { to: "/cuentas-corrientes", icono: "🧾", label: "Clientes" },
  { to: "/agenda", icono: "📅", label: "Agenda" },
];

export default function MainLayout({ children }) {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);
  const location = useLocation();

  return (
    <div className="layout-root">
      <aside className={`sidebar ${sidebarAbierto ? "sidebar-abierto" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-titulo">Mi Empresa</span>
          <span className="sidebar-subtitulo">Vehículos & Servicios</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-item ${isActive ? "nav-item-activo" : ""}`
              }
              onClick={() => setSidebarAbierto(false)}
            >
              <span className="nav-icono">{item.icono}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="layout-main">
        <header className="topbar">
          <button
            className="btn-menu-mobile"
            onClick={() => setSidebarAbierto(!sidebarAbierto)}
          >
            ☰
          </button>
          <span className="topbar-titulo">
            {NAV_ITEMS.find((i) => location.pathname.startsWith(i.to))?.label || "Vehículos"}
          </span>
        </header>

        {sidebarAbierto && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarAbierto(false)}
          />
        )}

        <main className="contenido-principal">{children}</main>
      </div>
    </div>
  );
}
