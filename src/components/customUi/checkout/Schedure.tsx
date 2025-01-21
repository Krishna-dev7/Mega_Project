"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import PaymentMode from "./PaymentMode";
import { Input } from "@/components/ui/input";


const Schedule:React.FC = () => {

  return <div className=" flex flex-col h-full justify-between *:" >
    <Card className="bg-transparent" >
      <CardHeader>
        <CardTitle>Schedule 🌈</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full" >
          <Label className="w-full block" htmlFor="date" >Date</Label>
          <Popover>
            <PopoverTrigger className="w-full" >
              <div 
                className={cn(
                  "w-full pl-3 py-3 px-5 border flex items-center rounded-md text-left font-normal",
                  "text-muted-foreground"
                )}>
                  <span>Pick a date</span>
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </div>
            </PopoverTrigger>
            <PopoverContent >
              <Calendar 
                className="bg-neutral-800 border rounded-md "
                mode="single"
                // selected={field.value}
                // onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-5" >
          <Label htmlFor="note" >Note</Label>
          <Input type="text" name="note" id="note"  
            placeholder="Keep your note" />
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>

    <PaymentMode />


  </div>
}

export default Schedule;