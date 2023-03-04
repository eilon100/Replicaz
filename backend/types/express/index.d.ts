import express from "express";
import { JwtPayload } from "jsonwebtoken";

export {};
declare global {
  namespace Express {
    export interface Request {
      userData: { userId: string | JwtPayload; role: "admin" | "user" };
    }
  }
}
