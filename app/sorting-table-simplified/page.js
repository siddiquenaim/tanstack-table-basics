import React from "react";
import SortingTableSimplified from "../components/SortingTableSimplified/SortingTableSimplified";
const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">
        Simple Sorting Table
      </h1>
      <SortingTableSimplified />
    </main>
  );
};

export default page;
