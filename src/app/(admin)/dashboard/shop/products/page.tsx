"use client"
import * as React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useAppSelector } from "@/store/store"
import { IProduct } from "@/models/product.models"
import axios from "axios"
import conf from "@/helpers/conf"
import { setProducts } from "@/store/productSlice"
import SideBar from "@/components/admin/SideBar"
import { useRouter } from "next/navigation"





export default function ProductsDataTable() {
    const [sorting, setSorting]
        = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters]
        = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility]
        = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection]
        = React.useState({})
    const [data, setData] = React.useState([])
    const router = useRouter()

    React.useEffect(() => {
        axios
        .get(`${conf.url}/api/products`)
        .then(res => {
            setData(res.data?.data)
          setProducts([...res.data.data]);
          dispatch(dispatchProducts(res.data.data));
        })
        .catch(err =>
          console.log("product fetch error: ", err.message)
        )
    }, [])

    const columns: ColumnDef<IProduct>[] = [
        {
            header: 'image',
            cell: ({row}) => (
                <div 
                    className="image w-12 h-12  object-cover
                        object-center aspect-square">
                    <img className="w-full h-full rounded-lg" src={row.original.images[0].url} />
                </div>
            )
        },
        {
            accessorKey: "slug",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Product
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-medium">{row.getValue("slug")}</div>,
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <div>{row.getValue("category")}</div>,
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) => {
                const price = Number.parseFloat(row.getValue("price"))
                const formatted = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                }).format(price)
                return <div className="text-right font-medium">{formatted}</div>
            },
        },
        {
            accessorKey: "countInStock",
            header: () => <div className="text-right">Stock</div>,
            cell: ({ row }) => {
                return <div className="text-right">{row.getValue("countInStock")}</div>
            },
        },
        {
            header: "Status",
            cell: ({ row }) => {
                const stock: number = row.getValue("countInStock")
                return (
                    <Badge variant=
                        {stock >= 20
                            ? "default"
                            : stock < 20
                                ? "outline"
                                : "destructive"}>
                        {stock >= 20
                            ? "In Stock"
                            : stock < 20 && stock > 0
                                ? "Low Stock"
                                : "Out of Stock"}
                    </Badge>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const product = row.original

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator
                                .clipboard.writeText(product._id.toString())}>
                                Copy product ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.push(`/products/${row.original._id.toString()}`)}
                                >View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit product</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete product</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        
    })

    return (
        <Card className="border-none flex shadow-sm">
            <div><SideBar /></div>
            <div className="w-full mx-5">
            <div className="flex items-center py-4 px-4">
                <Input
                    placeholder="Filter products..."
                    value={(table.getColumn("slug")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("slug")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 p-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {"<-"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {"->"}
                    </Button>
                </div>
            </div>
            </div>
        </Card>
    )
}

function dispatchProducts(data: any): any {
    throw new Error("Function not implemented.")
}
function dispatch(arg0: any) {
    throw new Error("Function not implemented.")
}

