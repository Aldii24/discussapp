import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, "Name must be at least 2 characters"],
        maxLenght: [50, "Name must be at most 50 characters"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters"],
        maxLenght: [50, "Password must be at most 50 characters"],
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User