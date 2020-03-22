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