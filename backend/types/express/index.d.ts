import express from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UserRoles } from '../user-roles';

export {};
declare global {
  namespace Express {
    export interface Request {
      userData: { userId: string | JwtPayload; role: UserRoles };
    }
  }
}
