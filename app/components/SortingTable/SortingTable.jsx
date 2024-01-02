"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnDef, columnDefWithGrouping } from "../columns";
import "./SortingTable.css";
import dataJSON from "../../data/data.json";
import { useMemo, useState } from "react";

const SortingTable = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDef, []);

  //local state to set sorting

  const [sorting, setSorting] = useState([]);

  const tableInstance = useReactTable({
    columns: finalColumnDef, // react table uses this to understand the headers
    data: finalData, // this is the entire data
    getCoreRowModel: getCoreRowModel(), // to have access to all the rows
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => {
            return (
              <tr key={headerEl.id}>
                {headerEl.headers.map((columnEl) => {
                  return (
                    <th
                      key={columnEl.id}
                      colSpan={columnEl.colSpan}
                      onClick={columnEl.column.getToggleSortingHandler()}
                    >
                      {columnEl.isPlaceholder
                        ? null
                        : flexRender(
                            columnEl.column.columnDef.header,
                            columnEl.getContext()
                          )}

                      {/* CODE FOR UP AND DOWN SORTING */}

                      {
                        { asc: " -UP", desc: " -DOWN" }[
                          columnEl.column.getIsSorted() ?? null
                        ]

                        // Using a ternary operator to check if columnEl.column.getIsSorted() is truthy (indicating the column is sorted) or falsy (indicating the column is not sorted).
                        // If sorted, it returns an object with properties 'asc' and 'desc',
                        // containing strings indicating the sorting order.
                        // If not sorted, it returns null.
                      }
                    </th>
                  );
                })}
              </tr>
            );
          })}
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
    </div>
  );
};

export default SortingTable;
