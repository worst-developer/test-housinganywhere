import * as Router from 'koa-router'
import * as Koa from 'koa'
import { Request } from 'koa'
import Logger from '../../utils/logger'
const router = new Router()

router
.post('/check', async (ctx: Koa.Context, next: Function) => {
  try {
    const value = ctx.request.body.value
    
    if (value && value[0] === '@') {
      return ctx.status = 200
    } else {
      throw new Error('Value should start with `@`')
    }
  } catch (error) {
    Logger.loggerError(error)
    ctx.status = 400
    ctx.body = error.message
    return 
  }
})

.post('/submit', async (ctx: Koa.Context, next: Function) => {
  try {
    if (Math.random() < 0.5) {
      return ctx.status = 201
    } else {
      throw new Error('BANG! Try again later')
    }
  } catch (error) {
    Logger.loggerError(error)
    // easteregg🙃
    ctx.status = 418
    ctx.body = error.message
  }
})

export default router