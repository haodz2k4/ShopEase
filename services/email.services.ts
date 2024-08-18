import config from "../config/config"
import nodemailer from "nodemailer"
import fs from "fs"
const transporter = nodemailer.createTransport(config.email.smtp);
interface EmailOption {
    text?: string,
    html?: string
}
export const sendEmail = async (to: string, subject: string, content: EmailOption) :Promise<void> => {
    const {text, html} = content
    const msg = {from: config.email.from, to, subject, text, html} 
    await transporter.sendMail(msg)
}
//send otp email for account and send token email for user 
export const sendOtpEmail = async (to: string,userName: string, otp: string)  => {

    const subject = `Khôi phục mật khẩu tài khoản của bạn`
    const htmlContent = fs.readFileSync("../templates/otpEmail.html","utf8")
    const currentYear = new Date().getFullYear()
    const htmlWithOtp = htmlContent
        .replace('{{otp}}', otp)
        .replace('{{name}}',userName)
        .replace('{{year}}',currentYear.toString())
    await sendEmail(to,subject,{html: htmlWithOtp})
}

export const sentTokenEmail = async (to: string, token: string, resetLink: string) :Promise<void> => {
    const subject = `Khôi phục mật khẩu tài khoản của bạn`
    const htmlContent = fs.readFileSync("../templates/tokenEmail.html","utf8");
    const currentYear = new Date().getFullYear()
    const htmlWithToken = htmlContent
        .replace('{{url}}',resetLink)
        .replace('{{year}}',currentYear.toString())
    await sendEmail(to,subject, {html: htmlWithToken})

} 