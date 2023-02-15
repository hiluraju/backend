const mongoose = require('mongoose');

const connectDb = async () =>
{
    try
    {
        await mongoose.connect(process.env.DATABASE_URI);
    }
    catch(e)
    {
        console.log(e)
    }
}

module.exports = connectDb;