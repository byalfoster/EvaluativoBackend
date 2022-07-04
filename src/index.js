
const express = require('express')
const People = require('./models/peopleModel')
const Student = require('./models/studentModel')
const peopleRouter = require('./routes/peopleRouter')(People)
const authRouter = require('./routes/authRouter')(People)
const studentRouter = require('./routes/studentRouter')(Student)
const errorHandler = require('./middleware/errorHandler')
const httpStatus = require('./helpers/httpStatus')
require('dotenv').config()
const { expressjwt } = require('express-jwt')



const app = express()

require('./database/db')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.all('/*', expressjwt({secret:process.env.SECRET, algorithms: ['HS256']})
    .unless({path: ['/auth/login', '/auth/register']})
    )
app.use((err, _, res, next) => {
    if(err.name === 'UNauthorizedError'){
        res.status(httpStatus.UNAUTHORIZED).json({
            error: err.name,
            cause: 'Unauthorized. missing or invalid token provided'
        })
    }else{
        next(err)
    }
})

app.use('/api', peopleRouter, studentRouter)
app.use('/', authRouter)

app.use(errorHandler)

app .listen(5000, () =>{
    console.log('server is running!')
})
