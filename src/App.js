import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Sighting from "./pages/Sighting";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sighting/:id" element={<Sighting />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
