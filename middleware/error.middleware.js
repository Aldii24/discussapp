const errorMiddleware = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message
    console.error(err)

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`
        error = new Error(message)
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`
        error = new Error(message)
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map(val => val.message)
        error = new Error(message)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    })
}

export default errorMiddleware