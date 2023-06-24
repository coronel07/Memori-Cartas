const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
app.use(bodyParser.urlencoded({ extended: true }));

const MongoClient = require("mongodb").MongoClient;
const myurl = "mongodb://localhost:2500";
MongoClient.connect(myurl, (err, client) => {
  if (err) return console.log(err);
  db = client.db("test");
  app.listen(2500, () => {
    console.log("listening on 2500");
  });
});

//inicializaremos todos los módulos, crearemos una aplicación Express y crearemos un servidor
// para conectarse a los navegadores.
//CREATE EXPRESS APP
const app1 = express();
//ROUTES WILL GO HERE
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index1.html");
});
app.listen(2500, () => console.log("Server started on port 2500"));

// almacenamiento del multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
var upload = multer({ storage: storage });

//Uploading multiple files
app.post("/uploadmultiple", upload.array("myFiles", 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(files);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_database_user",
  password: "your_database_password",
  database: "your_database_name",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    throw err;
  }
  console.log("Connected to MySQL database!");
});

//Carga de variables de entorno
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Conexión al cloud de Mongodb Atlas
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongoose");
  })
  .catch((err) => {
    console.error("Error connecting to Mongoose", err);
  });

const port = 2500;
//Corremos el servidor en el puerto seleccionado
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port} correctamente`);
});
//Metodo POST que permita guardar imágenes en la base de datos.

app.post("/uploadphoto", upload.single("picture"), (req, res) => {
  var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString("img");
  // Define a JSONobject for the image attributes for saving to database

  var finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_image, "img"),
  };
  db.collection("quotes").insertOne(finalImg, (err, result) => {
    console.log(result);
    if (err) return console.log(err);
    console.log("saved to database");
    res.redirect("/");
  });
});
app.get("/photos", (req, res) => {
  db.collection("mycollection")
    .find()
    .toArray((err, result) => {
      const imgArray = result.map((element) => element._id);
      console.log(imgArray);
      if (err) return console.log(err);
      res.send(imgArray);
    });
});
//Como ya conocemos los id's de las imágenes, podemos ver una imagen pasando su id en el navegador, como se ilustra a continuación.

app.get("/photo/:id", (req, res) => {
  var filename = req.params.id;
  db.collection("mycollection").findOne(
    { _id: ObjectId(filename) },
    (err, result) => {
      if (err) return console.log(err);
      res.contentType("image/jpeg");
      res.send(result.image.buffer);
    }
  );
});
