// App.js
import React, { useState } from 'react';
import axios from 'axios';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import User from './user'
import CreateUser from './createuser';
import DeleteUser from './deleteuser';
import NoPage from './nopage';
import UpdateUser from './updateuser';
import UploadImage from './uploadimage';
import 'bootstrap/dist/css/bootstrap.css'

const App = () => {
    
        
    return (
        <>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<User/>}></Route>
        <Route path="/create" element={<CreateUser/>}></Route>
        <Route path="/delete/:id" element={<DeleteUser/>}></Route>
        <Route path="/update/:id" element={<UpdateUser/>}></Route>
        <Route path="/upload" element={<UploadImage/>}></Route>
        <Route path="*" element={<NoPage/>}></Route>
        </Routes>
        </BrowserRouter>
        
        </>
    );
};

export default App;
