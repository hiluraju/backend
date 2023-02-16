const User = require('../models/User');
const bcrypt = require('bcrypt');


const getAllUsers = async (req,res) =>
{
    const users = await User.find().select('-password').lean();
    if(!users?.length)
    {
        return res.status(400).json({message:"No Users Found"});
    }
    res.json(users)
}

const createNewUser = async(req,res) =>
{
   const {username,password} = req.body;

   if(!username || !password)
   {
        return res.status(400).json({message:"All Fields Are Required"});
   }

   const duplicate = await User.findOne({username}).lean().exec();


   if(duplicate)
   {
        return res.status(409).json({message:"Duplicate Username"});
   }

   const hashedPassword = await bcrypt.hash(password,10);

   const userObject = { username, password : hashedPassword };

   const newuser = await User.create(userObject);

   if(newuser)
   {
        res.status(201).json({message:`New User ${username} Created`});
   }
   else
   {
        res.status(400).json({message:"Invalid User Data"});
   }
}

const updateUser = async(req,res) =>
{
    const { id,username,status,password } = req.body;

    if(!id || !username || typeof status !== 'boolean')
    {
        return res.status(400).json({message:"All fields except password are required"});
    }

    const user = await User.findById(id).exec();

    if(!user)
    {
        return res.status(400).json({message:"User not found"});
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    user.username = username;
    user.status = status;

    if(password)
    {
        user.password = await bcrypt.hash(password, 10)
    }

    const updateUser = await user.save();

    res.json({ message: `${updateUser.username} updated` });

}

const deleteUser = async(req,res) =>
{
    const { id } = req.body

    if(!id) 
    {
        return res.status(400).json({ message: 'User Id Required' });
    }

    const user = await User.findById(id).exec();

    if (!user) 
    {
        return res.status(400).json({ message: 'User Not found' })
    }

    const result = await user.deleteOne()

    res.json({ message: `User ${result.username} is deleted` })

}


module.exports = {getAllUsers,createNewUser,updateUser,deleteUser};