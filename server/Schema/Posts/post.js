import {Schema, model} from 'mongoose'

const postSchema=new Schema(
    {
        email:{
            type: String,
            required: true
        },
        post:[String],
    }
)

const PostModel=model('Posts', postSchema)

export default PostModel;
