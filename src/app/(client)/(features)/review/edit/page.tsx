"use client"

import EditReviewForm from "@/components/customUI/review/edit-review";
import AddReviewForm from "@/components/customUI/review/Review";
import { useRouter, useSearchParams } from "next/navigation";

const ReviewAddFormPage:React.FC = () => {

  const searchParams = useSearchParams();
  const reviewId = searchParams.get('reviewId');
  const router = useRouter()
  if(!reviewId) {
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
    <EditReviewForm />
  </div>
</div>

}

export default ReviewAddFormPage;