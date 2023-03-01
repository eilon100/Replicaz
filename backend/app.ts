import express from "express";
import { router } from "./routes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";
dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" })); // application/json
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "https://replicaz.vercel.app",
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "Access-Control-Request-Headers",
      "Access-Control-Request-Method",
      "Access-Control-Allow-Headers",
    ],
  })
);
app.use(cookieParser());

app.use("/", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "could not find this route" });
});

mongoose
  .connect(
    `mongodb+srv://eilonshamir123:${process.env.MONGODB_PASSWORD}@replicaz.vawz5rb.mongodb.net/replicaz-db?retryWrites=true&w=majority`
  )
  .then((res) => {
    app.listen(8000);
    console.log("server is up");
  })
  .catch((err) => {
    console.log(err);
  });
