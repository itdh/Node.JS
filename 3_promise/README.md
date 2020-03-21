# promise

参考文档：http://es6.ruanyifeng.com/#docs/promise

callback hell（回调地狱）：



![回调地狱](https://github.com/itdh/Node.JS/raw/master/3_promise/README.assets/u%3D298094450%2C3512000574%26fm%3D15%26gp%3D0.jpg)



无法保证顺序的代码：

```javascript
var fs = require('fs')

fs.readFile('./data/a.txt', 'UTF8', function(err, data) {
    if (err) {
        //return console.log('读取失败')
        // 抛出异常
        //  1.组织程序的执行
        //  2.把错误消息打印到控制台
        throw err
    }
    console.log(data)
})

fs.readFile('./data/b.txt', 'UTF8', function(err, data) {
    if (err) {
        //return console.log('读取失败')
        // 抛出异常
        //  1.组织程序的执行
        //  2.把错误消息打印到控制台
        throw err
    }
    console.log(data)
})

fs.readFile('./data/c.txt', 'UTF8', function(err, data) {
    if (err) {
        //return console.log('读取失败')
        // 抛出异常
        //  1.组织程序的执行
        //  2.把错误消息打印到控制台
        throw err
    }
    console.log(data)
})
```



通过回调嵌套的方式来保证顺序

```javascript
fs.readFile('./data/a.txt', 'UTF8', function(err, data) {
    if (err) {
        //return console.log('读取失败')
        // 抛出异常
        //  1.组织程序的执行
        //  2.把错误消息打印到控制台
        throw err
    }
    console.log(data)
    fs.readFile('./data/b.txt', 'UTF8', function(err, data) {
        if (err) {
            //return console.log('读取失败')
            // 抛出异常
            //  1.组织程序的执行
            //  2.把错误消息打印到控制台
            throw err
        }
        console.log(data)
        fs.readFile('./data/c.txt', 'UTF8', function(err, data) {
            if (err) {
                //return console.log('读取失败')
                // 抛出异常
                //  1.组织程序的执行
                //  2.把错误消息打印到控制台
                throw err
            }
            console.log(data)
        })
    })
})
```



为了解决以上编码方式带来的问题（回调地狱嵌套），所以在 EcamScript 6 中新增了一个 API： `promise`

- Promise 的英文就是承诺、保证的意思（I promise you）

![](https://raw.githubusercontent.com/itdh/Node.JS/master/3_promise/README.assets/promise概念.png)

## Promise基本语法：

```javascript
var fs = require('fs')

// 在 EcmaScript 6 中新增了一个 API Promise
// Promise 是一个构造函数

//console.log(1)

// 创建 Promise 容器
// 1.给别人一个承诺
//   Promise 容器一旦创建，就开始执行里面的代码
var p1 = new Promise(function(resolve, reject) {
    //console.log(2)
    fs.readFile('./data/a.txt', 'utf8', function(err, data) {
        if (err) {
            // 失败了，承诺容器中的任务失败了
            // console.log(err)
            // 把容器的 Pending状态变为 Rejected

            // 调用 reject 就相当于调用了 then 方法的第二个参数函数
            reject(err)
        } else {
            //console.log(3)
            // 承诺容器中的任务成功了
            // console.log(data)
            // 把容器的 Pending 状态改为成功 resolve
            // 也就是说这里的 resolve 方法实际上就是 then 方法传递的哪个function
            resolve(data)
        }
    })
})

//console.log(4)

// p1 就是那个承诺
// 当 p1 成功了 然后(then)做指定的操作
//then 方法接收的 function 就是容器中的 resolve 函数
p1.then(function(data) {
    console.log(data)
}, function(err) {
    console.log('读取文件失败了', err)
})
```

![](https://github.com/itdh/Node.JS/raw/master/3_promise/README.assets/PromiseAPI代码图示.PNG)



## Promise 版本的 readFile

```javascript
var fs = require('fs')

var p1 = new Promise(function(resolve, reject) {
    fs.readFile('./data/a.txt', 'utf8', function(err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

var p2 = new Promise(function(resolve, reject) {
    fs.readFile('./data/b.txt', 'utf8', function(err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

var p3 = new Promise(function(resolve, reject) {
    fs.readFile('./data/c.txt', 'utf8', function(err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})

p1
    .then(function(data) {
        console.log(data)
        // 当 p1 读取成功的时候
        // 当前函数中 return 的结果就可以在后面的 then 中 function 接收到
        // 当你 return 123 后面就接收到 123
        //      return 'hello' 后面就接收到 'hello'
        //      没有 return 后面接收到的就是 undefined
        // 上面那些 return 的数据没什么用，真正有用的是：我们可以 return 一个 Promise 对象
        // 当 return 一个 Promise 对象的时候，后续的 then 中的方法第一个参数会作为 p2 的resolve，第二个参数会作为 p2 的 reject
        return p2
    }, function(err) {
        console.log('读取文件失败了', err)
    })
    .then(function(data) {
        console.log(data)
        return p3
    })
    .then(function(data) {
        console.log(data)
        console.log('end')
    })
```

![](https://github.com/itdh/Node.JS/raw/master/3_promise/README.assets/Promise-API.PNG)



## 封装Promise版本的readFile

```javascript
var fs = require('fs')

function pReadFile(filePath) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, 'utf8', function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

pReadFile('./data/a.txt')
    .then(function(data) {
        console.log(data)
        return  pReadFile('./data/b.txt')
    })
    .then(function(data) {
        console.log(data)
        return  pReadFile('./data/c.txt')
    })
    .then(function(data) {
        console.log(data)
    })
```

