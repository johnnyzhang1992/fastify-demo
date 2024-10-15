import mongoose from 'mongoose'
const { Schema } = mongoose;

const collectionSchema = new Schema({
  collection_name: {
    type: String,
    required: true,
  },
  description: String,
  creator_id: {
    type: String,
    required: true,
  },
  post_article_count: {
    type: Number,
    default: 0,
  },
  concern_user_count: {
    type: Number,
    default: 0,
	},
  is_default: {
    type: Boolean,
    default: false,
  },
  is_follow: {
    type: Boolean,
    default: false,
  },
  is_article_in: {
    type: Boolean,
    default: false,
  },
  permission: {
    type: Number,
    default: 0,
  },
  update_time: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Collection', collectionSchema)
