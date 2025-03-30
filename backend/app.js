const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const taskRoutes = require('./routes/task')
const authRoutes = require('./routes/auth')
dotenv.config({path: './config/config.env'})

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json

app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/',taskRoutes);
app.use('/',authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.satutsCode || 500;
  const message = error.message;
  res.status(status).json({message: message});
})
mongoose.connect(process.env.MONGO_URI).then(result =>{
  console.log('database connected!');
  app.listen(process.env.PORT)}
).catch(err =>{
  console.log(err);
})
