import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import {StatusCodes } from "http-status-codes"

export const authenticateToken = async (
    req,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).send({
          success: false,
          message: "Unauthorized access",
        });
      }
      const token = authHeader.split(" ")[1];
  
      if (process.env.JWT_SECRET) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
          if (err) {
            return res.status(401).send({
              success: false,
              message: "Unauthorized access",
            });
          }
          req.user = user;
          next();
        });
      } else {
        return;
      }
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error });
    }
  };