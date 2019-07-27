const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ensureAuth, ensureGuest } = require('../helpers/auth')

const Story = mongoose.model('stories')
const User = mongoose.model('users')

// Index
router.get('/', (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories: stories
      })
    })
})
// Show stories from user


// Single story GET
router.get('/show/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
    .populate('user')
    .then(story => {
      res.render('stories/show', {
        story: story
      })
    })
})

// Show Add story page
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})
// Edit story
router.get('/edit/:id', ensureAuth, (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
    .then(story => {
      res.render('stories/edit', {
        story: story
      })
    })
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

// Edit story
router.put('/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
    .then(story => {
      let allowComments

      if (req.body.allowComments) {
        allowComments = true
      } else {
        allowComments = false
      }
      story.title = req.body.title
      story.body = req.body.body
      story.status = req.body.status
      story.allowComments = allowComments

      story.save()
        .then(story => {
          res.redirect('/dashboard')
        })
    })
})

//Delete
router.delete('/:id', (req, res) => {
  Story.deleteOne({_id: req.params.id})
    .then(() =>{
      res.redirect('/dashboard')
    })
})

module.exports = router
