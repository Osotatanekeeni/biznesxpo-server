import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";

const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(StatusCodes.CONFLICT).json({
      success: false,
      message: "Account already exists, please go to login",
    });
  }

  if (!firstName || !lastName || !email || !phoneNumber || password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Please provide all fields",
    });
  }
  bcrypt.hash(password, 10).then(async (hash) => {
    const user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hash,
    });

    user
      .save()
      .then(async (user) => {
        return res.status(StatusCodes.CREATED).json({
          success: true,
          message: "User created successfully",
          user: user,
        });
      })
      .catch(() => {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Some error occured whule registering the user",
        });
      });
  });
};

export default { registerUser };