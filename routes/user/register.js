
const bcrypt=require('bcryptjs');
const express=require('express');
const session=require('express-session');
const flash=require('connect-flash');
const path=require('path');
const con = require("../../helpers/dbConfig.js");
const app=express();

const router=express.Router();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


router.get('/userregister',(req,res)=>{
  res.render('userregister')
})
router.post('/userregister',async (req, res)=> {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    con.query("SELECT * FROM Users WHERE email=?",[req.body.email],function(err,result,field){
      //if(result.length)
     // req.flash('info',"E-mail Already Exists. Please try another E-mail ID")
      {
    var qry = "INSERT INTO Users (name,password,email,mobnumber) VALUES('" + req.body.name + "','" + req.body.password + "','" + req.body.email + "','" + req.body.mobnumber + "')";
    con.query(qry, function (err, result) {
      if (err) throw err;
        res.redirect('/userlogin');
      })}
    });
  })
  module.exports=router;