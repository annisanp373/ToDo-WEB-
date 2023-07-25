import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./createuser.css";

function CreateUser() {
  const [name, setName] = useState("");
  const [tanggal, setTanggal] = useState(""); // New state for tanggal
  const [toDo, setToDo] = useState(""); // New state for To Do
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/create", { name, tanggal, toDo }) // Send tanggal and toDo in the POST request
      .then((result) => {
        console.log(result);
        navigate("/users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success text-dark vh-100">
      <div className="bg-white p-3 rounded w-25">
        <form onSubmit={handleSubmit}>
          <h2>Add New</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Tanggal</label> {/* Change label text to "Tanggal" */}
            <input
              type="date"
              className="form-control"
              onChange={(e) => setTanggal(e.target.value)} // Handle change for tanggal
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">To Do</label> {/* Change label text to "To Do" */}
            <textarea
              placeholder="Enter To Do"
              className="form-control"
              onChange={(e) => setToDo(e.target.value)} // Handle change for toDo
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
