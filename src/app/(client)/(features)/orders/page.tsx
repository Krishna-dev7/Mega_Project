"use client";

import Link from "next/link";
import {
	ArrowRight,
	Calendar,
	CheckCircle2,
	Download,
	Package,
	Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const Orders: React.FC = () => {
	const orderDetails = {
		orderNumber: "ORD-38291",
		date: "March 16, 2025",
		estimatedDelivery: "March 20-22, 2025",
		items: [
			{
				name: "Minimalist Desk Lamp",
				variant: "Matte Black",
				price: 89.0,
				quantity: 1,
			},
			{
				name: "Ergonomic Office Chair",
				variant: "Light Gray",
				price: 249.0,
				quantity: 1,
			},
		],
		subtotal: 338.0,
		shipping: 12.99,
		tax: 33.8,
		total: 384.79,
		shippingAddress: {
			name: "Alex Johnson",
			street: "123 Main Street",
			apt: "Apt 4B",
			city: "San Francisco",
			state: "CA",
			zip: "94103",
			country: "United States",
		},
		paymentMethod: "Visa ending in 4242",
	};

	return (
		<div className="container mx-auto mt-20 max-w-3xl py-12 px-4">
			<div className="mb-8 text-center">
				<div className="flex justify-center mb-4">
					<CheckCircle2 className="h-16 w-16 text-primary" />
				</div>
				<h1 className="text-3xl font-bold tracking-tight">
					Order Confirmed
				</h1>
				<p className="text-muted-foreground mt-2">
					Thank you for your purchase! Your order has been
					received and is being processed.
				</p>
			</div>

			<Card className="mb-8">
				<CardHeader className="pb-3">
					<div className="flex flex-col sm:flex-row sm:items-center
             sm:justify-between gap-4">
						<div>
							<CardTitle>
								Order #{orderDetails.orderNumber}
							</CardTitle>
							<CardDescription className="flex items-center mt-1">
								<Calendar className="h-4 w-4 mr-1" />
								Placed on {orderDetails.date}
							</CardDescription>
						</div>
						<Button
							variant="outline"
							size="sm"
							className="sm:self-start">
							<Download className="h-4 w-4 mr-2" />
							Download Receipt
						</Button>
					</div>
				</CardHeader>
				<CardContent className="pb-0">
					<div className="space-y-6">
						<div>
							<h3 className="font-medium text-sm text-muted-foreground mb-3">
								ORDER ITEMS
							</h3>
							<div className="space-y-4">
								{orderDetails.items.map((item, index) => (
									<div
										key={index}
										className="flex items-start gap-4">
										<div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
											<Image
												src="/placeholder.svg?height=64&width=64"
												alt={item.name}
												className="h-12 w-12 object-cover"
											/>
										</div>
										<div className="flex-1 space-y-1">
											<h4 className="font-medium">
												{item.name}
											</h4>
											<p className="text-sm text-muted-foreground">
												{item.variant}
											</p>
											<div className="flex items-center gap-2">
												<span className="text-sm">
													Qty: {item.quantity}
												</span>
											</div>
										</div>
										<div className="text-right">
											<p className="font-medium">
												${item.price.toFixed(2)}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<Separator />

						<div className="grid gap-6 md:grid-cols-2">
							<div>
								<h3 className="font-medium text-sm text-muted-foreground mb-3">
									SHIPPING INFORMATION
								</h3>
								<div className="space-y-1">
									<p className="font-medium">
										{orderDetails.shippingAddress.name}
									</p>
									<p className="text-muted-foreground">
										{orderDetails.shippingAddress.street}
									</p>
									<p className="text-muted-foreground">
										{orderDetails.shippingAddress.apt}
									</p>
									<p className="text-muted-foreground">
										{orderDetails.shippingAddress.city},{" "}
										{orderDetails.shippingAddress.state}{" "}
										{orderDetails.shippingAddress.zip}
									</p>
									<p className="text-muted-foreground">
										{orderDetails.shippingAddress.country}
									</p>
								</div>
								<div className="mt-4 flex items-center text-sm">
									<Truck className="h-4 w-4 mr-2 text-muted-foreground" />
									<span>
										Estimated delivery:{" "}
										{orderDetails.estimatedDelivery}
									</span>
								</div>
							</div>

							<div>
								<h3 className="font-medium text-sm text-muted-foreground mb-3">
									PAYMENT DETAILS
								</h3>
								<div className="space-y-1">
									<p className="font-medium">
										{orderDetails.paymentMethod}
									</p>
									<div className="space-y-3 mt-4">
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground">
												Subtotal
											</span>
											<span>
												${orderDetails.subtotal.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground">
												Shipping
											</span>
											<span>
												${orderDetails.shipping.toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between text-sm">
											<span className="text-muted-foreground">
												Tax
											</span>
											<span>
												${orderDetails.tax.toFixed(2)}
											</span>
										</div>
										<Separator />
										<div className="flex justify-between font-medium">
											<span>Total</span>
											<span>
												${orderDetails.total.toFixed(2)}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row gap-4 mt-6">
					<Button asChild>
						<Link href="/track-order">
							<Package className="mr-2 h-4 w-4" />
							Track Order
						</Link>
					</Button>
					<Button
						variant="outline"
						asChild>
						<Link href="/shop">
							Continue Shopping
							<ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
				</CardFooter>
			</Card>

			<div className="text-center space-y-4">
				<h3 className="font-medium">Need Help?</h3>
				<p className="text-muted-foreground text-sm">
					If you have any questions about your order, please
					contact our customer support.
				</p>
				<Button
					variant="link"
					asChild>
					<Link href="/support">Contact Support</Link>
				</Button>
			</div>
		</div>
	);
};

export default Orders;
