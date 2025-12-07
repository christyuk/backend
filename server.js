import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check for Render
app.get("/healthz", (req, res) => {
  res.send("OK");
});

// Weather API route
app.get("/weather", async (req, res) => {
  try {
    const city = req.query.city;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

const response = await axios.get(apiURL);
res.json(response.data);

  } catch (err) {
    console.error("Backend error:", err.message);
    return res.status(500).json({ error: "City not found or server error" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

