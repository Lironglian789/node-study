const {Service} = require('egg')

class UserService extends Service {
  
  async getAll () {
    // return [{
    //   name: 'come from service'
    // }]
    // 添加测试数据
    const User = this.ctx.model.User
    await User.sync({ force: true })
    await User.create({
      name: "laowang"
    })
    
    return await this.ctx.model.User.findAll()
  }
}

module.exports = UserService