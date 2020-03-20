const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use('/public/', express.static('./public/'))

//配置使用 art-template 模板引擎
// 第一个参数表示，当渲染以 .html结尾的文件的时候，使用 art-template 模板引擎
//express-art-template 是专门用来在Express中把 art-template 整合到EXpress中
//虽然外面这里不需要记载art-template ，但是也必须安装，原因就在于express-art-template依赖了art-template
app.engine('html', require('express-art-template'))

//配置body-parser中间件（插件，专门用来解析post表单请求体）
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
//parse application/json
app.use(bodyParser.json())

// Express 为response响应对象提供了一个方法：render
// render 方法默认是不可以使用，但是如果配置了模板引擎就可以使用了
// res.render('html模板名', {模板数据})
// 第一个参数不能写路径，默认会去项目中的 views 目录查找该模板文件
// 也就是说 Express 有一个约定：开发人员把所有的试图文件都放到 views 目录中

let comments = [
  {
    "name": "mike",
    "message": "hello",
    "createTime": "2018-02-12"
  },
  {
    "name": "mike2",
    "message": "hello",
    "createTime": "2018-02-12"
  },
  {
    "name": "mike3",
    "message": "hello",
    "createTime": "2018-02-12"
  },
  {
    "name": "mike4",
    "message": "hello",
    "createTime": "2018-02-12"
  }
]

//如果想要修改默认的 views 目录，则可以
// app.set('views', render函数的默认路径)

app.get('/', function(req, res) {
	res.render('index.html', {
		comments: comments
	})
})

app.get('/post', function(req, res) {
	res.render('post.html')
})

// app.get('/pinglun', function(req, res) {
// 	var comment = req.query
// 	comment.dateTime = '2020-03-20 16:20:30'
// 	comments.unshift(comment)
// 	// res.statusCode = 302
// 	// res.setHeader('Location', "/")
// 	res.redirect('/')
// })

// 当以 POST 请求 /post 的时候，执行指定的处理函数
//这样的话我们就可以利用不同的请求方法让同一个请求路径使用多次
app.post('/post', function(req, res) {
	//1.获取表单 POST 请求体数据
	//2.处理
	//3.发送响应

	//req.query 只能拿 get 请求参数

	//post
	var comment = req.body
	comment.createTime = '2020-03-20 16:20:30'
	comments.unshift(comment)
	res.redirect('/')
})

app.get('/admin', function(req, res) {
	res.render('admin/index.html', {
		title: '管理系统'
	})
})

app.get('/post', function(req, res) {
	res.send('post page')
})

app.listen(3000, function() {
	console.log('running...')
})