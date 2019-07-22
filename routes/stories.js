const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../helpers/auth')

// Index
router.get('/', (req, res) => {
  res.render('stories/index')
})

// Add story
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})

module.exports = router
