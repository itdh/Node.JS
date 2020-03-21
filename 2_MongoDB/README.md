# MongoDB

## 关系型数据库和非关系型数据库

表就是关系，或者说表与表之间存在关系。

- 所有的关系型数据库都需要通过 `SQL` 语言来操作
- 所有的关系型数据库在操作之前都需要设计表结构
- 而且数据表还支持约束
  - 唯一的
  - 主键
  - 默认值
  - 非空
- 非关系型数据库非常的灵活
- 有的非关系型数据库就是 `key-value` 对
- 但是 `MongoDB` 是长得最像关系型数据库的非关系型数据库
  - 数据库 -> 数据库
  - 数据表 -> 集合(数组)
  - 表记录 -> (文档对象)
- MongoDB 不需要设计表结构
- 也就是说你可以任意的往里面存数据，没有结构性这么一说

## 安装

## 启动和关闭数据库

启动：

```shell
# MongoDB 默认使用执行 mongod 命令所处盘符根目录下的 /data/db目录 作为自己的数据存储目录
# 所以在第一次执行该命令之前先自己手动新建一个/data/db 目录
mongod
```

如果想要修改默认的 数据存储目录，可以：

```shell
mongod --dbpath=数据存储目录路径
```

停止

```
在开启服务的控制台，直接 Ctrl + c 即可停止。
或者直接关闭开启服务的控制台也可以。
```

## 连接和退出数据库

连接：

```shell
# 该命令默认连接本机的 MongoDB 服务
mongo
```

退出：

```shell
# 在连接状态输入 exit 退出连接
exit
```

## 基本命令

- `show dbs`
  - 查看显示所有数据库
- `db`
  - 查看当前操作的数据库
- `use 数据库名称`
  - 切换到指定的数据库 (如果没有会新建，数据库中没有数据时使用 `show dbs` 命令不会显示该数据库，只有插入数据后才会显示)
- 插入数据
  - db.`数据库名称`.insertOne(`数据`)

```shell
> show dbs
admin 0.000GB
config 0.000GB
local 0.000GB

> db
test

> use itdh#此处没有itdh数据库，会新建一个
switched to db itdh

> db
itdh

> show dbs#由于现在itdh中没有数据，所以并不会显示
admin 0.000GB
config 0.000GB
local 0.000GB

> db.students.insertOne({"name": "Tom"})
{
	"ackonwledged" : "true"
	"insertedId" : ObjectId("5e75a7381adb108304717e05")
}

> show dbs
admin 0.000GB
config 0.000GB
itdh 0.000GB
local 0.000GB

> show collections#查看数据库中的所有数据（集合）
students

>db.students.find()#查看students中的所有数据
{ "_id" : ObjectId("5e75a7381adb108304717e05"), "name" : "Tom" }
```



## 在 Node 中如何操作 MongoDB 数据库

### 使用官方的 `mongodb` 包来操作

> https://github.com/mongodb/node-mongodb-native

### 使用第三方 `mongoose` 来操作 `MongoDB` 数据库

第三方包： `mongoose` 基于`MongoDB`官方的 `mongodb` 包再一次做了封装

> 网址：https://mongoosejs.com/



# 其他

## 基于原生 `XMLHttpRequest` 封装 GET 方法

```javascript
function get(url, callback) {
    var xhr = new XMLHttpRequest()
    // 当请求加载成功之后要调用指定的函数
    xhr.onload = function() {
        //我现在需要得到这里的 xhr.responseText
        console.log(xhr.responseText)
        callback(xhr.responseText)
    }
    xhr.open('get', url, true)
    xhr.send()
}

// 通过回调函数得到 xhr.responseText 的内容
get('data.json', function(data) {
    console.log(data)
})
```

## package.json 和 package-lock.json

npm 5 以前是不会有 `package-lock.json` 文件的。

npm 5 以后才加入了这个文件。

当你安装包的时候，npm 都会生成或更新 `package-lock.json` 这个文件。

- npm 5 以后的版本不需要加 `--save` 这个参数，它会自动保存依赖信息。
- 当你安装包的时候，它会自动创建或者更新`package-lock.json` 这个文件。
- `package-lock.json` 这个文件会保存 `node_modules` 中所有包的信息（版本、下载地址）。
  - 这样的话重新 `npm install` 的时候速度就可以提升。
- 从文件来看，有一个 `lock` 称之为锁。
  - 这个 `lock` 是用来锁定版本的
  - 如果项目依赖了 `1.1.1` 版本
  - 如果你重新 `install` 其实就会下载最新版本，而不是 `1.1.1`
  - 我们的目的就是希望可以锁住 `1.1.1` 版本
  - 所以这个 `package-lock.json` 文件的另一个作用就是用来锁定版本号，防止自动升级版本