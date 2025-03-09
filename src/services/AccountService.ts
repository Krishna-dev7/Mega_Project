import axios from "axios";
import * as z from "zod";
import signupSchema from "@/schemas/signup.schem";
import ApiResponse from "@/types/ApiResponse";
import conf from "@/helpers/conf";
import loginSchema from "@/schemas/login.schema";
import { signIn, signOut } from "next-auth/react";
import otpFormSchema from "@/schemas/otp.schema";
import forgotSchema from "@/schemas/forgot.schema";
import { UserSchema } from "@/models/user.models";
import { Session } from "next-auth";
import { toast } from "@/hooks/use-toast";


interface ServiceResponse {
  success: boolean,
  message?: string,
  data?: any,
  error?: string
}

class AccountService {
  async createAccount(
    data: z.infer<typeof signupSchema>,
  ):Promise<ServiceResponse> {
    try {
      const res = await axios.postForm<ApiResponse>(
        `${conf.url}/api/signup`,
        data
      )

      return res.data;
    } catch (err:any) {
      this.handleError({
        type: 'createAccount', err})
    }
  }

  async loginUser(
    data: z.infer<typeof loginSchema>
  ):Promise<ServiceResponse> {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password
      })

      if(res?.error) {
        return {
          success: false,
          error: res.error 
            || "something went wrong in login user"
        }
      }
      return {
        success: true,
        data: {message: "login Successful"}
      }
    } catch (err:any) {
      this.handleError({
        type: 'loginUser', err})
    }
  }

  async logout() {
    try {
      await signOut({callbackUrl: "/"});
      toast({
        title: " ✨ Success ",
        description: "Logout Successfully"
      })
      return true
    } catch (err:any) {
      this.handleError({
        type: 'logout', err})
    }
  }

  async verify(
    data: z.infer<typeof otpFormSchema>,
    email: string
  ): Promise<ApiResponse> {
    try {
      const url = `${conf.url}/api/verify`;
      const newData = {
        otp: data.otp,
        email
      }
      const res = await axios.postForm<ApiResponse>(
        url, newData )

      return res.data;
    } catch (err:any) {
      this.handleError({
        type: 'ApiResponse', err})
    }
  }

  async resendOtp(email: string )
    : Promise<ApiResponse> {
    try {
      const url = `${conf.url}/api/verify`;
      const res = await axios.get( 
        `${url}?email=${encodeURIComponent(email)}` )

      return res.data;
    } catch (err:any) {
      this.handleError({
        type: 'resendOtp', err})
    }
  }

  async forgotPassword(
    data:z.infer<typeof forgotSchema>
  ): Promise<ApiResponse> {
    try {

      const url = `${conf.url}/api/forgotPassword`;
      const res = await axios.post<ApiResponse>(
        url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        } )
        console.log(res.data)
      return res.data || false;
    } catch (err:any) {
      this.handleError({
        type: 'forgotPassword', err})
    }
  }

  async githubLogin():Promise<ServiceResponse> {
    try {
      const res = await signIn('github', {
        redirect: false,
        callbackUrl: "/",
      })

      if(res?.error) {
        return {
          success: false,
          error: res.error || 
            "something went wrong on githubLogin"
        }
      }
      return { success: res?.ok || true ,
        data: res };
    } catch (err:any) {
      this.handleError({
        type: 'githubLogin', err})
    }
  }


  async getCurrentAccount(session:Session)
    :Promise<UserSchema | null> {
      try {
        const userId = session.user._id;
        if(!userId) {
          return null
        }

        const res = await axios.get(
          `${conf.url}/api/users?id=${encodeURIComponent(userId)}`
        )
        return res.data.data;
      } catch (err:any) {
        this.handleError({
          type: "GetCurrentAccount", err })
      }
  }

  async deleteAccount(userID:(string))
    : Promise<boolean> {
    try {
      return (await axios.delete<ApiResponse>(
        `${conf.url}/api/users?userID=${userID}`
      )).data.success;

    } catch (err:any) {
      this.handleError({
        type: "Delete Account", err })
    }
    
  }

  async streamUsers()
    :Promise<ServiceResponse> {
    try {
      const result =  await axios
        .get(`${conf.url}/api/users?action=streamUsers`);
        
      return result.data;
    } catch (err:any) {
      this.handleError({
        type: 'StreamUser', err})
    }
  }

  async deleteUsers({ids}:{ids?: Array<string>})
    :Promise<ServiceResponse> {
      try {
        let result = null;

        if(ids) {
          result = await axios.delete(
            `${conf.url}/api/users?ids=${ids.join(",")}`
          )
        } else {
          result = await axios  
          .delete(`${conf.url}/api/users?action=removeAll`)
        }
        
        return result.data;
      } catch (err:any) {
        this.handleError({
          type: 'StreamUser', err})
      }
    }

  private handleError(
    {type, err}
    :{type:string, err: Error}):never {

      const consent = `${type} Error: ${err.message}`;
      console.log(consent);
      throw new Error(consent);
  }

}


const accountService = new AccountService();
export default accountService;
export {
  AccountService
};