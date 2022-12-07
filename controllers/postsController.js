import PostMessage from '../models/postsSchema.js'

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(201).json({ success: true, message: "Posts Retrieved Successfully", data: [postMessages] })

    } catch (error) {

        res.status(409).json({ success: false, message: "Some internal error occured" })

    }
}

export const createNewPost = async (req, res) => {
    const body = req.body
    // console.log(body)
    const newPost = new PostMessage(body)
    try {
        await newPost.save();

        res.status(201).json({ success: true, message: "Posts Created Successfully", data: [newPost] })

    } catch (error) {

        res.status(409).json({ success: false, message: "Some internal error occured" })

    }
}