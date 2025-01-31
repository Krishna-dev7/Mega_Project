"use client"

import { cartType, delCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button"
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import cartService from "@/services/CartService";


type props = {
  product: cartType
}

export const ActionCell:React.FC<props> = ({
  product
}) => {

  const dispatch = useAppDispatch();

  return  <div className="text-right">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const res = await cartService
              .deleteCart(product._id.toString());
            res && dispatch(delCart({ id: product._id }));
          }}
          className="text-red-600" >
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigator.clipboard?.write(product._id)} >
          Copy Product ID
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}