import React from "react";
import ColumnFiltering from "../components/ColumnFiltering/ColumnFiltering";
const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">Column Filtering</h1>
      <ColumnFiltering />
    </main>
  );
};

export default page;
