import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './upload.css'
function UploadImage() {
    const { id } = useParams();
    const [file, setFile] = useState("");
    const [image, setImage] = useState(null);

    const handleUpload = (e) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);

        axios.post("http://localhost:4000/upload", formData)
            .then(res => {
                console.log("length" + res.data.length);
                console.log("data  " + res.data);
                const uploadedFile = res.data.file; // Access the uploaded file information
                console.log(uploadedFile);

                setImage(uploadedFile);
                console.log("image is " + uploadedFile); // Corrected log to use the actual variable
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/getImage/${id}`)
            .then(res => {
                const uploadedFile = res.data.file; // Access the uploaded file information
                console.log(uploadedFile);
                setImage(uploadedFile);
            })
            .catch(err => {
                console.error(err);
            });
    }, [id]); // Added id as a dependency

    return (
        <>
            <div>
                <input type="file" onChange={e => setFile(e.target.files[0])}></input>
                <button onClick={handleUpload}>Upload</button>
            </div>
            {image && <img src={`http://localhost:4000/public/images/${image}`} alt="Uploaded" />}
        </>
    );
}

export default UploadImage;
