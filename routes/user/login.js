const bcrypt=require('bcryptjs');
const express=require('express');
const session=require('express-session');
const flash=require('connect-flash');
const fs=require('fs')
const path=require('path');
const con = require("../../helpers/dbConfig.js");
const app=express();
const router=express.Router();
app.use(flash());
router.get('/userlogin',(req,res)=>{
  req.flash('message','Incorrect E-mail/Password');
 res.render('userlogin')
})

router.post('/userlogin', (req,res)=> {
  var Email=req.body.email;
  var Pass=req.body.password;
  var qry="SELECT name,email,password FROM Users WHERE email=? "
  con.query(qry,[Email], function(err,result,field){
    if (result.length>0  && bcrypt.compareSync(Pass,result[0]['password']))  
  {
   
   req.session.loggedin=true;
   var temp=path.join(__dirname,'../../public/img');
   var username=result[0]['name'];
   fs.readdir(temp,(err,files)=>{
     
    res.render("homepage",{files,username});
  })
  }
   else
   {
     res.send(req.flash('message'));
   }
   
  });
})
router.get('/userlogout',(req,res)=>{
  req.session.destroy(function(err){
    if (err) throw err;
  });
  console.log('logout')
  var temp=path.join(__dirname,'../../public/img');
  var username="User Login";
  fs.readdir(temp,(err,files)=>{
    
   res.render("homepage",{files,username});
 })
})

module.exports= router;