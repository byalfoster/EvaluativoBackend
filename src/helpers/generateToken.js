const jwt = require('jsonwebtoken')

const generateToken = () => {
    const token = jwt.sign(
    {
        data: 'USEFUL DATA'
    }, 
      process.env.SECRET,
    // {expiresIn: '1h'}
                           )
    return token 
}

module.exports = generateToken