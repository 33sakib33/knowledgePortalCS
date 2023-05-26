import express from "express";
import { commentRouter } from "./commentRouter";
import { contentRoute } from "./contentRouter";
import { userRoute } from "./userRouter";

export const app = express();
app.use("/user", userRoute);
app.use("/content", contentRoute)
app.use("/comment", commentRouter)