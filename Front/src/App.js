import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Panel from "./pages/Panel";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Panel" element={<Panel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
