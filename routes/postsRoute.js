import express from 'express';
import  {getPosts}  from '../controllers/postsController.js'
import  {createNewPost}  from '../controllers/postsController.js'
import  {updatePost}  from '../controllers/postsController.js'
import  {deletePost}  from '../controllers/postsController.js'
const router = express.Router()

// URL1 -  localhost:5000/posts
router.get('/', getPosts);

// URL2 - localhost:5000/posts/createpost
router.post('/createpost',createNewPost)

// URL3 - localhost:5000/posts/updatepost
router.patch('/:id',updatePost)

// URL4 - localhost:5000/posts/deletepost
router.delete('/:id',deletePost)

export default router