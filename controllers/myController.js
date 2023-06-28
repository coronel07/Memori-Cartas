const Card = require('../models/myModel.js');

//Ejemplo de respuesta a una petición de tipo GET
exports.inicio = (req, res) => {
  //crear un documento con mongoose
  res.status(200).render('index');
};

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
}


  

  