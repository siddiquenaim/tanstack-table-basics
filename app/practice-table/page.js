import React from "react";
import PracticeTable from "../components/PracticeFullTable/PracticeTable";

const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">TanStack Table</h1>
      <PracticeTable />
    </main>
  );
};

export default page;
