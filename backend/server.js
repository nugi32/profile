require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Log startup info
console.log("\n=== Starting Backend Server ===");
console.log("Environment:", process.env.NODE_ENV || "development");
console.log("Port:", process.env.PORT || 5000);
console.log("MongoDB URI:", process.env.MONGO_URI ? "✓ Set" : "✗ Not set");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder untuk akses gambar
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected", timestamp: new Date() });
});

// Routes
app.use("/api/portfolio", require("./routes/portfolioRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/landing", require("./routes/landingRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/footer", require("./routes/footerRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Database connection with error handling
const connectDB = async (attempt = 1) => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not set in .env file. Check SETUP.md for instructions.");
    }

    const isLocalMongo = process.env.MONGO_URI.includes("127.0.0.1") || process.env.MONGO_URI.includes("localhost");
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,  // Increased from 5000 for Atlas stability
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,  // Increased from 10000
      maxPoolSize: 10,
      minPoolSize: 5,
      retryWrites: true,
      w: 'majority'
    });
    
    console.log("✓ MongoDB Connected");
    console.log(`  Using: ${isLocalMongo ? "Local MongoDB" : "MongoDB Atlas (Cloud)"}`);
  } catch (error) {
    console.error(`✗ MongoDB Connection Error (Attempt ${attempt}):`, error.message);
    
    const isLocalMongo = process.env.MONGO_URI && (process.env.MONGO_URI.includes("127.0.0.1") || process.env.MONGO_URI.includes("localhost"));
    if (isLocalMongo) {
      console.error("\n⚠ Unable to connect to local MongoDB!");
      console.error("  Quick fix:");
      console.error("  1. Run: check-mongodb.bat (Windows) to diagnose");
      console.error("  2. Or start MongoDB from Services (services.msc)");
      console.error("  3. Or use MongoDB Atlas instead (see .env.example)");
      console.error("");
    }
    
    if (attempt <= 3) {
      console.log(`⏳ Retrying in 5 seconds (${attempt}/3)...\n`);
      setTimeout(() => connectDB(attempt + 1), 5000);
    } else {
      console.error("\n✗ Failed to connect after 3 attempts.");
      console.error("  Please fix MongoDB and restart the server.\n");
      setTimeout(() => connectDB(1), 10000);
    }
  }
};

connectDB();

mongoose.connection.on("disconnected", () => {
  console.warn("⚠ MongoDB disconnected, attempting to reconnect...")
  setTimeout(connectDB, 5000)
})

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log("=============================\n");
});