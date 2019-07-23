const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ensureAuth, ensureGuest } = require('../helpers/auth')

const Story = mongoose.model('stories')
const User = mongoose.model('users')

// Index
router.get('/', (req, res) => {
  res.render('stories/index')
})

// Show Add story page
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

// POST add story
router.post('/', (req, res) => {
  let allowComments

  if (req.body.allowComments) {
    allowComments = true
  } else {
    allowComments = false
  }

  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }
  //Create story
  new Story(newStory).save().then(story => {
    res.redirect(`/stories/show/${story.id}`)
  })
})

module.exports = router
