"use client"
import React, { useEffect, useMemo, 
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cartType} from "@/store/cartSlice";
import { Button } from "@/components/ui/button";
import CheckoutButton from "./CheckoutButton";
import cartService from "@/services/CartService";
import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/store";
import ConfirmDialog from "../reusable/AlertDialog";

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
  const dispatch = useAppDispatch();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 3,
        pageIndex: 0,
      },
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
    <div className="w-[100%] flex flex-col text-xs 
      sm:text-sm max-w-4xl mx-auto sm:px-10 py-8">
      <div className="rounded-lg shadow-sm mb-5">
        <Table>
          <TableHeader>
            {table.getRowCount() > 0 
              && table.getHeaderGroups().map((headerGroup) => (
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

          <TableBody  >
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
                  className="h-24 text-sm text-center text-muted-foreground"
                >
                  No items in cart
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {table.getRowCount() > 0 && <TableFooter 
            className="w-full bg-transparent hover:bg-transparent
              text-violet-400">
            <TableRow >
              <TableCell 
                colSpan={columns.length} 
                className="text-sm px-2 py-3 ">
                  <div className="flex justify-between items-center">
                    Total <span>{Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(total)}</span>
                  </div>
              </TableCell>
            </TableRow>
          </TableFooter>}
        </Table>
      </div>

      {table.getRowCount() !== 0 && <div 
        className="delete-section flex space-x-2 justify-end">

        <ConfirmDialog
          title="Warning 🤚"
          description={`Are you sure you want 
            to delete the selected items?`}
          key={new Date().getMilliseconds()}

          triggerDisabled={
            table.getSelectedRowModel().rows.length == 0}

          action={async () => {
            if(table.getIsAllPageRowsSelected()) {
              const res = await cartService.deleteCarts({});
              // dispatch()
              res && toast({
                title: "cart cleared",
                description: "cart cleared successfully",
                variant: "default"
              })
            }
            else 
              await cartService.deleteCarts({
                ids: table.getSelectedRowModel().rows.map((row) => 
                  (row.original as cartType)?._id.toString())})
          }}
          >
            <Button 
              disabled={ !(table.getIsAllPageRowsSelected() 
                || table.getIsSomePageRowsSelected()) } 
              >
              { table.getIsAllPageRowsSelected() 
                  ? "Clear all" 
                  : "remove" }
            </Button>
        </ConfirmDialog>

        <CheckoutButton 
          isDisabled={table.getRowCount() === 0}
          items={table.getRowModel().rows.map((row) => ({
            name: (row.original as cartType).product.slug,
            price: (row.original as cartType).product.price,
            quantity: (row.original as cartType).quantity,
            image: (row.original as cartType).product.images[0].url
          }))} />
      </div> }


      { table.getRowCount() > 3 && <div className="flex items-center 
      justify-end mt-2 space-x-2 py-4">
      <Button
          variant="outline"
          size="sm"
          onClick={() =>{
            table.previousPage()
            table.initialState
              .pagination.pageIndex--
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {"<-"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            table.nextPage();
            table.initialState
              .pagination.pageIndex++
          }}
          disabled={!table.getCanNextPage()}
        >
          {"->"}
        </Button>
      </div>}
    </div>
  );  
}

export default DataTable;