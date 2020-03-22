# Node 综合Web案例

## 目录结构

```
.
|-- app.js
|-- comtrollers
|-- models					存放数据模型
|-- node_modules			第三方包
|-- package.json			包描述文件
|-- package-lock.json		第三方包锁定版本文件(npm5以后有)
|-- public					公共的静态资源
|-- README.md				项目说明文档
|-- routes					如果业务比较多,代码量大,最好把路由按照业务的分类存储到这里
|-- router.js				简单一点把所有的路由都放到这个文件
|-- views					存储视图目录
```



## 路由设计

|   路径    | 方法 | get参数 |        post参数         | 是否需要登录 |     备注     |
| :-------: | :--: | :-----: | :---------------------: | :----------: | :----------: |
|     /     | GET  |         |                         |              |   渲染首页   |
| /register | GET  |         |                         |              | 渲染注册页面 |
| /register | POST |         | email,nickname,password |              | 处理注册请求 |
|  /login   | GET  |         |                         |              | 渲染登录页面 |
|  /login   | POST |         |     email,password      |              | 处理登录请求 |
|  /logout  | GET  |         |                         |      是      | 处理退出请求 |
|           |      |         |                         |              |              |

## 模型设计

用户模型:user.js

```javascript
const mongoose = require('mongoose')

//连接mongodb数据库
mongoose.connect('mongodb://localhost/node_blog', { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = mongoose.Schema

var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_time: {
        type: Date,
        // 注意：这里不要写 Date.now() 因为会即刻调用
        //这里直接给了一个方法：Date.now
        //当你去 new Model 的时候，如果你没有传递 create_time ，则 mongoose 就会调用default的 Date.now 方法
        default: Date.now
    },
    last_modified_time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: Number,
        enum: [-1, 0, 1],
        default: -1//保密
    },
    birthday: {
        type: Date
    },
    status: {
        type: Number,
        //0 正常
        //1 不可以评论
        //2 不可以登录使用
        enum: [0, 1, 2],
        default: 0
    }
})

module.exports = mongoose.model('User', userSchema)
```



## 功能实现

### 渲染首页

```javascript
router.get('/', function(req, res) {
    //console.log(req.session.user)
    res.render('index.html', {
        user: req.session.user
    })
})
```

### 渲染注册页

```javascript
router.get('/register', function(req, res) {
    res.render('register.html')
})
```

### 处理注册业务

```javascript
router.post('/register', function(req, res) {
    //1.获取表单提交的数据
    //  req.body
    //2.操作数据库
    //  判断用户是否存在
    //  如果已存在，不允许注册，如果不存在，注册新建用户
    //3.发送响应
    var body = req.body
    User.findOne({
        $or: [
            {email: body.email},
            {nickname: body.nickname}
        ]
    }, function(err, data) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: 'Server Error'
            })
        }
        if (data) {
            //邮箱或昵称已经存在
            return res.status(200).json({
                err_code: 1,
                message: 'email or nickname already exists.'
            })
        }

        //对密码进行md5重复加密
        body.password = md5(md5(body.password))
        new User(body).save(function(err, user) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server Error'
                })
            }

            // 注册成功，使用 session 记录用户的登录状态
            req.session.user = user

            // Express 提供了一个响应方法： json
            // 该方法接收一个对象作为参数，它会自动帮你把对象转为字符串再发送给浏览器
            return res.status(200).json({
                err_code: 0,
                message: 'OK'
            })
        })
    })
})
```

### 渲染登录页

```javascript
router.get('/login', function(req, res) {
    res.render('login.html')
})
```

### 处理登录业务

```javascript
router.post('/login', function(req, res) {
    //1.获取表单数据
    //2.查询数据库用户名和密码是否正确
    //3.发送响应数据
    var body = req.body
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, function(err, user) {
        if (err) {
            return res.json({
                err_code: 500,
                message: err.message
            })
        }

        if (!user) {
            return res.json({
                err_code: 1,
                message: 'email or password is invalid.'
            })
        }

        //用户存在，登录成功，通过 session 记录登录状态
        req.session.user = user
        res.status(200).json({
            err_code: 0,
            message: "ok"
        })
    })
})
```

### 处理退出业务

```javascript
router.get('/logout', function(req, res) {
    //1.清除登录状态
    req.session.user = null
    //2.重定向到登录页
    res.redirect('/login')
})
```



## 书写步骤

- 创建目录结构
- 整合静态页-模板页
  - include
  - block
  - extend
- 设计用户登录,退出,注册的路由
- 用户注册
  - 先处理好客户端页面的内容(表单控件的name,收集表单数据,发起请求)
  - 服务端
    - 先获取客户端请求的数据
    - 操作数据库
      - 如果有错,发送500告诉客户端服务器错了
      - 其他的根据你的业务发送不同的响应数据
- 用户登录
- 用户退出





# 在express中配置使用express-session插件

安装:

```shell
npm install express-session --save
```

配置:

```javascript
//该插件会为 req 请求对象添加一个成员: req.session ,默认是一个对象
//这是最简单的配置方式,暂且先不用关心里面参数的含义
app.use(session({
    //配置加密字符串，他会在原有加密基础之上和这个字符串拼起来去加密
    //目的是增加安全性，防止客户端恶意伪造
    secret: 'keyboard cat itdh',
    resave: false,
    saveUninitialized: true //无论你是否使用session，我都默认给你分配一把钥匙
}))
```

使用:

```javascript
//添加session数据
req.session.foo = 'bar'

//获取session数据
req.session.foo
```

**提示:默认session数据是内存存储的, 服务器一旦重启就会丢失,真正的生产环境会把session进行持久化存储.**

