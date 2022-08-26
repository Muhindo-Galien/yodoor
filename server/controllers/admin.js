const Users = require("../models/userModel");
export const allUsers = async (req, res) => { 
let allUsers = await Users.find({}).sort({ _id: -1 }).exec();
console.log(allUsers.length);
  res.json(allUsers);
};

