var mongoose = require('mongoose')

//连接mongodb数据库
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Promise = global.Promise

//创建一个模型
//就是在设计数据库
//MongoDB 是动态的，非常灵活，只需要在代码中设计你的数据库就可以了
//mongoose 这个包就可以让你的设计编写过程变得非常简单
var Cat = mongoose.model('Cat', { name: String })

for (var i = 0; i < 100; i++) {
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
}

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));