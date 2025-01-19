import conf from "@/helpers/conf";
import { IOrder } from "@/models/order.models";
import ApiResponse from "@/types/ApiResponse";
import axios from "axios";
import { OrderStatus } from "@/models/order.models";

class OrderService {
  private url = `${conf.url}/api/orders`;

  async createOrder(data: IOrder) {
    try {
      const order = await axios.postForm<ApiResponse>(
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
      const patch = await axios.post<ApiResponse>(
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
  async streamOrders(){}

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