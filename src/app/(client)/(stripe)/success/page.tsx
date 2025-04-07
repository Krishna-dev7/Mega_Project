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
import paymentService from "@/services/PaymentService"
import { useSearchParams } from "next/navigation"
import { useAppSelector } from "@/store/store"
import orderService from "@/services/OrderService"
import conf from "@/helpers/conf"
import axios from "axios"

export default function SuccessPage() {
  const confettiRef = useRef<ConfettiRef>(null);
  const router = useRouter()
  const userId = useAppSelector(store => store.auth.data?._id)
  
  // Function to trigger confetti
  const triggerConfetti = () => {
    confettiRef.current?.fire({});
  };
  
  const params = useSearchParams();
  useEffect(() => {
		const fetch = async () => {
      const session_id =  params.get('session_id')
		if ( session_id && userId) {
			const res = await paymentService.createPayment(
				session_id,
				userId.toString(),
			);

      if(res.success)  {
          const result = await axios.get(
                `${conf.url}/api/checkout-session?sessionId=${session_id}`,
              );
        const Orderres = await orderService.createOrder(
          {...res.data, products: result.data.data.products}, userId)
        console.log(Orderres);
        
        if(Orderres.data.success) {
          router.push("/orders")
        }
      }
		}

    console.log(`didn't recieve any params 
      ${params} and userId ${userId}`);

      console.log(params);
      
    }

    fetch();
    
	}, [params, userId]);
  
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
            border-gray-500 text-start text-ellipsis line-clamp-1">
            {params.get('session_id')}
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