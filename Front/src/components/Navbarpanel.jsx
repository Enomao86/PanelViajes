import React, { useState, useEffect } from "react";

function NavbarP() {
  const [userName, setUserName] = useState("");
  const [logoutError, setLogoutError] = useState(null);

  useEffect(() => {
    // Obtener el nombre del usuario del almacenamiento local
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Realizar la solicitud al backend para cerrar sesión
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Puedes enviar algún dato adicional si es necesario
      });

      if (response.ok) {
        // Si la solicitud de logout es exitosa, borra el token del almacenamiento local
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        // Redirige al usuario a la página de inicio de sesión u otra página que desees
        window.location.href = "/";
      } else {
        // Si hay algún error en el logout, muestra un mensaje de error
        setLogoutError("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setLogoutError("Error al cerrar sesión");
    }
  };

  return (
    <div className="navbar bg-gray-800 p-4 flex justify-between items-center text-white">
      <h4 className="text-lg font-semibold">Bienvenido, {userName}</h4>
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
