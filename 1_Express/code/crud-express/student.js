/**
* student.js
* 数据操作文件模块
* 职责：操作文件中的数据，只处理数据，不关心业务。
*
* 这里才是我们学习 Node 的精华部分：奥义之所在
* 封装异步 API
*/

var fs = require('fs')
var dbPath = './db.json'

/**
* 获取所有学生列表
* callback中的参数列表
*	第一个参数是 err
*		成功是 null
*		错误是错误对象
*	第二个参数是 结果
*		成功是 数字
*		错误是 undefined
* return []
*/
exports.find = function(callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}

/**
* 添加保存学生
*/
exports.save = function(student, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students

		//处理id唯一的，不重复
		if (students.length > 1) {
			student.id = students[students.length - 1].id + 1
		} else {
			student.id = 0
		}

		//把用户传递的对象保存到数组中
		students.push(student)

		//把对象数据转换为字符串
		var fielData = JSON.stringify({
			students: students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath, fielData, function(err) {
			if (err) {
				//错误就是把错误对象传递给它
				return callback(err)
			}
			//成功就没错，所以错误对象是 null
			callback(null)
		})
	})
}

// save({
// 	name: 'xx',
// 	age: 18,
// }, function(err) {
// 	if (err) {
// 		console.log('保存失败了')
// 	} else {
// 		console.log('保存成功')
// 	}
// })

/**
* 根据id查询学生信息。展示在编辑学生页面
*/
exports.findById = function(id, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.find(function(item) {
			return item.id === id
		})
		callback(null, ret)
	})
}

/**
* 更新学生
*/
exports.updateById = function(student, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students

		//注意：这里把id转换为数字，统一类型
		student.id = parseInt(student.id)

		//你要修改谁，就要把谁找出来
		//EcmaScript 6 中的一个数组方法：find
		//需要接受一个函数作为参数
		//当某一个遍历项符合 item.id === student.id 条件的时候，find会终止遍历，同时返回遍历项item
		var stu = students.find(function(item) {
			return item.id === student.id
		})

		// stu.name = student.name
		// stu.age = student.age
		for (var key in student) {
			stu[key] = student[key];
		}

		//把对象数据转换为字符串
		var fielData = JSON.stringify({
			students: students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath, fielData, function(err) {
			if (err) {
				//错误就是把错误对象传递给它
				return callback(err)
			}
			//成功就没错，所以错误对象是 null
			callback(null)
		})
	})
}

// updateById({
// 	id: 1,
// 	name: 'xx',
// 	age: 15
// }, function(err) {

// })

/**
* 删除学生
*/
exports.deleteById = function(id, callback) {
	fs.readFile(dbPath, 'utf8', function(err, data) {
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		
		//findIndex 方法专门用来根据条件查找元素下标
		var deleteIndex = students.findIndex(function(item) {
			return item.id === id
		})

		//根据下标从数组中删除对应的学生对象
		students.splice(deleteIndex, 1)

		//把对象数据转换为字符串
		var fielData = JSON.stringify({
			students: students
		})

		//把字符串保存到文件中
		fs.writeFile(dbPath, fielData, function(err) {
			if (err) {
				//错误就是把错误对象传递给它
				return callback(err)
			}
			//成功就没错，所以错误对象是 null
			callback(null)
		})
	})
}