import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EditSighting() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sightingData, setSightingData] = useState();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (id) {
      const bigfoot = async () => {
        const response = await axios.get(
          `http://localhost:8080/sightings/${id}`
        );
        setSightingData(response.data);
      };
      bigfoot();
    }
  }, [id]);

  const editSighting = async (e) => {
    e.preventDefault();
    const response = await axios.put(`http://localhost:8080/sightings/${id}`, {
      date: date.toLocaleString() || sightingData.date.slice(0, 10),
      location: location || sightingData.location,
      notes: notes || sightingData.notes,
    });
    console.log(response);
    setSightingData(response.data.sighting);
    navigate("/");
  };

  return (
    <div className="form-container">
      {sightingData && (
        <form className="form">
          <h4>Edit Sighting</h4>
          <p>Sighting ID: {id}</p>

          <label>Date</label>
          <input
            type="date"
            defaultValue={sightingData.date.slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
          />
          <label>Location</label>
          <input
            type="text"
            defaultValue={sightingData.location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Notes</label>
          <textarea
            defaultValue={sightingData.notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div>
            <button
              className="btn"
              style={{ backgroundColor: "gray" }}
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <button className="btn" onClick={editSighting}>
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditSighting;
