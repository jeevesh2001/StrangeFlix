require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fs=require('fs')
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
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  var temp=path.join(__dirname,'public/img');
  var login=false;
  var name="User Login";
  fs.readdir(temp,(err,files)=>{
    res.render("homepage",{files,username});
  })
  })
// Routes

app.use("/admin", require("./routes/admin/video"));
const userloginRouter = require("./routes/user/login");
const userregisterRouter = require("./routes/user/register");
const adminloginrouter = require("./routes/admin/login");
const adminregisterrouter = require("./routes/admin/register");
const { all } = require("./routes/user/login");
app.use("/", userloginRouter);
app.use("/", userregisterRouter);
app.use("/", adminloginrouter);
app.use("/", adminregisterrouter);
app.use("/", require("./routes/videostreaming"));

let allfiles=[];
const PORT = parseInt(process.env.PORT) || 5000;
const filepath=path.join(__dirname,'/public/img')

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
