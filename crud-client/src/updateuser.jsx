import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Fetch user data when the component mounts or when `id` changes
  useEffect(() => {
    axios.get(`http://localhost:4000/getUser/${id}`)
      .then(res => {
        const user = res.data;
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to fetch user data.");
      });
  }, [id]);

  function submit(e) {
    e.preventDefault();
    axios.put(`http://localhost:4000/updateUser/${id}`, { name, email, age: Number(age) })
      .then(result => {
        console.log(result);
        setSuccess("User updated successfully.");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch(err => {
        console.log(err);
        setError("Failed to update user.");
      });
  }

  return (
    <>
      <h1>Welcome to Update User Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}

export default UpdateUser;
