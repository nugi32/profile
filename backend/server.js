require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const path = require("path")

const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 5000

console.log("\n=== Starting Backend Server ===")
console.log("Port:", PORT)

// connect database
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.error(err))

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

// allow cross-origin requests from the frontend
app.use(cors())

// static files
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

// routes
app.use("/api/portfolio", require("./routes/portfolioRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))
app.use("/api/landing", require("./routes/landingRoutes"))
app.use("/api/about", require("./routes/aboutRoutes"))
app.use("/api/footer", require("./routes/footerRoutes"))
app.use("/api/contact", require("./routes/contactRoutes"))

// start server
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})