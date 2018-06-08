var express = require('express')
var router = express.Router()
var User = require('../models/user')

router.get('/', (req, res) => {
  User.find((err, rows) => {
    if(err)
      res.status(500).json({status: 'ERROR'})
    else
      res.status(200).json({status: 'OK', items: rows})
  })
})

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err)
      res.status(500).json({status: 'ERROR'})
    else
      res.status(200).json({status: 'OK', item: user})
  })

})

router.post('/', (req, res) => {
  let user = new User({
    name: req.body.name,
    avatar: req.body.avatar,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  })

  user.save((err) => {
    if(err)
        res.status(500).json({status: 'ERROR'})
    else
      res.status(200).json({status: 'OK'})
  })

})

router.put('/:id', (req, res) => {

  let user = User.findById(req.params.id)
  user.update({
    name: req.body.name,
    avatar: req.body.avatar,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
    lastModified: Date.now()
  },(err) => {
      if(err)
        res.status(500).json({status: 'ERROR'})
      else
        res.status(200).json({status: 'OK'})
  })

})

router.delete('/:id', (req, res) => {

  let user = User.findById(req.params.id)
  user.remove((err) => {
    if(err)
      res.status(500).json({status: 'ERROR'})
    else
      res.status(200).json({status: 'OK'})
  })
})

module.exports = router
