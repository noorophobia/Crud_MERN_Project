import React, { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

function DeleteUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const navigate = useNavigate();

  // Fetch user data when the component mounts or when `id` changes
  useEffect(() => {
    axios.get(`http://localhost:4000/getUser/${id}`)
    .then(res => {
        console.log(res.data);
        const user = res.data;
        setName(user.name);
        setEmail(user.email);
        setAge(user.age);
        alert("user deleted "+user.name);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  function submit(e){
    e.preventDefault();
    axios.delete(`http://localhost:4000/deleteUser/${id}`,{name,email,age})
    .then(result=>{
      console.log(result);
    Navigate('/');}
  
  )
    .catch(err=>console.log(err))
    
  }

  return (
    <>
      <h1>Welcome to Delete User Page</h1>
      <h1>User  that deleted </h1>
      <form   >

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
         
         <Link to ="/" className="btn btn-primary">Go back to Home</Link>
       </form>
    </>
  );
}

 


export default DeleteUser;