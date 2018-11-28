var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'yuan930905can',
  database: 'nodesample'
})

connection.connect();

var userModSql = 'UPDATE userinfo SET UserName = ?, UserPass = ? where Id = ?';

var userModSql_Params = ['张无忌', '5678', 1];

connection.query(userModSql, userModSql_Params, function(err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('update success!', res);
})

connection.end();