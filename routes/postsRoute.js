import express from 'express';
import  {getPosts}  from '../controllers/postsController.js'
import  {createNewPost}  from '../controllers/postsController.js'
import  {updatePost}  from '../controllers/postsController.js'
const router = express.Router()

// URL1 -  localhost:5000/posts
router.get('/', getPosts);

// URL2 - localhost:5000/posts/createpost
router.post('/createpost',createNewPost)

// URL3 - localhost:5000/posts/updatepost
router.patch('/:id',updatePost)

export default router