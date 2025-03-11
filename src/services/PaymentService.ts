import conf from "@/helpers/conf";
import axios from "axios";
import ApiResponse from "@/types/ApiResponse";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

class PaymentService {

  private url:string

  constructor() {
    this.url = `${conf.url}/api/payments`
  }

  async createPayment(
    sessionId:string, 
    userId:(string | undefined))
   : Promise<ApiResponse> {
    try {

    const result = await axios.get(
      `${conf.url}/api/checkout-session?sessionId=${sessionId}`
    )

    console.log('Payment service data: ', result.data);
  
    const res = await axios.post<ApiResponse>(
      this.url,
      {data: result.data.data, userId }
    )

    return res.data;

    } catch (err:any) {
      this.handleError({
        type: 'createPayment', err
      })
    }
   }

  async initiateCheckout() {}
  async updatePayment() {}
  async deletePayment() {}
  async streamPayments() {}
  async getPayment() {}
  async queryPayment() {}
  private handleError(
    {type, err}
    :{type:string, err: Error}):never {

      const consent = `${type} Error: ${err.message}`;
      console.log(consent);
      throw new Error(consent);
  }
}


const paymentService = new PaymentService();
export default paymentService
export {
  PaymentService
}