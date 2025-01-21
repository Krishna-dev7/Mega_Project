import React, { useMemo, 
  useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cartType} from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import CheckoutButton from "./CheckoutButton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>();
  const [total, setTotal] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  useMemo(() => {
    const amount = table
      .getRowModel()
      .rows.reduce(
        (sum, row) =>
          sum +
          (row.original as cartType).product.price *
            (row.original as cartType).quantity,
        0
      );
    setTotal(amount);

  }, [setTotal, data]);

  return (
    <div className="w-[90%] max-w-4xl mx-auto sm:px-10 py-8">
      <div className="rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No items in cart
                </TableCell>
              </TableRow>
            )}

          </TableBody>
          <TableCaption className="pt-4 mb-5">Shopping Cart Summary</TableCaption>
        </Table>
      </div>

      {/* Price summary  */}
      <div className="mt-6 rounded-lg border mb-3 p-4 shadow-sm">
        <div className="flex justify-between mb-3 items-center">
          <span className="text-sm font-normal">Order Total</span>
          <span className="text-sm font-normal">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        </div>


        <div className="flex justify-between mb-3 items-center">
          <span className="text-sm font-normal">Delivery charge</span>
          <span className="text-sm font-normal">
          {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(40)}
          </span>
        </div>

        <div className="flex justify-between mb-3 items-center">
          <span className="text-sm font-normal">Tax charge</span>
          <span className="text-sm font-normal">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Math.floor(total * 0.18))}
          </span>
        </div>


        <div className="flex mt-4 justify-between mb-3 items-center">
          <span className="text-sm font-normal">Discount</span>
          <span className="text-sm font-normal">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(- total * 0.1 )}
          </span>
        </div>

          <hr />
        <div className="flex mt-4 justify-between mb-3 items-center">
          <span className="text-sm font-normal">Total Cost</span>
          <span className="text-sm font-normal">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format( total + 40 + Math.floor(total * 0.18) - total * 0.1 )}
          </span>
        </div>

      </div>

      {/* Button section  */}
       <div className="w-full flex justify-end" >
          {/* <Button className="bg-gray-300 right-0 place-self-end mt-5 text-black">
            Confirm Order
          </Button> */}
          <CheckoutButton items={table.getRowModel().rows.map((row) => ({
            name: (row.original as cartType).product.slug,
            price: (row.original as cartType).product.price,
            quantity: (row.original as cartType).quantity,
          }))} />
       </div>

    </div>
  );  
}

export default DataTable;