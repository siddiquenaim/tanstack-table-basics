import React from "react";
import GlobalFiltering from "../components/GlobalFiltering/GlobalFiltering";

const page = () => {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">Global Filtering</h1>
      <GlobalFiltering />
    </main>
  );
};

export default page;
