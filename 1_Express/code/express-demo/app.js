const express = require('express')

//1.创建app
const app = express()

// 当以 /public/ 开头的时候，去 ./public/ 目录中查找对应的资源
//这种方式更容易辨识，推荐使用这种方式
app.use('/public', express.static('./public/'))

// 当省略第一个参数的时候，则可以通过省略 /public 的方式来访问
//app.use(express.static('./public/'))

// 必须是 /a/public目录中的资源具体路径(浏览器访问/a/...，服务器从/public目录寻找资源，相当于给public取了个别名)
//app.use('/a/', express.static('./public/'))


app.get('/', function(req, res) {
	//原来的方法也可以使用，但是不推荐使用
	// res.write('hello ')
	// res.write('world ')
	// res.end()

	//res.end('hello world')

	res.send('hello world') 
})

//路由其实就是一张表
//这个表里面有具体的映射关系

app.get('/login', function(req, res) {
	res.send('login page') 
})

app.listen(3000, function() {
	console.log('express app is running...')
})