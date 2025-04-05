"use client";

import {
  Bell,
  ChevronDown,
  Package
} from "lucide-react";
import Image from "next/image";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import Loading from "@/components/customUI/misc/Loading";
import accountService from "@/services/AccountService";
import { UserSchema } from "@/models/user.models";
import { IPayment } from "@/models/payment.models";
import paymentService from "@/services/PaymentService";
import orderService from "@/services/OrderService";
import { IOrder } from "@/models/order.models";
import { ChartComponent } from "@/components/customUI/charts/BarChart";

export default function DashboardPage() {

	const [isLoading, setIsLoading] = useState(false)
	const [users, setUsers] = useState<UserSchema[]>([])
	const [payments, setPayments] = useState<IPayment[]>([])
	const [orders, setOrders] = useState<IOrder[]>([])
	
	useEffect(() => {
		const fetch = async () => {
			const res = await accountService
				.streamUsers()

			const payments = await paymentService
				.streamPayments()

			const orders = await orderService
				.streamOrders()

			setUsers(res.data)
			setPayments(payments.data)
			setOrders(orders.data)
		}

		fetch()
	}, [])


	const store = useAppSelector(store => store)

	const user = store.auth.data
	const products = store.product.products



	if(isLoading) return <div className="loader
		w-full min-h-screen flex justify-center items-center">
		<Loading />
	</div>


	return (
		<div className="min-h-screen h-fit flex dark:bg-transparent">
			{/* Main Content */}
			<div className="flex-1 min-h-screen">
				{/* Header */}
				<header className="border-b">
					<div className="flex h-16 items-center px-6 gap-4">
						<div className="flex-1">
							<h1 className="text-2xl capitalize font-semibold">
								Welcome Back, {user?.username}!
							</h1>
							<p className="text-sm text-muted-foreground">
								Here's what happening with your store today
							</p>
						</div>
						<Button
							variant="ghost"
							size="icon">
							<Bell className="h-5 w-5" />
						</Button>
						<Button
							variant="ghost"
							className="gap-2">
							<Avatar className="h-8 w-8">
								<AvatarImage
									src="/placeholder.svg"
									alt="User"
								/>
								<AvatarFallback>ZH</AvatarFallback>
							</Avatar>
							<span className="capitalize">
								{user?.fullname}
							</span>
							{/* <ChevronDown className="h-4 w-4" /> */}
						</Button>
					</div>
				</header>

				{/* Dashboard Content */}
				<div className="p-6 space-y-6">
					{/* Stats */}
					<div className="grid gap-4 md:grid-cols-3">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Customers
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{users.length}
								</div>
								<p className="text-xs text-green-500 flex items-center gap-1">
									+
									{(users.filter(
										(user) =>
											new Date(user.createdAt).getMonth() ==
											new Date().getMonth(),
									).length /
										users.length) *
										100}
									%
									<span className="text-muted-foreground">
										this month
									</span>
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Revenue
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{new Intl.NumberFormat("en-IN", {
										style: "currency",
										currency: "INR",
									}).format(
										payments.reduce(
											(acc, payment) =>
												acc + payment.amount_total,
											0,
										) / 100,
									)}
								</div>
								<p className="text-xs text-red-500 flex items-center gap-1">
									<span className="text-muted-foreground">
										this month
									</span>
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Orders
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{orders.length}
								</div>
								<p className="text-xs text-green-500 flex items-center gap-1">
									<span className="text-muted-foreground">
										this month
									</span>
								</p>
							</CardContent>
						</Card>
					</div>

					{/* Chart */}
					<Card>
						<CardHeader>
							<CardTitle>Earnings</CardTitle>
						</CardHeader>
						<CardContent className="flex items-center justify-center">
							<div className="h-fit flex items-center justify-center
							 text-muted-foreground lg-w-1/2 sm:w-2/3 xs:w-full">
								<ChartComponent />
							</div>
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
										<TableCell className="text-green-500">
											In Stock
										</TableCell>
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
										<TableCell className="text-red-500">
											Out of Stock
										</TableCell>
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
							<CardTitle className="text-sm font-medium">
								Recent Orders
							</CardTitle>
							<Button
								variant="link"
								size="sm"
								className="text-sm">
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
								<div className="text-sm font-medium">
									Denim jenas T-shirts
								</div>
								<div className="text-xs text-muted-foreground">
									T-shirt
								</div>
							</div>
							<div className="text-sm font-medium">
								{
									new Intl.NumberFormat('en-IN', {
										currency: 'INR',
										style: 'currency'
									}).format(110.96)
								}
							</div>
						</div>
						<Separator />
						<div className="flex items-center gap-4">
							<div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
								<Package className="h-5 w-5" />
							</div>
							<div className="flex-1">
								<div className="text-sm font-medium">
									Royal Rajasthani Saree
								</div>
								<div className="text-xs text-muted-foreground">
									Sarees
								</div>
							</div>
							<div className="text-sm font-medium">
							{
									new Intl.NumberFormat('en-IN', {
										currency: 'INR',
										style: 'currency'
									}).format(350)
								}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
