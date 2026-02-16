console.log("🔥 SERVER.JS IS RUNNING");

const express = require("express");
const { MongoClient } = require("mongodb");
const path = require("path");          // ✅ ADD THIS

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ ADD THESE LINES HERE (IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

// (Optional but recommended) root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const MONGO_URL =
  "mongodb://admin:qwerty@127.0.0.1:27017/rojanna-db?authSource=admin";

const client = new MongoClient(MONGO_URL);
let db;

// 🔥 CONNECT TO MONGODB BEFORE STARTING SERVER
async function startServer() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    db = client.db("rojanna-db");

    app.listen(PORT, () => {
      console.log("🚀 Server running on port 5050");
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
  }
}

startServer();

// GET USERS
app.get("/getUsers", async (req, res) => {
  const users = await db.collection("users").find({}).toArray();
  res.json(users);
});

// ADD USER
app.post("/addUser", async (req, res) => {
  const result = await db.collection("users").insertOne(req.body);
  res.json(result);
});
