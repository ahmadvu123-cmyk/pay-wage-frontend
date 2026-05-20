"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const getTitle = (path: any) => {
    switch (path) {
      case "/":
        return "Home Page";
      case "/workers":
        return "Workers Page";
      case "/attendances":
        return "Attendance Page";
      case "/payrolls":
        return "Payroll Page";
      default:
        return "PayWage - Worker Management System";
    }
  };

  return (
    <div className="h-[60px] bg-gray-100 ml-[220px] flex items-center justify-between px-5 border-b border-gray-200">
      <h3 className="text-lg font-medium">
        {getTitle(pathname)}
      </h3>
    </div>
  );
}