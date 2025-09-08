const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");
const cookiesParser = require("cookie-parser");

const app = express();

// CORS configuration for Netlify + Render
const allowedOrigins = [
  'https://grocerystoreank.netlify.app', // Your Netlify URL
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Essential for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);

// Debug middleware for cookies
app.use((req, res, next) => {
  console.log('=== Request Debug ===');
  console.log('Origin:', req.get('Origin'));
  console.log('Cookies:', req.cookies);
  console.log('===================');
  next();
});

app.use(express.json());
app.use(cookiesParser());
app.use("/api", router);

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running at port: " + PORT);
  });
});
