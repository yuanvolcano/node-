var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'yuan930905can',
  // database: 'volcano',
  port: '3306'
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('connect success!');
  // 执行sql语句
  connection.query('SELECT 1 + 1 As solution', function(err, rows, fields) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('query success');
  })
  connection.end(function(err, rows, fields) {
    if (err) {
      return;
    }
    console.log('end success');
  })
});