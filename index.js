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

const dbURI =
  "mongodb+srv://nikecolas:nicolas07-@cluster01.bm0bl64.mongodb.net/?retryWrites=true&w=majority";


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
var mongoose = require('mongoose');
var Author = require('./author');
var Book = require('./book');

mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
    if (err) throw err;
	
	console.log('Successfully connected');
	
	Book.find({
		title: /mvc/i
	}).sort('-created')
	.limit(5)
	.exec(function(err, books) {
		if (err) throw err;
		
		console.log(books);
	});
	
	Author.findById('59b31406beefa1082819e72f', function(err, author) {
		if (err) throw err;
		
		author.linkedin = 'https://www.linkedin.com/in/jamie-munro-8064ba1a/';
		
		author.save(function(err) {
			if (err) throw err;
			
			console.log('Author updated successfully');
		});
	});
	
	Author.findByIdAndUpdate('59b31406beefa1082819e72f', { linkedin: 'https://www.linkedin.com/in/jamie-munro-8064ba1a/' }, function(err, author) {
		if (err) throw err;
		
		console.log(author);
	});
});


