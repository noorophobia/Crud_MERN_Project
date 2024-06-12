const express = require('express');
const cors = require('cors');
const UserModel = require('./models/name'); // Make sure './name' points to the correct file where your UserModel is defined
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use("/", express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://127.0.0.1:27017/crud", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname)); // Corrected to use file.originalname
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error("Images only!"));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.post("/upload", upload.single('file'), async (req, res) => {
    try {
        const newUser = await UserModel.create({ image: req.file.filename });
        res.json({ message: 'File uploaded successfully', file: req.file.filename });
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).json(err);
    }
});

app.get("/getUser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ error: "Error fetching user", details: err.message });
    }
});

app.put("/updateUser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ error: "Error updating user", details: err.message });
    }
});

app.delete("/deleteUser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await UserModel.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Error deleting user", details: err.message });
    }
});

app.get("/", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Error fetching users", details: err.message });
    }
});

app.post("/createUser", async (req, res) => {
    try {
        console.log("Received request:", req.body);
        const newUser = await UserModel.create(req.body);
        res.json(newUser);
    } catch (err) {
        console.error("Error creating user:", err);
        res.status(500).json({ error: "Error creating user", details: err.message });
    }
});

app.listen(port, () => {
    console.log("Server running at port " + port);
});
