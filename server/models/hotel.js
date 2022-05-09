import mongoose from 'mongoose';
const {Schema} = mongoose;
const {ObjectId} = mongoose;
// const ObjectId = mongoose.Types.ObjectId;
const hotelSchema = new Schema({
    title:{
        type: String,
        required: "Title is required",
    },
    content:{
        type: String,
        required: "Content is required",
        maxlength: 1000,
    },
    location:{
        type: String,
        required: "Location is required",
    },
    price:{
        type: Number,
        required: "Price is required",
        trim: true,
    },
    postedBy:{
        type: ObjectId,
        ref: "Users",
    },
    image:{
        type:Buffer,
        // contentType:String,
        // required: "Image is required",

    },
    from:{
        type: Date,
        
    },
    to:{
        type: Date,
    },
    bed:{
        type: Number,
        required: "Number of bed is required",
    },
}, 
{
    timestamps:true
});

module.exports = mongoose.model("Hotel",hotelSchema)