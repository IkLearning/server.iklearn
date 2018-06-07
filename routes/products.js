var express = require('express')
var router = express.Router()
var Product = require('../models/product')


router.get('/', (req, res) => {
    Product.find().populate('category').exec((err, rows) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK', items: rows})
    })
})

router.get('/category/:id', (req, res) => {
    Product.find({category: req.params.id}).populate('category').exec((err, rows) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK', items: rows})
    })
})

router.post('/', (req, res) => {

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
        category_id: req.body.category,
        quantity: req.body.quantity
    })

    product.save((err) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK'})
    })
})

router.get('/:id', (req, res) => {

    Product.findById(req.params.id).populate('category').exec((err, product) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else{
            let { view } = product
            view++
            product.update({
                view,
                lastVisited: Date.now()
            },(err) => {
                if(err)
                    res.status(500).json({status: 'ERROR'})
                else
                    res.status(200).json({status: 'OK', item: product})
            })
        }
    })

})

router.put('/:id', (req, res) => {

    let product = Product.findById(req.params.id)
    product.update({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity, 
        view: req.body.view,
        lastVisited: req.body.lastVisited,
        lastModified: Date.now()
    },(err) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK'})
    })
})

router.delete('/:id', (req, res) => {

    let product = Product.findById(req.params.id)
    product.remove((err) => {
        if(err)
            res.status(500).json({status: 'ERROR'})
        else
            res.status(200).json({status: 'OK'})
    })
})


module.exports = router
