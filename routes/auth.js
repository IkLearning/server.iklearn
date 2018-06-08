var express = require('express')
var router = express.Router()
var User = require('../models/user')
var TokenGenerator = require('../helpers/tokengenerator')
var jwt = require('jsonwebtoken')

router.post('/login', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({username, password})
        .select('_id + name + username + phone + address + avatar + email + isAdmin + activity')
        .lean()
        .then(user => {
            if(user !== null){
                let token = new TokenGenerator(user).generate()
                res.status(200).json({token})
            }
            else
                res.status(500).json({status: 'Invalid username or password!'})
        })
        .catch(err => res.status(500).json({status: 'ERROR'}))
})

router.get('/validate', (req, res, next) => {
    require('dotenv').config()
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, result) => {
        if(err){
            if(err instanceof jwt.TokenExpiredError)
                res.status(440).json({status: 'Session expired!'})
            else
                res.status(498).json({status: 'Invalid token!'})
        }  
        else
            res.status(200).json({status: 'OK', result})
    })
})

module.exports = router