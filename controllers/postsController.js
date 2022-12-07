import mongoose from 'mongoose';
import PostMessage from '../models/postsSchema.js'

// Retrieving all posts
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(201).json({ success: true, message: "Posts Retrieved Successfully", data: [postMessages] })

    } catch (error) {

        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })

    }
}

// Retrieving posts by search  
// Query /posts?page=1 --> page=1
// Params /post/:id  --> id = 123
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query
    //  /posts?searchQuery=null&tags=node
    try {
        const title = new RegExp(searchQuery, 'i');

        // console.log(title)
        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(',') } }] })
        // console.log(posts)

        res.status(201).json({ success: true, message: "Posts Retrieved Successfully by search", data: [posts] })


    } catch (error) {

        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })

    }
}


// Creating new post and saving it
export const createNewPost = async (req, res) => {
    const body = req.body
    // console.log(body)
    const newPost = new PostMessage({ ...body, creator: req.id })
    try {
        await newPost.save();

        res.status(201).json({ success: true, message: "Posts Created Successfully", data: [newPost] })

    } catch (error) {

        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })

    }
}

// Updating a post
export const updatePost = async (req, res) => {
    try {
        const { id: _id } = req.params
        const post = req.body
        // Now checking if that that id post is there or not
        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(409).json({ success: false, message: "This post doesn't exist" })

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

        res.status(201).json({ success: true, message: "Posts Updated Successfully", data: [updatedPost] })

    } catch (error) {
        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })
    }
}


// Deleting a Post 
export const deletePost = async (req, res) => {
    try {
        const { id: _id } = req.params

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(409).json({ success: false, message: "This post doesn't exist" })

        await PostMessage.findByIdAndDelete(_id)

        res.status(201).json({ success: true, message: "Posts Deleted Successfully", data: [] })
    } catch (error) {

        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })

    }
}

// When a post is liked
export const likePost = async (req, res) => {
    try {
        const { id: _id } = req.params

        // console.log(req.user)
        if (!req.id)
            return res.status(409).json({ success: false, message: "User Unauthenticated" })

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(409).json({ success: false, message: "This post doesn't exist" })

        const post = await PostMessage.findById(_id)
        // Checking if user has already liked the post or not

        const index = post.likes.findIndex((id) => id === String(req.id))

        if (index === -1) {
            // Like the post
            post.likes.push(req.id)
        }
        else {
            // Dislike the post
            post.likes = post.likes.filter((id) => id !== String(req.id))
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

        res.status(201).json({ success: true, message: "Posts Liked Successfully", data: [updatedPost] })

    } catch (error) {
        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })
    }
}

// Commenting on a specific post
export const commentPost = async (req, res) => {
    const { id: _id } = req.params;

    const { value } = req.body
  
    try {

        const post = PostMessage.findById(_id)
        post.comments.push(value)

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

        res.status(201).json({ success: true, message: "Comment Added Successfully", data: [updatedPost] })

    } catch (error) {
        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })
    }

}