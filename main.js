// imports 
require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

const app = express()
const PORT = process.env.PORT || 4000
const DB_URI = process.env.DB
const url = 'mongodb://127.0.0.1:27017/node_crud';


mongoose.connect(url)
const db = mongoose.connection

db.on("error", (error) => {
    console.log(error)
})
db.once("open", () => {
    console.log("connected")
})


// app.get("/" , (req , res) => {
//     res.send("hello world")
// })

app.listen(PORT, () => {
    console.log(`Server start at http://127.0.0.1:${PORT}`)
})

// middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(session({
    secret:'rahasia',
    saveUninitialized:  true,
    resave:false
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

// set template engine 
app.set("view engine", "ejs"); // Set the view engine to EJS
// app.set("views", path.join( __dirname, "views")); // Specify the views directory
// route prefix 
// app.set("views", path.join(__dirname, "views"));

app.use("" , require("./routes/route"))
