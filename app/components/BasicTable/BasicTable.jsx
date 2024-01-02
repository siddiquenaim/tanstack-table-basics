"use client";

import { flexRender, useReactTable } from "@tanstack/react-table";
import { columnDef } from "../columns";
import "./BasicTable.css";

const BasicTable = () => {
  const tableInstance = useReactTable({
    columns: columnDef, // react table uses this to understand the headers
  });

  return (
    <div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl?.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl?.id}>
                  {flexRender(
                    columnEl.column.columnDef.header, //this is where the headings renders
                    columnEl.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};

export default BasicTable;
