import Image from "next/image";
import BasicTable from "./components/BasicTable/BasicTable";

export default function Home() {
  return (
    <main className="py-20 w-[90%] mx-auto space-y-5">
      <h1 className="text-3xl font-semibold text-center">
        Basic TanStack Table
      </h1>
      <BasicTable />
    </main>
  );
}
