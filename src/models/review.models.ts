import mongoose, {
  Schema, 
  Types,
  Document} from "mongoose";

interface IReview extends Document {
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  rating: number,
  comment: string;
}


const reviewSchema = new Schema<IReview>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  comment: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  }
}, {timestamps: true});


const Review = mongoose.models.Review 
  || mongoose.model("Review", reviewSchema);

export default Review;