const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
// Check required environment variables
if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing in environment variables");
    process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is missing in environment variables");
    process.exit(1);
}

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server working ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});