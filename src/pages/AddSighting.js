import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const navigate = useNavigate();

  const addSighting = async (e) => {
    e.preventDefault();
    console.log(date);
    const response = await axios.post("http://localhost:8080/sightings", {
      date: date,
      location: location,
      notes: notes,
    });
    console.log(response);
    navigate("/");
  };

  return (
    <div className="form-container">
      <form className="form">
        <h4>Add Sighting</h4>
        <label>Date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <label>Location</label>
        <input type="text" onChange={(e) => setLocation(e.target.value)} />
        <label>Notes</label>
        <textarea onChange={(e) => setNotes(e.target.value)} />
        <div>
          <button
            className="btn"
            style={{ backgroundColor: "gray" }}
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <button className="btn" onClick={addSighting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddSighting;
