import { Router } from "express";

const commentRouter = Router()

commentRouter.get("/", (req, res) => {
    res.send({ title: "Get All Comments" })
})

export default commentRouter