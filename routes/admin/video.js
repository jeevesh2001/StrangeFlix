const express = require("express");
const router = express.Router();
const multer = require("multer");
const db = require("../../helpers/dbConfig");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(file.mimetype=='video/mp4' || file.mimetype=='video/mov')
    cb(null, "./public/uploads");
    else if(file.mimetype=='image/jpeg')
    cb(null,"./public/img")
  },
  filename: function (req, file, cb) {
    if(file.mimetype=='video/mp4' || file.mimetype=='video/mov')
    cb(null, Date.now() + "-" + file.originalname);
    else if(file.mimetype=='image/jpeg')
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.get("/upload", (req, res) => {
  let sql = "SELECT * FROM categories";
  let categories = [];

  db.query(sql, (err, results) => {
    if (err) {
      throw new Error(err.message);
    }
    categories = results;
  });
  setTimeout(() => {
    res.render("admin/videoUploadForm", { categories });
  }, 1000);
});

router.post("/upload", upload.any(), (req, res) => {
  
  let video = [
    req.body.titleInput,
    req.body.descriptionInput,
    req.body.privacyInput,
    req.files[0].path,
    req.body.categoryInput,
    "user_id",
  ];
  // todo: insert uploadedBy
  let sql =
    "INSERT INTO videos(title, description, privacy, filePath, category, uploadedBy) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, video, (err, results, fields) => {
    if (err) {
      throw new Error(err.message);
    }
  });
 // alert("upload successfull");
  res.redirect('/');
});

module.exports = router;