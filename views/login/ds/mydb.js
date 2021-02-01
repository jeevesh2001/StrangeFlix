const sql=require('mysql');
var con=sql.createConnection({
    host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
})
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sqli = "CREATE TABLE Users (username VARCHAR(255), password VARCHAR(255))";
    con.query(sqli, function (err, result) {
      if (err) throw err;
      console.log('Table Created');
    });
  });
module.exports=con;  