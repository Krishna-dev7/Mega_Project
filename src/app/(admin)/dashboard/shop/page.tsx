"use client"

import { useState } from "react"
import { Package, Filter, MoreHorizontal, Package2, Home, ShoppingCart, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample order data
const orders = [
    {
        id: "ORD-5392",
        customer: "John Smith",
        product: "Wireless Headphones",
        date: "2023-05-15",
        total: "$129.99",
        status: "shipped",
        address: "123 Main St, New York, NY 10001",
    },
    {
        id: "ORD-6201",
        customer: "Sarah Johnson",
        product: "Smart Watch",
        date: "2023-05-14",
        total: "$249.99",
        status: "delivered",
        address: "456 Park Ave, Boston, MA 02108",
    },
    {
        id: "ORD-7402",
        customer: "Michael Brown",
        product: "Bluetooth Speaker",
        date: "2023-05-13",
        total: "$79.99",
        status: "out-for-delivery",
        address: "789 Oak St, Chicago, IL 60007",
    },
    {
        id: "ORD-8512",
        customer: "Emily Davis",
        product: "Laptop Stand",
        date: "2023-05-12",
        total: "$49.99",
        status: "processing",
        address: "321 Pine St, San Francisco, CA 94101",
    },
    {
        id: "ORD-9623",
        customer: "David Wilson",
        product: "Mechanical Keyboard",
        date: "2023-05-11",
        total: "$149.99",
        status: "completed",
        address: "654 Maple Ave, Seattle, WA 98101",
    },
    {
        id: "ORD-1073",
        customer: "Jessica Taylor",
        product: "USB-C Hub",
        date: "2023-05-10",
        total: "$59.99",
        status: "cancelled",
        address: "987 Cedar Rd, Austin, TX 78701",
    },
    {
        id: "ORD-1184",
        customer: "Ryan Martinez",
        product: "Wireless Mouse",
        date: "2023-05-09",
        total: "$39.99",
        status: "returned",
        address: "159 Birch Ln, Denver, CO 80201",
    },
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
    const statusStyles = {
        processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        "out-for-delivery": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
        delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        returned: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    }

    const statusLabels = {
        processing: "Processing",
        shipped: "Shipped",
        "out-for-delivery": "Out for Delivery",
        delivered: "Delivered",
        completed: "Completed",
        cancelled: "Cancelled",
        returned: "Returned",
    }

    const style = statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
    const label = statusLabels[status as keyof typeof statusLabels] || status

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}>{label}</span>
    )
}
const Shop = () => {
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [searchQuery, setSearchQuery] = useState<string>("")

    // Filter orders based on status and search query
    const filteredOrders = orders.filter((order) => {
        const matchesStatus = statusFilter === "all" || order.status === statusFilter
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.product.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesStatus && matchesSearch
    })
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full md:w-[300px]"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <SelectValue placeholder="Filter by status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="returned">Returned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardHeader className="px-6">
                    <CardTitle>Order Management</CardTitle>
                    <CardDescription>Manage and track your customer orders and their delivery status.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Order ID</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead className="hidden md:table-cell">Product</TableHead>
                                    <TableHead className="hidden md:table-cell">Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium">{order.id}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell className="hidden md:table-cell">{order.product}</TableCell>
                                            <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                                            <TableCell>
                                                <StatusBadge status={order.status} />
                                            </TableCell>
                                            <TableCell className="text-right">{order.total}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Open menu</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View details</DropdownMenuItem>
                                                        <DropdownMenuItem>Update status</DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>Contact customer</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No orders found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </main>

    )
}
export default Shop;