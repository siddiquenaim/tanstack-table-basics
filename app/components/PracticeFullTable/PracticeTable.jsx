"use client";
import React, { useMemo } from "react";
import "./PracticeTable.css";
import { columnDef } from "../columns";
import dataJSON from "../../data/data.json";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const PracticeTable = () => {
  const finalColumnDef = useMemo(() => columnDef, []);
  const finalDataJSON = useMemo(() => dataJSON, []);

  const table = useReactTable({
    columns: finalColumnDef,
    data: finalDataJSON,

    getCoreRowModel: getCoreRowModel(),
  });
  console.log(table.getRowModel());

  return (
    <div>
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
    </div>
  );
};

export default PracticeTable;
