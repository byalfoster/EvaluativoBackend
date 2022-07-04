const bcrypt = require('bcrypt')
const httpStatus = require('../helpers/httpStatus')

const studentController = (Student) => {
  const getAllStudent = async (req, res, next) => {
    try {
      const { query } = req

      const response = await Student.find(query)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const postStudent = async (req, res, next) => {
    try {
      const { body } = req

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      const encryptedData = {
        ...body,
        password: encryptedPassword
      }

      const student = await new Student(encryptedData)

      await student.save()

      return res.status(httpStatus.CREATED).json(student)
    } catch (err) {
      next(err)
    }
  }

  const putStudentById = async (req, res, next) => {
    try {
      const { body, params } = req

      const checkData = await Student.find({
        _id: params.id
      })

      if (checkData === null) {
        return res
          .status(httpStatus.FORBIDDEN)
          .send('No data found with the provided ID.')
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10)

      await Student.updateOne(
        {
          _id: params.id
        },
        {
          $set: {
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            password: encryptedPassword,
            email: body.email,
            address: body.address,
            phone: body.phone
          }
        }
      )

      return res.status(httpStatus.CREATED).send('Data successful updated')
    } catch (err) {
      next(err)
    }
  }

  const getStudentById = async (req, res, next) => {
    try {
      const { params } = req

      const response = await Student.findById(params.id)

      return res.status(httpStatus.OK).json(response)
    } catch (err) {
      next(err)
    }
  }

  const deleteStudentById = async (req, res, next) => {
    try {
      const { params } = req

      await Student.findByIdAndDelete(params.id)

      return res.status(httpStatus.OK).send('Data successful deleted')
    } catch (err) {
      next(err)
    }
  }

  return {
    getAllStudent,
    getStudentById,
    postStudent,
    putStudentById,
    deleteStudentById
  }
}

module.exports = studentController