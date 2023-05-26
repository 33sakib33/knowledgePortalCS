import { Router } from "express";
import { checkJwt } from "../auth/checkJwt";
import { ContentController } from "../controller/conentController";

export const contentRoute = Router();

let contentInstance = ContentController.getContentInstance();

contentRoute.post("/create", checkJwt, contentInstance.createContent);
contentRoute.post("/update", checkJwt, contentInstance.updateContent);
contentRoute.post("/get", contentInstance.getContent);
// contentRoute.post("/interact", contentInstance.interact);
contentRoute.post("/delete", contentInstance.deleteContent);
contentRoute.post("/delete", contentInstance.recommend);

