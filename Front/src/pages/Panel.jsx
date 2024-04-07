import React, { useState, useEffect } from "react";
import Nav2 from "../components/Navbarpanel";
import moment from 'moment';

function Panel() {
  const [viajes, setViajes] = useState([]);
  const [viajeSeleccionado, setViajeSeleccionado] = useState(null);
  const [nombreViaje, setNombreViaje] = useState("");
  const [fechaViaje, setFechaViaje] = useState("");

  const [showModal, setShowModal] = useState(false);

  // Función para cargar los viajes al cargar el componente
  useEffect(() => {
    cargarViajes();
  }, []); // Se pasa un arreglo vacío como segundo argumento para que solo se ejecute una vez al cargar el componente

  // Función para cargar los viajes desde el backend
  const cargarViajes = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
  
      const response = await fetch('http://localhost:8080/api/viajes/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'userid': userId
        }
      });
      if (!response.ok) {
        throw new Error("Error al cargar los viajes");
      }
  
      let data = await response.json();
      // Si quieres mostrar todos los viajes, independientemente de su estado, puedes eliminar la siguiente línea
      data = data.filter((viaje) => viaje.activo === true); // Muestra los viajes con estado !== false
  
      // Formatear la fecha para que no muestre la hora
      data = data.map((viaje) => {
        const fecha = new Date(viaje.fecha);
        const fechaFormateada = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
        return { ...viaje, fecha: fechaFormateada };
      });
  
      setViajes(data);
    } catch (error) {
      console.error("Error al cargar los viajes:", error);
    }
  };

  
  const handleAgregarViaje = async () => {
    const userId = localStorage.getItem('userId'); // Add this line
    console.log("Datos del nuevo viaje:", nombreViaje, fechaViaje, userId); // Log the nombreViaje and fechaViaje
    if (nombreViaje.trim() !== "" && esFechaValida(fechaViaje)) {
      try {
        const response = await fetch("http://localhost:8080/api/viajes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            nombre: nombreViaje,
            fecha: fechaViaje,
            usuario: userId,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const nuevoViaje = await response.json();
        console.log("Nuevo viaje creado:", nuevoViaje); 
        setViajes([...viajes, nuevoViaje]);
        setNombreViaje("");
        setFechaViaje("");
        setShowModal(false);
        alert("Viaje agregado correctamente");
      } catch (error) {
        console.error("Error al agregar el viaje:", error);
        alert("Error al agregar el viaje: " + error.message);
      }
    } else {
      alert("Por favor ingrese una fecha válida en formato YYYY-MM-DD.");
    }
  };
  
  const esFechaValida = (fecha) => {
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    if (!fecha.match(regexFecha)) {
      return false;
    }
  
    const [year, month, day] = fecha.split("-");
    const fechaObj = new Date(year, month - 1, day);
  
    return fechaObj && fechaObj.getFullYear() === parseInt(year) && fechaObj.getMonth() + 1 === parseInt(month) && fechaObj.getDate() === parseInt(day);
  };

  const handleEliminarViaje = async (viajeId) => {
    try {
      console.log("ViajeId:", viajeId); // Log the viajeId
  
      // Verifica que el viajeId es válido
      if (!viajeId) {
        alert("El ID del viaje seleccionado no es válido");
        return;
      }
  
      // Verifica que el viaje existe en la lista de viajes
      const viaje = viajes.find(v => v._id === viajeId);
      console.log("Viaje encontrado:", viaje); // Log the found viaje
  
      if (!viaje) {
        alert("El viaje seleccionado no existe");
        return;
      }
  
      const userId = localStorage.getItem("userId"); // Obtén el ID del usuario de la sesión
      const token = localStorage.getItem('token'); // Obtén el token del localStorage
      console.log("UserId y Token:", userId, token); // Log the userId and token
  
      if (!userId || !token) {
        alert("No se pudo obtener el ID del usuario o el token de la sesión");
        return;
      }
  
      const response = await fetch(`http://localhost:8080/api/viajes/${viajeId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'userid': userId
        }
      });
  
      console.log("Respuesta de la API:", response); // Log the API response
  
      if (response.ok) {
        // Elimina el viaje eliminado del estado local
        const updatedViajes = viajes.filter(v => v._id !== viajeId);
        setViajes(updatedViajes);
        alert("Viaje eliminado correctamente");
      } else {
        const errorMessage = await response.text();
        alert("Error al eliminar el viaje: " + errorMessage);
      }
    } catch (error) {
      console.error("Error al eliminar el viaje:", error);
      alert("Error al eliminar el viaje: " + error.message);
    }
  };

  const handleSeleccionarViaje = (viaje) => {
    setViajeSeleccionado(viaje);
  };

  


 

  

 
  

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
                  onClick={() => handleEliminarViaje(viaje._id)}
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
  onChange={(e) => {
    const fecha = e.target.value;
    const isValidDate = moment(fecha, 'YYYY-MM-DD', true).isValid();
    if (isValidDate) {
      setFechaViaje(fecha);
    } else {
      console.log('Fecha no válida');
    }
  }}
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