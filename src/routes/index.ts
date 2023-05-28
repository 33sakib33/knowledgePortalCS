import express from "express";
import { categoryRouter } from "./categoryRoutes";
import { commentRouter } from "./commentRouter";
import { contentRoute } from "./contentRouter";
import { userRoute } from "./userRouter";

export const app = express();
app.use("/user", userRoute);
app.use("/content", contentRoute)
app.use("/comment", commentRouter)
app.use("/category", categoryRouter)