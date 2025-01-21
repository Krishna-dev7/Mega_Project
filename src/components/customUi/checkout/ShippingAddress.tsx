"use client"

import { Button } from "@/components/ui/button"
import { Card, 
  CardContent,
  CardFooter, CardHeader, 
  CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectItem } from "@/components/ui/select"
import { SelectContent, SelectGroup, SelectTrigger, SelectValue } from "@radix-ui/react-select"


const ShippingAddress:React.FC = () => {

  return <div className="h-full" > 
    <Card className="w-full h-full border-none font-normal bg-transparent ">
      <CardHeader>
        <CardTitle> Shipping address 🚚 </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form>
          {/* row first */}
          <div className="group flex sm:flex-row flex-col gap-8 justify-between items-center ">
            <div className="sm:w-1/2 w-full" >
              <Label htmlFor="name" >Name</Label>
              <Input type="text" id="name" placeholder="John Wick" />
            </div>
            <div className="sm:w-1/2 w-full">
              <Label htmlFor="mobile" >Mobile number</Label>
              <Input type="text" id="mobile" placeholder="9080768975" />
            </div>
          </div>  

          {/* row 2nd */}
          <div className="group flex sm:flex-row mt-5 gap-8 justify-between items-center ">
            <div className="sm:w-1/2 w-full" >
              <Label htmlFor="State" >State</Label>
              <br />

              {/* TODO: Call city api: */}
              <Select >
                <SelectTrigger id="State" className="w-full border py-2 
                border-neutral-800 rounded-md" >
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 w-[180px] cursor-pointer" >
                  <SelectGroup>
                    <SelectItem value="Gujarat" >Gujarat</SelectItem>
                    <SelectItem value="Maharastra" >Maharastra</SelectItem>
                    <SelectItem value="Punjab" >Punjab</SelectItem>
                    <SelectItem value="Ludhiyana" >Ludhiyana</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-1/2 w-full">
              <Label htmlFor="city" >City</Label>
              <Select >
                <SelectTrigger id="city" className="w-full border py-2 
                border-neutral-800 rounded-md" >
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 w-[180px] cursor-pointer" >
                  <SelectGroup className="w-full" >
                    <SelectItem value="Surat" >Surat</SelectItem>
                    <SelectItem value="Pune" >Pune</SelectItem>
                    <SelectItem value="Rajkot" >Rajkot</SelectItem>
                    <SelectItem value="Puri" >Puri</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* row 3rd */}
          <div className="group flex sm:flex-row flex-col mt-5 gap-8 
            justify-between items-center ">
            <div className="sm:w-1/2 w-full" >
              <Label htmlFor="zipCode" >zip code</Label>
              <Input type="text" id="zipCode" 
                name="zipCode" placeholder="129878" />
            </div>
            <div className="sm:w-1/2 w-full">
              <Label htmlFor="email" >Email</Label>
              <Input type="email" name="email" placeholder="john@gmail.com" />
            </div>
          </div>

          {/* row 4th  */}
          <div className="group flex sm:flex-row flex-col mt-5 gap-8 justify-between items-center ">
            <div className="w-full" >
              <Label htmlFor="address" >address</Label>
              <textarea name="address" className="w-full border 
                border-neutral-800 p-2" id="address" 
                placeholder="297, Hamsterdam street">
              </textarea>
            </div>
          </div>

        </form>
      </CardContent>

      <hr className="my-2" />
      {/* <CardFooter className="w-full flex justify-end" >
        <Button>
          Confirm address
        </Button>
      </CardFooter> */}
    </Card>
  </div>
}

export default ShippingAddress