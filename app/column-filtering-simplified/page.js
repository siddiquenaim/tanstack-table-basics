import React from "react";
import ColumnFilteringSimplified from "../components/ColumnFilteringSimplified/ColumnFilteringSimplified";

const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">
        Column Filtering Simplified
      </h1>
      <ColumnFilteringSimplified />
    </main>
  );
};

export default page;
