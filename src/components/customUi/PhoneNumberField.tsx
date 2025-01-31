"use client"
import React from "react"
import {
  FormField,
  FormControl,
  FormMessage,
  FormLabel,
  FormItem
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Phone } from "lucide-react";

const PhoneNumberField:React.FC = () => {


  return <FormField
  name="phoneNumber"
  render={({ field }) => (
    <FormItem className='mb-4'>
      <FormLabel className="font-semibold text-sm text-gray-700">Phone Number</FormLabel>
      <FormControl>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            {...field}
            placeholder="86293XXXX"
            className="pl-10 py-2.5 text-base border-gray-300 focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </FormControl>
      <FormMessage className="text-sm text-red-500" />
    </FormItem>
  )}
/>
}

export default PhoneNumberField;