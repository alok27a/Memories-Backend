
import express from 'express'
import connectToDB from'./config/DB.js'
import cors from 'cors'
import postRoute from './routes/postsRoute.js'

const  app = express()

app.use(cors())
app.use(express.json())

connectToDB()

const port = process.env.PORT || 5000

// Middleware
app.use(express.json({ extended: false }))

// Routes
// app.use('/',require(''))
app.use('/posts',postRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
