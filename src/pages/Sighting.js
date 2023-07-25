import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";

function Sighting() {
  const [sightingData, setSightingData] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const bigfoot = async () => {
        const response = await axios.get(
          `http://localhost:8080/sightings/${id}`
        );
        console.log(response);
        setSightingData(response.data);
      };
      bigfoot();
    }
  }, [id]);

  console.log(sightingData);

  return (
    <div>
      {sightingData && (
        <div className="sighting-container">
          <button
            className="sighting-back-button"
            onClick={() => navigate("/")}
          >
            Back
          </button>
          <h4>{sightingData.date.slice(0, 10) || "No Date"}</h4>
          <h5>Location: {sightingData.location || "No Location"}</h5>
          <h5>Report Number: {sightingData.id}</h5>
          <p className="sighting-label">Notes</p>
          <p className="sighting-detail">{sightingData.notes || "NIL"}</p>
        </div>
      )}
    </div>
  );
}

export default Sighting;
