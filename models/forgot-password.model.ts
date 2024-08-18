import { Schema, model } from "mongoose";

interface IForgotPassword {
    email: string,
    code: string,
    expireAt: Date
}
const forgotPasswordSchema = new Schema<IForgotPassword>({
    email: {type: String, required: true},
    code: {type: String, required: true},
    expireAt: {type: Date, expires: 0}
},{
    timestamps: true
})

export default model<IForgotPassword>("forgot-password",forgotPasswordSchema)