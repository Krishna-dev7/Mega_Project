import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { IProduct } from "@/models/product.models";
import productService from "@/services/productService";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";


const getColumns = (
  setData:React.Dispatch<React.SetStateAction<IProduct[]>>
):  ColumnDef<IProduct>[] => {
  const columns: ColumnDef<IProduct>[] = [
      {
        header: "image",
        cell: ({ row }) => (
          <div
            className="image w-12 h-12  object-cover
              object-center aspect-square">
            <img
              className="w-full h-full rounded-lg"
              src={row.original.images?.[0]}
            />
          </div>
        ),
      },
      {
        accessorKey: "slug",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(
                  column.getIsSorted() === "asc",
                )
              }>
              Product
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("slug")}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <div>{row.getValue("category")}</div>
        ),
      },
      {
        accessorKey: "price",
        header: () => <div className="text-right">Price</div>,
        cell: ({ row }) => {
          const price = Number.parseFloat(
            row.getValue("price"),
          );
          const formatted = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(price);
          return (
            <div className="text-right font-medium">
              {formatted}
            </div>
          );
        },
      },
      {
        accessorKey: "countInStock",
        header: () => <div className="text-right">Stock</div>,
        cell: ({ row }) => {
          return (
            <div className="text-right">
              {row.getValue("countInStock")}
            </div>
          );
        },
      },
      {
        header: "Status",
        enableColumnFilter: true,
        filterFn: (row, id, value) => {
          if (value === "all") return true;
          const stockValue = row.getValue(
            "countInStock",
          ) as number;
          const status =
            stockValue >= 20
              ? "In Stock"
              : stockValue < 20 && stockValue > 0
                ? "Low Stock"
                : "Out of Stock";
          return value.includes(status);
        },
        cell: ({ row }) => {
          const stock: number = row.getValue("countInStock");
          return (
            <Button
              variant={
                stock >= 20
                  ? "default"
                  : stock < 20
                    ? "outline"
                    : "destructive"
              }>
              {stock >= 20
                ? "In Stock"
                : stock < 20 && stock > 0
                  ? "Low Stock"
                  : "Out of Stock"}
            </Button>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const product = row.original;
          const router = useRouter();
          
  
            const deleteProduct = async (row: any) => {
              const res = await productService.deleteProduct(
                row.original?._id.toString(),
              );
          
              if (res.success) {
                toast({
                  title: "info",
                  description: "product deleted",
                });
              }
          
              setData((prev) => {
                const newData = prev.filter(
                  (item) => item._id !== row.original?._id,
                );
                return [...newData];
              });
            };
  
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    navigator.clipboard.writeText(
                      product._id.toString(),
                    )
                  }>
                  Copy product ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    router.push(
                      `/products/${row.original._id.toString()}`,
                    )
                  }>
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router
                      .push(`products/edit?productId=${row.original._id}`)}
                  >
                  Edit product
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => deleteProduct(row)}
                  className="text-destructive">
                  Delete product
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ];
  return columns
}



  export default getColumns;