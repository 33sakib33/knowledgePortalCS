import { Router } from "express";
import { checkJwt } from "../auth/checkJwt";
import { CommentController } from "../controller/commentController";

export const commentRouter = Router();

let contentInstance = CommentController.getCommentInstance();

commentRouter.post("/create", checkJwt, contentInstance.createComment);
commentRouter.post("/update", checkJwt, contentInstance.updateComment);
commentRouter.post("/get", contentInstance.getComment);
// commentRouter.post("/interact", contentInstance.interact);
commentRouter.post("/delete", contentInstance.deleteComment);

