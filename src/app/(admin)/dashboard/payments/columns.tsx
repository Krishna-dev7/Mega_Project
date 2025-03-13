import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { IPayment } from "@/models/payment.models";
import paymentService from "@/services/PaymentService";
import { useAppSelector } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

const columns: ColumnDef<IPayment>[] = [
	{
		id: "id",
		header: "Id",
		accessorKey: "sessionId",
		enableGlobalFilter: true,
		cell: ({ row }) => (
			<span className="w-14 overflow-hidden line-clamp-1 text-ellipsis">
				{row.original.sessionId}
			</span>
		),
	},

	{
		id: "status",
		header: "Status",
		enableColumnFilter: true,
		filterFn: (row, _, value) => {
			if (value === "all") return true;

			return row.original.payment_intent_status?.includes(
				value,
			);
		},
		cell: ({ row }) => {
			const [status, setStatus] = useState(
				row.original.payment_intent_status,
			);

			const [loading, setLoading] = useState(false);
			useEffect(() => {
				try {
					setLoading(true);
					let res;
					(async () => {
						res = (
							await paymentService.getPaymentIntent(
								row.original.paymentIntentId,
							)
						).data.status;

						setStatus(res);
					})();
				} catch (err: any) {
					console.log(err.message);
				} finally {
					setLoading(false);
				}
			}, [setStatus]);

			if (loading) {
				return (
					<Skeleton className="w-full animate-pulse bg-pink-300/50" />
				);
				//   <Skeleton className="h-6 w-full bg-pink-300/80" />
				// </Skeleton>
			}

			return (
				<span className="status text-amber-500">
					{status}
				</span>
			);
		},
	},

	{
		id: "Email",
		header: "Email",
		accessorKey: "email",
		enableGlobalFilter: true,
		cell: ({ row }) => {
			return <span>{row.original.email}</span>;
		},
	},
	{
		id: "amount",
		header: "Amount Total",
		accessorKey: "amount_total",
		cell: ({ row }) => (
			<span className="total ">
				{Intl.NumberFormat("en-IN", {
					style: "currency",
					currency: "INR",
				}).format((row.getValue("amount") as number) / 100)}
			</span>
		),
	},

	{
		id: "Date",
		header: "Date and Time",
		accessorKey: "payment_date",
		cell: ({ row }) => (
			<span className="total ">
				{new Date(1741708442 * 1000).toLocaleDateString()}
			</span>
		),
	},

	{
		id: "actions",
		header: "Action",
		cell: ({ row }) => {
			const [trigger, setTrigger] = useState(false);
			const role = useAppSelector(
				(store) => store.auth.data?.role,
			);
			const [deleteTrigger, setDeleteTrigger] =
				useState(false);

			return (
				<DropdownMenu>
					<DropdownMenuTrigger
						className="cursor-pointer"
						suppressHydrationWarning
						asChild>
						<MoreHorizontal size={15} />
					</DropdownMenuTrigger>

					<DropdownMenuContent className=" bg-black ">
						<DropdownMenuLabel className="w-36 mb-1">
							Actions
						</DropdownMenuLabel>

						<DropdownMenuSeparator className="font-bold bg-neutral-600" />

						<DropdownMenuItem
							className="cursor-pointer mb-1"
							onClick={() => setTrigger(true)}>
							Refund amount
						</DropdownMenuItem>

						<DropdownMenuItem className="cursor-pointer mb-1">
							<a
								className="flex items-center gap-2 text-orange-400 "
								href={row.original.invoice_url}
								download={true}>
								invoice <Download size={14} />
							</a>
						</DropdownMenuItem>

						<DropdownMenuItem
							className="cursor-pointer mb-1 capitalize"
							onClick={() =>
								navigator.clipboard.writeText(
									row.getValue("id"),
								)
							}>
							copy paymentID
						</DropdownMenuItem>

						{role == "admin" && (
							<DropdownMenuItem
								className="cursor-pointer mb-1 capitalize"
								onClick={() => setDeleteTrigger(true)}>
								Delete record
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>

					{/*  dialog box */}
					<Dialog
						open={trigger}
						onOpenChange={setTrigger}>
						<DialogContent>
							<DialogTitle className="text-orange-500 ">
								Warning 🤚
							</DialogTitle>
							<DialogDescription>
								Make sure because this step cannot be revert
							</DialogDescription>
							<DialogFooter>
								<Button
									size={"sm"}
									className="text-xs"
									onClick={async () => {
										try {
											await paymentService.createRefund(
												row.original.paymentIntentId,
											);

											toast({
												title: "success",
												description: "amount refunded",
											});
										} catch (err: any) {
											console.log(
												"Columns error payment refund",
												err.message,
											);
										}
									}}>
									Refund
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					{/* super admin alert */}

					<Dialog
						open={deleteTrigger}
						onOpenChange={setDeleteTrigger}>
						<DialogContent>
							<DialogTitle className="text-orange-500 ">
								Warning 🤚
							</DialogTitle>
							<DialogDescription>
								Sensitive information once removed cannot be
								revert
							</DialogDescription>
							<DialogFooter>
								<Button
									size={"sm"}
									className="text-xs"
									onClick={() =>
										paymentService.deletePayment(
											row.original.sessionId,
										)
									}>
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</DropdownMenu>
			);
		},
	},
];

export default columns;
