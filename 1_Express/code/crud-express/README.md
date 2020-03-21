# Express - crud

## 1.起步

- 初始化
- 模板处理

## 2.路由设计

| 请求方法 |     请求路径     | get 参数 |           post 参数            |       备注       |
| :------: | :--------------: | :------: | :----------------------------: | :--------------: |
|   GET    |    /students     |          |                                |     渲染首页     |
|   GET    |  /students/new   |          |                                | 渲染添加学生页面 |
|   POST   |  /students/new   |          |   name、age、gender、hobbies   | 处理添加学生请求 |
|   GET    |  /students/edit  |    id    |                                |   渲染编辑页面   |
|   POST   |  /students/edit  |          | id、name、age、gender、hobbies |   处理编辑请求   |
|   GET    | /students/delete |    id    |                                |   处理删除请求   |

## 3.提取路由模块

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

## 4设计操作数据的API文件模块

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



## 5自己编写的步骤

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



