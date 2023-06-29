const app = require("./app")
const mongoose = require("mongoose");
const uri = "mongodb+srv://Lauti888:cuesta@lautaro.ksoark8.mongodb.net/?retryWrites=true&w=majority";
//const multer = require("multer");
//const fs = require("fs");
//const { MongoClient, ObjectId } = require("mongodb");
//const { render } = require("ejs");

//app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(uri, {
        useNewUrlParser: true,
    })
    .then((con) => {
        //console.log(con.connections);
        console.log("Connected to database");
    });
 
const port = 2500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 