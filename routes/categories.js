var express = require('express')
var router = express.Router()
var Category = require('../models/category')


router.get('/', (req, res) => {

    Category.find({},(err, rows) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK', items: rows})
    })
})

router.post('/', (req, res) => {

    let category = new Category({ name: req.body.name })
    category.save((err) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK'})
    })
})

router.get('/:id', (req, res) => {

    Category.findById(req.params.id,(err, rows) => {
        if(err)
            res.status(500).json({status: "ERROR"})
        else
            res.status(200).json({status: 'OK', item: rows})
    })
})

router.put('/:id', (req, res) => {

    let category = Category.findById(req.params.id)
    category.update({
        name: req.body.name,
        lastModified: Date.now
    },(err) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK'})
    })
})

router.delete('/:id', (req, res) => {

    let category = Category.findById(req.params.id)
    category.remove((err) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK'})
    })
})



module.exports = router
