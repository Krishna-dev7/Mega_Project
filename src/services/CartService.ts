import conf from "@/helpers/conf";
import Cart, { ICart, Size } from "@/models/cart.models";
import ApiResponse from "@/types/ApiResponse";
import axios from "axios";
import { cartType } from "@/store/cartSlice";
import { Types } from "mongoose";

interface props {
  userId: string,
  productId: string
}

class CartService {
  async listCarts() {
    try {
      return await axios.get(
        `${conf.url}/api/carts`
      )
      // console.log("carts: ✨ ", carts)
      // return carts;
    } catch (err:any) {
      this.handleError(
        "ListCarts",  err)
    }
  }

  async createCart({
    userId,
    productId
  }:props): Promise<cartType | false>{
    try {
      const res = await axios.post<ApiResponse>(
        `${conf.url}/api/carts`,
        {userId, product:productId, 
          quantity: 1, productSize: Size.L }, 
          {
            headers: {
              'Content-Type': "application/json"
            }
          }
      )
      console.log("cart: ✨ ", res);
      return res.data.data || false;
      
    } catch (err:any) {
      this.handleError(
        "CreateCart",  err)
    }
  }

  async deleteCart(cartId:string)
    : Promise<boolean>{
    try {
      const res = await axios.delete<ApiResponse>(
        `${conf.url}/api/carts?id=${cartId}` )
      return res.data.success
    } catch (err:any) {
      this.handleError(
        "DeleteCart",  err)
    }
  }

  async deleteCarts({ids}: {ids?: Array<string>})
    :Promise<boolean> {
    try {
      const res = await axios.delete<ApiResponse>(
        `${conf.url}/api/carts?action=removeAll&ids=${ids?.join(",")}`)
      return res.data.success
    } catch (err:any) {
      this.handleError(
        "DeleteCarts",  err)
    }
  }

  async updateCart({ cartId, quantity}
    : {cartId: string, quantity: number}
  ): Promise<ApiResponse | false>{
    try {
      const res = await axios.put(
        `${conf.url}/api/carts`,
        {cartId, quantity}
      )
      console.log("CartService:UpdateCart " + res)
      return res.data || false;
    } catch (err:any) {
      this.handleError(
        "UpdateCart",  err)
    }
  }

  private handleError(type:string, err:Error):never {
    const consent = `${type} Error ⚡: ${err.message}`
    console.log(consent)
    throw new Error(err.message)
  }
}

const cartService = new CartService();
export default cartService;
export {
  CartService
}