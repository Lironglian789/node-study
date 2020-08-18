const Controller = require('egg').Controller

/**
 * @Controller ⽤户管理
 */
class UserContronller extends Controller {
  constructor (ctx) {
    super(ctx)
  }

  /**
   * @summary 创建⽤户
   * @description 创建⽤户，记录⽤户账户/密码/类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create () {
    const {ctx, service} = this
    // 校验参数
    ctx.validate(ctx.rule.createUserRequest)

    // abc() // 测试统一异常处理
    // ctx.body = 'user ctrl 666'

    // 组装参数
    const payload = ctx.request.body || {}

    // helper⽅法实现统⼀响应格式
    // const res = {abc: '123'}

    // 调⽤ service 进⾏业务处理
    const res = await service.user.create(payload)

    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 删除单个用户
   * @description 删除单个用户
   * @router delete /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @respoxnse 200 baseResponse 创建成功
   */
  async destroy () {
    const {ctx, service} = this
    // 校验参数
    const {id} = ctx.params
    // 调用Service 进行业务处理
    await service.user.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  /**
   * @summary 修改用户
   * @description 获取用户信息
   * @router put /api/user/
   * @response 200 baseResponse 创建成功
   * @ignore
   */
  async update () {
    const {ctx, service} = this
    ctx.validate(ctx.rule.createUserRequest)
    const {id} = ctx.params
    const payload = ctx.request.body || {}
    await service.user.update(id, payload)
    ctx.helper.success({ctx})
  }

  /**
   * @summary 获取单个用户
   * @description 获取用户信息
   * @router get /api/user/{id}
   * @request url baseRequest
   * @response 200 baseResponse 创建成功
   */
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.user.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 获取所有用户(分页/模糊)
   * @description 获取用户信息
   * @router get /api/user
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:10 单页数量
   * @request query string search eg: 搜索字符串
   * @request query boolean isPaging eg:true 是否需要翻页
   * @response 200 baseResponse 创建成功
   */
  async index () {
    const {ctx, service} = this
    const payload = ctx.query
    const res = await service.user.index(payload)
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 删除所选用户
   * @description 获取用户信息
   * @router delete /api/user/{id}
   * @request path string *id
   * @response 200 baseResponse 创建成功
   */
  async removes () {
    const {id} = ctx.request.body
    const payload = id.split(',') || []
    const result = await this.service.user.removes(payload)
    this.ctx.helper.success({ctx})
  }
}

module.exports = UserContronller