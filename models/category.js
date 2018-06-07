var mongoose = require('mongoose')
var URLSlugs = require('mongoose-url-slugs')

var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

CategorySchema.plugin(URLSlugs('name', { field: 'slug' }))

var Category = mongoose.model('Category',CategorySchema)

module.exports = Category