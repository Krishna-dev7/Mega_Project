"use client"
import { Skeleton } from "@/components/ui/skeleton"

const CartSkeleton: React.FC = () => {
  return <div className="w-full flex justify-between gap-3 mb-8">
    <div className="sec1 flex-shrink-0 sm:text-sm text-xs">
      <Skeleton className="w-16 h-16 aspect-square rounded-lg" />
    </div>
    <div className="sec2 flex-grow">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="sec3 flex-shrink-0 sm:text-[1rem] text-sm text-pretty">
      <Skeleton className="h-6 w-1/4 mb-2" />
      <div className="flex gap-1 items-center">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  </div>
}

export default CartSkeleton;