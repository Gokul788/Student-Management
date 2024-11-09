const express = require("express");
const mongoose = require("mongoose");
const  cors = require("cors");
const bodyParser = require("body-parser"); 
require("dotenv").config();
const studentRoutes = require("./routes/studentRoutes")
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to MongoDB"))
.catch(() => console.log("MongoDB connection error:",err))

app.use("/students",studentRoutes)

app.listen(PORT,() =>{
    console.log(`Server is runnig on http://localhost:${PORT}`)
})