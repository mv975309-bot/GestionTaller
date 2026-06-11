import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Vehiculos from "./paginas/Vehiculos";
import Presupuestos from "./paginas/Presupuestos";
import CuentasCorrientes from "./paginas/CuentasCorrientes";
import Agenda from "./paginas/Agenda";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/vehiculos" replace />} />
        <Route path="/vehiculos" element={<MainLayout><Vehiculos /></MainLayout>} />
        <Route path="/presupuestos" element={<MainLayout><Presupuestos /></MainLayout>} />
        <Route path="/cuentas-corrientes" element={<MainLayout><CuentasCorrientes /></MainLayout>} />
        <Route path="/agenda" element={<MainLayout><Agenda /></MainLayout>} />
        <Route path="*" element={<Navigate to="/vehiculos" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
