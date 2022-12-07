import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/userSchema.js'

export const signin = async (req, res) => {
    const { email, password } = req.body
    try {
        const existUser = await User.findOne({ email })
        if (!existUser)
            return res.status(409).json({ success: false, message: "This Email doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);
        if (!isPasswordCorrect)
            return res.status(409).json({ success: false, message: "Invalid Credential" })

        const token = jwt.sign({ email: existUser.email, id: existUser._id, }, process.env.JWT_TOKEN, { expiresIn: '1h' })

        res.status(201).json({ success: true, message: "Signin Successfull", token })

    } catch (error) {
        res.status(409).json({ success: false, message: "Some internal error occured" })
    }
}

export const signup = async (req, res) => {

  
}