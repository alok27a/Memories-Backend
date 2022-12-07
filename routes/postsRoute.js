import express from 'express';
import { getPosts } from '../controllers/postsController.js'
import { createNewPost } from '../controllers/postsController.js'
import { updatePost } from '../controllers/postsController.js'
import { deletePost } from '../controllers/postsController.js'
import { likePost } from '../controllers/postsController.js'
import { getPostsBySearch } from '../controllers/postsController.js'
import { commentPost } from '../controllers/postsController.js'
import fetchuser from '../middleware/fetchUser.js';
const router = express.Router()

// URL1 -  localhost:5000/posts
router.get('/', getPosts);

// URL2 - localhost:5000/posts/createpost
router.post('/createpost', fetchuser, createNewPost)

// URL3 - localhost:5000/posts/:id/updatepost
router.patch('/:id/updatepost', fetchuser, updatePost)

// URL4 - localhost:5000/posts/:id/deletepost
router.delete('/:id/deletepost', fetchuser, deletePost)

// URL5 - localhost:5000/posts/:id/likepost
router.patch('/:id/likepost', fetchuser, likePost)

// URL5 - localhost:5000/posts/search
router.get('/search', getPostsBySearch)

// URL6 - localhost:5000/posts/:id/commentPost
router.get('/:id/commentPost',fetchuser,commentPost)


export default router