"use client";

import Loading from "@/components/customUi/misc/Loading";
import TableComponent from "@/components/customUi/misc/Table";
import useTable from "@/hooks/use-table";
import { IPayment } from "@/models/payment.models";
import paymentService from "@/services/PaymentService";
import { InitialTableState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import columns from "./columns";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const PaymentPage: React.FC = () => {
	const [data, setData] = useState<IPayment[]>([]);

	useEffect(() => {
		try {
			(async function () {
				const res = await paymentService.streamPayments();
				console.log(res);

				setData(res.data);
			})();
		} catch (err: any) {
			console.log("Dashboard:payments err: ", err.message);
		}
	}, [setData]);

	const initialState: InitialTableState = {
		pagination: {
			pageIndex: 0,
			pageSize: 10,
		},
	};

	const table = useTable(data, initialState, columns);

	if (data.length < 1) {
		return (
			<div
				className="loader w-full min-h-screen
      flex items-center justify-center">
				<Loading />
			</div>
		);
	}

	return (
		<div
			className="payment-div w-full min-h-screen
			flex flex-col items-center mx-auto sm:px-5 sm:py-4 
			justify-start text-xs gap-6 ">
			<div className="filter-bar flex gap-1 items-center w-full">
				{/* search bar */}
				<Input
					type="text"
					className="border-neutral-500 border-2 w-full"
					placeholder="Search by name, role or email"
					value={table.getState().globalFilter ?? ""}
					onChange={(e) =>
						table.setGlobalFilter(e.target.value)
					}
				/>

				{/* Columns */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							size={"sm"}
							className="mx-2 text-xs font-semibold">
							Columns
							<ChevronDown />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent>
						{table.getAllColumns().map((column) => (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={() =>
									column.toggleVisibility()
								}>
								{column.id}
							</DropdownMenuCheckboxItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>

				{/* status filter */}
				<Select
					value={
						(table
							.getColumn("status")
							?.getFilterValue() as string) || ""
					}
					onValueChange={(value) => {
						table
							.getColumn("status")
							?.setFilterValue(value);
					}}>
					<SelectTrigger
						className="bg-violet-50 text-xs w-fit 
							font-semibold text-black ">
						<SelectValue placeholder="Status" />
					</SelectTrigger>

					<SelectContent className="captialize">
						<SelectItem value="all">
							All Statuses
						</SelectItem>
						<SelectItem value="succeeded">
							Succeeded
						</SelectItem>
						<SelectItem value="failed">Failed</SelectItem>
						<SelectItem value="processing">
							Processing
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<TableComponent
				className="text-xs"
				table={table}
				columns={columns}
			/>
		</div>
	);
};

export default PaymentPage;
