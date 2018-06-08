var jwt = require('jsonwebtoken')

class TokenGenerator {
    constructor(data){
        this.data = data
    }

    generate () {
        require('dotenv').config()
        return jwt.sign(this.data, process.env.JWT_SECRET, {
            expiresIn: 900
        })
    }
}

module.exports = TokenGenerator