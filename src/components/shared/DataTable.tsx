"use client";

import * as React from "react";
import type {
  ColumnDef,
  FilterFn,
  Row,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  searchPlaceholder?: string;
  searchableFields?: (keyof TData)[];

  showGlobalFilter?: boolean;
  showColumnVisibility?: boolean;

  pageSize?: number;

  onRowClick?: (row: Row<TData>) => void;

  className?: string;
  emptyMessage?: string;

  isLoading?: boolean;

  // Future backend pagination support
  manualPagination?: boolean;
  pageCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,

  searchPlaceholder = "Search...",
  searchableFields = [],

  showGlobalFilter = true,
  showColumnVisibility = true,

  pageSize = 10,

  onRowClick,

  className,
  emptyMessage = "No results found.",

  isLoading = false,

  manualPagination = false,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const fuzzyFilter = React.useCallback<FilterFn<TData>>(
    (row, _, value) => {
      const searchText = String(value).toLowerCase();

      if (searchableFields.length > 0) {
        return searchableFields.some((field) => {
          const cellValue = row.getValue(field as string);

          return String(cellValue ?? "")
            .toLowerCase()
            .includes(searchText);
        });
      }

      return Object.values(row.original as Record<string, unknown>).some(
        (value) =>
          String(value ?? "")
            .toLowerCase()
            .includes(searchText),
      );
    },
    [searchableFields],
  );

  const table = useReactTable({
    data,
    columns,

    pageCount,
    manualPagination,

    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: manualPagination
      ? undefined
      : getPaginationRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    globalFilterFn: fuzzyFilter,

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,

    state: {
      sorting,
      columnVisibility,
      globalFilter,
    },

    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  const paginationRange = React.useMemo<Array<number | "ellipsis">>(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index);
    }

    const leftSiblingIndex = Math.max(currentPage - 1, 0);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1);

    const showLeftEllipsis = leftSiblingIndex > 1;
    const showRightEllipsis = rightSiblingIndex < totalPages - 2;

    if (!showLeftEllipsis && showRightEllipsis) {
      return [0, 1, 2, "ellipsis", totalPages - 1];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      return [0, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1];
    }

    return [0, "ellipsis", currentPage, "ellipsis", totalPages - 1];
  }, [currentPage, totalPages]);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Header */}
      {showGlobalFilter && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder={searchPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-10"
            />
          </div>

          {showColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Columns
                  <ChevronDown className="ml-2 size-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    onRowClick && "cursor-pointer hover:bg-muted/50",
                  )}
                >
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
                  className="h-32 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          {table.getFilteredRowModel().rows.length > 0 && (
            <p>
              Showing{" "}
              <span className="font-medium">{currentPage * pageSize + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(
                  (currentPage + 1) * pageSize,
                  table.getFilteredRowModel().rows.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-medium">
                {table.getFilteredRowModel().rows.length}
              </span>{" "}
              results
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    table.previousPage();
                  }}
                  aria-disabled={!table.getCanPreviousPage()}
                  className={cn(
                    !table.getCanPreviousPage() &&
                      "pointer-events-none opacity-50",
                  )}
                />
              </PaginationItem>

              {paginationRange.map((page, index) => (
                <PaginationItem key={`${page}-${index}`}>
                  {page === "ellipsis" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(event) => {
                        event.preventDefault();
                        table.setPageIndex(page);
                      }}
                    >
                      {page + 1}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    table.nextPage();
                  }}
                  aria-disabled={!table.getCanNextPage()}
                  className={cn(
                    !table.getCanNextPage() && "pointer-events-none opacity-50",
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
