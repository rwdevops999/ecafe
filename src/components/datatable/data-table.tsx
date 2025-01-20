"use client"

/**
 * Data  table
 */

import {
  ColumnDef,
  ColumnFiltersState,
  DataTableToolbarProps,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  InitialTableState,
  Row,
  RowSelectionState,
  SortingState,
  TableMeta,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { log } from "@/lib/utils"
import { ComponentType, Fragment, useEffect, useState } from "react"
import { DataTablePagination } from "@/components/datatable/data-table-pagination"
import { action_update } from "@/data/constants"

export interface IDataSubRows<TData> {
  children?: any[]
  }

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  tablemeta?: TableMeta<TData>
  Toolbar?: ComponentType<DataTableToolbarProps<TData>>
  readonly rowSelecting?: boolean;
  readonly handleChangeSelection?: (selection: Row<TData>[]) => void;
  readonly initialTableState?: InitialTableState;
  expandAll?: boolean;
  enableRowSelection?: boolean;
}

export function DataTable<TData extends IDataSubRows<TData>, TValue>({
  columns,
  data,
  tablemeta,
  Toolbar,
  rowSelecting = true,
  handleChangeSelection = (selection: Row<TData>[]) => {},
  initialTableState,
  expandAll = false,
  enableRowSelection = true
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  /**
   * TABLE INSTANCE
   */
  const table = useReactTable({
    columns: columns,
    data: data,
    state: {
      expanded,
      columnFilters,
      rowSelection,
      sorting,
    },
    initialState: initialTableState ? initialTableState : {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 15, //custom default page size
      },
    },
    onExpandedChange: setExpanded,
    getSubRows: row => row.children,
    getCoreRowModel: getCoreRowModel(),
    meta: tablemeta,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    filterFromLeafRows: true,
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: enableRowSelection,
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
   }
  )

  useEffect(() => {
    if (handleChangeSelection && data && data.length > 0) {
      const selectedAction: Row<TData>[] = table.getSelectedRowModel().flatRows.map(row => row);

          handleChangeSelection(selectedAction);
    }
  }, [rowSelection, setRowSelection]);

  useEffect(() => {
    if (expandAll) {
      setExpanded(true);
    }
  }, [expandAll]);

  const handleRowClick = (row: Row<TData>, event?: MouseEvent): { row: Row<TData>; event?: MouseEvent } => {
        event?.stopPropagation();

        if (rowSelecting && row.getCanSelect()) {
          row.toggleSelected();
        } else {
          const meta = table.options.meta;
          meta?.handleAction(action_update, row.original);        }
    
        return { row, event };
  };
    
  const renderTable = () => {
    return (
      <div className="space-y-4">
        <div>
        {Toolbar && <Toolbar table={table} />}
        </div>
        <div>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(group => (
                <TableRow key={group.id}>
                  {group.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>)
                  })}
                </TableRow>
              ))}
            </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <TableRow 
                      key={row.id}
                      onClick={(e) => handleRowClick(row, e)}
                    >
                      {row.getVisibleCells().map(cell => {
                        return (<TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>);
                      })}
                    </TableRow>
                  )
                })}
              </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
      );
    }

  return (<>{renderTable()}</>);
}