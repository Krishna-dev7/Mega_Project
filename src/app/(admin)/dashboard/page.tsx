"use client"

import {
  Bell,
  ChevronDown,
  Frame,
  Home,
  LineChart,
  LogOut,
  MessageSquare,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import SideBar from "@/components/admin/SideBar"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex dark:bg-transparent">  
      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        {/* Header */}
        <header className="border-b">
          <div className="flex h-16 items-center px-6 gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Welcome Back, Zac!</h1>
              <p className="text-sm text-muted-foreground">Here's what happening with your store today</p>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>ZH</AvatarFallback>
              </Avatar>
              <span>Zac Hudson</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">307.48K</div>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  +30%
                  <span className="text-muted-foreground">this month</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$30.58K</div>
                <p className="text-xs text-red-500 flex items-center gap-1">
                  -15%
                  <span className="text-muted-foreground">this month</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.48K</div>
                <p className="text-xs text-green-500 flex items-center gap-1">
                  +23%
                  <span className="text-muted-foreground">this month</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">Chart goes here</div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardHeader>
              <CardTitle>Top selling products</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S/NO: 01</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Total sales</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Image
                        src="/placeholder.svg"
                        alt="Product"
                        className="h-10 w-10 rounded-md"
                        width={40}
                        height={40}
                      />
                    </TableCell>
                    <TableCell>Denim Jacket</TableCell>
                    <TableCell>Men's Tops</TableCell>
                    <TableCell className="text-green-500">In Stock</TableCell>
                    <TableCell>1.43k</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Image
                        src="/placeholder.svg"
                        alt="Product"
                        className="h-10 w-10 rounded-md"
                        width={40}
                        height={40}
                      />
                    </TableCell>
                    <TableCell>Nike Air Max 97</TableCell>
                    <TableCell>Men's Shoes</TableCell>
                    <TableCell className="text-red-500">Out of Stock</TableCell>
                    <TableCell>2.68k</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l bg-background p-6 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Top Countries by Sells</CardTitle>
              <span className="text-sm text-muted-foreground">34.48K</span>
            </div>
            <p className="text-xs text-muted-foreground">Since last week</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Image src="/placeholder.svg" alt="AU" className="h-6 w-6 rounded-full" width={24} height={24} />
              <div className="flex-1">
                <div className="text-sm font-medium">Australia</div>
              </div>
              <div className="text-sm">7.12K</div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <Image src="/placeholder.svg" alt="BE" className="h-6 w-6 rounded-full" width={24} height={24} />
              <div className="flex-1">
                <div className="text-sm font-medium">Belgium</div>
              </div>
              <div className="text-sm">4.15K</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
              <Button variant="link" size="sm" className="text-sm">
                See all
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Nike Air Force 1</div>
                <div className="text-xs text-muted-foreground">Shoes</div>
              </div>
              <div className="text-sm font-medium">$110.96</div>
            </div>
            <Separator />
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">Men's Dri-FIT 7</div>
                <div className="text-xs text-muted-foreground">Sports</div>
              </div>
              <div className="text-sm font-medium">$38.97</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

