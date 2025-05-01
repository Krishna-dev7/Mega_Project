"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { UserSchema } from "@/models/user.models";
import {
	flexRender,
	InitialTableState,
} from "@tanstack/react-table";

import Loading from "@/components/customUi/misc/Loading";
import ConfirmDialog from "@/components/customUi/reusable/AlertDialog";
import { Button } from "@/components/ui/button";
import useTable from "@/hooks/use-table";
import { toast } from "@/hooks/use-toast";
import accountService from "@/services/AccountService";
import { useEffect, useState } from "react";
import columns from "./columns";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import TableComponent from "@/components/customUi/misc/Table";

const ManageUser = () => {
	const initialState: InitialTableState = {
		pagination: {
			pageIndex: 0,
			pageSize: 8,
		},
	};
	const [data, setData] = useState<UserSchema[]>([]);
	const table = useTable<UserSchema>(
		data,
		initialState,
		columns,
	);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const result = await accountService.streamUsers();

				result.success && setData(result.data);

				console.log(result);
			};

			fetchData();
		} catch (err: any) {
			toast({
				title: "error",
				description: err.message,
			});
		}
	}, [setData]);

	// loader 🔥
	if (!data)
		return (
			<div
				className="loader flex 
        justify-center items-center min-h-screen">
				<Loading />
			</div>
		);

	return (
		<div
			className="user-dashboard mx-auto w-full min-h-screen
			xl:justify-start xl:items-start flex">
			<div
				className="user-panel flex flex-col w-full mt-5 
        h-fit bg-black xl:w-[100%] sm:mx-5 justify-start 
				items-center py-10 gap-10 px-3 rounded-lg shadow-lg">
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
								.getColumn('Status')
								?.getFilterValue() as string) || ''
						}
						onValueChange={(value) => {
							table	
								.getColumn('Status')
								?.setFilterValue(value)
						}}>
						<SelectTrigger
							className="bg-violet-50 text-xs w-fit 
							font-semibold text-black ">
							<SelectValue placeholder="Status" />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="all">All</SelectItem>
							<SelectItem value="verified">
								verified
							</SelectItem>
							<SelectItem value="not verified">
								not verified
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				{/* <Table
					className="text-xs sm:px-10 sm:text-sm text-pretty 
            font-normal rounded-lg shadow-lg bg-black text-gray-100">
					<TableHeader>
						{!!data.length &&
							table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
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
				{table.getRowCount() > 7 && (
					<div
						className="flex items-center 
            justify-end mt-2 space-x-2 py-4">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								table.previousPage();
								table.initialState.pagination.pageIndex--;
							}}
							disabled={!table.getCanPreviousPage()}>
							{"<-"}
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								table.nextPage();
								table.initialState.pagination.pageIndex++;
							}}
							disabled={!table.getCanNextPage()}>
							{"->"}
						</Button>
					</div>
				)}

				{table.getRowCount() !== 0 && (
					<div className="delete-section flex w-full space-x-2 justify-end">
						<ConfirmDialog
							title="Warning 🤚"
							description={`Are you sure you want 
							to delete the selected users?`}
							key={new Date().getMilliseconds()}
							triggerDisabled={
								table.getSelectedRowModel().rows.length == 0
							}
							action={async () => {
								try {
									if (table.getIsAllPageRowsSelected()) {
										const res =
											await accountService.deleteUsers({});
										setData([]);
										res.success &&
											toast({
												title: "Success",
												description:
													"All users deleted successfully",
												variant: "default",
											});
									} else {
										await accountService.deleteUsers({
											ids: table
												.getSelectedRowModel()
												.rows.map((row) =>
													row.original._id.toString(),
												),
										});

										setData((prev) =>
											prev.filter(
												(user) =>
													!table
														.getSelectedRowModel()
														.rows.map((row) =>
															row.original._id.toString(),
														)
														.includes(user._id.toString()),
											),
										);
									}

									toast({
										title: "Success",
										description:
											table.getIsAllPageRowsSelected()
												? "All users deleted successfully"
												: "Selected users deleted successfully",
										variant: "default",
									});
								} catch (err: any) {
									toast({
										title: "error",
										description: err.message,
									});
								}
							}}>
							<span
								className={`px-3 py-2 text-black rounded-md
									${
										table.getSelectedRowModel().rows
											.length <= 0
											? "bg-neutral-400"
											: "bg-violet-200"
									}`}>
								{table.getIsAllPageRowsSelected()
									? "Clear all"
									: "remove"}
							</span>
						</ConfirmDialog>
					</div>
				)}
			</div>
		</div>
	);
};

export default ManageUser;
