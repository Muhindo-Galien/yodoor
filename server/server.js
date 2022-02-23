import express from 'express';
import fs from 'fs';
import cors from 'cors';
import mongoose from 'mongoose';
const morgan = require('morgan')
require('dotenv').config();


const app = express();

// DB connection
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).
then(console.log('DB connected successfully')).catch((err)=>console.log(`DB connection Error`, err))

//midlleware
app.use(cors())
app.use(morgan('dev'))

// routes midlware

fs.readdirSync('./routes').map((r)=>
app.use('/api', require(`./routes/${r}`)));

const port = process.env.PORT || 5000;


app.listen(port, ()=>console.log(`Server running on port ${port}`))