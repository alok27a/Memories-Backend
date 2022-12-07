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

// Creating new post and saving it
export const createNewPost = async (req, res) => {
    const body = req.body
    // console.log(body)
    const newPost = new PostMessage(body)
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

        if (!mongoose.Types.ObjectId.isValid(_id))
            return res.status(409).json({ success: false, message: "This post doesn't exist" })

        const post = await PostMessage.findById(_id)
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { likeCount: post.likeCount + 1 }, { new: true })

        res.status(201).json({ success: true, message: "Posts Liked Successfully", data: [updatedPost] })

    } catch (error) {
        res.status(409).json({ success: false, message: "Some internal error occured", data: [] })
    }
}