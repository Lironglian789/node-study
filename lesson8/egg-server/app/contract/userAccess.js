module.exports = {
  loginRequest: {
    mobile: {type: 'string', required: true, decription: '手机号', example: '18801731528', format: /^1[34578]\d{9}$/},
    password: {type: 'string', required: true, descrption: '密码', example: '111111'},
    
  }
}