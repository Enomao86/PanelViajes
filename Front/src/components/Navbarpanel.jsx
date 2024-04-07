import React, { useState, useEffect } from "react";
import Dolar from "./dolar";

function NavbarP() {
  
  const [userName, setUserName] = useState("");
  const [logoutError] = useState(null);

  useEffect(() => {
    // Función para actualizar el nombre del usuario
    const updateUserName = () => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    };

    // Actualizar el nombre del usuario al montar el componente
    updateUserName();

    // Actualizar el nombre del usuario cuando cambie el valor en localStorage
    window.addEventListener('storage', updateUserName);

    // Limpiar el listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', updateUserName);
    };
  }, []);

  const handleLogout = () => {
    // Borrar el token, el _id y el nombre del usuario del almacenamiento local
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  
    // Redirigir al usuario a localhost:3000
    /* eslint-disable no-restricted-globals */
    window.location.href = "http://localhost:3000";
  };

  return (
    <div className="navbar bg-gray-800 p-4 flex justify-between items-center text-white">
      <h4 className="text-lg font-semibold">Bienvenido, {userName}</h4>

      <Dolar/>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
      >
        Logout
      </button>
      {logoutError && <p className="text-red-500">{logoutError}</p>}
    </div>
  );
}

export default NavbarP;
