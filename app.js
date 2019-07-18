require('dotenv').config()
const express = require('express')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')

require('./models/user')
require('./config/passport')(passport)
const auth = require('./routes/auth')
const { mongoURI } = require('./config/keys')

//Map global promises
mongoose.Promise = global.Promise
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

const app = express()

app.use(cookieParser('tajna'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    secret: 'tajna'
  })
)
app.use(passport.initialize())
app.use(passport.session())

//Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

app.use('/auth', auth)
app.get('/', (req, res) => {
  res.send('Welcome to StoryBooks!')
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server started at ${port}`)
})
