// 1. 加载模块
const mongoose = require("mongoose");
// Mongoose 做异步操作时，为了向后兼容，Mongoose 4 默认使用mpromise 作为返回值。mpromise已被废弃，推荐使用 ES6风格的 promises库或者ES6原生的Promise库
// ES6原生的Promise库
mongoose.Promise = global.Promise;
// 2. 连接数据库 mongod 服务器端  mongo客户端
//数据库的名称可以是不存在 创建一个Yang数据库
const db = mongoose.connect("mongodb://localhost:27017/Yang", { useMongoClient: true });

//如果连接失败会执行error回调
mongoose.connection.on("error", (error) => {
    console.log("数据库连接失败：" + error);
});
//如果连接成功会执行open回调
mongoose.connection.on("open",  () => {
    console.log("数据库连接成功");
});
// 定义一个 schema,描述此集合里有哪些字段，字段是什么类型
// 只有schema中有的属性才能被保存到数据库中
let PersonSchema = new mongoose.Schema({
    name : { type: String },
    home : { type: String },
    age  : { type: Number, default: 0 },
    time : { type: Date, default: Date.now },
    email: { type: String, default: ''}
});
// 创建模型，可以用它来操作数据库中的person集合，指的是整体
let PersonModel = db.model("person", PersonSchema, "person");

// 根据模型创建实体，是指的个体对象
var personEntity = new PersonModel({
    name : "Vexth",
    age  : 6,
    email: "Vexth@qq.com",
    home : 'jian'
});

//向集合中插入10个文档
// for(var i = 1; i <= 10; i++){
//     //向数据中保存文档
//     PersonModel.create({ name: 'Vexth' + i, age: i}, function (err,doc) {
//         if (err) console.log(err);
//         else
//           console.log(doc);// doci
//     });
//     //所有的异步方法都是在所有的同步方法执行完毕之后才执行的
//     console.log(i);
// }

// 用save 方法把自己保存到数据库中
// personEntity.save((error, doc) => {
//     if(error) {
//         console.log("error :" + error);
//     } else {
//         // console.log(doc);
//         console.log("写入数据库成功！！！");
//     }
// });

// PersonModel.find({}, function (err, docs) {  
//     console.log(docs);
// }); 

class Entity {
    constructor () {}

    // 查询所有的数据
    query() {
        return PersonModel.find({}).then(res => res);
    }

    // 新增数据
    save(res) {
        return PersonModel.create(res).then(res => console.log(res));
    }

    // 删除数据
    remove(res) {
        return PersonModel.remove(res).then(res => console.log(res))
    }

    // 修改数据
    update(conditions, updates) {
        return PersonModel.update(conditions, updates).then(res => console.log(res))
    }
}


module.exports = Entity;