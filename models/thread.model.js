import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "Title must be at least 3 characters"],
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
        ref: "User"
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment"
    },
}, { timestamps: true })

const Thread = mongoose.model("Thread", threadSchema)

export default Thread