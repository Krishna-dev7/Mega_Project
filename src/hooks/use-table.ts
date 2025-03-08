import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import { useState } from "react";

const useTable = 
<TData>
(
  data: TData[], 
  initialState: InitialTableState,
  columns:  ColumnDef<TData, any>[]) => {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
      useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] =
      useState<VisibilityState>({});

    const table = useReactTable<TData>({
      data,
      columns,
      initialState,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      state: {
        sorting,
        columnVisibility,
        columnFilters,
        rowSelection
      },
    });

    return table;
};


export default useTable