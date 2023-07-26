import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Sighting from "./pages/Sighting";
import AddSighting from "./pages/AddSighting";
import EditSighting from "./pages/EditSighting";
import SightingComments from "./pages/SightingComments";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sightings/:id" element={<Sighting />} />
          <Route path="/sightings/:id/edit" element={<EditSighting />} />
          <Route path="/sightings/add" element={<AddSighting />} />
          <Route
            path="/sightings/:id/comments"
            element={<SightingComments />}
          />
        </Routes>
      </header>
    </div>
  );
}

export default App;
