"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <a className="text-white text-lg font-bold" href="/">
            Gestion Viajes
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={openLoginModal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full mr-2 transition duration-300 ease-in-out shadow-md"
          >
            Login
          </button>
          <button
            onClick={openRegisterModal}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-md"
          >
            Registro
          </button>
        </div>
      </div>
      {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      {showRegisterModal && <RegisterModal onClose={closeRegisterModal} />}
    </nav>
  );
}

const LoginModal = ({ onClose }) => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, password }),
      });
      if (response.ok) {
        // La solicitud fue exitosa
        const data = await response.json();
        // Aquí puedes manejar la respuesta del backend, por ejemplo, guardar el token de autenticación en el almacenamiento local
        localStorage.setItem("token", data.token);
        console.log("Usuario autenticado correctamente:", data);
        onClose(); // Cerrar el modal después de iniciar sesión
        /* eslint-disable no-restricted-globals */
        window.location.href = "http://localhost:3000/panel"; // Redirigir al usuario a localhost:3000/panel
      } else {
        // La solicitud falló
        setError("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error al iniciar sesión");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Iniciar sesión
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500">
          Cancelar
        </button>
      </div>
    </div>
  );
};

const RegisterModal = ({ onClose }) => {
  const [nombre, setName] = useState("");
  const [correo, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRole] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, correo, password, rol }),
      });
      if (response.ok) {
        // La solicitud fue exitosa
        const data = await response.json();
        console.log("Usuario registrado correctamente:", data);
        onClose(); // Cerrar el modal después de registrarse
      } else {
        // La solicitud falló
        setError("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      setError("Error al registrar usuario");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-lg font-bold mb-4">Registro</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            value={nombre}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Email"
            value={correo}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Constraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          />
          <select
            value={rol}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-4 py-2 border rounded"
          >
            <option value="">Selecciona un rol</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Registro
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500">
          Cancelar
        </button>
      </div>
    </div>
  );
};
