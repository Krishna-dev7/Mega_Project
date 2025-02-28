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
	async createProduct(productData: produ) {
		try {
			
			
		} catch (error: any) {
			return ApiResponse('error', null, error.message);
		}
	}

	async getProduct(productId: any) {
		try {
			const db = await connectDB();
			const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
			return product ? ApiResponse('success', product) : ApiResponse('error', null, 'Product not found');
		} catch (error: any) {
			return ApiResponse('error', null, error.message);
		}
	}

	async streamProducts(query = {}) {
		try {
			const db = await connectDB();
			const products = await db.collection('products').find(query).toArray();
			return ApiResponse('success', products);
		} catch (error: any) {
			return ApiResponse('error', null, error.message);
		}
	}

	async updateProduct(productId: any, updateData: any) {
		try {
			const db = await connectDB();
			const updatedProduct = await db.collection('products').findOneAndUpdate(
				{ _id: new ObjectId(productId) },
				{ $set: updateData },
				{ returnDocument: 'after' }
			);

			if (!updatedProduct || !updatedProduct.value) {
				return ApiResponse('error', null, 'Product not found');
			}

			return ApiResponse('success', updatedProduct.value);
		} catch (error: any) {
			return ApiResponse('error', null, error.message);
		}
	}

	async deleteProduct(productId: any) {
		try {
			const db = await connectDB();
			const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) });
			return result.deletedCount > 0
				? ApiResponse('success', { deletedCount: result.deletedCount })
				: ApiResponse('error', null, 'Product not found');
		} catch (error: any) {
			return ApiResponse('error', null, error.message);
		}
	}

	async deleteProducts() {
		try {
			const res = await axios.delete(`${conf.url}/api/products`)
			return ApiResponse('success', { deletedCount: result.deletedCount });
		} catch (error: any) {
			return ApiResponse('error', null, error.message);
		}
	},

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
