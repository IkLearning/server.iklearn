var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
var session = require('express-session')

var app = express()
  
app.use(cors())
mongoose.connect('mongodb://localhost:27017/web2')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

var sessionOptions = {
  secret: 'liar on ybur',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}

if(app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sessionOptions.cookie.secure = true
}

app.use(session(sessionOptions))
app.use(express.static(path.join(__dirname, 'public')))

app.use(methodOverride((req,res)=>{
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
      var method = req.body._method
      delete req.body._method
      return method
    }
  })
)

app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/users', require('./routes/users'))
app.use('/api/v1/products', require('./routes/products'))
app.use('/api/v1/categories', require('./routes/categories'))

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
