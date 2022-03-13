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
    
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(BAD_REQUEST).json(
                {
                status:"error",
                msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN, (err, user) => {
                if(err) return res.status(BAD_REQUEST).json(
                    {
                    status:"error",
                    msg: "Please login now!"})
                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(SERVER_ERROR).json(
                {
                status:"error",
                msg: err.message})
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(BAD_REQUEST).json(
                {
                    status:"error",
                    msg: "This email does not exist."})

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendEmail(email, url, "Reset your password")
            res.json(
                {
                    status:"success",
                    msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(SERVER_ERROR).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password')
            res.json(users);

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/api/user/refresh_token'})
            return res.json({msg: "Logged out."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
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