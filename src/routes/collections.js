import Collection from '../models/collections.js'

const collectionRoutes = async (fastify, options) => {
  fastify.get('/collections', async (request, reply) => {
    try {
      const collections = await Collection.find()
      return collections
    } catch (error) {
      reply.send(error)
    }
  })
}
export default collectionRoutes
