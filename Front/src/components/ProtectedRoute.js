import React from "react";
import { Route, Navigate } from "react-router-dom";




const ProtectedRoute = ({ element: Component, ...rest }) => {
  // Verificar si hay un token válido en el almacenamiento local
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      element={token ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
