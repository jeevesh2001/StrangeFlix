const express = require("express");
const router = express.Router();
const path=require('path')
const fs=require('fs');
const db=require('../helpers/dbConfig');
const con = require("../helpers/dbConfig");

var F_id; 
router.get("/video/playing",(req,res)=>{
  F_id=req.query.id;
   let sql="SELECT filePath FROM videos WHERE id=?";
   db.query(sql,[F_id],(err,results)=>{
     if (err) throw err
     const temp=path.join(__dirname,'../',String(results[0]['filePath']));
     const stat = fs.statSync(temp)
     const fileSize = stat.size
     const range = req.headers.range
     if (range) {
       const parts = range.replace(/bytes=/, "").split("-")
       const start = parseInt(parts[0], 10)
       const end = parts[1] 
       ? parseInt(parts[1], 10)
       : fileSize-1
       const chunksize = (end-start)+1
       const file = fs.createReadStream(temp, {start, end})
       const head = {
       'Content-Range': `bytes ${start}-${end}/${fileSize}`,
       'Accept-Ranges': 'bytes',
       'Content-Length': chunksize,
       'Content-Type': 'video/mp4',
       }
       res.writeHead(206, head);
       file.pipe(res);
     } else {
       const head = {
       'Content-Length': fileSize,
       'Content-Type': 'video/mp4',
       }
       res.writeHead(200, head)
       fs.createReadStream(temp).pipe(res)
     }
   })
     
})
router.post("/video/playing", (req, res) => {
console.log(req.query);  
  });

  module.exports= router;