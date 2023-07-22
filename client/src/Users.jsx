//users.jsx
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/users')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">Add +</Link>
        <p>Halaman Pengguna</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {users.map((user) => (
    <tr key={user._id}>
    <td>{user.name}</td>
    <td>{user.email}</td>
    <td>{user.age}</td>
    <td>
    <Link to={`/update/${user._id}`} className="btn btn-success">
  Update
    </Link>
      <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
        Delete
      </button>
    </td>
  </tr>
))}



          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
