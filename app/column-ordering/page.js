import React from "react";
import ColumnOrderingHiding from "../components/ColumnOrderingHiding/ColumnOrderingHiding";

const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">
        Column ordering and hiding
      </h1>
      <ColumnOrderingHiding />
    </main>
  );
};

export default page;
