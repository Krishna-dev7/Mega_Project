'use client'
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card"
import { CheckCircle2, CopyIcon } from "lucide-react"
import { 
  Confetti, 
  type ConfettiRef 
} from "@/components/magicui/confetti"
import { useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const confettiRef = useRef<ConfettiRef>(null);
  const router = useRouter()
  
  // Function to trigger confetti
  const triggerConfetti = () => {
    confettiRef.current?.fire({});
  };

  useEffect(() => {

  }, [])
  
  return (
    <div 
      className="min-h-screen w-full
        z-0 flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-zinc-900
         relative z-10 border-zinc-800">
        <CardContent className="pt-6 text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 
              className="w-12 h-12 mb-3 text-violet-400" />
          </div>
          <div className="space-y-4">
            <h2 
              className="text-xl font-semibold text-white">
              Payment Successful!
            </h2>
            <p className="text-zinc-400 mt-4">
              Thank you for your purchase. 
              We have sent you an email with your order details.
            </p>
          </div>

          <div 
            onClick={triggerConfetti}
            className="celebrate absolute top-0 right-3
              cursor-pointer text-lg">
             ✨
          </div>

          <div className="transaction-id border py-4 
            rounded-md flex justify-between px-3 
            border-gray-500 text-start">
            12345
            <span>
              <CopyIcon
                className="cursor-pointer text-violet-400"
                size={16} />
            </span>
          </div>
        </CardContent>

        <CardFooter 
          className="flex items-center justify-between 
            mt-4 space-x-5">
          <Button 
            className="w-full" 
            variant="default"
            onClick={() => router.push("/")}>
              Go to Dashboard
          </Button>
          <Button 
            variant="default" 
            className="w-full px-5 py-5 bg-black text-white
              border-zinc-800 cursor-pointer hover:bg-zinc-800"
            onClick={() => window.location.href = "/orders"}>
              Track Orders
          </Button>
        </CardFooter>
      </Card>
      <Confetti
        ref={confettiRef}
        className="absolute inset-0 z-0 size-full pointer-events-none"
      />
    </div>
  )
}