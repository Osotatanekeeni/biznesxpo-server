import jwt from "jsonwebtoken";
import IUser from "../interfaces/user";

export const generateAccessToken = (user: any) => {
    if (process.env.JWT_SECRET) {
      return jwt.sign(
        {
          userId: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.firstName + " " + user.lastName,
        },
        process.env.JWT_SECRET,
        { expiresIn: 999999 }
      );
    } else {
        return
    }
  };