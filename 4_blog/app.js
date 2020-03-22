const express = require('express')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, './views/'))//默认就是这样的，如果想使用其他目录只需要更改目录就行了

//配置解析表单 POST 请求体插件(注意：一定要在app.use(router)之前)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 在Express这个框架中，默认不支持 session 和 cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1.npm install express-session
// 2.配置   (一定要在 app.use(router) 之前)
// 3.使用
//      当你把这个插件配置好之后，我们就可以通过 req.session 来访问和设置 session 成员
//      添加 session 数据： req.session.foo = 'bar'
//      访问 session 数据： req.session.foo

app.use(session({
    secret: 'keyboard cat itdh',//配置加密字符串，他会在原有加密基础之上和这个字符串拼起来去加密，目的是增加安全性，防止客户端恶意伪造
    resave: false,
    saveUninitialized: true //无论你是否使用session，我都默认给你分配一把钥匙
}))

//把路由挂载到 app 中
app.use(router)

app.listen(3000, function() {
    console.log('running...')
})