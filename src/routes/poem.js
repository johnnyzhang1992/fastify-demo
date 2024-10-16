import Poem from '../models/poem.js'

const postSchema = {
	schema: {
		body: {
			type: 'object',
			// required: ['a', 'b'],
			properties: {
				name: { type: 'string' },
				type: { type: 'string' },
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

	// // 此处可以拦截上面的默认拦截策略
	// preValidation: (request, reply, done) => {
	//   if (!request.body || !request.body.a || !request.body.b) {
	//     reply
	//       .code(400)
	//       .send({ error: 'Bad Request', message: 'Missing required parameters' })
	//     return
	//   }
	//   done()
	// },
}

const poemRoutes = async (fastify, options) => {
	fastify.get('/poems', async (request, reply) => {
		const { page = 1, size = 10, type, title } = request.query || {}
		try {
			const skip = page > 1 ? (page - 1) * page : 0
			let findParams = {}
			if (type) {
				findParams = {
					...findParams,
					type: type,
				}
			}
			if (title) {
				findParams = {
					...findParams,
					title: new RegExp(title, 'ig'),
					text_content: new RegExp(title, 'ig'),
				}
			}
			console.log('params', findParams)
			const poems = await Poem.find({ ...findParams })
				.sort({ id: 1 })
				.limit(size)
				.skip(skip)
			const total = await Poem.countDocuments(findParams)
			return {
				poems,
				hasMore: page * size < total,
				page,
				size,
			}
		} catch (error) {
			reply.send(error)
		}
	})
}
export default poemRoutes
