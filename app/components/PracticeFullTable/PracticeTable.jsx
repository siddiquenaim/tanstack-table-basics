"use client";
import React, { useMemo, useState } from "react";
import "./PracticeTable.css";
import { columnDef } from "../columns";
import dataJSON from "../../data/data.json";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const PracticeTable = () => {
  const finalColumnDef = useMemo(() => columnDef, []);
  const finalDataJSON = useMemo(() => dataJSON, []);

  const [filters, setFilters] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedRowsShown, setSelectedRowsShown] = useState(false);

  // states to show filter options
  const [showVisibility, setShowVisibility] = useState(false);
  const [showFiltering, setShowFiltering] = useState(false);
  const [showSorting, setShowSorting] = useState(false);

  const table = useReactTable({
    // table data
    columns: finalColumnDef,
    data: finalDataJSON,

    // table core functions
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // onchange
    onGlobalFilterChange: setFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    // update state
    state: {
      globalFilter: filters,
      sorting: sorting,
      columnVisibility: columnVisibility,
      rowSelection: rowSelection,
    },

    //enable row selection
    enableRowSelection: true,
  });

  const handleFilter = (value, id) => {
    const allColumns = table.getAllColumns();
    const filteredColumn = allColumns.filter(
      (selectedColumn) => selectedColumn.id === id
    )[0];

    filteredColumn.setFilterValue(value);
  };

  return (
    <div>
      {/* control buttons */}
      <div className="my-5 flex justify-center gap-3">
        <button
          onClick={() => setShowVisibility(!showVisibility)}
          className="border border-gray-600 rounded-lg px-2 py-1"
        >
          {showVisibility && "Hide"} Visibility
        </button>
        <button
          onClick={() => setShowFiltering(!showFiltering)}
          className="border border-gray-600 rounded-lg px-2 py-1"
        >
          {showFiltering && "Hide"} Filtering
        </button>
        <button
          onClick={() => setShowSorting(!showSorting)}
          className="border border-gray-600 rounded-lg px-2 py-1"
        >
          {showSorting && "Hide"} Sorting
        </button>
      </div>

      {/* column visibility */}
      <div
        className={`${
          !showVisibility ? "hidden" : "flex"
        } "text-center mb-3 justify-center gap-2 items-center "`}
      >
        <div>
          <label>
            <input
              className="cursor-pointer mr-2"
              {...{
                type: "checkbox",
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              }}
            />
            All Columns Visible
          </label>
        </div>

        <div className="flex gap-2">
          {table.getAllLeafColumns().map((column) => (
            <div key={column.id}>
              <label>
                <input
                  className="cursor-pointer"
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id === "select" ? "Select" : column.columnDef.header}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* filtering */}
      <div
        className={`${
          !showFiltering ? "hidden" : "flex"
        } "text-center mb-3 justify-center gap-2 items-center "`}
      >
        {/* global filter */}
        <div>
          <label htmlFor="" className="mr-2">
            Global Filter:
          </label>
          <input
            placeholder="Global Filter"
            type="text"
            className="text-center py-2 px-4 rounded-lg border border-gray-700 w-[150px]"
            onChange={(e) => setFilters(e.target.value)}
          />
        </div>

        {/* filter by column-email */}
        <div>
          <label htmlFor="email" className="mr-2">
            Filter By Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Filter Email"
            onChange={(e) => handleFilter(e.target.value, "email")}
            className="text-center py-2 px-4 rounded-lg border border-gray-700 w-[150px]"
          />
        </div>
        {/* filters by column-first_name */}
        <div>
          <label htmlFor="" className="mr-2">
            Filter by First Name:
          </label>
          <input
            type="text"
            placeholder="Filter Name"
            className="text-center py-2 px-4 rounded-lg border border-gray-700 w-[150px]"
            onChange={(e) => handleFilter(e.target.value, "first_name")}
          />
        </div>
      </div>

      {/* sorting */}
      <div
        className={`${
          !showSorting ? "hidden" : "flex"
        } "text-center mb-3 justify-center gap-2 items-center "`}
      >
        {/* sorting by date */}
        <div>
          <label htmlFor="sortByDate" className="mr-2">
            Sort By date:
          </label>
          <select
            name="Sort"
            id="sortByDate"
            className="text-center py-2 px-4 rounded-lg border border-gray-700 w-[160px] cursor-pointer"
            onChange={(e) => {
              // Handle the selected value (asc, desc, or default) for date sorting
              const selectedValue = e.target.value;

              // Set the sorting based on the selected value
              let sorting;

              if (selectedValue === "asc") {
                sorting = [
                  {
                    id: "date",
                    asc: true, // Ascending order
                  },
                ];
              } else if (selectedValue === "desc") {
                sorting = [
                  {
                    id: "date",
                    desc: true, // Descending order
                  },
                ];
              } else {
                sorting = undefined; // Default order
              }

              setSorting(sorting);
            }}
          >
            <option value="">Default Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* sorting by first name */}
        <div>
          <label htmlFor="sortByFirstName" className="mr-2">
            Sort By First Name:
          </label>
          <select
            name="Sort"
            id="sortByFirstName"
            className="text-center py-2 px-4 rounded-lg border border-gray-700 w-[160px] cursor-pointer"
            onChange={(e) => {
              // Handle the selected value (asc, desc, or default) for date sorting
              const selectedValue = e.target.value;

              // Set the sorting based on the selected value
              let sorting;

              if (selectedValue === "asc") {
                sorting = [
                  {
                    id: "first_name",
                    asc: true, // Ascending order
                  },
                ];
              } else if (selectedValue === "desc") {
                sorting = [
                  {
                    id: "first_name",
                    desc: true, // Descending order
                  },
                ];
              } else {
                sorting = undefined; // Default order
              }

              setSorting(sorting);
            }}
          >
            <option value="">Default Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* data table */}
      <table>
        <thead>
          {table.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl.id}>
              {headerEl.headers.map((headerCell) => {
                return (
                  <th key={headerCell.id} colSpan={headerCell.colSpan}>
                    {flexRender(
                      headerCell.column.columnDef.header,
                      headerCell.getContext()
                    )}

                    {/* if sorted it'll show arrows beside header */}
                    {
                      {
                        asc: <FaArrowUp className="inline-block pl-1" />,
                        desc: <FaArrowDown className="inline-block pl-1" />,
                      }[headerCell.column.getIsSorted() ?? null]

                      // Using a ternary operator to check if columnEl.column.getIsSorted() is truthy (indicating the column is sorted) or falsy (indicating the column is not sorted).
                      // If sorted, it returns an object with properties 'asc' and 'desc',
                      // containing strings indicating the sorting order.
                      // If not sorted, it returns null.
                    }
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((rowCell) => (
                  <td key={rowCell.id}>
                    {/* {console.log(rowCell.row.original.money)} */}
                    {flexRender(
                      rowCell.column.columnDef.cell,
                      rowCell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="my-1">
        total selected rows: {table.getSelectedRowModel().rows.length}
        <button
          className="bg-black text-white py-0.5 px-2 rounded-lg ml-2"
          onClick={() => setSelectedRowsShown(!selectedRowsShown)}
        >
          {selectedRowsShown ? "Hide" : "Show"} Selected Rows
        </button>
      </div>
      <div className="text-center mt-4">
        Page: {table.options.state.pagination.pageIndex + 1}/
        {table.getPageCount()} - Page Size:{" "}
        <input
          type="text"
          onChange={(e) => table.setPageSize(e.target.value || 10)}
          className="py-2 px-4 rounded-lg border border-gray-700 w-[50px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="flex justify-center gap-5 py-5">
        <button
          onClick={(e) => table.setPageIndex(0)}
          className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>

        <button
          onClick={() => table.previousPage()}
          className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <input
          type="number"
          defaultValue={1}
          onChange={(e) => table.setPageIndex(e.target.value - 1)}
          min={1}
          max={table.getPageCount()}
          className="py-2 px-4 rounded-lg border border-gray-700 w-[73px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="page"
        />

        <button
          onClick={() => table.nextPage()}
          className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <button
          onClick={(e) => table.setPageIndex(table.getPageCount() - 1)}
          className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
      </div>

      {/* show selected rows here */}
      <div className={!selectedRowsShown && `hidden`}>
        <ul>
          {table.getSelectedRowModel().flatRows.map((el) => (
            <li key={el.id}>
              - {`${el.original.first_name} ${el.original.last_name}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PracticeTable;
