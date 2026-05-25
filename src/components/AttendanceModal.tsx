"use client";

type attendanceModalProps = {
    isOpen: Boolean,
    setIsOpen: (value: boolean) => void,
    selectedAttendance: any
}

export default function AttendanceModal({ isOpen, setIsOpen, selectedAttendance }: attendanceModalProps) {
    if (!isOpen || !selectedAttendance) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center"
            onClick={() => setIsOpen(false)}
        >
            <div className="bg-white p-6 rounded-lg w-[400px]"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">
                    Attendance Details
                </h2>
                <p><b>Worker Name:</b> {selectedAttendance.worker.name}</p>
                <p><b>Worker ID:</b> {selectedAttendance.worker_id}</p>
                <p>
                    <b>Date:</b>{" "}
                    {new Date(selectedAttendance.date).toLocaleDateString()}
                </p>
                <p>
                    <b>Check In:</b>{" "}
                    {selectedAttendance.check_in
                        ? new Date(selectedAttendance.check_in).toLocaleTimeString()
                        : "-"}
                </p>
                <p>
                    <b>Check Out:</b>{" "}
                    {selectedAttendance.check_out
                        ? new Date(selectedAttendance.check_out).toLocaleTimeString()
                        : "-"}
                </p>
                <p><b>Total Hours:</b> {selectedAttendance.total_hours}</p>
                <p><b>Overtime Hours:</b> {selectedAttendance.overtime_hours}</p>
                <p>
                    <b>Attendance Status:</b>{" "}
                    {selectedAttendance.attendance_status ? "Present" : "Absent"}
                </p>
                <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-blue-900 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    )
}