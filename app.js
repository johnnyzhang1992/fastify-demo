// ESM
import Fastify from "fastify";
import { fastifyCors } from "@fastify/cors";

import routes  from "./src/routes/index.js";

const fastify = Fastify({
  logger: true,
});

// 跨域配置
fastify.register(fastifyCors, {
  origin: "localhost"
  // put your options here
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
    await fastify.listen({ port: 8080 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
