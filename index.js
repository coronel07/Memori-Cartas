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

// Configurando archivos estáticos
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const dbURI = "mongodb://localhost:27017/memori_cartas";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Definir el esquema del modelo 'Carta'
const cartaSchema = new mongoose.Schema({
  nombre: String,
  contenido: String,
});

// Crear el modelo 'Carta' basado en el esquema
const Carta = mongoose.model("Carta", cartaSchema);

app.get("/", (req, res) => {
  Carta.find()
    .then((cartas) => {
      res.render("index", { cartas });
    })
    .catch((err) => {
      console.error("Error retrieving cartas", err);
      res.render("index", { cartas: [] });
    });
});

app.post("/cartas", (req, res) => {
  const { nombre, contenido } = req.body;
  const nuevaCarta = new Carta({ nombre, contenido });

  nuevaCarta
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error creating carta", err);
      res.redirect("/");
    });
});



