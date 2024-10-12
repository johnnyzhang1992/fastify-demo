// ESM
import Fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import fastifyCompress from '@fastify/compress'
import fastifyEnv from '@fastify/env'

import routes from './src/routes/index.js'

const fastify = Fastify({
  logger: true,
})

// -- env 配置 -- 开始 -->>
const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    DB_USER: {
      type: 'string',
      default: ''
    }
  },
}

const options = {
  confKey: 'config', // optional, default: 'config'
  schema: schema,
  data: {
    PORT: '8080',
  },
  dotenv: true,
}

fastify.register(fastifyEnv, options)
// 跨域配置
fastify.register(fastifyCors, {
  origin: 'localhost',
  // put your options here
})
// <<-- env 配置 -- 结束---->>

// 压缩
await fastify.register(fastifyCompress, {
  threshold: 1024,
})

// 路由注册
fastify.register(routes)

// jwt 鉴权
// fastify.register(require('@fastify/jwt'), {
//   secret: 'supersecret'
// })

// fastify.post('/signup', (req, reply) => {
//   // some code
//   const token = fastify.jwt.sign({ payload })
//   reply.send({ token })
// })

// fastify.addHook("onRequest", async (request, reply) => {
//   try {
//     await request.jwtVerify()
//   } catch (err) {
//     reply.send(err)
//   }
// })

/**

 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 8080 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
