/**
* router.js 路由模块
* 职责：
*	处理路由
* 	根据不同的请求方法+请求路径设置具体的请求处理函数
*/

var fs = require('fs')
var Student = require('./student')

// Student.updateById({
// 	id: 1,
// 	name: '张三1',
// 	age: 19
// }, function(err) {
// 	if (err) {
// 		return console.log('修改失败')
// 	}
// 	console.log('修改成功')
// })

// Express 提供了更好的方式，专门用来包装路由
var express = require('express')

//1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到router路由容器中
//展示学生列表
router.get('/students', function(req, res) {
	//readFile的第二个参数是可选的，传入UTF8就是告诉它把读取到的文件直接按照UTF8编码转成我们能认识的字符
	//除了这样来转换，也可以通过 data.toString()的方式
	/*fs.readFile('./db.json', 'UTF8', function(err, data) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.render('index.html', {
			fruits: [
				'苹果',
				'香蕉',
				'橘子'
			],
			"students": JSON.parse(data).students//从文件中读取的数据一定是字符串，所有这里一定要手动转成对象
		})
	})*/

	Student.find(function(err, students) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.render('index.html', {
			fruits: [
				'苹果',
				'香蕉',
				'橘子'
			],
			"students": students//从文件中读取的数据一定是字符串，所有这里一定要手动转成对象
		})
	})
})

//渲染添加学生页面
router.get('/students/new', function(req, res) {
	res.render('new.html')
})

//处理添加学生
router.post('/students/new', function(req, res) {
	//1.获取表单数据
	//2.处理
	//	将数据保存到 db.json 文件中，用以持久化
	//3.发送响应
	//先读取出来，然后转成对象,然后往对象中push，再将对象转换为字符串,然后把字符串再一次写入文件
	var student = req.body
	Student.save(student, function(err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

//渲染编辑学生页面
router.get('/students/edit', function(req, res) {
	//1.在客户端的列表页处理链接问题（需要有id参数）
	//2.获取要编辑的学生id
	//3.渲染编辑页面
	//	根据 id 把学生信息查出来
	//	使用模板引擎渲染页面

	//通过req.query 拿到的的参数是string，而我们保存的id是int类型，所以需要转换
	Student.findById(parseInt(req.query.id), function(err, student) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.render('edit.html', {
			student: student
		})
	})
})

//处理编辑学生
router.post('/students/edit', function(req, res) {
	//1.获取表单数据
	//	req.body
	//2.更新
	//	Student.updateById()
	//3.发送响应
	Student.updateById(req.body, function(err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

//处理删除学生
router.get('/students/delete', function(req, res) {
	//1.获取要删除的 id
	//2.根据 id 执行删除操作
	//3.根据操作结果发送响应数据
	Student.deleteById(parseInt(req.query.id), function(err) {
		if (err) {
			return res.status(500).send('Server error.')
		}
		res.redirect('/students')
	})
})

//3.把 router 导出
module.exports = router

//这样不方便
/*module.exports = function(app) {
	app.get('/students', function(req, res) {
		//readFile的第二个参数是可选的，传入UTF8就是告诉它把读取到的文件直接按照UTF8编码转成我们能认识的字符
		//除了这样来转换，也可以通过 data.toString()的方式
		fs.readFile('./db.json', 'UTF8', function(err, data) {
			if (err) {
				return res.status(500).send('Server error.')
			}
			res.render('index.html', {
				fruits: [
					'苹果',
					'香蕉',
					'橘子'
				],
				"students": JSON.parse(data).students//从文件中读取的数据一定是字符串，所有这里一定要手动转成对象
			})
		})
	})

	app.get('/students/new', function(req, res) {

	})

	app.post('/students', function(req, res) {

	})

	app.get('/students/edit', function(req, res) {

	})

	app.post('/students/edit', function(req, res) {

	})

	app.get('/students/delete', function(req, res) {

	})
}*/