const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");
const { render } = require("ejs");

app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/img" });

const uri = "mongodb+srv://Lauti888:cuesta@lautaro.ksoark8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const dbName = "test";

client.connect((err) => {
  if (err) return console.log(err);
  console.log("Connected to MongoDB Atlas successfully");

  const db = client.db(dbName);

  app.post("/uploadphoto", upload.single("picture"), (req, res) => {
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
  });

  app.get("/photo/:id", (req, res) => {
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
  })

    app.get("/addImg", (req, res) => {
    res.status(200).render('index');
  })


});

const port = 2500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});