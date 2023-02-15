const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const errorHandler = require('./middleware/errorHandler')
const corsOptions = require('./config/corsOptions');

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json())

app.use('/',require('./routes/root'));

app.all('*',(req,res)=>
{
    res.status(404);
    if(req.accepts('json'))
    {
      res.json({message : '404 Not Found'});
    }
})

app.use(errorHandler);

app.listen(PORT,console.log('Backend Server is running'));