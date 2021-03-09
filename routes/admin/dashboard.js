const bcrypt = require("bcryptjs");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const con = require("../../helpers/dbConfig.js");
const app = express();

const router = express.Router();

router.get("/admin/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
