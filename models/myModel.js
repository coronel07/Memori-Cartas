//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ruta: {
    type: String,
    required: true,
  },
});

const imgSchema = new mongoose.Schema({
  contentType: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});
//Creación del modelo Post
const Card = mongoose.model("Card", cardSchema);
const Image = mongoose.model("Image", imgSchema);

module.exports = Card;
module.exports = Image;