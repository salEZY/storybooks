require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')

require('./models/user')
require('./models/story')
require('./config/passport')(passport)
const auth = require('./routes/auth')
const index = require('./routes/index')
const stories = require('./routes/stories')
const { mongoURI } = require('./config/keys')
const { truncate, stripTags, formatDate, select } = require('./helpers/hbs')

//Map global promises
mongoose.Promise = global.Promise
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err))

const app = express()

// Handlebars
app.engine(
  'handlebars',
  exphbs({
    helpers: {
      truncate: truncate,
      stripTags: stripTags,
      formatDate: formatDate,
      select: select
    },
    defaultLayout: 'main'
  })
)
app.set('view engine', 'handlebars')

app.use(cookieParser('tajna'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
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

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/auth', auth)
app.use('/stories', stories)

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server started at ${port}`)
})
