const OneModel = require('../models/myModel');
const moment = require('moment');
const Post = require('../models/myModel');

//Ejemplo de respuesta a una petición de tipo GET
exports.inicio = (req, res) => {
    //crear un documento con mongoose
    res.status(200).render('index');
};

// Crear un nuevo objeto "Post"
const newPost = new Post({
    title: "Mi nuevo post",
    description: "Por fin anda pa ",
    date: new Date(),
    name:'Nicolas'
  });
  
  // Guardar el objeto "Post" en la base de datos
  newPost.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Nuevo post guardado en la base de datos.");
    }
  });
