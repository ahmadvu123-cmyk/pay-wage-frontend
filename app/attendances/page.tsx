"use client";


import AttendanceModal from "@/src/components/AttendanceModal";
import PageCondition from "@/src/components/PageConditions";
import Pagination from "@/src/components/Pagination";
import { getAttendances } from "@/src/services/attendance.service";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function attendancesPage() {
    const [attendances, setAttendances] = useState([]);
    const [selectedAttendance, setSelectedAttendance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState(10)
    const [totalPages, setTotalPages] = useState(1);

    async function fetchAttendances(p = page, s = startDate, e = endDate) {
        try {
            setLoading(true);
            const response = await getAttendances(
                s,
                e,
                p,
                limit,
                search
            );
            setAttendances(response.data.attendances);
            setTotalPages(response.data.totalPages);
        } catch (error: any) {
            const message = "Failed to fetch attendances. try again";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchAttendances(page);
    }, [page, search, limit])
    const tableHeadings = [
        "ID",
        "Worker Name",
        "Worker ID",
        "Date"
    ]
    return (
        <div className="p-4">
            <div className="overflow-x-auto overflow-y-auto h-[520px]">
                <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            {tableHeadings.map((heading, index) => (
                                <th key={index}
                                    className="px-4 py-3 text-left">
                                    {heading}
                                </th>
                            ))}
                            <th colSpan={tableHeadings.length} className="px-2 py-2">
                                <div className="flex flex-nowrap items-center justify-end gap-3 w-full">
                                    <div className="flex items-center gap-1">
                                        <label className="text-sm text-white">From</label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="border p-1 rounded text-white bg-blue-900 [&::-webkit-calendar-picker-indicator]:invert"
                                        />
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <label className="text-sm text-white">To</label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="border p-1 rounded text-white bg-blue-900 [&::-webkit-calendar-picker-indicator]:invert"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {

                                            setPage(1);
                                            fetchAttendances(1, startDate, endDate);
                                        }}
                                        className="bg-white text-blue-900 px-2 py-1 rounded"
                                    >
                                        Filter
                                    </button>
                                    <button
                                        onClick={() => {

                                            setStartDate("");
                                            setEndDate("");
                                            setPage(1);
                                            fetchAttendances(1, "", "");
                                        }}
                                        className="bg-gray-300 text-black px-2 py-1 rounded"
                                    >
                                        Reset
                                    </button>
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
                        <PageCondition
                            loading={loading}
                            workerLength={attendances.length}
                            colspan={5}
                        />
                        {!loading &&
                            attendances.length > 0 &&
                            attendances.map((attendance: any, index: number) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-100 transition"
                                >
                                    <td className="px-4 py-2 text-left">{index + 1}</td>
                                    <td className="px-4 py-2 text-left">
                                        {attendance.worker.name}
                                    </td>
                                    <td className="px-4 py-2 text-left">
                                        {attendance.worker_id}
                                    </td>
                                    <td className="px-4 py-2 text-left">
                                        {attendance.date.split("T")[0]}
                                    </td>
                                    <td className="px-4 py-2 text-right whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setSelectedAttendance(attendance);
                                                setIsOpen(true);
                                            }}
                                            className="bg-blue-900 text-white px-3 py-1 rounded"
                                        >
                                            Attendance Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <AttendanceModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedAttendance={selectedAttendance}
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