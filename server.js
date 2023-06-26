const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const { MongoClient, ObjectId } = require("mongodb");

app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/img" });

const myurl = "mongodb://localhost:27017"; // Cambiado el puerto a 27017
const dbName = "test";

MongoClient.connect(myurl, (err, client) => {
  if (err) return console.log(err);
  console.log("Connected to MongoDB successfully");

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
  });

  const port = 2500;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});


