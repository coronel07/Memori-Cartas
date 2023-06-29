// Importar los modelos Card e Image desde myModel.js
const {Card, Image} = require('../models/myModel.js');
// Importar el módulo multer para manejo de archivos
const multer = require("multer");
// Configurar multer para la carga de archivos en la carpeta "uploads/img"
const upload = multer({ dest: "uploads/img" });

//Ejemplo de respuesta a una petición de tipo GET

 
  exports.inicio = (req, res) => {
    res.status(2500).render('index.js');
  };
  //crear un documento con mongoose
  

// Exportar la función crearCarta como una función asíncrona
// Array de objetos que representan las cartas
// Recorrer el array de cartas y guardar cada una en la base de datos y luego una respuesta exitosa
exports.crearCarta = async (req, res) => {
 const cartas =  [
    { name: "aire", ruta: "img/aire.png" },
    { name: "arriba", ruta: "img/arriba.png" },
    { name: "besa", ruta: "img/besa.png" },
    { name: "dibu", ruta: "img/dibu.png" },
    { name: "llora", ruta: "img/llora.png" },
    { name: "maria", ruta: "img/maria.png" },
    { name: "matinez", ruta: "img/martinez.png" },
    { name: "messi", ruta: "img/messi.png" },
    { name: "oreja", ruta: "img/oreja.png" },
  ];
  for (const cartaObj of cartas) {
    const carta = new Card(cartaObj);
    await carta.save();
  }
  res.status(200).send('Existoso');
}

//exports.addImg = (req, res) => {
  //crear un documento con mongoose
 // res.status(200).render('addImg');
//};
// Exportar el array uploadphoto como un array de middleware
exports.uploadphoto = [upload.single("picture"), (req, res) => {
  
  const img = fs.readFileSync(req.file.path);
  const encode_image = img.toString("base64");

  const finalImg = {
    contentType: req.file.mimetype,
    image: new Buffer.from(encode_image, "base64"),
  };

  db.collection("quotes").insertOne(finalImg, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error saving to database");
    }
    console.log("Saved to database");
    res.redirect("/");
  });
}];

exports.getimg = (req, res) => {
  const filename = req.params.id;
  db.collection("quotes").findOne(
    { _id: ObjectId(filename) },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error retrieving image from database");
      }
      res.contentType(result.contentType);
      res.send(result.image.buffer);
    }
  );
};


  

  