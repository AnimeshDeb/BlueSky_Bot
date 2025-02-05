import {Schema, model} from 'mongoose'

const postSchema=new Schema(
    {
        email:{
            type: String,
            required: true
        },
        post:{
            text:{type:String, required:true},
            username:{type:String, required:true},
            password:{type:String, required:true},
            calendar:{type:String, required:true},
            time:{type:String, required:true}
        }

    }
)

const PostModel=model('Posts', postSchema)

export default PostModel;
