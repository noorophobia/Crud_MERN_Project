import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './user.css';

function User() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000")
            .then(res => setUsers(res.data))
            .catch(err => {
                console.error("Error loading users", err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:4000/deleteUser/${id}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== id));
            })
            .catch(err => {
                console.error("Error deleting user", err);
            });
    };

    return (
        <>
            <h1>Welcome to Users Page</h1>
            <Link to="/create" className="btn btn-success">Add</Link>
            <Link to="/upload" className="btn btn-danger">Upload Image</Link>

            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" colSpan="4">DETAILED</th>
                     </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            
                            {  (
                                <td>
                                    <strong>Name:</strong> {user.name}<br />
                                    <strong>Email:</strong> {user.email}<br />
                                    <strong>Age:</strong> {user.age}
                                </td>
                            )}
                            <td>
                                <Link to={`/update/${user._id}`} className="btn btn-warning">Update</Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default User;
