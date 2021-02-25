require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

app.set("layout", "./views/layout/layout");
app.set("views", [
  __dirname + "/views",
  __dirname + "/views/user",
  __dirname + "/views/admin",
]);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());

// Routes
const userloginRouter = require("./routes/user/login");
const userregisterRouter = require("./routes/user/register");
const adminloginrouter = require("./routes/admin/login");
const adminregisterrouter = require("./routes/admin/register");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const PORT = parseInt(process.env.PORT) || 5000;

app.get("/", (req, res) => {
  res.render("homepage.ejs");
});
app.use("/", userloginRouter);
app.use("/", userregisterRouter);
app.use("/", adminloginrouter);
app.use("/", adminregisterrouter);

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
