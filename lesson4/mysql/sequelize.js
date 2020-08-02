/**
 * 数据库中间件 ORM - Sequelize 的基本使用
 * 参考资料： 
 * 官方：https://sequelize.org/master/manual/index.html
 * 中文：https://itbilu.com/nodejs/npm/sequelize-docs-v5.html
 */
(async () => {
  const Sequelize = require('sequelize')
  // 建立连接
  const sequelize = new Sequelize('kkb', 'developer', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false // 仍可通过传入 operators map 至 operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
  })

  // 定义模型对象，生成的表会自动加s Fruit =》 Fruits 表示对象集合
  const Fruit = sequelize.define('Fruit', {
    id: { // UUID-主键
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      // Getters & Setters：可用于定义伪属性或映射到数据库字段的保护属性
      // 注意：一定要使用getDataValue()和setDataValue()函数（而不是直接访问基础的“数据值”属性），这样可以保护自定义getter和setter免受底层模型实现的更改。
      get () {
        const fname = this.getDataValue('name')
        const price = this.getDataValue('price')
        const stock = this.getDataValue('stock')
        return `${fname}(价格：￥${price}库存：${stock}kg)`
      }
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {msg: '价格字段请输入数字'},
        min:{args: [0], msg: '价格字段必须大于0'}
      }
    },
    stock: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      validate: {
        isNumeric: {msg: '库存字段请输入数字'}
      }
    }
  }, {
    timestamps: false, // 避免自动生成时间戳字段
    // 禁止修改表名
    // 默认情况下，sequelize 会自动将所有传递的模型名称转换为复数形式。 如果不想这样做，可通过freezeTableName进行设置
    freezeTableName: true,
    // 定义表名，没有定义时会以模块名作为表名
    tableName: 'FRUIT_TABLE',
    // 自动设置字段为蛇型命名规则
    // 不会覆盖已定义的字段选项属性
    underscored: true,
    getterMethods: {
      amount () {
        return this.getDataValue('stock') + 'kg'
      }
    },
    setterMethods: {
      amount (val) {
        const idx = val.indexOf('kg')
        const v = val.slice(0, idx)
        this.setDataValue('stock', v)
      }
    }
  })

  // ***** 模型扩展：可添加模型实例方法或类方法扩展模型 *****
  // 添加类级别方法
  Fruit.classify = function (name) {
    const tropicFruits = ['香蕉', '芒果', '椰子']
    return tropicFruits.includes(name) ? '热带水果': '非热带水果'
  }
  // 添加实例级别方法
  Fruit.prototype.totalPrice = function (count) {
    return (this.price * count).toFixed(2)
  }

  // {force: true}强制同步：创建表之前先删除已存在的表
  let ret = await Fruit.sync()
  // console.log('ret', ret)

  // 插入数据
  // ret = await Fruit.create({
  //   name: '苹果',
  //   price: '3'
  // })

  // 更新数据
  ret = Fruit.findAll()
  await Fruit.update(
    {price: 4},
    {where: {name: '香蕉'}}
  )
  // console.log('findAll:', JSON.stringify(ret))
  
  // 通过模型实例触发setterMethods Fruit.findAll().then(fruits => {})
  ret = await Fruit.findAll().then(fruits => {
    console.log('fruits:', JSON.stringify(fruits));
    // 修改amount，触发setterMethods
    fruits[0].amount = '100kg'
    fruits[0].save()
  })

  // ***** 拓展方法的使用 *****
  // 使用类方法 
  let arr = ['香蕉','草莓']
  arr.forEach(f => {
   console.log(f + '是' + Fruit.classify(f))
  })
  // 使用实例方法
  Fruit.findAll().then(fruits => {
    const [f1] = fruits
    console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`)
  })

  // ***** 查询 *****
  // 通过id查询（不支持了）
  // Fruit.findById(1).then(fruits => {
  //   // fruit是一个Fruit实例，若没有则为null
  //   console.log(fruit.get())
  // })

  // 通过属性查询
  Fruit.findOne({where: {name: '香蕉'}}).then(fruit => {
    // fruit是首个匹配项，若没有则为null
    // console.log(fruit.get())
  })

  // 指定字段查询
  Fruit.findOne({attributes: ['name']}).then(fruit => {
    // fruit是首个匹配项，若没有则为null
    // console.log(fruit.get())
  })

  // 获取数据和总条数
  Fruit.findAndCountAll().then(result => {
    console.log(result.count)
    console.log(result.rows.length)
  })
  
  // 查询操作符
  const Op = Sequelize.Op
  Fruit.findAll({
    // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
    where: {price: {[Op.lt]: 4, [Op.gt]: 2}} // 2 < price < 4
  }).then(fruits => {
    console.log('length:', fruits.length)
  })

  // 或语句查询
  Fruit.findAll({
    where: { price: { [Op.or]:[{[Op.gt]:4 }, {[Op.lte]: 3}]}}
  }).then(fruits =>{
    console.log(fruits[0].get());
  })

  // ***** 分页 *****
  Fruit.findAll({
    offset: 0,
    limit: 2
  }).then(fruits => {
    // console.log(JSON.stringify(fruits));
  })

  // ***** 排序 *****
  Fruit.findAll({
    order: [['price', 'DESC']]
  }).then(fruits => {
    // console.log(JSON.stringify(fruits));
  })

  // ***** 聚合 *****
  Fruit.max("price").then(max => { 
    console.log("max", max); 
  });
  Fruit.sum("price").then(sum => { 
    console.log("sum", sum);
  });

  // ***** 更新 *****
  // 方式1 
  // Fruit.findById(1).then(fruit => { 
  //   fruit.price = 4
  //   fruit.save().then(()=>
  //   console.log('update!')); 
  // });
  // 方式1 
  Fruit.update({price: 9}, {where:{name: '香蕉'}}).then(r => { 
    console.log(r); 
    console.log('update!!!!')
  })

  // ***** 删除 *****
  // 方式1
  // Fruit.findOne({ where: { id: 1 } }).then(r => r.destroy());

  // 方式2 
  Fruit.destroy({ where: { id: '3edd5bc0-d173-11ea-a03e-15b97ffe5c46' } }).then(r => console.log(r));

})()