"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDef } from "../columns";
import "./GlobalFiltering.css";
import dataJSON from "../../data/data.json";
import { useMemo, useState } from "react";

const GlobalFiltering = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDef, []);

  //local state for filtering

  const [filtering, setFiltering] = useState("");

  const tableInstance = useReactTable({
    //Table generate data and columns
    columns: finalColumnDef, // react table uses this to understand the headers
    data: finalData, // this is the entire data

    // Table core function
    getCoreRowModel: getCoreRowModel(), // this hook is to have access to all the rows
    getFilteredRowModel: getFilteredRowModel(), // this hook is for getting the filtered data

    // When change states
    onGlobalFilterChange: setFiltering,

    // Update state
    state: {
      globalFilter: filtering,
    },
  });

  return (
    <div>
      <div className="text-center my-4">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Filter Text"
          className="border border-black rounded-sm py-2 px-3"
        />
      </div>

      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl?.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl?.id} colSpan={columnEl.colSpan}>
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
        <tfoot>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl?.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl?.id} colSpan={columnEl.colSpan}>
                  {flexRender(
                    columnEl.column.columnDef.header, //this is where the headings renders
                    columnEl.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
};

export default GlobalFiltering;
