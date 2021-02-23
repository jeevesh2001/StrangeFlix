const express = require("express");
const app = express();
const path = require("path");
const session=require('express-session');
const flash=require('connect-flash');
app.set('layout','./views/layout/layout')
app.set("views", [__dirname + "/views",__dirname+"/views/user",__dirname+"/views/admin"]);
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(flash())
const PORT = parseInt(process.env.PORT) || 5000;
// Routes
var userloginRouter = require('./routes/user/login');
var userregisterRouter = require('./routes/user/register');
var adminloginrouter=require('./routes/admin/login');
var adminregisterrouter=require('./routes/admin/register')
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use('/', userloginRouter);
app.use('/', userregisterRouter);
app.use('/', adminloginrouter);
app.use('/', adminregisterrouter);
app.get('/',(req,res)=>{
  
  res.render('homepage.ejs')
})
app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
