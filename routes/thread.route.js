import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import { createThread, deleteThread, getAllThreads, getThread, likeUnlikeThread, updateThread } from "../controllers/thread.controller.js";

const threadRouter = Router()

threadRouter.get("/", getAllThreads)
threadRouter.get("/:id", authorize, getThread)
threadRouter.post("/:id/like", authorize, likeUnlikeThread)
threadRouter.post("/", authorize, createThread)
threadRouter.put("/:id", authorize, updateThread)
threadRouter.delete("/:id", authorize, deleteThread)

export default threadRouter