"use client";

type paginationProps = {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
    limit: number;
    setLimit: (value: number) => void;
};

export default function Pagination({
    page,
    setPage,
    totalPages,
    limit,
    setLimit,
}: paginationProps) {

    return (
        <>
            {/* LIMIT SELECT */}
            <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="flex justify-center items-center gap-2 mt-4 w-20 h-10 px-2 text-sm rounded-md text-blue-900 border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
            >
                {/* <option value={1}>1</option> */}
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
            </select>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-2 mt-4">

                {/* PREVIOUS */}
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="bg-blue-900 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    Previous
                </button>


                <div className="flex gap-2">
                    {Array.from({ length: totalPages || 1 }, (_, i) => i + 1)
                        .filter((p) => {
                            const total = totalPages || 1;

                            if (total <= 3) return true;

                            return (
                                p === 1 ||
                                p === 2 ||
                                p === total ||
                                p === page ||
                                p === page - 1 ||
                                p === page + 1
                            );
                        })
                        .map((p, i, arr) => {
                            const prev = arr[i - 1];

                            return (
                                <div key={i} className="flex items-center gap-2">
                                    {prev && p - prev > 1 && (
                                        <span className="px-2 text-gray-500">...</span>
                                    )}

                                    <button
                                        onClick={() => setPage(p)}
                                        className={`px-3 py-1 rounded ${page === p
                                                ? "bg-blue-900 text-white"
                                                : "bg-gray-200"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                </div>
                            );
                        })}                </div>

                {/* NEXT */}
                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages || totalPages === 0}
                    className="bg-blue-900 text-white px-4 py-2 rounded disabled:bg-gray-400"
                >
                    Next
                </button>

            </div>
        </>
    );
}