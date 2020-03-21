var mongoose = require('mongoose')

var Schema = mongoose.Schema

//1.连接mongodb数据库
// 指定连接的数据库不需要存在，当你插入第一条数据之后就会自动被创建出来
mongoose.connect('mongodb://localhost/itdh', { useNewUrlParser: true, useUnifiedTopology: true })

//2.设计集合结构（表结构）
//字段名称就是表结构中的属性名称
//值
//约束的目的是为了保证数据的完整性，不要有脏数据
// var blogSchema = new Schema({
//     title: String,
//     author: String,
//     body: String,
//     comments: [{ body: String, data: Date }],
//     data: { type: Date, default: Date.now },
//     hidden: Boolean,
//     meta: {
//         votes: Number,
//         favs: Number
//     }
// })
var userSchema = new Schema({
    username: {
        type: String,
        required: true //必须有
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    }
})

//3.将文档结构发布为模型
//  mongoose 方法就是用来将一个架构发布为 model
//  第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称，mongoose会自动将大写名词的字符串生成 小写复数 的集合名称
//              例如这里的 User 最终会变成 users 集合名称
//  第二个参数：架构Schema
//
//  返回值：模型构造函数
var User = mongoose.model('User', userSchema)

//4. 当我们有了模型构造函数以后，就可以使用这个构造函数对 users 集合中的数据为所欲为了（增删改查）

// *************************************************
//                添加数据
// *************************************************
/*var admin = new User({
    username: 'admin',
    password: '123456',
    email: 'admin@admin.com'
})

admin.save(function(err, ret) {
    if (err) {
        console.log('存储失败')
    } else {
        console.log('保存成功')
        console.log(ret)
    }
})*/

// *************************************************
//                查询数据
// *************************************************
//查询所有,这里为了测试再插入一条数据 zs
/*User.find(function(err, ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})*/

// 用户注册
// 1.判断用户是否存在
//      如果已经存在，结束注册
//      如果不存在，注册（保存一条用户信息）
// User.find()
//     .then(function(data) {
//         console.log(data)
//     })
//假设这里注册的是admin用户
User.findOne({
    username: 'admin'
})
.then(function(user) {
    if (user) {
        //用户已存在，不能注册
        console.log('用户已存在')
    } else{
        //用户不存在，可以注册
        return new User({
            username: 'admin',
            password: '123',
            email: 'admin@admin.com'
        }).save()
    }
})
.then(function(ret) {
})

//查询一条数据
/*User.findOne({
    username: 'zs'
}, function(err, ret) {
    if (err) {
        console.log(查询失败)
    } else {
        console.log(ret)
    }
})*/

// *************************************************
//                删除数据
// *************************************************
/*User.remove({
    username: 'zs'
}, function(err, ret) {
    if (err) {
        console.log('删除失败')
    } else {
        console.log('删除成功')
        console.log(ret)
    }
})*/

// *************************************************
//                更新数据
// *************************************************
/*User.findByIdAndUpdate('5e75bd7b6bc676350434d9f3', {
    password: '123'
}, function (err, ret) {
    if (err) {
        console.log('更新失败')
    } else {
        console.log('更新成功')
    }
})*/
