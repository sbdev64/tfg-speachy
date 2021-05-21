import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  message: String,
  name:  String,
  creator: String,
  selectedFile: String
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage