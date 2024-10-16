import mongoose from 'mongoose'
const { Schema } = mongoose

const poemSchema = new Schema({
	id: {
		type: Number,
		default: -1,
		unique: true
	},
	source_id: Number,
	title: String,
	dynasty: String,
	tags: String,
	background: String,
	content: Schema.Types.Mixed,
	type: {
		type: String,
		default: '诗',
	},
	author_id: Number,
	author_source_id: Number,
	collect_count: {
		type: Number,
		default: 0,
	},
	like_count: {
		type: Number,
		default: 0,
	},
	pv_count: {
		type: Number,
		default: 0,
	},
	text_content: String,
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model('Poem', poemSchema)
