"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columnDef } from "../columns";
import "./ColumnFilteringSimplified.css";
import dataJSON from "../../data/data.json";
import { useMemo, useState } from "react";

const ColumnFilteringSimplified = () => {
  const finalData = useMemo(() => dataJSON, []);
  const finalColumnDef = useMemo(() => columnDef, []);

  const tableInstance = useReactTable({
    //Table generate data and columns
    columns: finalColumnDef,
    data: finalData,

    // Table core function
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  //on er moddhe shobgulay setState dibo, first value

  // Define a single function to handle all filters
  const handleFilter = (columnId, value, setFilter) => {
    let allColumns = tableInstance.getAllColumns();

    let filteredColumn = allColumns.find((el) => el.id === columnId);

    if (filteredColumn) {
      filteredColumn.setFilterValue(value);

      // Optionally, you can update the state using the provided setFilter function
      if (setFilter) {
        setFilter(value);
      }
    }
  };

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        className="border border-black text-black py-3 px-5 rounded-lg my-3 mx-5"
        value={firstNameInput}
        onChange={(e) => {
          setFirstNameInput(e.target.value);
          handleFilter("first_name", e.target.value, setFirstNameInput);
        }}
      />

      <input
        type="text"
        placeholder="Last Name"
        className="border border-black text-black py-3 px-5 rounded-lg my-3 mx-5"
        value={lastNameInput}
        onChange={(e) => {
          setLastNameInput(e.target.value);
          handleFilter("Last Name", e.target.value, setLastNameInput);
        }}
      />

      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl?.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl?.id} colSpan={columnEl.colSpan}>
                  {columnEl.isPlaceholder
                    ? null
                    : flexRender(
                        columnEl.column.columnDef.header,
                        columnEl.getContext()
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
        <tfoot>
          {tableInstance.getHeaderGroups().map((headerEl) => (
            <tr key={headerEl?.id}>
              {headerEl.headers.map((columnEl) => (
                <th key={columnEl?.id} colSpan={columnEl.colSpan}>
                  {columnEl.isPlaceholder
                    ? null
                    : flexRender(
                        columnEl.column.columnDef.header,
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

export default ColumnFilteringSimplified;
