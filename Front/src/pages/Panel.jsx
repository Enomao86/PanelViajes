import React, { useState, useEffect } from "react";
import Nav2 from "../components/Navbarpanel";

function Panel() {
  const [viajes, setViajes] = useState([]);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [nombreViaje, setNombreViaje] = useState("");
  const [fechaViaje, setFechaViaje] = useState("");
  const [nombrePasajero, setNombrePasajero] = useState("");
  const [dniPasajero, setDniPasajero] = useState("");
  const [telefonoPasajero, setTelefonoPasajero] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Función para cargar los viajes al cargar el componente
  useEffect(() => {
    cargarViajes();
  }, []); // Se pasa un arreglo vacío como segundo argumento para que solo se ejecute una vez al cargar el componente

  // Función para cargar los viajes desde el backend
  const cargarViajes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/viajes"); // Realiza una solicitud GET al endpoint /api/viajes
      if (!response.ok) {
        throw new Error("Error al cargar los viajes");
      }
      const data = await response.json(); // Convierte la respuesta a formato JSON
      const viajesActivos = data.filter((viaje) => viaje.estado === true);
      setViajes(viajesActivos); // Actualiza el estado con los viajes recibidos del backend
    } catch (error) {
      console.error("Error al cargar los viajes:", error);
    }
  };

  const handleAgregarViaje = async () => {
    if (
      nombreViaje.trim() !== "" &&
      fechaViaje.trim() !== "" &&
      esFechaValida(fechaViaje)
    ) {
      try {
        const response = await fetch("http://localhost:8080/api/viajes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre: nombreViaje, fecha: fechaViaje }),
        });

        if (response.ok) {
          const nuevoViaje = await response.json();
          setViajes([...viajes, nuevoViaje]);
          setNombreViaje("");
          setFechaViaje("");
          setShowModal(false);
        } else {
          alert("Error al agregar el viaje");
        }
      } catch (error) {
        console.error("Error al agregar el viaje:", error);
        alert("Error al agregar el viaje");
      }
    } else {
      alert("Por favor ingrese una fecha válida en formato YYYY-MM-DD.");
    }
  };

  const handleSeleccionarViaje = (viaje) => {
    setViajeSeleccionado(viaje);
  };

  const handleEliminarViaje = async (viaje) => {
    try {
      // Realizar la solicitud DELETE al backend para eliminar el viaje
      const response = await fetch(
        `http://localhost:8080/api/viajes/${viaje._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Si la eliminación es exitosa, actualiza la lista de viajes eliminando el viaje seleccionado
        setViajes(viajes.filter((v) => v !== viaje));
        setViajeSeleccionado(null);
      } else {
        // Si hay algún error en la eliminación, muestra un mensaje de error
        console.error("Error al eliminar el viaje:", response.statusText);
        // Puedes mostrar un mensaje de error al usuario si lo deseas
      }
    } catch (error) {
      console.error("Error al eliminar el viaje:", error);
      // Puedes manejar el error de la manera que desees, como mostrando un mensaje de error al usuario
    }
  };

  const handleAgregarPasajero = () => {
    if (
      nombrePasajero.trim() !== "" &&
      dniPasajero.trim() !== "" &&
      telefonoPasajero.trim() !== ""
    ) {
      const viajesActualizados = viajes.map((v) => {
        if (v === viajeSeleccionado) {
          return {
            ...v,
            pasajeros: [
              ...v.pasajeros,
              {
                nombre: nombrePasajero,
                dni: dniPasajero,
                telefono: telefonoPasajero,
              },
            ],
          };
        }
        return v;
      });
      setViajes(viajesActualizados);
      setNombrePasajero("");
      setDniPasajero("");
      setTelefonoPasajero("");
    }
  };

  const handleEliminarPasajero = (pasajero) => {
    const viajesActualizados = viajes.map((v) => {
      if (v === viajeSeleccionado) {
        return {
          ...v,
          pasajeros: v.pasajeros.filter((p) => p !== pasajero),
        };
      }
      return v;
    });
    setViajes(viajesActualizados);
  };

  const esFechaValida = (fecha) => {
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    return regexFecha.test(fecha);
  };

  const totalPasajeros = viajeSeleccionado
    ? viajeSeleccionado.pasajeros.length
    : 0;

  return (
    <div>
      {" "}
      <Nav2 />
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="text-lg font-semibold mb-4">Lista de Viajes</h2>
          <ul>
            {viajes.map((viaje, index) => (
              <li
                key={index}
                className={
                  viaje === viajeSeleccionado
                    ? "bg-gray-200 p-2 mb-2 rounded"
                    : "p-2 mb-2 rounded"
                }
              >
                <span>
                  {viaje.nombre} - {viaje.fecha}
                </span>
                <button
                  onClick={() => handleSeleccionarViaje(viaje)}
                  className="ml-2"
                >
                  Seleccionar
                </button>
                <button
                  onClick={() => handleEliminarViaje(viaje)}
                  className="ml-2 text-red-500"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          >
            Agregar Viaje
          </button>
          {showModal && (
            <ModalPanel onClose={() => setShowModal(false)}>
              <h2 className="text-lg font-semibold mb-4">Agregar Viaje</h2>
              <input
                type="text"
                placeholder="Nombre del viaje"
                value={nombreViaje}
                onChange={(e) => setNombreViaje(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <input
                type="date"
                placeholder="Fecha del viaje"
                value={fechaViaje}
                onChange={(e) => setFechaViaje(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <button
                onClick={handleAgregarViaje}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Agregar Viaje
              </button>
            </ModalPanel>
          )}
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-lg font-semibold mb-4">Pasajeros del Viaje</h2>
          {viajeSeleccionado && (
            <div>
              <p>Total de Pasajeros: {totalPasajeros}</p>
              <input
                type="text"
                placeholder="Nombre"
                value={nombrePasajero}
                onChange={(e) => setNombrePasajero(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAgregarPasajero();
                }}
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="DNI"
                value={dniPasajero}
                onChange={(e) => setDniPasajero(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAgregarPasajero();
                }}
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={telefonoPasajero}
                onChange={(e) => setTelefonoPasajero(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAgregarPasajero();
                }}
                className="w-full px-4 py-2 border rounded mb-2"
              />
              <button
                onClick={handleAgregarPasajero}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Agregar Pasajero
              </button>
              <ul className="mt-4">
                {viajeSeleccionado.pasajeros.map((pasajero, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded"
                  >
                    <span>
                      {pasajero.nombre} - {pasajero.dni} - {pasajero.telefono}
                    </span>
                    <button
                      onClick={() => handleEliminarPasajero(pasajero)}
                      className="text-red-500"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ModalPanel({ children, onClose }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        {children}
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Panel;
