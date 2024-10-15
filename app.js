// ESM
import Fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import fastifyCompress from '@fastify/compress'
import fastifyEnv from '@fastify/env'
import fastifyRateLimit from '@fastify/rate-limit'
// import fastifyRedis from '@fastify/redis'
import dayjs from 'dayjs'
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url'

import dbConnector from './src/utils/db.js'
import routes from './src/routes/index.js'
import logger from './src/utils/logger.js'
import userRoutes from './src/routes/user.js'
import collectionRoutes from './src/routes/collections.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fastify = Fastify({
  logger: true,
})

// static 静态资源 https://github.com/fastify/fastify-static
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
  // constraints: { host: 'localhost' } // optional: default {}
})

// 限流 https://github.com/fastify/fastify-rate-limit
await fastify.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
})

// redis https://github.com/fastify/fastify-redis
// fastify.register(fastifyRedis, {
//   host: '127.0.0.1',
//   password: 'your strong password here',
//   port: 6379, // Redis port
//   family: 4   // 4 (IPv4) or 6 (IPv6),
//   closeClient: true
// })

// -- env 配置 -- 开始 -->>
const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '8080',
    },
    DB_USER: {
      type: 'string',
      default: '',
		},
    DB_PASSWORD: {
      type: 'string',
      default: '',
		},
		
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
// <<-- env 配置 -- 结束----

// 数据库 Mongodb -------------
fastify.register(dbConnector, {
	host: '47.116.200.115:27017',
	db: 'question_db',
  opts: {}
})

// 跨域配置
fastify.register(fastifyCors, {
  origin: 'localhost', // 白名单
  // put your options here
})

// 压缩
await fastify.register(fastifyCompress, {
  threshold: 1024,
})

// 路由注册 ----------------------
fastify.register(routes)
fastify.register(userRoutes)
fastify.register(collectionRoutes)

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
fastify.addHook('onRequest', async (request, reply) => {
  try {
    if (request.method.toLowerCase() === 'get') {
      logger.info(
        `time: ${dayjs().format('YYYY-MM-DD HH:mm:ss')};methond: ${
          request.method
        };url:${request.url};`
      )
    } else {
      logger.info(
        `time: ${dayjs().format('YYYY-MM-DD HH:mm:ss')};methond: ${
          request.method
        };url:${request.url};body: ${JSON.stringify(request.body)}`
      )
    }
  } catch (err) {
    reply.send(err)
  }
})

// fastify.setErrorHandler(function (error, request, reply) {
//   if (error.statusCode === 429) {
//     reply.code(429)
//     error.message = 'You hit the rate limit! Slow down please!'
//   }
//   reply.send(error)
// })

/**

 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 8080 })
  } catch (err) {
    fastify.log.error(err)
    logger.error(err)
    process.exit(1)
  }
}
start()
