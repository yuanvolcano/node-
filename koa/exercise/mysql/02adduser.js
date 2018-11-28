var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'yuan930905can',
  database: 'nodesample'
})

connection.connect();

var userAddSql = 'INSERT INTO userinfo(Id, UserName, UserPass) VALUES(0, ?, ?)';

var userAddSql_Params = ['Wilson', 'abcd'];

connection.query(userAddSql, userAddSql_Params, function(err, res) {
  if (err) {
    console.log('insert error', err);
    return;
  }
  console.log('insert success!', res);
})

connection.end();