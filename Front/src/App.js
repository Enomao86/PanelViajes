import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Panel from "./pages/Panel";
import Home from "./components/Home";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Usa ProtectedRoute para proteger la ruta "/Panel" */}
          <Route path="/Panel" element={<Panel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
