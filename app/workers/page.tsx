"use client";

import PageCondition from "@/components/PageConditions";
import Pagination from "@/components/pagination";
import WorkerModal from "@/components/workerModal";
import { getWorkers } from "@/services/worker.service";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";





export default function WorkersPage() {
    // Workers Object States
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);
    //  Search a worker states
    const [search, setSearch] = useState("");
    // Worker Modal states
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    // Pagination useState
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
   

    async function fetchWorkers() {
        try {
            setLoading(true);
            const response = await getWorkers(page, limit, search);
            setWorkers(response.data.workers);
            setTotalPages(response.data.totalPages)
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || "Something went wrong while fetching workers";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWorkers();
    }, [search, page, limit])
    const tableHeadings = [
        "ID",
        "Name",
        "Phone Number",
        "Cnic",
    ];

    return (
        <div className="p-4">
            <div className="overflow-x-auto overflow-y-auto h-[520px]">
                <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            {tableHeadings.map((heading, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-3 text-left"
                                >
                                    {heading}

                                </th>
                            ))}
                            <th colSpan={tableHeadings.length} className="px-4 py-3">
                                <div className="flex justify-end gap-2">

                                    <input
                                        type="text"
                                        placeholder="Search a worker..."
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
                        workerLength={workers.length}
                        colspan={5}
                        />

                        {!loading &&
                            workers.length > 0 &&
                            workers.map((worker: any, index: number) => (
                                <tr
                                    key={worker.id || index}
                                    className="border-b hover:bg-gray-100 transition"
                                >
                                    <td className="px-4 py-2 text-left">
                                        {(page - 1) * limit + index + 1}
                                    </td>

                                    <td className="px-4 py-2 text-left">
                                        {worker.name}
                                    </td>

                                    <td className="px-4 py-2 text-left">
                                        {worker.phone_num}
                                    </td>

                                    <td className="px-4 py-2 text-left">
                                        {worker.cnic}
                                    </td>

                                    <td className="px-4 py-2 text-right">
                                        <button
                                            onClick={() => {
                                                setSelectedWorker(worker);
                                                setIsOpen(true);
                                            }}
                                            className="bg-blue-900 text-white px-3 py-1 rounded"
                                        >
                                            Worker Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                </table>
                <WorkerModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selectedWorker={selectedWorker}
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