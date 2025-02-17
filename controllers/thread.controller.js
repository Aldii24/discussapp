import Thread from "../models/thread.model.js"

export const createThread = async (req, res, next) => {
    try {
        const thread = await Thread.create({
            ...req.body,
            author: req.user._id,
        })

        res.status(201).json({
            success: true,
            message: "Thread created successfully",
            data: thread
        })
    } catch (error) {
        next(error)
    }
}


export const getThread = async (req, res, next) => {
    try {
        const { id } = req.body

        const thread = await Thread.findById(id).populate("author", "name email")

        if (!thread) {
            const error = new Error("Thread not found")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            message: "Get thread detail",
            data: thread
        })
    } catch (error) {
        next(error)
    }
}

export const getAllThreads = async (req, res, next) => {
    try {
        const threads = await Thread.find().populate("author", "name email")

        if (!threads) {
            const error = new Error("Threads not found")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            message: "Get all threads",
            data: threads
        })
    } catch (error) {
        next(error)
    }
}

export const updateThread = async (req, res, next) => {
    try {
        const { id } = req.params
        const { title, content } = req.body

        const updatedThread = await Thread.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true })

        res.status(200).json({
            success: true,
            message: "Thread updated successfully",
            data: updatedThread
        })
    } catch (error) {
        next(error)
    }
}


export const deleteThread = async (req, res, next) => {
    try {
        const { id } = req.params

        const deletedThread = await Thread.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: `Thread deleted successfully: ${deletedThread.title}`,
        })
    } catch (error) {
        next(error)
    }
}

export const likeUnlikeThread = async (req, res, next) => {
    try {
        const { id } = req.params;

        const thread = await Thread.findById(id);
        if (!thread) {
            return res.status(404).json({ success: false, message: "Thread not found" });
        }

        const userId = req.user.id;

        if (thread.likes.includes(userId)) {
            // Unlike
            thread.likes = thread.likes.filter(uid => uid.toString() !== userId);
            await thread.save();
            res.status(200).json({
                success: true,
                message: "Thread unliked successfully",
                data: thread
            });
        } else {
            // Like
            thread.likes.addToSet(userId);
            await thread.save();
            res.status(200).json({
                success: true,
                message: "Thread liked successfully",
                data: thread
            });
        }
    } catch (error) {
        next(error);
    }
};