
const bcrypt=require('bcryptjs');
var crypto=require('crypto');
const express=require('express');
const session=require('express-session');
const flash=require('connect-flash');
const path=require('path');
const con = require("../../helpers/dbConfig.js");
const mailer=require("../../helpers/mailer.js")
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
var info;
let activeExpires=0;
router.post('/userregister',async (req, res)=> {
    req.body.password = await bcrypt.hash(req.body.password, 8);
     info = [
      req.body.name,
      req.body.password,
      req.body.email,
      req.body.mobnumber,
    ];
     con.query("SELECT * FROM Users WHERE email=?",[req.body.email],function(err,result,field){
      if(result.length)
      return res.send("E-mail Already Exists. Please try another E-mail ID")
      else
      {
        crypto.randomBytes(20, function (err, buf) {
          // Ensure the activation code is unique.
          let activeToken = buf.toString('hex');
          
          // Set expiration time is 24 hours.
          activeExpires = Date.now() + 24 * 3600 * 1000;
              var link = 'http://localhost:5000/useraccount/active/'
                         + activeToken;
                
              // Sending activation email
              mailer({
                  to: req.body.email,
                  subject: 'Hello'+req.body.name,
                  html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
              });
            });
            res.send("Activation Link has been sent to your E-mail, activate your account to complete the Process")
          }
        })
      })
  router.get('/useraccount/active/:activeToken', function (req, res, next) {

        // activate and save
        var token=req.params.activeToken;
        if(Date.now>activeExpires)
        return res.send("The Link has Expired, Re-register to continue the registration");
        else{
        var qry = "INSERT INTO Users (name,password,email,mobnumber) VALUES('" + info[0] + "','"+info[1]+"','" + info[2] + "','" + info[3] + "')";
    con.query(qry, function (err, result) {
      if (err) throw err;
        //res.send("Registration Success")
        res.redirect('/userlogin');
      })
    }
    });
  module.exports=router;