import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PresupuestoForm = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    telefono: ''
  });

  const [servicio, setServicio] = useState({
    tipo: '',
    horas: ''
  });

  const [presupuesto, setPresupuesto] = useState(0);

  // Manejar los cambios en los datos del cliente
  const handleClienteChange = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  };

  // Manejar los cambios en los datos del servicio
  const handleServicioChange = (e) => {
    setServicio({
      ...servicio,
      [e.target.name]: e.target.value
    });
  };

  // Función para calcular el presupuesto
  const calcularPresupuesto = () => {
    let precioServicio = 0;
    let precioHoras = 0;

    // Asignar precio por tipo de servicio
    if (servicio.tipo === 'basico') precioServicio = 100;
    if (servicio.tipo === 'completo') precioServicio = 500;
    if (servicio.tipo === 'personalizado') precioServicio = 1000;

    // Asignar precio por tiempo en horas
    if (servicio.horas === '4') precioHoras = 300;
    if (servicio.horas === '8') precioHoras = 150;

    // Calcular el presupuesto final
    const totalPresupuesto = precioServicio + precioHoras;
    setPresupuesto(totalPresupuesto);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    calcularPresupuesto();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Calcular Presupuesto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Nombre del Cliente:</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={cliente.nombre}
            onChange={handleClienteChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Teléfono del Cliente:</label>
          <input
            type="text"
            name="telefono"
            className="form-control"
            value={cliente.telefono}
            onChange={handleClienteChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Tipo de Servicio:</label>
          <select
            name="tipo"
            className="form-select"
            value={servicio.tipo}
            onChange={handleServicioChange}
            required
          >
            <option value="">Seleccione un servicio</option>
            <option value="basico">Básico </option>
            <option value="completo">Completo </option>
            <option value="personalizado">Personalizado </option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label>Horas:</label>
          <select
            name="horas"
            className="form-select"
            value={servicio.horas}
            onChange={handleServicioChange}
            required
          >
            <option value="">Seleccione el tiempo</option>
            <option value="4">4 horas </option>
            <option value="8">8 horas </option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Calcular Presupuesto</button>
      </form>

      {presupuesto > 0 && (
        <div className="mt-4 p-3 bg-light border rounded">
          <h3>Presupuesto Calculado</h3>
          <p>
            El presupuesto por el servicio <strong>{servicio.tipo}</strong> en{' '}
            <strong>{servicio.horas}</strong> horas es de: <strong>${presupuesto}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PresupuestoForm;
