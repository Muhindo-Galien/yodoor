const Users=  require('../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cookie = require('cookie-parser')

const {
    BAD_REQUEST,
    SERVER_ERROR,
    OK,
  } = require('../constants/statusCodes');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendEmail = require('./sendMail');
const {CLIENT_URL} = process.env

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
            const activation_token = createActivationToken(newUser);
            
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendEmail(email, url, "Verify your email address")


            console.log(newUser);
            console.log({activation_token});

            res.json({msg: "Register success, Please sctivate you email to start"})
        } catch (error){
            return  res.status(SERVER_ERROR).json({
                status: "error",
                msg: error.message
            });
        }
    }),
    activeEmail: catchAsyncErrors(async(req,res)=>{
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.JWT_SECRET)

            const {name, email, password} = user;
            const check = await Users.findOne({email});

            if(check) return res.status(BAD_REQUEST).json({
                status:"error",
                msg:"This Email already exists"
            });
            const newUser = new Users({
                name,email,password
            })

            await newUser.save()
            res.json({
                status:"success",
                msg: "Account has been activated"
            })
            console.log(user);
            console.log("=========================================");
            console.log({name, email, password});
            
        } catch (error) {
            return res.status(SERVER_ERROR).json(
                {status:'error',
                msg: error.message
            }
            )
        }
    }),
    login: catchAsyncErrors(async(req,res)=>{
        try {
            const {email,password} = req.body;
            const user = await Users.findOne({email});
            if(!user) return res.status(BAD_REQUEST).json({
                status:"error",
                msg:"This is email doesn't exist!"
            });

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) return res.status(BAD_REQUEST).json({
                status:"error",
                msg:"Password incorrect!"
            });
            const refresh_token = createRefreshToken({id:user._id});
            console.log("this is refresh_token",refresh_token);
            
            res.cookie('refreshtoken', refresh_token,{
                httpOnly: true,
                path:'/api/user/refresh_token',
                maxAge: 7*24*60*60*100
            })

            res.json({
                status:"success",
                msg:"Login success!"
            })

        } catch (error) {
            res.status(SERVER_ERROR).json(
                {
                    status: "error",
                    msg: error.message
                }
            )
        }
    }),
    getAccessToken: (res,req)=>{
        try {
            // error here
            const rf_token = req.cookies.refreshtoken;
            console.log(rf_token);
             
        } catch (error) {
            res.status(500).json(
                {
                    status: "error",
                    msg: error.message
                }
            )
        
        }
    }
}

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const createActivationToken = (payload)=>{
      return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '10m'})
  }

  const createAccessToken = (payload)=>{
    return jwt.sign(payload, process.env.ACCESS_TOKEN,{expiresIn: '20m'})
  }
    const createRefreshToken = (payload)=>{
        return jwt.sign(payload, process.env.REFRESH_TOKEN,{expiresIn: '10d'})
    }
module.exports = userControllers;