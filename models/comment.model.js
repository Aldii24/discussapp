import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    threadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        required: true
    },
    content: {
        type: String,
        required: true,
        minLength: [3, "Content must be at least 3 characters"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
    }
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema)

export default Comment