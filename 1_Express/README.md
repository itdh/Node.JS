# Express

原生的 http 在某些方面表现不足以应对我们的开发需求，所以我们需要使用框架来加快我们的开发效率，框架的目的就是提高效率，让我们的代码高度统一。

在 Node 中，有很多 Web 开发框架，这里以学习 `express` 为主。

- http://expressjs.com/

## 1.起步

### 1.1.安装：

```shell
npm install --save express
```

### 1.2.hello world:

```javascript
const express = require('express')
const app = express()//创建app
app.get('/', function(req, res) {res.send('hello world') })
app.listen(3000, function() {console.log('express app is running...')})
```

### 1.3.基本路由：

路由

- 请求方法
- 请求路径
- 请求处理函数

get：

```javascript
// 当你以 get 方法请求 / 的时候，执行对应的处理函数
app.get('/', function(req, res) {
    res.send('hello world')
})
```

post：

```javascript
// 当你以 post 方法请求 / 的时候，执行对应的处理函数
app.post('/', function(req, res) {
    res.send('Got a post request')
})
```

### 1.4.静态服务

```javascript
// 当省略第一个参数的时候，则可以通过省略 /public 的方式来访问
// /public资源
app.use(express.static('public'))
// /files资源
app.use(express.static('files'))

// 当以 /public/ 开头的时候，去 ./public/ 目录中查找对应的资源
// /static/xxx
app.use('/static', express.static('public'))

app.use('/static', express.static(path.join(__dirname, 'pbulic')))
```

> - path.join() 拼接路径，得到的是绝对路径 , `__dirname` 可以用来获取当前文件模块所属目录的绝对路径
>
> - path.basename
>   - 获取一个路径的文件名（默认包含扩展名，可以加第二个参数文件后缀名，这样得到的就是不包含扩展名的文件名）
> - path.dirname
>   - 获取一个路径中的目录部分
> - path.extname
>   - 获取一个路径中的扩展名部分
> - path.parse
>   - 把一个路径转换为对象
>     - root根路径
>     - dir目录
>     - base包含后缀名的文件名
>     - ext后缀名
>     - name不包含后缀名的文件名
>
> 
>
> Node中的其他成员
>
> 在每个模块中, 除了 `require`  `export` 等模块相关API之外,还有两个特殊的成员
>
> - `__dirname` 可以用来获取当前文件模块所属目录的绝对路径
> - `__filename` 可以用来获取当前文件的绝对路径
> - `dirname` 和 `filename` 是不受执行 node 命令所属路径影响的
>
> 在文件操作中,使用相对路径是不可靠的,因为在Node中文件操作的路径被设计为相对于执行node命令所处的路径.
>
> 所以为了解决这个问题,很简单,只需要把相对路径变为绝对路径就可以了

## 2.在Express中配置使用 `art-template` 模板引擎

- [art-template-GitHub仓库](https://github.com/aui/art-template/)
- [art-template 官方文档](https://aui.github.io/art-template/)

安装：

```shell
npm install --save art-template
npm install --save express-art-template
```

配置：

```javascript
app.engine('art', require('express-art-template'))
```

使用：

```javascript
app.get('/', function(req, res) {
	//express默认会去项目中的views目录中找index.art
	//如果没有要渲染的数据，第二个参数可以省略
	res.render('index.art', {
		title: 'hello'
	})
})
```

如果希望修改默认的`views`视图渲染存储目录，可以通过：

```javascript
//注意：第一个参数 views 千万不要写错
app.set('views', 目录路径)
```



### 3.在Express中获取表单GET请求参数

Express内置了一个api，可以直接通过`req.query`来获取

```javascript
req.query
```





## 4.在Express中获取表单POST请求体数据

在 Express 中没有内置获取表单 POST 请求的 API，这里我们需要使用一个第三方包：`body-parser`。

安装：

```shell
npm install --save body-parser
```

配置：

```javascript
var express = require('express')
//0.引包
var bodyParser = require('body-parser')

var app = express()

//配置 body-parser
//只要加入这个配置，就会在 req 请求对象上多出来一个属性：body
//也就是说你可以直接通过req.body来获取表单 POST 请求体数据了
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//parse application/json
app.use(bodyParser.json())
```

使用：

```javascript
app.use(function(req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    //通过req.body来获取表单post请求体数据
    res.end(JSON.stringify(req.body, null, 2))
})
```



## 5.CRUD案例

### 模块化思想

模块如何划分：

- 模块职责要单一
- Vue
- angular
- React
- 也非常有利于学习前端三大框架

### 5.1起步

- 初始化
- 模板处理

### 5.2路由设计

| 请求方法 |     请求路径     | get 参数 |           post 参数            |       备注       |
| :------: | :--------------: | :------: | :----------------------------: | :--------------: |
|   GET    |    /students     |          |                                |     渲染首页     |
|   GET    |  /students/new   |          |                                | 渲染添加学生页面 |
|   POST   |  /students/new   |          |   name、age、gender、hobbies   | 处理添加学生请求 |
|   GET    |  /students/edit  |    id    |                                |   渲染编辑页面   |
|   POST   |  /students/edit  |          | id、name、age、gender、hobbies |   处理编辑请求   |
|   GET    | /students/delete |    id    |                                |   处理删除请求   |

### 5.3提取路由模块

router.js：

```javascript
/**
* router.js 路由模块
* 职责：
*	处理路由
* 	根据不同的请求方法+请求路径设置具体的请求处理函数
*/
var express = require('express')

//1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到router路由容器中
router.get('/students', function(req, res) {
})

router.get('/students/new', function(req, res) {
})

router.post('/students/new', function(req, res) {
})

router.get('/students/edit', function(req, res) {
})

router.post('/students/edit', function(req, res) {
})

router.get('/students/delete', function(req, res) {
})

//3.把 router 导出
module.exports = router
```

app.js：

```javascript
var router = require('./router')

//挂载路由
app.use(router)
```

### 5.4设计操作数据的API文件模块

student.js：

```javascript
/**
* student.js
* 数据操作文件模块
* 职责：操作文件中的数据，只处理数据，不关心业务。
*/


/**
* 获取所有学生列表
*/
exports.find = function() {

}

/**
* 添加保存学生
*/
exports.save = function() {

}

/**
* 更新学生
*/
exports.update = function() {

}

/**
* 删除学生
*/
exports.delete = function() {

}
```



### 5.5自己编写的步骤

- 处理模板
- 配置开放静态资源
- 配置模板引擎
- 简单路由：/students 渲染静态页出来
- 路由设计
- 提取路由模块
- 由于接下来一系列的业务操作都需要处理文件数据，所以我们需要封装 student.js
- 先写好 student.js 文件结构
  - 查询所有学生列表的 API find
  - findById
  - save
  - updateById
  - deleteById
- 实现具体功能
  - 通过路由收到请求
  - 接收请求中的数据(get、post)
    - req.query
    - req.body
  - 调用数据操作API处理数据
  - 根据操作结果给客户端发送响应
- 业务功能顺序：
  - 列表
  - 添加
  - 编辑
  - 删除
- 涉及到的 ES6 API
  - find
  - findIndex



## 其他问题

### 1.修改完代码自动重启

我们这里可以使用一个第三方命令行工具， `nodemon` 来帮我们解决频繁修改代码重启服务器问题。

`nodemon` 是一个基于 Node.js 开发的一个第三方命令行工具，我们使用的时候需要独立安装。

```shell
# 在任意目录执行该命令都可以
# 也就是说，所有需要 --global 安装的包都可以在任意目录执行
npm install --global nodemon
```

安装完毕之后，使用：

```shell
# 之前启动服务使用 node
node app.js

# 现在使用 nodemon
nodemon app.js
```

只要是通过 `nodemon app.js` 启动的服务，它会监视你的文件变化，当文件发生变化的时候，自动帮你重启服务器。



### 2. 文件操作路径和模块路径

文件操作路径：

```javascript
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
```



模块操作路径：

```javascript
//如果这里忽略了，则也是磁盘根目录
require('/data/foo.js')

//相对路径
require('./data/foo.js')

//模块加载的路径中的相对路径不能省略 ./
```

