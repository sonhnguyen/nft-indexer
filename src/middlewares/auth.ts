import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import Unauthorized from "../errors/unauthorized-error";

export const authenticateToken: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return next(new Unauthorized());

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err) => {
    if (err) return next(new Unauthorized(err.message));
    next();
  });
};
