import { ObjectId } from 'mongodb';
import connectDB from '@/db/connect';
import ApiResponse from '@/types/ApiResponse';
import axios from 'axios';
import conf from '@/helpers/conf';

function getApiResponse(status: boolean, data: any, message = '')
	: ApiResponse {
	return { success: status, data, message };
}

class Product {
	async createProduct() {}

	async getProduct(productId: any) {}

	async streamProducts(query = {}) {}

	async updateProduct(productId: any, updateData: any) {}

	async deleteProduct(productId: string)
		: Promise<ApiResponse> {
		try {
			
			const res = await axios.delete(
				`${conf.url}/api/products?id=${productId}`
			)

			return res.data

		} catch (err: any) {
			this.handleError({
				err, 
				type: 'ProductService::deleteProduct' 
			})
		}
	}

	async deleteProducts() {}

	private handleError(
    {type, err}
    :{type:string, err: Error}):never {

      const consent = `${type} Error: ${err.message}`;
      console.log(consent);
      throw new Error(consent);
  }
}

const productService = new Product();
export default productService;
