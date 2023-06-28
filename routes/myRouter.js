const myController = require('../controllers/myController');
const express = require('express');
const router = express.Router();
//const server = require('server.js');


//Defino rutas y acciones de respuesta
router.route('/').get(myController.inicio);
router.route("/cartas").post(myController.crearCarta);
router.route("/addImg").get(myController.addImgForm);
router.route("/addImg").post(myController.addImg);

module.exports = router;
