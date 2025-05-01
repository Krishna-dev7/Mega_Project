"use client";
import {
	type ColumnFiltersState,
	InitialTableState,
	type SortingState,
	type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, RefreshCcwDot } from "lucide-react";
import * as React from "react";

import TableComponent from "@/components/customUi/misc/Table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import conf from "@/helpers/conf";
import axios from "axios";
import { useState } from "react";
import { IProduct } from "@/models/product.models";
import getColumns from "./columns";
import Loading from "@/components/customUi/misc/Loading";
import useTable from "@/hooks/use-table";
import { useRouter } from "next/navigation";

export default function ProductsDataTable() {
	const [globalFilter, setGlobalFilter] = useState("");
	const [data, setData] = React.useState<IProduct[]>([]);
	const [loading, setLoading] = useState(false);

	React.useEffect(() => {
		setLoading(true);
		axios
			.get(`${conf.url}/api/products`)
			.then((res) => {
				setData(res.data?.data);
				// setProducts([...res.data.data]);
				dispatch(dispatchProducts(res.data.data));
			})
			.catch((err) =>
				console.log("product fetch error: ", err.message),
			)
			.finally(() => setLoading(false));
	}, []);

	const columns = getColumns(setData);
	const router = useRouter();
	const initialState: InitialTableState = {
		pagination: {
			pageIndex: 0,
			pageSize: 8,
		},
	};

	const table = useTable(data, initialState, columns);

	if (loading) {
		return (
			<div
				className="loader w-full min-h-screen 
			flex justify-center items-center">
				<Loading />
			</div>
		);
	}

	return (
		<Card className="border-none box-border shadow-sm overflow-hidden">
			<div className="w-full mt-5 mx-5">
				<div className="flex items-center py-4 px-4">
					<Input
						placeholder="filter product, category, stock and price"
						value={globalFilter}
						onChange={(event) => {
							setGlobalFilter(event.target.value);
							table.setGlobalFilter(event.target.value);
						}}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="default"
								className="ml-auto">
								Columns{" "}
								<ChevronDown className="ml-2 h-4 w-4" />
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
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>

					<Select
						onValueChange={(value) => {
							table
								.getColumn("Status")
								?.setFilterValue(value);

							console.log(
								table.getColumn("Status")?.getFilterValue(),
							);
						}}>
						<SelectTrigger
							className="w-fit text-black bg-white mx-1"
							suppressHydrationWarning>
							<SelectValue placeholder="stock statuses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">
								All statuses
							</SelectItem>
							<SelectItem value="In Stock">
								In Stock
							</SelectItem>
							<SelectItem value="Out of Stock">
								Out of Stock
							</SelectItem>
							<SelectItem value="Low Stock">
								Low Stock
							</SelectItem>
						</SelectContent>
					</Select>

					<Button
						className=""
						onClick={() => {
							axios
								.get(`${conf.url}/api/products`)
								.then((res) => {
									setData(res.data?.data);
									// setProducts([...res.data.data]);
									dispatch(dispatchProducts(res.data.data));
								})
								.catch((err) =>
									console.log(
										"product fetch error: ",
										err.message,
									),
								)
								.finally(() => setLoading(false));
						}}
						variant={"default"}
						size={"icon"}>
						<RefreshCcwDot className="h-4 w-4" />
					</Button>

					<Button
						onClick={() =>
							router.push("/dashboard/shop/products/add")
						}
						variant={"default"}
						className="mx-1 text-lg border-neutral-600 font-bold"
						size={"icon"}>
						+
					</Button>

					
				</div>
				<div className="rounded-md border">
					{/* <Table>
						<TableHeader>
							{table
								.getHeaderGroups()
								.map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef
																	.header,
																header.getContext(),
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={
											row.getIsSelected() && "selected"
										}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center">
										No results.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table> */}

					<TableComponent
						table={table}
						columns={columns}
					/>
				</div>
				{/* <div className="flex items-center justify-end space-x-2 p-4">
					<div className="flex-1 text-sm text-muted-foreground">
						{
							table.getFilteredSelectedRowModel().rows
								.length
						}{" "}
						of {table.getFilteredRowModel().rows.length}{" "}
						row(s) selected.
					</div>
					<div className="space-x-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							{"<-"}
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}>
							{"->"}
						</Button>
					</div>
				</div> */}
			</div>
		</Card>
	);
}

function dispatchProducts(data: any): any {
	throw new Error("Function not implemented.");
}
function dispatch(arg0: any) {
	throw new Error("Function not implemented.");
}
