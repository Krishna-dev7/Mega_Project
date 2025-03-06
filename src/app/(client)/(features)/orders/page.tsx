"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CalendarIcon, ChevronDownIcon, MoonIcon, PackageIcon, SearchIcon, SunIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Skeleton } from "@/components/ui/skeleton"

interface DateRange {
  from?: Date;
  to?: Date;
}
// Sample order data
const orders = [
  {
    id: "ORD-1234",
    date: "2023-11-14",
    status: "Delivered",
    total: "$129.99",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: "$89.99" },
      { name: "Phone Case", quantity: 1, price: "$19.99" },
      { name: "Screen Protector", quantity: 1, price: "$20.01" },
    ],
  },
  {
    id: "ORD-1233",
    date: "2023-11-07",
    status: "Shipped",
    total: "$54.99",
    items: [{ name: "Bluetooth Speaker", quantity: 1, price: "$54.99" }],
  },
  {
    id: "ORD-1232",
    date: "2023-10-28",
    status: "Delivered",
    total: "$214.97",
    items: [
      { name: "Smart Watch", quantity: 1, price: "$199.99" },
      { name: "Watch Band", quantity: 1, price: "$14.98" },
    ],
  },
  {
    id: "ORD-1231",
    date: "2023-10-15",
    status: "Delivered",
    total: "$45.00",
    items: [{ name: "T-Shirt", quantity: 2, price: "$22.50" }],
  },
]

export default function OrdersPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "all" || order.status.toLowerCase() === filter
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesDateRange =
    (!dateRange.from || new Date(order.date) >= new Date(dateRange.from as Date)) &&
    (!dateRange.to || new Date(order.date) <= new Date(dateRange.to as Date));
    return matchesFilter && matchesSearch && matchesDateRange
  })

  const handleReorder = (orderId: string) => {
    console.log(`Reordering items from order ${orderId}`)
    // Implement reorder logic here
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">My Orders</h1>
            <p className="text-muted-foreground">View and track your order history</p>
          </div>
          <div className="flex items-center space-x-2">
            <SunIcon className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} aria-label="Toggle dark mode" />
            <MoonIcon className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-6 flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="flex-grow">
            <DateRangePicker date={dateRange} setDate={setDateRange} />
          </div>
          <div className="relative flex-grow md:max-w-[200px]">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6 space-y-4">
          <AnimatePresence>
            {isLoading ? (
              <OrderSkeleton />
            ) : filteredOrders.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <PackageIcon className="h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-lg font-medium">No orders found</p>
                    <p className="text-muted-foreground">Try changing your filter or search terms</p>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted/40 py-4">
                      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                        <div>
                          <CardTitle className="text-base font-medium">Order {order.id}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                            <span>{order.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getStatusColor(order.status)}`}>{order.status}</Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          >
                            {expandedOrder === order.id ? "Hide Details" : "View Details"}
                            <ChevronDownIcon
                              className={`ml-1 h-4 w-4 transition-transform duration-200 ${expandedOrder === order.id ? "rotate-180" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <AnimatePresence>
                      {expandedOrder === order.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <CardContent className="py-4">
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                                      <PackageIcon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{item.name}</p>
                                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="font-medium">{item.price}</p>
                                </div>
                              ))}
                            </div>
                            <Separator className="my-4" />
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium">Total</span>
                                <span className="font-bold ml-2">{order.total}</span>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => handleReorder(order.id)}>
                                Reorder
                              </Button>
                            </div>
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function OrderSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/40 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24 mt-2" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-4">
        <div className="space-y-3">
          {[1, 2].map((_, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded" />
                <div>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-16 mt-1" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

