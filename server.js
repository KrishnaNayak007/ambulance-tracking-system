import express from "express";
import cors from "cors";
require("dotenv").config();

const app = express();

const nominatimUrl = process.env.NOMINATIM_API_URL;

//Allow all origins (for development)
app.use(cors());

app.get("/reverse-geocode", async (req, res) => {
  const { lat, lon } = req.query;
  try {
    const resp = await fetch(
      `https://${nominatimUrl}/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching geocode:", err);
    res.status(500).json({ error: "Failed to fetch address" });
  }
});

app.listen(5000, () =>
  console.log("Server running on http://localhost:5000")
);
