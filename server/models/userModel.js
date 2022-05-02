import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name!"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Please enter your email!"],
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please enter your password!"],
        trim:true
    },
    role:{
        type:Number,
        default:0  //o=user 1=admin
    },
    // stripe_account_id:'',
    // stripe_seller:{},
    // stripeSession:{},
    avatar:{
        type:String,
        default:"https://i.ibb.co/HdX4ybd/Nice-Png-user-icon-png-1280406.png"
    }},
    {
        timestamps:true
    })

module.exports = mongoose.model("Users",userSchema)