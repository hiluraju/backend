require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const connectDb = require('./config/dbConfig');
const PORT = process.env.PORT || 3500;
const {errorHandler,logEvents} = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions');

connectDb();

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json())

app.use('/',require('./routes/root'));

app.use('/users',require('./routes/userRoutes'));

app.use('/students',require('./routes/studentRoutes'));

app.all('*',(req,res)=>
{
    res.status(404);
    if(req.accepts('json'))
    {
      res.json({message : '404 Not Found'});
    }
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})
