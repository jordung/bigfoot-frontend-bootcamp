import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const [bigfootSightings, setBigfootSightings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const bigfoot = async (search = "") => {
    const response = await axios.get(
      `http://localhost:8080/sightings/${search}`
    );
    setBigfootSightings(response.data);
  };

  useEffect(() => {
    bigfoot();
  }, []);

  useEffect(() => {
    bigfoot(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="App-name">Bigfoot Sightings</p>
      <div className="search">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search by ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="container">
        {bigfootSightings.length > 0 &&
          bigfootSightings
            .filter(
              (sighting) =>
                sighting.REPORT_NUMBER !== null && sighting.SEASON !== undefined
            )
            .map((sighting) => (
              <div
                key={`${sighting.REPORT_NUMBER}${sighting.YEAR}`}
                className="card"
                onClick={() => navigate(`/sighting/${sighting.REPORT_NUMBER}`)}
              >
                <h6>
                  {sighting.YEAR} - {sighting.SEASON}
                </h6>
                <p>{sighting.STATE}</p>
                <p>ID: {sighting.REPORT_NUMBER}</p>
              </div>
            ))}
      </div>
    </>
  );
}

export default Home;
