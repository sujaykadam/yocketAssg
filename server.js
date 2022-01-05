const express = require('express')
const app = express()
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')

mongoose.connect("mongodb+srv://sujay:garudwar@cluster0.8dehr.mongodb.net/yocketPosts?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())


app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.json({
      "endpoints":{
        "posts/all":{
            "method":"get",
            "returns":"all the posts in database"
        },
        "posts/":{
            "method":"get",
            "req.query":{
                "skip":{
                    "type":"number",
                    "purpose":"identify from where to start slicing the data to avoid duplication"
                },
                "limit":{
                    "type":"number",
                    "purpose":"identify number of posts to be returned"
                }
            }
        },
        "posts/createPost":{
            "method":"post","req.body":{
                "title":"string",
                "content":"string"
            }
        }
      }
    })
  })

app.listen(process.env.PORT || 3000, () => console.log(`Server Started at port ${process.env.PORT}`))
