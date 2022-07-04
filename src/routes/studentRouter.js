const express = require ('express')
const studentController = require('../controllers/studentController')
const validator = require('express-joi-validation').createValidator({})
const bodySchema = require('../validations/studenBodyValidator')




const router = (Student) =>{

    const studentRouter = express.Router()

    const { getAllStudent, getStudentById, postStudent, putStudentById, deleteStudentById } = studentController(Student)


    studentRouter
        .route('/student')
        .get(getAllStudent)
        .post(validator.body(bodySchema),postStudent)

    studentRouter
        .route('/student/:id')
        .get(getStudentById)
        .put(validator.body(bodySchema),putStudentById)
        .delete(deleteStudentById);

  return studentRouter
}
module.exports = router