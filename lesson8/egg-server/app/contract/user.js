module.exports = {
  createUserRequest: {
    mobile: {
      type: 'string',
      required: true,
      description: '手机号',
      example:'18721588910',
      format: /^1[34578]\d{9}$/
    },
    password: {
      type: 'string',
      required: true,
      description: '密码',
      example: '11111',
    },
    realName: {
      type: 'string',
      required: true,
      description: '姓名', 
      example: 'Tom'
    }
  }
}