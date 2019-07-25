const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../helpers/auth')
const Story = mongoose.model('stories')

router.get('/', ensureGuest, (req, res) => {
  res.render('index/welcome')
})

router.get('/dashboard', ensureAuth, (req, res) => {
  Story.find({
    user: req.user._id
  }).then(stories => {
    res.render('index/dashboard', {
      stories: stories
    })
  })
})

router.get('/about', (req, res) => {
  res.render('index/about')
})

module.exports = router
