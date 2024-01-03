"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columnDefWithFilter } from "../columns";
import "./ColumnFiltering.css";
import dataJSON from "../../data/data.json";
import { useMemo, useState } from "react";
import Filter from "@/app/functions/FilterFunction";

const ColumnFiltering = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDefWithFilter, []);
  const defaultColumn = useMemo(() => {
    return {
      anyProp: "Hello world",
    };
  }, []);

  //local state for column filtering

  const [columnFilters, setColumnFilters] = useState([]);

  const tableInstance = useReactTable({
    columns: finalColumnDef, // react table uses this to understand the headers
    data: finalData, // this is the entire data
    defaultColumn: defaultColumn, // it will be inside column>columnDef
    getCoreRowModel: getCoreRowModel(), // to have access to all the rows
    getFilteredRowModel: getFilteredRowModel(), // this hook is for column filtering
    state: {
      columnFilters: columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div>
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl?.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl?.id} colSpan={columnEl.colSpan}>
                  {columnEl.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        columnEl.column.columnDef.header, //this is where the headings renders
                        columnEl.getContext()
                      )}
                      {columnEl.column.getCanFilter() ? (
                        <div>
                          <Filter
                            column={columnEl.column}
                            table={tableInstance}
                          />
                        </div>
                      ) : null}
                    </>
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

export default ColumnFiltering;
