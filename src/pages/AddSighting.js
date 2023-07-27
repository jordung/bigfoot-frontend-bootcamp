import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Select from "react-select";

function AddSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        `http://localhost:8080/sightings/category`
      );
      setCategories(response.data.data);
    };
    getCategories();
  }, []);

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
    control: (provided) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const handleSelectChange = (category) => {
    setSelectedCategory(category.value);
  };

  const addSighting = async (e) => {
    e.preventDefault();
    console.log(date);
    const response = await axios.post("http://localhost:8080/sightings", {
      date: date,
      location: location,
      notes: notes,
      category: selectedCategory,
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
        <Select
          styles={customStyles}
          options={options}
          // value={selectedCategory}
          onChange={handleSelectChange}
        />
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
