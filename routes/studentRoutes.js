const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.route('/')
    .get(studentController.getAllStudentData)
    .post(studentController.createNewStudentData)
    .patch(studentController.updateStudentData)
    .delete(studentController.deleteStudentData)

module.exports = router;