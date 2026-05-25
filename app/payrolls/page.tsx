"use client";

import PageCondition from "@/src/components/PageConditions";
import Pagination from "@/src/components/Pagination";
import PayrollModal from "@/src/components/PayrollModal";
import { getPayrolls } from "@/src/services/payroll.service";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Payrolls() {
    const [payrolls, setPayrolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1);

    async function fetchPayrolls() {
        try {
            setLoading(true);
            const response = await getPayrolls(page, limit, search);
            setPayrolls(response.data.payrolls);
            setTotalPages(response.data.totalPages)
        } catch (error: any) {
            const message = "Failed to fetch payrolls. try again";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPayrolls();
    }, [page, search, limit])

    const tableHeadings = [
        "ID",
        "Worker Name",
        "Worker ID",
        "Base Salary",
        "Net Salary"
    ]
    return (
        <div className="p-4">
            <div className="overflow-x-auto overflow-y-auto h-[520px]">
                <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-900  text-white">
                        <tr>
                            {tableHeadings.map((heading, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-3 text-left whitespace-nowrap"
                                >
                                    {heading}

                                </th>
                            ))}
                            <th colSpan={tableHeadings.length} className="px-4 py-3">
                                <div className="flex justify-end gap-2">
                                    <input
                                        type="text"
                                        placeholder="Search worker name..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-64 px-3 py-2 rounded-md text-white border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            <PageCondition
                                loading={loading}
                                workerLength={payrolls.length}
                                colspan={7}
                            />
                        }
                        {!loading &&
                            payrolls.length > 0 &&
                            payrolls.map((payroll: any, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-100 transition"
                                >
                                    <td className="px-4 py-2 text-left">{index + 1}</td>
                                    <td className="px-4 py-2 text-left">
                                        {payroll.worker.name}
                                    </td>
                                    <td className="px-4 py-2 text-left">
                                        {payroll.worker_id}
                                    </td>
                                    <td className="px-4 py-2 text-left">
                                        {payroll.base_salary}
                                    </td>
                                    <td className="px-4 py-2 text-left">
                                        {payroll.net_salary}
                                    </td>
                                    <td className="px-4 py-2 text-right">
                                        <button
                                            onClick={() => {
                                                setSelectedPayroll(payroll);
                                                setIsOpen(true);
                                            }}
                                            className="bg-blue-900 text-white px-3 py-1 rounded"
                                        >
                                            Payroll Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <PayrollModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedPayroll={selectedPayroll}
                />
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <Pagination
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                    limit={limit}
                    setLimit={setLimit}
                />
            </div>
        </div>
    )
}

