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
    },
    location:{
        type: String,
        required: "Location is required",
    },
    price:{
        type: Number,
        trim: true,
    },
    postedBy:{
        type: ObjectId,
        ref: "Users",
    },
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    from:{
        type: Date,
    },
    to:{
        type: Date,

    },
    bed:{
        type: Number,

    },
    verified:{
        type:Boolean,
        default: false,
    },

}, 
{
    timestamps:true
});

module.exports = mongoose.model("Hotel",hotelSchema)