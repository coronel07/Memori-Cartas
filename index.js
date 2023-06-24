const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();
const port = 2500;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* MIDDLEWARES */
app.use(morgan("dev"));
app.use(express.json());

//Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const dbURI ="mongodb+srv://nikecolas:nicolas07-@cluster01.bm0bl64.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => {
    console.error("Error connecting to Mongoose", err);
  });
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
