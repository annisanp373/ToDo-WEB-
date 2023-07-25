import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [tanggal, setTanggal] = useState(""); // New state for tanggal
  const [toDo, setToDo] = useState(""); // New state for To Do
  const navigate = useNavigate();

  // ...
useEffect(() => {
  axios
    .get(`http://localhost:3001/getUser/${id}`)
    .then((result) => {
      setName(result.data.name);
      setTanggal(result.data.tanggal ? new Date(result.data.tanggal).toISOString().substr(0, 10) : ""); // Perubahan di sini
      setToDo(result.data.toDo);
    })
    .catch((err) => console.log(err));
}, [id]);
// ...


  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/update/${id}`, { name, tanggal, toDo }) // Send tanggal and toDo in the PUT request
      .then((result) => {
        console.log(result);
        navigate("/users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-success text-dark vh-100">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Tanggal</label> {/* Change label text to "Tanggal" */}
            <input
              type="date"
              className="form-control"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)} // Handle change for tanggal
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">To Do</label> {/* Change label text to "To Do" */}
            <textarea
              className="form-control"
              value={toDo}
              onChange={(e) => setToDo(e.target.value)} // Handle change for toDo
            />
          </div>
          <button type="submit" className="btn btn-success">
            Update
          </button>
          <button
            type="button"
            className="btn btn-danger ms-2"
            onClick={() => navigate("/users")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
