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

// app
// 	.get('/login', function(req, res) {
// 		res.send('login page') 
// 	})
// 	.get('/aaa', 函数)
// 	.get('/bbb', 函数)