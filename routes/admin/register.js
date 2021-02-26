
const bcrypt=require('bcryptjs');
const express=require('express');
const session=require('express-session');
const flash=require('connect-flash');
const path=require('path');
const con = require("../../helpers/dbConfig.js");
const app=express();

const router=express.Router();
app.use(session({
	secret: 'admin',
	resave: true,
	saveUninitialized: true
}));


router.get('/adminregister',(req,res)=>{
  res.render('adminregister')
})
router.post('/adminregister',async (req, res)=> {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    con.query("SELECT * FROM Admin WHERE email=?",[req.body.email],function(err,result,field){
      //if(result.length)
      //req.flash('info',"E-mail Already Exists. Please try another E-mail ID")
      {
    var qry = "INSERT INTO Admin (name,username,password,email,mobnumber) VALUES('" + req.body.name + "','"+req.body.username+"','" + req.body.password + "','" + req.body.email + "','" + req.body.mobnumber + "')";
    con.query(qry, function (err, result) {
      if (err) throw err;
        res.redirect('/');
      })}
    });
  })
  module.exports=router;