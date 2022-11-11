import { JwtPayload } from "jsonwebtoken";

export interface decodedToken {
  userId: string | JwtPayload;
  hashedPassword: string | Buffer;
}
