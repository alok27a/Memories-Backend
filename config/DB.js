import dotenv from 'dotenv'
import mongoose from "mongoose"
dotenv.config()
const db = process.env.MONGOURI

const connectDB = async () => {
    try {
        // console.log(db)
        mongoose.set('strictQuery',true);
        await mongoose.connect(db, {
            useNewUrlParser: true,
        })
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectDB