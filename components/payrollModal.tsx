type payrollModalProps = {
    isOpen: Boolean,
    setIsOpen: (value: boolean) => void,
    selectedPayroll: any
}
export default function PayrollModal({ isOpen, setIsOpen, selectedPayroll }: payrollModalProps) {
    if (!isOpen || !selectedPayroll) return null;
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
                <p><b>Worker Name:</b> {selectedPayroll.worker.name}</p>
                <p><b>Worker ID:</b> {selectedPayroll.worker_id}</p>
                <p><b>Base Salary:</b> {selectedPayroll.base_salary}</p>
                <p>
                    <b>Month:</b>{" "}
                    {new Date(selectedPayroll.month).toLocaleDateString()}
                </p>
                <p>
                    <b>Year:</b>{" "}
                    {new Date(selectedPayroll.year).toLocaleDateString()}
                </p>
                <p><b>Total Working Days:</b> {selectedPayroll.total_working_days}</p>
                <p><b>Absent Days:</b> {selectedPayroll.absent_days}</p>
                <p><b>Days Present:</b> {selectedPayroll.days_present}</p>
                <p><b>Overtime Hours:</b> {selectedPayroll.overtime_hours}</p>
                <p><b>Overtime Pay:</b> {selectedPayroll.overtime_pay}</p>
                <p><b>Total Deductions:</b> {selectedPayroll.total_deductions}</p>
                <p><b>Net Salary:</b> {selectedPayroll.net_salary}</p>
                <p><b>Currency:</b> {selectedPayroll.currency}</p>
                <p><b>Payment Status:</b>{" "}
                    {selectedPayroll.payment_status ? "Paid" : "Unpaid"}</p>
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