import { Router } from "express";

// import { Auth } from "../auth/auth";
import { UserController } from "../controller/userController";


// import cors from 'cors'
export const userRoute = Router();

let userInstance = UserController.getUserInstance();

// userRoute.use(checkJwt)
userRoute.post(
  "/create",
  // keycloak.protect(), ------ initiate a protection funtion the middleware from auth
  // Auth.injectUser,
  userInstance.createUser
);
userRoute.post(
  "/login",
  // keycloak.protect(), ------ initiate a protection funtion the middleware from auth
  // Auth.injectUser,
  userInstance.login
);


userRoute.post(
  "/update",
  // keycloak.protect(),
  // Auth.injectUser,
  userInstance.updateUser
);
userRoute.post(
  "/get",
  // keycloak.protect(),
  // Auth.injectUser,

  userInstance.getUser
);

