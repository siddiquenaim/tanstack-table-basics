"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnDef, columnDefWithGrouping } from "../columns";
import "./PaginationTable.css";
import dataJSON from "../../data/data.json";
import { useMemo } from "react";

const PaginationTable = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDef, []);

  const tableInstance = useReactTable({
    //Table generate data and columns
    columns: finalColumnDef, // react table uses this to understand the headers
    data: finalData, // this is the entire data

    // Table core function
    getCoreRowModel: getCoreRowModel(), // to have access to all the rows
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl?.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl?.id} colSpan={columnEl.colSpan}>
                  {/* {flexRender(
                    columnEl.column.columnDef.header, //this is where the headings renders
                    columnEl.getContext()
                  )} */}
                  {columnEl.isPlaceholder
                    ? null
                    : flexRender(
                        columnEl.column.columnDef.header, //this is where the headings renders
                        columnEl.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => {
            return (
              <tr key={rowEl.id}>
                {rowEl.getVisibleCells().map((cellEl) => {
                  return (
                    <td key={cellEl.id}>
                      {flexRender(
                        cellEl.column.columnDef.cell,
                        cellEl.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <div className="text-center py-2">
        Page: {tableInstance.options.state.pagination.pageIndex + 1}/
        {tableInstance.getPageCount()} - Page Size:{" "}
        <input
          type="number"
          name="pageSize"
          className="w-[100px] py-2 px-4 text-black rounded-md border border-gray-700"
          placeholder="Page Size"
          id=""
          defaultValue={10}
          min={1}
          max={20}
          // max={tableInstance.getPageCount()}
          onChange={(e) => {
            tableInstance.setPageSize(e.target.value);
          }}
        />
      </div>
      <hr />

      <div className="flex justify-center py-3 space-x-4">
        <button
          onClick={() => tableInstance.setPageIndex(0)}
          disabled={!tableInstance.getCanPreviousPage()}
          className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
        >
          {"<<"}
        </button>
        <div className="space-x-2">
          <button
            // onClick={tableInstance.previousPage()}
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
            className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
          >
            Prev
          </button>
          <input
            type="number"
            name="jumpTo"
            className="w-[100px] py-2 px-4 text-black rounded-md border border-gray-700"
            placeholder="Jump to Page"
            id=""
            defaultValue={1}
            min={1}
            max={tableInstance.getPageCount()}
            onChange={(e) => {
              tableInstance.setPageIndex(e.target.value - 1);
            }}
          />
          <button
            // onClick={tableInstance.nextPage()}
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
            className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
          >
            Next
          </button>
        </div>
        <button
          onClick={() =>
            tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
          }
          disabled={!tableInstance.getCanNextPage()}
          className="py-2 px-4 bg-black hover:bg-gray-700 text-white rounded-full disabled:bg-gray-700"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default PaginationTable;
