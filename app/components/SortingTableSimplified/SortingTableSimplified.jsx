"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnDef, columnDefWithGrouping } from "../columns";
import "./SortingTableSimplified.css";
import dataJSON from "../../data/data.json";
import { useMemo, useState } from "react";

const SortingTableSimplified = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDef, []);

  // Local state to set sorting
  const [sorting, setSorting] = useState([]);

  const handleSorting = (columnId, isDesc) => {
    const newSorting = [{ id: columnId, desc: isDesc }];
    setSorting(newSorting);
  };

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting: sorting,
    },
  });

  return (
    <div>
      <div>
        <button>Name Asc</button>
        <button>Name Desc</button>
        <button>Date Asc</button>
        <button>Date Desc</button>
      </div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl.id} colSpan={columnEl.colSpan}>
                  {columnEl.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
                      )}
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((rowEl) => (
            <tr key={rowEl.id}>
              {rowEl.getVisibleCells().map((cellEl) => (
                <td key={cellEl.id}>
                  {flexRender(
                    cellEl.column.columnDef.cell,
                    cellEl.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortingTableSimplified;
