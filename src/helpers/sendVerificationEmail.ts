import { Resend } from "resend";
// import VerificationTemplate from "../../email/VerificationTemplate";
import ApiResponse from "@/types/ApiResponse";
import conf from "./conf";
// const resend = new Resend(conf.resend!);
import nodemailer from "nodemailer";

// const method1 = async (
// 	email: string,
// 	verifyCode: string,
// 	username: string,
// 	subject: string
// ): Promise<ApiResponse> => {

// 	try {
// 		const { data, error } = await resend.emails.send({
// 			from: "Acme <onboarding@resend.dev>",
// 			to: email,
// 			subject,
// 			react: VerificationTemplate({ username, otp: verifyCode }),
// 		});

// 		if (error) {
// 			console.log(error.message);
// 			throw new Error(error.message);
// 		}

// 		return {
// 			success: true,
// 			message: "verification email send",
// 			data,
// 		};
    
// 	} catch (error: any) {
// 		console.log("send verification email error: ", error.message);
// 		throw new Error(error.message);

// 	}
// };

// using nodemailer strategy

// const transport = nodemailer.createTransport({
// 	host: "google",
// 	port: 2525,
// 	secure: false,
// 	auth: {
// 		user: "1dacdabcb61b4b",
// 		pass: "970db9c50d2333",
// 	},
// });


const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'onboarding.nova@gmail.com',
    pass: 'ngegevhsxzbdwltx'
  }
})



const sendVerificationEmail = async (
	email: string,
	verifyCode: string,
  username: string,
  subject: string,

): Promise<ApiResponse> => {
	try {

    const res = await transport.sendMail({
      from: "suprabha205@gmail.com",
      to: email,
      subject: subject,
      html: `<div style="font-family: Arial, sans-serif; background-color: #f9fafb; padding: 20px;">
           <div style="max-width: 400px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
             <div style="padding: 20px; text-align: center; border-bottom: 1px solid #e5e7eb;">
             <h1>Hey👋! ${username}</h1>
               <h2 style="font-size: 20px; font-weight: bold; color: #111827;">OTP Verification</h2>
               <p style="font-size: 14px; color: #6b7280; margin-top: 8px;">Use the code below to verify your email address</p>
             </div>
             <div style="padding: 20px; text-align: center;">
               <p style="font-size: 32px; font-weight: bold; color: #4f46e5; letter-spacing: 2px; margin-bottom: 20px;">${verifyCode}</p>
               <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
                 This OTP is valid for 10 minutes. Please do not share it with anyone.
               </p>
               <a href="${conf.url}/verify?email=${email}" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: bold;">
                 Verify Now
               </a>
             </div>
             <div style="padding: 10px; text-align: center; background-color: #f3f4f6; font-size: 12px; color: #6b7280;">
               If you didn’t request this, please ignore this email.
             </div>
           </div>
         </div>`
    })

    return {
      success: true,
      message: res.response || "Email sent successfully",
    }

	} catch (error: any) {
    console.log("send email verification error: ",error.message);
    return {
      success: false,
      message: error.message || "cannot send otp"
    }
  }
};

export default sendVerificationEmail;