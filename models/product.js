var mongoose = require('mongoose')
var URLSlugs = require('mongoose-url-slugs')

let Schema = mongoose.Schema

var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    symbol: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    view: Number,
    description: Schema.Types.Mixed,
    lastVisited: Date,
    lastModified: {
        type: Date,
        default: Date.now
    }
})

ProductSchema.plugin(URLSlugs('name', { field: 'slug' }))

var Product = mongoose.model('Product',ProductSchema)

module.exports = Product