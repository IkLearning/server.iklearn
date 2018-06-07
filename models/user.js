var mongoose = require('mongoose')
var URLSlugs = require('mongoose-url-slugs')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    avatar: String,
    phone: String,
    address: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    activity: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
})

UserSchema.plugin(URLSlugs('username', { field: 'slug' }))

var User = mongoose.model('User',UserSchema)

module.exports = User