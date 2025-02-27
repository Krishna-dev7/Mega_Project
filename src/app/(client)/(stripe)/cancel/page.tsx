import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function CancelPage() {
  return (
    <div 
      className="min-h-screen w-full bg-black flex 
        items-center justify-center p-4">
      <Card 
        className="max-w-md w-full
           bg-zinc-900 border-zinc-800">
        <CardContent 
          className="pt-6 text-center space-y-4">
          <div className="flex justify-center ">
            <div className="fix-icon 
               px-3 py-3 rounded-xl">
              <XCircle 
                className="w-12 h-12 font-light text-pink-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white">
              Payment Cancelled
            </h2>
            <p className="text-zinc-400 text-sm">
              Your payment was cancelled. If you have any questions,
               please contact our support team.
            </p>
          </div>
        </CardContent>
        <CardFooter 
          className="flex items-center justify-between 
            mt-4 space-x-5">
          <Link href="/carts" 
            className="w-full">
            <Button 
              className="w-full" 
              variant="default">
                Try Again
            </Button>
          </Link>
          <Link href="/support"
            className="w-full" >
            <Button 
              variant="ghost" 
              className="w-full px-5 py-5 bg-pink-600 text-white
                border-zinc-800 hover:bg-pink-500 ">
              Contact Support
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

