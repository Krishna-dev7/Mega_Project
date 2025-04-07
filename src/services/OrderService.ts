import conf from "@/helpers/conf";
import { IOrder } from "@/models/order.models";
import ApiResponse from "@/types/ApiResponse";
import axios from "axios";
import { OrderStatus } from "@/models/order.models";
import { Types } from "mongoose";

class OrderService {
  private url = `${conf.url}/api/orders`;

  async createOrder(data: IOrder, userId: Types.ObjectId) {
    try {
      const order = await axios.post<ApiResponse>(
        this.url, data)     
      return order || false;
    } catch (err:any) {
      this.handleError({
        type: 'CreateOrder',
        err: err})
    }
  }

  async updateOrder(data:any){
    try {
      const patch = await axios.patch<ApiResponse>(
        this.url, data)

      return patch || false;
    } catch (err:any) {
      this.handleError({
        type: 'UpdateOrder',
        err })
    }
  }
  async queryStatus(){}
  async cancelOrder(){}
  async getOrder(id: string): Promise<ApiResponse> {
    const res = await axios.get<ApiResponse>(
      `${conf.url}/api/orders?orderId=${id}`
    )

    return res.data;

  }

  async deleteOrder(orderId:string)
  : Promise<ApiResponse>{

    const res = await axios.delete(
      `${conf.url}/api/orders?id=${orderId}`
    )

    return res.data;
  }
  
  async streamOrders()
  : Promise<ApiResponse> {
    try {

      const orders = await axios.get<ApiResponse>(
        `${this.url}?action=streamOrders`
      )

      return orders.data;
      
    } catch (err:any) {
      this.handleError({
        type: 'StreamOrders',
        err
      })
    }
  }

  private handleError(
    {type, err}
    :{type: string, err: Error})
    : never {

      const errorMsg = `${type} Error🔥: ${err.message}`
      console.log("⚡ ", errorMsg);
      throw err;
  }
}


const orderService = new OrderService();
export default orderService;
export {
  OrderService
}