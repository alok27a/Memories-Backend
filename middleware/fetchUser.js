import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

const fetchuser = async (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.json({
            success: false,
            message: 'Authentication token is required.'
        })
    }
    try {
        const data = await jwt.verify(token, process.env.JWT_TOKEN)
        req.id = data.id
        next()
    } catch (error) {
        res.json({
            success: false,
            message: 'Authentication token is not valid.'
        })
        console.log(error.message)
    }
}

export default fetchuser