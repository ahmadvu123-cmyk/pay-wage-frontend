type workerModalProps = {
    isOpen: Boolean,
    setIsOpen: (value: boolean) => void,
    selectedWorker: any
}

export default function workerModal({isOpen, setIsOpen, selectedWorker}: workerModalProps) {
    if (!isOpen || !selectedWorker) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center"
        onClick={() => setIsOpen(false)}
        >

            <div className="bg-white p-6 rounded-lg w-[400px]"
            onClick={(e) => e.stopPropagation()}
            >

                <h2 className="text-xl font-bold mb-4">
                    Worker Details
                </h2>

                <p><b>Name:</b> {selectedWorker.name}</p>
                <p><b>Phone:</b> {selectedWorker.phone_num}</p>
                <p><b>CNIC:</b> {selectedWorker.cnic}</p>
                <p><b>Role:</b> {selectedWorker.role}</p>
                <p>
                    <b>Permanent:</b>{" "}
                    {selectedWorker.is_permanent ? "Yes" : "No"}
                </p>

                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-blue-900 text-white px-4 py-2 rounded"
                >
                    Close
                </button>

            </div>

        </div>
    );


}