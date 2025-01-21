"use client"

import React from "react";
import {
  ColumnDef,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { cartType, delCart } from "@/store/cartSlice";
import cartService from "@/services/CartService";
import DataTable from "@/components/customUi/checkout/DataTable";

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

export const columns: ColumnDef<cartType>[] = [
  {
    accessorKey: "product.images[0].url",
    header: "",
    cell: ({ row }) => (
      <div className="w-20 h-20 rounded-lg overflow-hidden">
        <img
          src={row.original.product.images[0].url}
          alt={row.original.product.slug}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "product.slug",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column
          .toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-transparent"
      >
        Product
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.product.slug}</span>
    ),
  },
  {
    accessorKey: "product.price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.original.product.price.toString());
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-start w-full font-medium">
        {formatted}
      </div>;
    },
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.quantity}
      </div>
    ),
  },
  {
    id: "actions",
    header: "action",
    cell: ({ row }) => {
      const product = row.original;
      return <ActionCell product={product} />
    },
  },
];



const CheckoutItem: React.FC = () => {
  const carts = useAppSelector((store) => store.cart.carts);
  return <DataTable columns={columns} data={carts} />;
};

export default CheckoutItem;