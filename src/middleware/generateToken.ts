import jwt from "jsonwebtoken";
import IUser from "../interfaces/user";

export const generateAccessToken = (user: any) => {
    console.log("This is the JWT Secret: ", process.env.JWT_SECRET);
    if (process.env.JWT_SECRET) {
      return jwt.sign(
        {
          userId: user._id,
          email: user.email,
          phoneNumber: user.phoneNumber,
          name: user.firstName + " " + user.lastName,
        },
        process.env.JWT_SECRET,
        { expiresIn: Number(process.env.JWT_LIFETIME) }
      );
    } else {
        return
    }
  };