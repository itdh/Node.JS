var mysql = require('mysql')

// 1.创建连接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_db'
})

// 2.连接数据库
connection.connect()

// 3.执行数据操作(这里使用users表，id int 自增主键, username varchar, password varchar)增删改查都是query一个方法
connection.query(`INSERT INTO users VALUES(NULL, "admin", "123456")`, function(error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results)
})

connection.query(`SELECT * FROM users VALUES()`, function(error, results, fields) {
    if (error) throw error
    console.log('The solution is: ', results)
})

// 4.关闭连接
connection.end();