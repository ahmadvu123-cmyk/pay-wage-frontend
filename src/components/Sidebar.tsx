"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-[220px] h-screen bg-blue-900 text-white p-5 fixed left-0 top-0">
      <h2 className="text-md font-bold mb-6">
        Pay Wage Dashboard
      </h2>
      <div className="flex flex-col gap-0.5 text-left">
        <Link
          href="/"
          className="px-3 py-2 rounded hover:bg-white hover:text-blue-900 transition"
        >
          Home
        </Link>
        <Link
          href="/workers"
          className="px-3 py-2 rounded hover:bg-white hover:text-blue-900 transition"
        >
          Workers
        </Link>
        <Link
          href="/attendances"
          className="px-3 py-2 rounded hover:bg-white hover:text-blue-900 transition"
        >
          Attendances
        </Link>
        <Link
          href="/payrolls"
          className="px-3 py-2 rounded hover:bg-white hover:text-blue-900 transition"
        >
          Payrolls
        </Link>
      </div>
    </div>
  );
}