import { Request, Response, NextFunction } from "express";
import cors from "cors";

export const setHeaders = (req: Request, res: Response, next: NextFunction) => {
  cors({
    origin: "*",
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  });
  next();
};
