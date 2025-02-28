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
    user: conf.senderEmail,
    pass: conf.appPass
  }
})


const sendVerificationEmail = async (
	email: string,
	verifyCode: string,
  username: string,
  subject: string,

): Promise<ApiResponse> => {
	try {

    const res =
			await transport.sendMail(
				{
					from: "suprabha205@gmail.com",
					to: email,
					subject: subject,
					html: `<div style="font-family: Arial, sans-serif; 
            background-color: #f5f5f5; padding: 40px;">
              <div style="max-width: 450px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">
                <div style="padding: 30px; text-align: center;">
                  <h1 style="font-size: 24px; font-weight: 600; 
                    color: #1a1a1a; margin: 0;">
                      Hi, ${username}
                  </h1>
                  <h2 style="font-size: 18px; font-weight: 500; color: #404040; margin-top: 8px;">Verify Your Email</h2>
                  <p style="font-size: 14px; color: #666666; margin: 16px 0;">Enter this code to complete your verification:</p>
                  <div style="font-size: 32px; font-weight: 700; color: #3b82f6; letter-spacing: 4px; margin: 20px 0;">${verifyCode}</div>
                  <p style="font-size: 13px; color: #666666; margin: 0 0 24px;">Valid for 10 minutes. Keep it confidential.</p>
                  <a href="${conf.url}/verify?email=${email}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">
                    Verify Now
                  </a>
                </div>
                <div style="padding: 12px; text-align: center; background-color: #fafafa; font-size: 12px; color: #888888;">
                  Didn’t request this? Ignore this email.
                </div>
              </div>
          </div>`,
				},
			);

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