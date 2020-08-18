/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1596983710234_7549';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'kkb',
      description: 'kkb swagger',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    prodcues: ['application/json'],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true,
    enable: true
  }

  // 统一异常处理注册的两种方式
  // 1. 通过理中间件处理
  // config.middleware = ['errorHandler']
  // 2. 通过注册onerror配置
  config.onerror = {
    all(err, ctx) {
      // 所有的异常都在 app 上触发⼀个 error 事件，框架会记录⼀条错误⽇志
      ctx.app.emit('error', err, this)
      const status = err.status || 500
      // ⽣产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = status === 500 && ctx.app.config.env === 'prod' ?
      'Internal Server Error' : err.message
      //从error对象中读取各个属性，设置到响应中
      ctx.body = {
        code: status, // 服务端⾃身的处理逻辑错误(包含框架错误500 及 ⾃定义业务逻辑错误533开始 ) 客户端请求参数导致的错误(4xx开始)，设置不同的状态码
        error: error
      }
      if (status === 422) {
        ctx.body.detail = err.errors
      }
      ctx.status = 200
    }
  }

  // 添加Model层
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/egg_x',
    options: {
      //  useMongoClient: true,
      autoReconnect: true,
      reconnectTries:  Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  }

  // 添加用户鉴权
  config.jwt = {
    secret:'Great4-M',
    enable: true,   // default is false
    match: /^\/api/  // optional
  }

  return {
    ...config,
    ...userConfig,
  };
};
