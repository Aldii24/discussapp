import User from "../models/user.model.js"

export const getUsers = async (req, res, next) => {
    try {
        const user = await User.find()

        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            message: "Get all users",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await User.findById(id).select("-password")

        if (!user) {
            const error = new Error("User not found")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            success: true,
            message: "Get user detail",
            data: user
        })
    } catch (error) {
        next(error)
    }
}


export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const { name } = req.body

        const updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true, runValidators: true })

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}


export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params

        const deletedUser = await User.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: `Deleted user: ${deletedUser.name} `,
        })
    } catch (error) {
        next(error)
    }
}