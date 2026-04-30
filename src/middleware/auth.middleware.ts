import { fromNodeHeaders } from "better-auth/node";
import { auth as betterAuth } from "../lib/auth";
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import status from "http-status";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  PROVIDER = "PROVIDER",
  ADMIN = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sessionToken =
        req.cookies["__Secure-session_token"] || req.cookies["session_token"];

      if (!sessionToken) {
        throw new AppError(status.UNAUTHORIZED, "Unauthorized access");
      }

      const session = await betterAuth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "you are not authorized!",
        });
      }

      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "please verify your email",
        });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified,
      };

      if (!req.user) {
        return res.status(401).json({ error: "Not loggedIn" });
      }

      if (roles.length && !roles.includes(session.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden!, you can not access this",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
