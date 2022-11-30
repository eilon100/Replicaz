import { RequestHandler } from "express";
import cors from "cors";

export const setHeaders: RequestHandler = (req, res, next) => {
  cors({
    origin: "*",
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  });
  next();
};
