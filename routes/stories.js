const express = require('express')
const router = express.Router()

// Index
router.get('/', (req, res) => {
  res.render('stories/index')
})

// Add story
router.get('/add', (req, res) => {
  res.render('stories/add')
})

module.exports = router
