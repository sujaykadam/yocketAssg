const express = require('express')
const router = express.Router()
const Post = require('../models/post')

// Getting all
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().sort({'_id':-1})
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting by limit and offset
router.get('/', async (req, res) => {
  //skip is a variable maintained at frontend where the number of already returned posts is stored
  skip = req.query.skip
  //limit is a variable maintained at frontend and stores number of posts that are to be returned
  limit = req.query.limit
  try {
    posts = await Post.find().skip(skip).limit(limit).sort({'_id':-1})
    if (posts.length === 0){
      return  res.status(404).json({ message: 'No more posts' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.json(posts)

})

// Creating one
router.post('/createpost', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  })
  try {
    const newPost = await post.save()
    res.status(201).json(`Post with title ${newPost.  title} created`)
  } catch (err) {
    res.status(400).json({ message: err.message })
  } 
})

module.exports = router