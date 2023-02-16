const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const studentSchema = new mongoose.Schema(
    {
        studentname : 
        {
            type : String,
            required : true
        },
        marks : 
        {
            type : Number,
            required : true,
            min: 0,
            max:100
        }
    },
    {
        timestamps : true
    }
);

studentSchema.plugin(AutoIncrement,{
    inc_field : 'student',
    id : 'studentNum',
    start_seq : 1
})

module.exports = mongoose.model('Student',studentSchema);