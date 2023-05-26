import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();


export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    // next();
    const token1 = <string>req.headers["authorization"]
    // const token2 = <string>req.headers["Refresh"];
    let jwtPayload;
    // console.log(req.headers)
    console.log("hello jwt")
    let secretKey1 = process.env.ACCESS_JWT;
    let secretKey2 = process.env.REFRESH_JWT;
    if (!secretKey1) secretKey1 = "";
    if (!secretKey2) secretKey2 = "";

    //Try to validate the token and get data

    try {
        jwtPayload = <any>jwt.verify(token1, secretKey1);


        res.locals.jwtPayload = jwtPayload;
        req.body.userId = jwtPayload.userId;
        next();
    }
    catch (error) {
        // try {
        //     jwtPayload = <any>jwt.verify(token2, secretKey2);
        //     res.locals.jwtPayload = jwtPayload;
        //     next();
        // }
        // catch (err) {
        //     return res.status(401).send(err);

        // }
        return res.status(401).send(error);
    }
}

    // //The token is valid for 1 hour
    // //We want to send a new token on every request
    // // const { userId, username } = jwtPayload;
    // // const newToken = jwt.sign({ userId, username }, secretKey, {
    // //     expiresIn: "1h"
    // // });
    // res.setHeader("token", newToken);

    //Call the next middleware or controller

