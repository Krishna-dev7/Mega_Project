"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Star, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import storageService from "@/services/StorageService"
import { useAppSelector } from "@/store/store"
import { useRouter, useSearchParams } from "next/navigation"
import reviewService from "@/services/ReviewService"
import { toast } from "@/hooks/use-toast"
import { IReview } from "@/models/review.models"

export default function EditReviewForm() {
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [comment, setComment] = useState<string>("")
  const [attachments, setAttachments] = useState<File[]>([])
  const [attachmentPreviews, setAttachmentPreviews] = useState<string[]>([])
  const [productId, setProductId] = useState<string | null>(null);
  const router = useRouter()
  const reviewId = useSearchParams().get('reviewId')

  if(!reviewId) {
    router.push("/not-found");
    return;
  }

  useEffect(() => {
    const fetchReview = async () => {
      const res = await reviewService.getReview(reviewId);
      console.log(res);
      
      if(res.success) {
        const review:IReview = res.data;
        setRating(review.rating);
        setComment(review.comment);
        setAttachmentPreviews(review.attachments);
        setAttachments([]);
        setHoveredRating(review.rating)
        setProductId(review.productId.toString());
      }
    }

    fetchReview();
  }, [])

  const handleRatingChange = (value: number) => {
    setRating(value)
  }

  const handleFileChange 
    = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      
      if(!e.target.files) return;
      
      // get the file
      const files = e.target.files 
      ? Array.from(e.target.files) 
      : []
      
      setAttachments(prev => [...prev, ...files]);

        files.forEach( async file => {
        const resultFile = await storageService.storeImage({
          file,
          type: "review"
        })

        console.log(resultFile);
        const filePreview = await storageService.getImagePreview(
          "review",
          resultFile.$id
        )

        console.log(filePreview);
        setAttachmentPreviews(prev => [...prev, filePreview])
      })
      
    } catch (err:any) {
      console.log("Something went wrong in handleFileChagne " 
        + err.message);
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
    setAttachmentPreviews(attachmentPreviews.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the data to your API

    if(!reviewId) return

    console.log({
      rating,
      comment,
      attachmentPreviews,
    })


    const res = await reviewService.updateReview({
      rating,
      attachments: attachmentPreviews,
      comment
    })

    if(res.success) {
      toast({
        title: "success",
        description: "Review created"
      })
    }
    
    router.push("/products/"+productId)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="space-y-2">
        <Label htmlFor="rating">Rating</Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleRatingChange(value)}
              onMouseEnter={() => setHoveredRating(value)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={cn(
                  "w-8 h-8 transition-all",
                  (hoveredRating ? value <= hoveredRating : value <= rating)
                    ? "fill-primary text-primary"
                    : "text-muted-foreground",
                )}
              />
              <span className="sr-only">Rate {value} stars</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="comment">Your Review</Label>
        <Textarea
          id="comment"
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-32 resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="attachments">Attachments</Label>
        <div className="border border-dashed rounded-lg p-6 text-center">
          <input
            id="attachments"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Label htmlFor="attachments" className="flex flex-col items-center gap-2 cursor-pointer">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Drag & drop files or click to browse</span>
          </Label>
        </div>
      </div>

      {attachmentPreviews.length > 0 && (
        <div className="space-y-2">
          <Label>Uploaded Files</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {attachmentPreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                  <img
                    src={preview || "/placeholder.svg"}
                    alt={`Attachment ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="absolute top-1 right-1 bg-background/80 backdrop-blur-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove attachment</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button type="submit" className="w-full">
        Edit Review
      </Button>
    </form>
  )
}