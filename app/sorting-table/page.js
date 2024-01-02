import React from "react";
import SortingTable from "../components/SortingTable/SortingTable";

const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">Sorting Table</h1>
      <SortingTable />
    </main>
  );
};

export default page;
