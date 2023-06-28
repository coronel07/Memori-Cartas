//Modelo de ejemplo para alojar datos en una DB mongo
const mongoose = require("mongoose");

//Creación del Schema Post
const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ruta: {
        type: String,
        required: true
    },
});

//Creación del modelo Post
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
