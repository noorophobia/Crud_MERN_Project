import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './assets/createuser.css';
function CreateUser (){

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [age,setAge]=useState(0);
  const[error,setError]=useState(null);
    const Navigate= useNavigate();
  function handleSubmit(e){
    e.preventDefault();
    if(email===""||name===""||age===""){
      setError("All Fields required");
      return;
    }
    if(isNaN(age)){
      setError("Age should be a number");
      return;
    }
    if(age<=0 || age>120){
      setError("Age should be a between 1 and 120");
      return;
    }
    else{
      setError(null);
    }
    
    axios.post("http://localhost:4000/createUser",{name,email,age})
    .then(result=>{
      console.log(result);
    Navigate('/');}
  
  )
    .catch(err=>console.log(err))
    
  }
     
    return (<>
    <h1>welcome to Create user page</h1>
     <form onSubmit={handleSubmit}>
     <div className="form-group">
    <label for="name" >Name </label>
    <input type="text" className="form-control" id="name" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Enter name"></input>
   </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" onChange={(e)=>setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email"></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputEmail1">Age </label>
    <input type="text" className="form-control" id="age" onChange={(e)=>setAge(e.target.value)}   placeholder="Enter age"></input>
   </div>
  <div>
    <p className="ph">{error && error}</p>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>);
}



export default CreateUser;