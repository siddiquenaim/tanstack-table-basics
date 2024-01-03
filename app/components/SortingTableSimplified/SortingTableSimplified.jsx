"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnDef, columnDefWithGrouping } from "../columns";
import "./SortingTableSimplified.css";
import dataJSON from "../../data/data.json";
import { useMemo } from "react";

const SortingTableSimplified = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDefWithGrouping, []);

  const tableInstance = useReactTable({
    //Table generate data and columns
    columns: finalColumnDef, // react table uses this to understand the headers
    data: finalData, // this is the entire data

    // Table core function
    getCoreRowModel: getCoreRowModel(), // to have access to all the rows
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
        <tfoot>
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
        </tfoot>
      </table>
    </div>
  );
};

export default SortingTableSimplified;
