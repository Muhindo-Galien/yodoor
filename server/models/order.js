import mongoose from 'mongoose';
const {Schema} = mongoose;
const {ObjectId} = mongoose;

const orderSchema = new Schema({
    hotel:{
        type:ObjectId,
        ref:"Hotel",
    },
    session:{},
    orderedBy:{
        type:ObjectId,
        ref:"Users",
    }
}, 
{
    timestamps:true
});

module.exports = mongoose.model("Order",orderSchema)