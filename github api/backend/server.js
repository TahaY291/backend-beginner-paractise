require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connection is successful with MongoDB"))
  .catch((err) => console.log("❌ The connection failed", err));

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  avatar_url: String,
  bio: String,
  public_repos: Number,
  followers: Number,
  following: Number,
  repos: [{ name: String, url: String }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Fetch & Store GitHub User
app.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    let user = await User.findOne({ username });

    if (user) {
      return res.json(user);
    }

    // Fetch user from GitHub API
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, { headers });
    const githubUser = response.data;

    user = new User({
      username: githubUser.login,
      name: githubUser.name,
      avatar_url: githubUser.avatar_url,
      bio: githubUser.bio,
      public_repos: githubUser.public_repos,
      followers: githubUser.followers,
      following: githubUser.following,
    });

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch or save user" });
  }
});

// Fetch & Store GitHub Repositories
app.get("/user/:username/repos", async (req, res) => {
  try {
    const { username } = req.params;

    // Check if user exists in MongoDB
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found in database" });
    }

    // Fetch repositories from GitHub API
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, { headers });
    const repos = response.data.map(repo => ({ name: repo.name, url: repo.html_url }));

    // Update MongoDB user with repos
    user.repos = repos;
    await user.save();

    res.json(user.repos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch or save repositories" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
