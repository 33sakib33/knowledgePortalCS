import { Router } from "express";
import { checkJwt } from "../auth/checkJwt";
import { CategoryController } from "../controller/CategoryController";

export const categoryRouter = Router();

const categoryInstance = CategoryController.getCategoryInstance();

categoryRouter.post("/create", checkJwt, categoryInstance.createCategory);
categoryRouter.post("/update", checkJwt, categoryInstance.updateCategory);
categoryRouter.post("/get", categoryInstance.getCategory);
categoryRouter.post("/delete", checkJwt, categoryInstance.deleteCategory);

