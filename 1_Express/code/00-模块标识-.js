var fs = require('fs')

//咱们所使用的所有文件操作的 api 都是异步的
//就像你的 ajax 请求一样，所以本例会先输出foo.js中的结果，再输出文件读取的内容
//文件操作中的相对路径可以省略 ./
// fs.readFile('data/a.txt', function(err, data) {
// 	if (err) {
// 		return console.log('读取失败')
// 	}
// 	console.log(data.toString())
// })

//在模块加载中， 相对路径中的 ./ 不能省略
//Error：Cannot find module 'data/foo.js'
//require('data/foo.js')

//require('./data/foo.js')('hello')

//==============================================分割线===================================================

//在文件操作的相对路径中
//	./data/a.txt  相对于当前目录
//	data/a.txt  相对于当前目录
//	/data/a.txt  绝对路径，相对于当前文件模块所处磁盘根目录
//	c:/xx/xx...  绝对路径

// 这里的 / 代表当前文件所在磁盘的根路径
fs.readFile('/data/a.txt', function(err, data) {
	if (err) {
		console.log(err)
		return console.log('读取失败')
	}
	console.log(data.toString())
})

//如果这里忽略了，则也是磁盘根目录
require('/data/foo.js')