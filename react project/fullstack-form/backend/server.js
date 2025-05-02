const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ FIXED: Allows JSON data from requests

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    city: String
});

const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
    try {
        console.log("Received request:", req.body); // ✅ DEBUGGING
        const { name, email, age, city } = req.body;
        const user = new User({ name, email, age, city });
        await user.save();
        res.status(201).json({ message: "User added successfully!" }); // ✅ Sending success response
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Server error" }); // ✅ Sending error response
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});