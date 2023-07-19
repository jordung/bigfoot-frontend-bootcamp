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
        setSightingData(response.data[0]);
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
          <h4>
            {sightingData.YEAR || "No Year"} - {sightingData.DATE || "No Date"}
          </h4>
          <h5>County: {sightingData.COUNTY || "No County"}</h5>
          <h5>Report Number: {sightingData.REPORT_NUMBER}</h5>
          <p className="sighting-label">Environment Details</p>
          <p className="sighting-detail">{sightingData.ENVIRONMENT || "NIL"}</p>
          <p className="sighting-label">Observations</p>
          <p className="sighting-detail">{sightingData.OBSERVED || "NIL"}</p>
        </div>
      )}
    </div>
  );
}

export default Sighting;
