"use client";

import { useState } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	CheckCircle,
	Clock,
	Copy,
	ExternalLink,
	HelpCircle,
	MapPin,
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
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export default function TrackOrder() {
	const { toast } = useToast();
	const [activeTab, setActiveTab] = useState("tracking");

	// Order tracking details would typically come from your order/shipping management system
	const orderDetails = {
		orderNumber: "ORD-38291",
		date: "March 16, 2025",
		estimatedDelivery: "March 20-22, 2025",
		carrier: "FedEx",
		trackingNumber: "FX-7391824650",
		status: "in_transit", // Can be: processing, shipped, in_transit, out_for_delivery, delivered
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
		shippingAddress: {
			name: "Alex Johnson",
			street: "123 Main Street",
			apt: "Apt 4B",
			city: "San Francisco",
			state: "CA",
			zip: "94103",
			country: "United States",
		},
		trackingHistory: [
			{
				status: "Delivered",
				location: "San Francisco, CA",
				timestamp: "March 22, 2025 • 2:30 PM",
				description: "Package delivered to recipient",
				completed: false,
			},
			{
				status: "Out for Delivery",
				location: "San Francisco, CA",
				timestamp: "March 22, 2025 • 8:15 AM",
				description: "On FedEx vehicle for delivery",
				completed: false,
			},
			{
				status: "At Local Facility",
				location: "San Francisco, CA",
				timestamp: "March 21, 2025 • 11:42 PM",
				description:
					"Arrived at FedEx destination facility",
				completed: true,
			},
			{
				status: "In Transit",
				location: "Oakland, CA",
				timestamp: "March 20, 2025 • 3:17 PM",
				description: "Departed FedEx hub",
				completed: true,
			},
			{
				status: "Shipped",
				location: "Portland, OR",
				timestamp: "March 18, 2025 • 10:23 AM",
				description: "Picked up by carrier",
				completed: true,
			},
			{
				status: "Processing",
				location: "Portland, OR",
				timestamp: "March 17, 2025 • 1:45 PM",
				description:
					"Order processed and ready for shipment",
				completed: true,
			},
			{
				status: "Order Placed",
				location: "Online",
				timestamp: "March 16, 2025 • 4:32 PM",
				description: "Order confirmed and payment received",
				completed: true,
			},
		],
	};

	// Helper function to determine current step
	const getCurrentStep = (status: string) => {
		switch (status) {
			case "processing":
				return 0;
			case "shipped":
				return 1;
			case "in_transit":
				return 2;
			case "out_for_delivery":
				return 3;
			case "delivered":
				return 4;
			default:
				return 0;
		}
	};

	const currentStep = getCurrentStep(orderDetails.status);

	// Steps for the progress indicator
	const steps = [
		{
			name: "Processing",
			icon: <Clock className="h-5 w-5" />,
		},
		{
			name: "Shipped",
			icon: <Package className="h-5 w-5" />,
		},
		{
			name: "In Transit",
			icon: <Truck className="h-5 w-5" />,
		},
		{
			name: "Out for Delivery",
			icon: <MapPin className="h-5 w-5" />,
		},
		{
			name: "Delivered",
			icon: <CheckCircle className="h-5 w-5" />,
		},
	];

	const copyTrackingNumber = () => {
		navigator.clipboard.writeText(
			orderDetails.trackingNumber,
		);
		toast({
			description: "Tracking number copied to clipboard",
		});
	};

	return (
		<div className="container mx-auto max-w-3xl min-h-screen mt-20 py-12 px-4">
			<div className="mb-8">
				<Button
					variant="ghost"
					size="sm"
					asChild
					className="mb-6">
					<Link href="/orders">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Orders
					</Link>
				</Button>
				<h1 className="text-3xl font-bold tracking-tight">
					Track Your Order
				</h1>
				<p className="text-muted-foreground mt-2">
					Order #{orderDetails.orderNumber} • Placed on{" "}
					{orderDetails.date}
				</p>
			</div>

			<Card className="mb-8">
				<CardHeader className="pb-3">
					<CardTitle>Shipping Status</CardTitle>
					<CardDescription>
						Estimated delivery:{" "}
						{orderDetails.estimatedDelivery}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Progress Tracker */}
					<div className="mb-8">
						<div className="relative flex items-center justify-between">
							{steps.map((step, index) => (
								<div
									key={index}
									className="flex flex-col items-center">
									<div
										className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 ${
											index <= currentStep
												? "border-primary bg-primary text-primary-foreground"
												: "border-muted bg-background"
										}`}>
										{step.icon}
									</div>
									<span
										className={`mt-2 text-xs font-medium ${
											index <= currentStep
												? "text-primary"
												: "text-muted-foreground"
										}`}>
										{step.name}
									</span>
								</div>
							))}

							{/* Connecting lines */}
							<div className="absolute left-0 top-6 h-0.5 w-full -translate-y-1/2">
								<div className="h-full bg-muted"></div>
								<div
									className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
									style={{
										width: `${(currentStep / (steps.length - 1)) * 100}%`,
									}}></div>
							</div>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
						<div>
							<h3 className="font-medium">
								Tracking Information
							</h3>
							<div className="flex items-center mt-1">
								<p className="text-sm text-muted-foreground mr-2">
									{orderDetails.carrier}:{" "}
									{orderDetails.trackingNumber}
								</p>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="h-6 w-6"
												onClick={copyTrackingNumber}>
												<Copy className="h-3.5 w-3.5" />
												<span className="sr-only">
													Copy tracking number
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Copy tracking number</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
						<Button
							variant="outline"
							size="sm"
							className="gap-2"
							asChild>
							<a
								href={`https://www.fedex.com/tracking?tracknumbers=${orderDetails.trackingNumber}`}
								target="_blank"
								rel="noopener noreferrer">
								Track on {orderDetails.carrier}
								<ExternalLink className="h-3.5 w-3.5" />
							</a>
						</Button>
					</div>


				</CardContent>
				<CardFooter className="flex flex-col sm:flex-row gap-4">
					<Button
						variant="outline"
						asChild>
						<Link href="/support">
							<HelpCircle className="mr-2 h-4 w-4" />
							Need Help?
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
