import conf from "@/helpers/conf";
import { IReview } from "@/models/review.models";
import ApiResponse from "@/types/ApiResponse";
import { ID, Storage, Client } from "appwrite"
import axios from "axios";
import { UpdateQuery } from "mongoose";

class ReviewService {

  public client: Client;
  public storage: Storage;
  private url: string = `${conf.url}/api/reviews`;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwrite_apiKey!)
      .setProject(conf.appwrite_projectId!);

    this.storage = new Storage(this.client);
  }

  async createReview({
    userId, comment, rating, productId, attachments
  }: {
    userId: string,
    comment: string,
    rating: number,
    productId: string,
    attachments: string[]
  }) : Promise<ApiResponse> {
    
      const res = await axios.post<ApiResponse>(
        `${conf.url}/api/reviews`,
        {userId, comment, rating, productId, attachments}
      )

      return res.data;
  }


  async streamReviews(productId:string): Promise<ApiResponse>{
    return( await axios.get(
        `${conf.url}/api/reviews?action=streamReviews&productId=${productId}`
      )).data;
  }

  async deleteReview(reviewId:string):Promise<ApiResponse> {
    return (await axios.delete(
      `${this.url}?id=${reviewId}`
    )).data
  }

  async updateReview(updateQuery: UpdateQuery<IReview>)
    : Promise<ApiResponse> {
    const res = await axios.patch(
      `${this.url}?id=${updateQuery._id}`, updateQuery
    )

  }


  async getReview(reviewId:string)
    : Promise<ApiResponse> {
    const res = await axios.get(
      `${conf.url}/api/reviews?action=getReview&reviewId=${reviewId}`
    )

    return res.data;
  }

}


const reviewService = new ReviewService();
export default reviewService;