import mongoose, { 
  Schema, 
  Types,
  Document } from "mongoose";

interface ProductSchema extends Document {
  brand: string;
  category: Types.ObjectId;
  countInStock: number;
  description: string;
  images: string[];
  slug: string;
  numReviews: Types.ObjectId;
  price: number;
  rating: number;
  owner: Types.ObjectId;
  discount: number;
}

const productSchema = new Schema<ProductSchema>({
  slug: {
    type: String,
    required: true,
    trim: true,
  }, 
  brand: {
    type: String,
    trim: true,
  }, 
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  discount: {
    type: Number,
    default: 0
  },
  countInStock: {
    type: Number,
    default: 0,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  images: [{
      type: String,
  }],
  numReviews:[{
      type: Schema.Types.ObjectId,
      ref: "Review",
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  rating: {
    type: Number,
    max: 5,
    min: 0,
    default: 0
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
}, {timestamps: true});

productSchema.index({
  slug: 1
})

const Product = mongoose.models.Product
  || mongoose.model("Product", productSchema);


export default Product;