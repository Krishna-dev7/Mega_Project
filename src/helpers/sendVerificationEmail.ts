import { Resend } from "resend";
import VerificationTemplate from "../../email/VerificationTemplate";
import ApiResponse from "@/types/ApiResponse";
import conf from "./conf";
const resend = new Resend(conf.resend!);

const sendVerificationEmail= async (
    email: string,
    verifyCode: string,
    username: string,
    subject: string
): Promise<ApiResponse> => {
    try {

        const {data, error} = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject,
            react: VerificationTemplate({username, otp:verifyCode})
        })

        if(error) {
            console.log(error.message);
            throw new Error(error.message);
        }

        return {
            success: true,
            message: "verification email send",
            data
        };

    } catch (error:any) {
        console.log("send verification email error: ", error.message);
        throw new Error(error.message);
    }
}


export default sendVerificationEmail;