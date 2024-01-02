import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";

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
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: "Full Name", // merging cells example
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("Do MMM  YYYY"), // cell formatting
  },
];

//column grouping example

export const columnDefWithGrouping = [
  columnHelper.accessor("id", {
    header: "ID",
  }),

  // columnHelper.group({
  //   header: "Name",
  //   columns: [
  //     {
  //       accessorKey: "first_name",
  //       header: "First Name",
  //     },
  //     {
  //       accessorKey: "last_name",
  //       header: "Last Name",
  //     },
  //   ],
  // }),

  {
    header: "Name",
    columns: [
      {
        accessorKey: "first_name",
        header: "First Name",
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
      },
    ],
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
