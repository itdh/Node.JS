# mongoose

- 官网：http://mongoosejs.com
- 官方指南：http://mongoosejs.com/docs/guide.html
- 官方 API 文档：http://mongoosejs.com/docs/api.html
- 中文 API 文档：http://www.mongoosejs.net/docs/api.html

## MongoDB 数据库的基本概念

- 可以有多个数据库
- 一个数据库中可以有多个集合
- 一个集合中可以有多个文档
- 文档结构很灵活，没有任何限制
- MongoDB 非常灵活，不需要像mysql一样先创建数据库、表、设计结构
  - 在这里，只需要当你插入数据的时候指定往哪个数据库的哪个集合操作就可以了
  - 一切都有MongoDB来帮你自动完成建库建表这些事

```javascript
{
    qq: {
        users: [
            {name: '张三', age: 13},
            {name: '李四', age: 14},
            ...
        ],
        products: [
            
        ],
        ...
    },
    taobao: {
        
    },
    baidu: {
        
    }
}
```



## 起步

安装：

```shell
npm i mongoose
```

hello world:

```javascript
var mongoose = require('mongoose')

//连接mongodb数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Promise = global.Promise

//创建一个模型
//就是在设计数据库
//MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
//mongoose 这个包就可以让你的设计编写过程变得非常简单
var Cat = mongoose.model('Cat', { name: String })

//实例化一个Cat
var kitty = new Cat({ name: '喵喵' + i })

//持久化保存 kitty 实例
kitty.save(function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('meow')
    }
})
```

## 官方指南

### 设计Schema发布Model

```javascript
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
```

### 增加数据

```javascript
var admin = new User({
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
})
```

> 运行结果：
> 保存成功
> { _id: 5e75bd7b6bc676350434d9f3,
>   username: 'admin',
>   password: '123456',
>   email: 'admin@admin.com',
>   __v: 0 }

### 查询数据

#### 查询所有数据(这里为了测试再插入一条数据 zs)

```javascript
User.find(function(err, ret) {
    if (err) {
        console.log('查询失败')
    } else {
        console.log(ret)
    }
})
```

> 运行结果
>
> [ { _id: 5e75bd7b6bc676350434d9f3,
>     username: 'admin',
>     password: '123456',
>     email: 'admin@admin.com',
>     __v: 0 },
>   { _id: 5e75bd8cf771cd304cd69c1a,
>     username: 'zs',
>     password: '123456',
>     email: 'zs@zs.com',
>     _v: 0 } ]

#### 查询一条数据

```javascript
User.findOne({
    username: 'zs'
}, function(err, ret) {
    if (err) {
        console.log(查询失败)
    } else {
        console.log(ret)
    }
})
```

> 运行结果：
>
> { _id: 5e75bd8cf771cd304cd69c1a,
>   username: 'zs',
>   password: '123456',
>   email: 'zs@zs.com',
>   __v: 0 }

**注意**：使用find也可以根据条件来查询，查询出来的是一个数组， 而findOne查询出来的直接是一个对象。

### 删除数据

#### 根据条件删除所有：

```javascript
User.remove({
    username: 'zs'
}, function(err, ret) {
    if (err) {
        console.log('删除失败')
    } else {
        console.log('删除成功')
        console.log(ret)
    }
})
```

> 运行结果：
>
> 删除成功
> { n: 1, ok: 1, deletedCount: 1 }

#### 根据条件删除一个：

```javascript
Model.findOneAndRemove(conditions, [options], [callback])
```

#### 根据 id 删除一个

```javascript
Model.findByIdAndRemove(id, [options], [callback])
```

**注意：** `remove` 方法目前已经不建议使用，推荐使用 `deleteOne` 和 `deleteMany` 

### 更新数据

```javascript
User.findByIdAndUpdate('5e75bd7b6bc676350434d9f3', {
    password: '123'
}, function (err, ret) {
    if (err) {
        console.log('更新失败')
    } else {
        console.log('更新成功')
    }
})
```

> 运行结果：
>
> 更新成功



mongoose的增删改查 API 还有很多，具体的可以去看看官方API 文档

