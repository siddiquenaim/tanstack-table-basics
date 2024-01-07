import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";
import CheckBox from "./CheckBox/CheckBox";
import ConvertButton from "./ConvertButton/ConvertButton";
import ItemsQty from "./ItemsQty/ItemsQty";
import { BsThreeDots } from "react-icons/bs";
import DropDown from "./DropDown/DropDown";

const columnHelper = createColumnHelper();

export const columnDef = [
  {
    id: "select",
    size: 40,
    header: ({ table }) => (
      <CheckBox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <CheckBox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: true,
    enableHiding: true,
  },
  columnHelper.accessor("id", {
    header: "ID",
    enableHiding: true,
    enableHiding: true,
  }), //way-2: this is another way of defining columns
  {
    accessorKey: "first_name",
    header: "First Name", //way-1: simplest way to define columns
    enableHiding: true,
  },
  // {
  //   accessorFn: (row) => `${row.last_name}`,
  //   header: "Last Name", //way-3: third way of doing it using function, cells can be merged this way `${row.last_name} ${row.first_name}`
  // },
  // {
  //   accessorFn: (row) => `${row.first_name} ${row.last_name}`,
  //   header: "Full Name", // merging cells example
  // },

  {
    accessorKey: "money",
    accessorFn: (row) => `${row.money}`,
    header: "Money",
    cell: ({ row }) => (
      <div className="text-center">{<ConvertButton row={row} />}</div>
    ),
    enableHiding: true,
  },
  {
    accessorFn: (row) => `${row.money}`,
    header: "Quantity",
    cell: ({ row }) => (
      <div className="text-center">{<ItemsQty row={row} />}</div>
    ),
    enableHiding: true,
  },

  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("Do MMM  YYYY"), // cell formatting
    enableHiding: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableHiding: true,
  },
  {
    accessorFn: (row) => `${row.money} ${row.email}`,
    header: "Copy Data",
    cell: ({ row }) => (
      <div className="text-center">{<DropDown row={row} />}</div>
    ),
    enableHiding: true,
  },
];

//column grouping example

export const columnDefWithGrouping = [
  columnHelper.accessor("id", {
    header: "ID",
  }),

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

// columnDf with filter

export const columnDefWithFilter = [
  columnHelper.accessor("id", {
    header: "Id",
    enableColumnFilter: true,
  }),
  {
    accessorFn: (row) => `${row.first_name}`,
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => moment(new Date(getValue())).format("MMM Do YY"),
  },
];
