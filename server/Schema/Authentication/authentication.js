import mongoose from 'mongoose'
import { Schema, model } from 'mongoose'
import dotenv from 'dotenv'

const authenticationSchema=new Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minLength: 10
        }
    }
)

const AuthenticationModel=model('Authentication', authenticationSchema)

export default AuthenticationModel;