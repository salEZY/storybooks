require("dotenv").config()
const express = require("express")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const passport = require("passport")

require("./models/user")
require("./config/passport")(passport)
const auth = require("./routes/auth")
const { mongoURI } = require("./config/keys")

//Map global promises
mongoose.Promise = global.Promise
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err))

const app = express()

app.use(cookieParser())
app.use(require("body-parser").urlencoded({ extended: true }))
app.use(
  session({
    secret: "tajna",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
)
app.use(passport.initialize())
app.use(passport.session())

//Set global vars
app.use((req, res, next) => {
  res.locals.user = req.user || null
  next()
})

app.use("/auth", auth)
app.get("/", (req, res) => {
  res.send("Welcome to StoryBooks!")
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server started at ${port}`)
})
