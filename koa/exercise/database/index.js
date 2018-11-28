const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yuan930905can',
  database: 'volcano'
})

connection.query('SELECT * FROM my_table',  (error, results, fields) => {
  if (error) throw error
  // connected! 

  // 结束会话
  connection.release() 
});