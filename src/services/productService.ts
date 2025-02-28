import { ObjectId } from 'mongodb';
import connectDB from '@/db/connect';

function ApiResponse(status:any, data:any, message = '') {
    return { status, data, message };
}

class Product {
    async createProduct(productData:any) {
        try {
            const db = await connectDB();
            const result = await db.collection('products').insertOne(productData);
            const insertedProduct = { ...productData, _id: result.insertedId };
            return ApiResponse('success', insertedProduct);
        } catch (error:any) {
            return ApiResponse('error', null, error.message);
        }
    }

    async getProduct(productId:any) {
        try {
            const db = await connectDB();
            const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
            return product ? ApiResponse('success', product) : ApiResponse('error', null, 'Product not found');
        } catch (error:any) {
            return ApiResponse('error', null, error.message);
        }
    }

    async streamProducts(query = {}) {
        try {
            const db = await connectDB();
            const products = await db.collection('products').find(query).toArray();
            return ApiResponse('success', products);
        } catch (error:any) {
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

    async deleteProduct(productId:any) {
        try {
            const db = await connectDB();
            const result = await db.collection('products').deleteOne({ _id: new ObjectId(productId) });
            return result.deletedCount > 0
                ? ApiResponse('success', { deletedCount: result.deletedCount })
                : ApiResponse('error', null, 'Product not found');
        } catch (error:any) {
            return ApiResponse('error', null, error.message);
        }
    }

    async deleteProducts(query:any) {
        try {
            const db = await connectDB();
            const result = await db.collection('products').deleteMany(query);
            return ApiResponse('success', { deletedCount: result.deletedCount });
        } catch (error:any) {
            return ApiResponse('error', null, error.message);
        }
    }
}

const productService = new Product();
export default productService;
