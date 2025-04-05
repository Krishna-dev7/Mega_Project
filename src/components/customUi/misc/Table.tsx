"use client";

import {
	ColumnDef,
	flexRender,
	Table as TableType,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table";
import { Button } from "../../ui/button";

const TableComponent = <TData,>({
	table,
	columns,
	children,
	className,
}: {
	table: TableType<TData>;
	columns: ColumnDef<TData, any>[];
	children?: React.ReactNode;
	className?: string;
}) => {
	return (
		<div
			className={`table-div bg-black h-fit
     rounded-lg w-full ${className}`}>
			<Table suppressHydrationWarning>
				<TableHeader>
					{table.getRowCount() > 0 &&
						table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										className="font-semibold">
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
								className="hover:bg-transparent"
								key={row.id}
								data-state={
									row.getIsSelected() && "selected"
								}>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										className="py-4 text-sm text-pretty">
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
								className="h-24 text-sm text-center text-muted-foreground">
								No result found
							</TableCell>
						</TableRow>
					)}
				</TableBody>

				{table.getRowCount() > 0 && children}
			</Table>

			{table.getRowCount() > 10 && (
				<div
					className="flex items-center 
      justify-end mt-2 mx-4 space-x-2 py-4">
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
		</div>
	);
};

export default TableComponent;
