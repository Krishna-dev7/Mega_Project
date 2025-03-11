import conf from '@/helpers/conf';
import productSchema from '@/schemas/product.schema';
import ApiResponse from '@/types/ApiResponse';
import axios from 'axios';
import { z } from 'zod';

class Product {
	async createProduct(
		data: z.infer<typeof productSchema>
	): Promise<ApiResponse> {
		try {
			
			const res = await axios.post(
				`${conf.url}/api/products`,
				data
			)

			return res.data;
		} catch (err:any) {
			this.handleError({
				err,
				type: 'ProductService::createProduct'
			})
		}
	}

	async getProduct(productId: any)
		: Promise<ApiResponse> {
			try {

				const res = await axios.get(
					`${conf.url}/api/products/${productId}`
				)

				return res.data;

			} catch (err:any) {
				this.handleError({
					err,
					type: 'ProductService::getProduct'
				})
			}
		}

	async streamProducts()
		: Promise<ApiResponse> {
			try {
				const res = await axios.get(
					`${conf.url}/api/products`
				)

				return res.data;
			} catch (err:any) {
				this.handleError({
					err,
					type: 'ProductService::streamProducts'
				})
			}
		}

	async updateProduct(
		productId: any, 
		updateData: any)
		: Promise<ApiResponse> {
			try {
				const res = await axios.put(
					`${conf.url}/api/products/${productId}`,
					updateData
				)

				return res.data;
			} catch (err:any) {
				this.handleError({
					err,
					type: 'ProductService::updateProduct'
				})
			}
	}

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