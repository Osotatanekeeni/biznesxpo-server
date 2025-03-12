import { validationResult } from "express-validator"
import { Request, Response } from "express"
import User from "../models/User";
import { StatusCodes } from "http-status-codes";
import { generateAccessToken } from "../middleware/generateToken";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Email or pasword not provided",
            });
        }

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User does not exist, please register",
            })
        }

        const userDetails = user.user;
        const token = generateAccessToken(userDetails);
        const passwordMatches = await bcrypt.compare(password, user.user.password);

        console.log("This is the token: ", token);

        if (passwordMatches) {
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User logged in successfully",
                token: token,
                userId: userDetails._id,
                email: userDetails.email
            })
        }
        res.status(StatusCodes.FORBIDDEN).json({
            success: false,
            message: "Incorrect password"
        });
    } catch (error: any) {
        res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
    }
    
}

const findUserByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        return false;
    }

    if (user) {
        return {user};
    }
}