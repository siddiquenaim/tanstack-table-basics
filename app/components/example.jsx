const { useReactTable } = require("@tanstack/react-table");
const { useSearchParams } = require("next/navigation");

const router = useRouter();
const path = usePathname();
const searchParams = useSearchParams();
const setSelectedRow = useTable((state) => state.setSelectedRow);
const [pagination, setPagination] =
  useState <
  PaginationState >
  {
    pageIndex: 0,
    pageSize: meta?.pageSize || 10,
  };
const [sorting, setSorting] = useState < SortingState > [];
const [columnVisibility, setColumnVisibility] = useState < VisibilityState > {};
// Use react table
const table = useReactTable({
  //Table generate data and columns
  data,
  columns,
  // Table core function
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  // When change states
  onSortingChange: setSorting,
  onColumnVisibilityChange: setColumnVisibility,
  onPaginationChange: setPagination,
  // Update state
  state: {
    sorting,
    columnVisibility,
    pagination,
  },
  enableColumnResizing: true,
  manualPagination: true,
  pageCount: meta?.totalPages,
});
