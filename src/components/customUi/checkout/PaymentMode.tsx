"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


const PaymentMode:React.FC = () => {
  return <div>
    <Card className="bg-transparent border" >
      <CardHeader>
        <CardTitle>Payment type</CardTitle>
      </CardHeader>

      <CardContent>
        <RadioGroup className="flex sm:flex-row flex-col justify-around 
          " >
          <div className="radioItem flex space-x-2 ">
            <RadioGroupItem value="COD" id="COD" />
            <Label htmlFor="COD" >Cash on delivery</Label>
          </div>  

          <div className="radioItem flex space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online" >Pay online</Label>
          </div>  

          <div className="radioItem flex space-x-2">
            <RadioGroupItem value="UPI" id="UPI" />
            <Label htmlFor="UPI" >Pay on UPI</Label>
          </div>  
        </RadioGroup>
      </CardContent>
    </Card>
  </div>
}

export default PaymentMode;