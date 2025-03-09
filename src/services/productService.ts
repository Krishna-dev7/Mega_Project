import ApiResponse from '@/types/ApiResponse';
import axios from 'axios';
import conf from '@/helpers/conf';
import { productSchema } from '@/schemas/product.schema';


class Product {
	async createProduct(productData: any): Promise<ApiResponse> {
	  try {
		// Validate product data
		const validatedData = productSchema.partial().parse(productData);
  
		const res = await axios.post(`${conf.url}/api/products`, validatedData);
		return res.data;
	  } catch (err: any) {
		this.handleError({ err, type: 'ProductService::createProduct' });
	  }
	}
  
	async getProduct(productId: any): Promise<ApiResponse> {
	  try {
		const res = await axios.get(`${conf.url}/api/products?id=${productId}`);
		return res.data;
	  } catch (err: any) {
		this.handleError({ err, type: 'ProductService::getProduct' });
	  }
	}
  
	async streamProducts(query = {}): Promise<ApiResponse> {
	  try {
		const res = await axios.get(`${conf.url}/api/products`, { params: query });
		return res.data;
	  } catch (err: any) {
		this.handleError({ err, type: 'ProductService::streamProducts' });
	  }
	}
  
	async updateProduct(productId: any, updateData: any): Promise<ApiResponse> {
	  try {
		// Validate update data
		const validatedData = productSchema.partial().parse(updateData);

  
		const res = await axios.put(`${conf.url}/api/products?id=${productId}`, validatedData);
		return res.data;
	  } catch (err: any) {
		this.handleError({ err, type: 'ProductService::updateProduct' });
	  }
	}
	
  
	async deleteProduct(productId: string): Promise<ApiResponse> {
	  try {
		const res = await axios.delete(`${conf.url}/api/products?id=${productId}`);
		return res.data;
	  } catch (err: any) {
		this.handleError({ err, type: 'ProductService::deleteProduct' });
	  }
	}
  
	async deleteProducts(): Promise<ApiResponse> {
	  try {
		const res = await axios.delete(`${conf.url}/api/products`);
		return res.data;
	  } catch (err: any) {
		this.handleError({ err, type: 'ProductService::deleteProducts' });
	  }
	}
  
	private handleError({ type, err }: { type: string; err: Error }): never {
	  const consent = `${type} Error: ${err.message}`;
	  console.log(consent);
	  throw new Error(consent);
	}
  }
  
  const productService = new Product();
  export default productService;

