const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;

app.use('/',require('./routes/root'))

app.all('*',(req,res)=>
{
    res.status(404);
    if(req.accepts('json'))
    {
      res.json({message : '404 Not Found'})
    }
})


app.listen(PORT,console.log('Backend Server is running'))