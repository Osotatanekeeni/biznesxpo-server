import { Document, StringExpressionOperatorReturningBoolean } from "mongoose";

export default interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    brandName: string;
    address: string;
    position: string;
    password: string;
}