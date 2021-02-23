require("dotenv").config();
const mysql = require("mysql");

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "StrangeFlix",
});

con.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.message);
    return;
  }
  console.log("Connected as id " + con.threadId);
});

module.exports = con;