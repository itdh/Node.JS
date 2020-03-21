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



/*fs.readFile('./data/a.txt', 'UTF8', function(err, data) {
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
})*/