import mongoose from 'mongoose'
import logger from './logger.js'

const dbConnector = async (fastify, options) => {
	fastify.mongo = {}
	try {
		const envs = fastify.getEnvs()
		const { host, db, opts = {} } = options
		const url = `mongodb://${envs.DB_USER}:${envs.DB_PASSWORD}@${host}/${db}`
		fastify.mongo.connect = mongoose.connect(url, opts)
		await fastify.mongo.connect
		fastify.mongo.models = {} // 定义的模型
	} catch (error) {
		console.log(error)
		logger.error(err)
	}
}

export default dbConnector
