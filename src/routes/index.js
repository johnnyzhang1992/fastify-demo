const postSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['a', 'b'],
      properties: {
        a: { type: 'string' },
        b: { type: 'string' },
      },
    },
    response: {
      // 如果缺失，默认返回 400 错误，可在此处修改 400 的返回类型
      400: {
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          error: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
  },

  // 此处可以拦截上面的默认拦截策略
  preValidation: (request, reply, done) => {
    if (!request.body || !request.body.a || !request.body.b) {
      reply
        .code(400)
        .send({ error: 'Bad Request', message: 'Missing required parameters' })
      return
    }
    done()
  },
}

const routes = async (fastify, options) => {
  fastify.get('/', async (request, reply) => {
    console.log('url', request.url)
    console.log(request.query, request.body)
    return { hello: 'world' }
  })

  fastify.get('/ping', async (request, reply) => {
    return 'pong\n'
  })
}

export default routes
