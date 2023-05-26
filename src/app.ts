import express from "express";
import * as bodyParser from "body-parser";
import errorhandler from "strong-error-handler";
import { app as apiInstance } from "./routes/index";


export const app = express();

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// middleware for json body parsing
app.use(bodyParser.json({ limit: "5mb" }));

// enable corse for all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Expose-Headers", "x-total-count");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

  next();
});


app.use("/geekbangla/api/", apiInstance);
app.use("/media", express.static("media"));

app.use(
  errorhandler({
    debug: process.env.ENV !== "prod",
    log: true,
  })
);
