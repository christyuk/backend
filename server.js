import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

// Allow Vercel & localhost to access backend
app.use(
  cors({
    origin: [
      "https://weather-app-seven-eta-89.vercel.app",
      "http://localhost:3000"
    ],
  })
);

// Allow JSON body
app.use(express.json());

// Correct health check for Render
app.get("/health", (req, res) => {
  res.send("OK");
});

// Weather route
app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port", port));
