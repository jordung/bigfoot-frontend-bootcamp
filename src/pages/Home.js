import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../logo.png";
import { useNavigate } from "react-router-dom";

function Home() {
  const [bigfootSightings, setBigfootSightings] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const bigfoot = async () => {
    const response = await axios.get(`http://localhost:8080/sightings`);

    if (response) {
      console.log(response);
      setBigfootSightings(response.data);
    } else {
      console.log("No results found");
      setBigfootSightings([]);
    }
  };

  useEffect(() => {
    bigfoot();
  }, []);

  const deleteSighting = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/sightings/${id}`
    );
    console.log(response.data);
    setBigfootSightings(response.data.sightings);
  };

  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="App-name">Bigfoot Sightings</p>
      <div className="search">
        {/* <input
          type="search"
          name="search"
          id="search"
          placeholder="Search by ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        <button className="btn" onClick={() => navigate("/sightings/add")}>
          Add Sighting
        </button>
      </div>
      <div className="container">
        {bigfootSightings.length > 0 &&
          bigfootSightings
            .sort((a, b) => a.id - b.id)
            .map((sighting) => (
              <div key={`${sighting.id}`} className="card">
                <div onClick={() => navigate(`/sightings/${sighting.id}`)}>
                  <h6>{sighting.date.slice(0, 10)}</h6>
                  <p>{sighting.location}</p>
                  <p>ID: {sighting.id}</p>
                </div>
                <div>
                  <button
                    className="btn"
                    onClick={() => navigate(`/sightings/${sighting.id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() => deleteSighting(sighting.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
    </>
  );
}

export default Home;
