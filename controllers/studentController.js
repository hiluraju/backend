const Student = require('../models/Student');

const getAllStudentData = async (req,res) =>
{
    const students = await Student.find().lean();
    if(!students?.length)
    {
        return res.status(400).json({message:"No Students Found"});
    }
    res.json(students)
}

const createNewStudentData = async(req,res) =>
{
   const {studentname,marks} = req.body;

   if(!studentname || !marks)
   {
        return res.status(400).json({message:"Studentname and Marks Are Required"});
   }

   const duplicate = await Student.findOne({studentname}).lean().exec();


   if(duplicate)
   {
        return res.status(409).json({message:"Duplicate Studentname"});
   }

   const studentObject = { studentname, marks};

   const newstudent = await Student.create(studentObject);

   if(newstudent)
   {
        res.status(200).json({message:`${studentname} Data Added`});
   }
   else
   {
        res.status(409).json({message:"Invalid Student Data"});
   }
}

const updateStudentData = async(req,res) =>
{
    const { id,studentname,marks } = req.body;

    if(!id || !studentname || !marks)
    {
        return res.status(400).json({message:"All fields are required"});
    }

    const student = await Student.findById(id).exec();


    if(!student)
    {
        return res.status(400).json({message:"Student not found"});
    }

    const duplicate = await Student.findOne({ studentname }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate studentname' });
    }

    student.studentname = studentname;
    student.marks = marks;

    const updateStudent = await student.save();

    res.json({ message: `${updateStudent.studentname} updated` });

}

const deleteStudentData = async(req,res) =>
{
    const { id } = req.body

    if(!id) 
    {
        return res.status(400).json({ message: 'Student Id Required' });
    }

    const student = await Student.findById(id).exec();

    if (!student) 
    {
        return res.status(400).json({ message: 'Student Data Not found' })
    }

    const result = await student.deleteOne()

    res.json({ message: `Student ${result.studentname} is deleted` })
}

module.exports = {getAllStudentData,createNewStudentData,updateStudentData,deleteStudentData};