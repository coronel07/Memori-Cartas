const myController = require('../controllers/myController');
const express = require('express');
const router = express.Router();
// const server = require('server.js');

// Define routes and corresponding controller actions
router.route('/').get(myController.inicio);
router.route('/cartas').post(myController.crearCarta);
//router.route('/addImg').post(myController.addImgForm);
router.route('/uploadphoto').post(myController.uploadphoto);
router.route('/photo/:id').get(myController.getimg);

module.exports = router;
