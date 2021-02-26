const bcrypt = require("bcryptjs");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const con = require("../../helpers/dbConfig.js");
const app = express();

const router = express.Router();
app.use(flash());
router.get("/adminlogin", (req, res) => {
  req.flash("message", "Incorrect E-mail/Password");
  res.render("adminlogin");
});

router.post("/adminlogin", async (req, res) => {
  var Email = req.body.email;
  var Pass = req.body.password;
  var qry = "SELECT username,email,password FROM Admin WHERE email=? ";
  con.query(qry, [Email], function (err, result, field) {
    if (result.length > 0 && bcrypt.compareSync(Pass, result[0]["password"])) {
      req.session.loggedin = true;
      req.session.username = result[0]["username"];
      res.redirect("/");
    } else {
      res.send(req.flash("message"));
    }
  });
});
router.get("/adminlogout", (req, res) => {
  req.session.loggedin = false;
  req.session.destroy(function (err) {
    if (err) throw err;
  });
  console.log("Admin logout");
  res.redirect("/");
});

module.exports = router;
