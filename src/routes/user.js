const userRoutes = async (fastify, options) => { 
    fastify.get('/users', async (request, reply) => { 
        return {
            users: []
        }
    })
}

export default userRoutes;