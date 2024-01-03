import React from "react";
import PaginationTable from "../components/PaginationTable/PaginationTable";
const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">Pagination Table</h1>
      <PaginationTable />
    </main>
  );
};

export default page;
