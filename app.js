const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

const PORT = parseInt(process.env.PORT) || 5000;

// Routes
app.use("/", require("./routes/index"));
app.use("/admin", require("./routes/admin/video"));

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
