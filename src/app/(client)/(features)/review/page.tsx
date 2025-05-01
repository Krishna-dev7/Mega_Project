"use client"

import AddReviewForm from "@/components/customUi/review/Review";
import { useRouter, useSearchParams } from "next/navigation";

const ReviewAddFormPage:React.FC = () => {

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const router = useRouter()
  if(!productId) {
    router.push("/not-found");
    return;
  }

  return <div 
  className="review-add-page
  flex justify-center items-center 
  min-h-screen w-screen">
  <div 
    className="container 
      max-w-xl h-fit p-5 rounded-lg border border-neutral-800 ">
    <AddReviewForm />
  </div>
</div>

}

export default ReviewAddFormPage;