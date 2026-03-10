require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")

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

app.get("/", (req, res) => {
  res.json({
    status: "API running",
    service: "portfolio-backend"
  })
})

// routes
app.use("/api/portfolio", require("./routes/portfolioRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))
app.use("/api/landing", require("./routes/landingRoutes"))
app.use("/api/about", require("./routes/aboutRoutes"))
app.use("/api/footer", require("./routes/footerRoutes"))
app.use("/api/contact", require("./routes/contactRoutes"))

// start server
/*
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
  */
module.exports = app;