import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const columnDef = [
  columnHelper.accessor("id", {
    header: "ID",
  }), //way-2: this is another way of defining columns
  {
    accessorKey: "first_name",
    header: "First Name", //way-1: simplest way to define columns
  },
  {
    accessorFn: (row) => `${row.last_name}`,
    header: "Last Name", //way-3: third way of doing it using function, cells can be merged this way `${row.last_name} ${row.first_name}`
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
