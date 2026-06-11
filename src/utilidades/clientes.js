export function normNombre(nombre) {
  return (nombre || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function buscarClientePorNombre(clientes, nombre) {
  const n = normNombre(nombre);
  if (!n) return null;
  return clientes.find((c) => normNombre(c.nombre) === n) || null;
}

export function crearCliente({ nombre, telefono = "", dni = "", direccion = "" } = {}) {
  return {
    id: Date.now() + Math.random(),
    nombre: nombre.trim(),
    telefono: telefono.trim(),
    dni: dni.trim(),
    direccion: direccion.trim(),
    tipoPrecio: "publico",
    fechaCreacion: new Date().toLocaleDateString("es-AR"),
    movimientos: [],
  };
}

export function migrarDuenosAClienteId(vehiculos, clientes) {
  const cuentasMutable = [...clientes];
  let creados = 0;
  let matcheados = 0;

  const vehiculosActualizados = vehiculos.map((v) => {
    if (v.clienteId || !v.dueno || v.dueno === "-") return v;

    let cliente = buscarClientePorNombre(cuentasMutable, v.dueno);
    if (cliente) {
      matcheados++;
    } else {
      cliente = crearCliente({ nombre: v.dueno });
      cuentasMutable.push(cliente);
      creados++;
    }

    return {
      ...v,
      clienteId: cliente.id,
      historialDuenos: [
        {
          clienteId: cliente.id,
          nombre: cliente.nombre,
          desde: new Date().toLocaleDateString("es-AR"),
          hasta: null,
        },
      ],
    };
  });

  return {
    vehiculosActualizados,
    clientesActualizados: cuentasMutable,
    stats: { creados, matcheados },
  };
}
