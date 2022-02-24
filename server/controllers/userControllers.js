const Users=  require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
    BAD_REQUEST,
    CREATED,
    NOT_FOUND,
    UNAUTHORIZED,
    OK,
    FORBIDDEN,
    SERVER_ERROR,
  } = require('../constants/statusCodes');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const userControllers = {

    register: catchAsyncErrors(async (req, res,next)  =>{
        try {
            const {name,email,password} = req.body
            // console.log(password.length );
            if(!name || !email || !password)  return  res.status(BAD_REQUEST).json(
                {
                status:"error",
                msg:"Please fill in all fields"
                }
            )
            if(!validateEmail(email)) return  res.status(BAD_REQUEST).json(
                {
                status:"error",
                msg:"Invalid email!"
                }
            )

            if(password.length < 6) return  res.status(BAD_REQUEST).json(
                {
                status:"error",
                msg:"Password must be at least 6 characters."
                }
            )

            const user = await Users.findOne({email});
            if(user)  return  res.status(BAD_REQUEST).json(
                {
                status:"error",
                msg:"This email exists already!"
                }
            )
            
            const hashedPassword = await bcrypt.hash(password,12);

            const newUser = {
                name,email,password:hashedPassword
            }
            console.log(newUser);

            res.json({msg: "register test"})
        } catch (error){
            return  NodeList.status(SERVER_ERROR).json({
                status: "error",
                msg: error.message
            });
        }
    })
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

module.exports = userControllers;