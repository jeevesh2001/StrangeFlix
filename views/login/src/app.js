const { static } = require('express');
const express=require('express');
const path=require('path');
const con=require('../ds/mydb.js');
const bodyParser=require('body-parser');
const app=express();
app.use(express.static(path.join(__dirname,'../public')));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.post('/auth',(req,res)=>{
    console.log()
})
app.get('',(req,res)=>{
 res.sendFile(path.join(__dirname,'../public/html/index.html'));
})
app.get('/register',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public/html/register.html'));
})
app.post('/register',(req,res)=>{  
        
        var qry = "INSERT INTO Users (username,password) VALUES('"+req.body.username+"','"+req.body.password+"')";
        con.query(qry, function (err, result) {
          if (err) throw err;
          console.log('user Created');
        });
})
app.listen(3000);