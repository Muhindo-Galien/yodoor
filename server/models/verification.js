const mongoose= require( "mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose;

const verificationSchema = new Schema({
  roomManager: {
    type: ObjectId,
    ref: "Users",
  },
  verifiedHotel: {
    type: ObjectId,
    ref: "Hotel",
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
});

module.exports = mongoose.model("Verification", verificationSchema);
