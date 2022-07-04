const mongoose = require('mongoose')


console.log('conecting to mongoDB')

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err))
