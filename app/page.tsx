export default function Home() {
  const NavLink = ({ href, children, className }: any) => {
    return <a href={href} className={className}>{children}</a>;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            PayWage Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            A simple and clean management system for workers, attendance, and payroll.
          </p>
        </div>

        {/* Navigation Buttons */}
        {/* <div className="flex gap-4 flex-wrap">
          <NavLink
            href="/workers"
            className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-3 rounded-xl shadow-md transition"
          >
            Workers
          </NavLink>

          <NavLink
            href="/attendances"
            className="bg-green-600 hover:bg-green-500 text-white px-5 py-3 rounded-xl shadow-md transition"
          >
            Attendance
          </NavLink>

          <NavLink
            href="/payrolls"
            className="bg-yellow-500 hover:bg-yellow-400 text-white px-5 py-3 rounded-xl shadow-md transition"
          >
            Payroll
          </NavLink>
        </div> */}
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-8 text-white shadow-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to PayWage Management System
        </h2>
        <p className="text-lg text-blue-100">
          Manage your complete workforce system in one place with simple navigation and clean structure.
        </p>

        <div className="flex flex-wrap gap-4 mt-6">
          <NavLink
            href="/workers"
            className="bg-white text-blue-900 px-5 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Go to Workers Module
          </NavLink>

          <NavLink
            href="/attendances"
            className="border border-white px-5 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition"
          >
            Go to Attendance Module
          </NavLink>

          <NavLink
            href="/payrolls"
            className="bg-yellow-400 text-blue-900 px-5 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition"
          >
            Go to Payroll Module
          </NavLink>
        </div>
      </div>

      {/* Info Cards (STATIC CONTENT ONLY) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800">Workers Management</h3>
          <p className="text-gray-500 mt-2">
            Add, view, and manage all employee records.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800">Attendance System</h3>
          <p className="text-gray-500 mt-2">
            Track daily attendance records easily.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800">Payroll System</h3>
          <p className="text-gray-500 mt-2">
            Manage salaries and payment records efficiently.
          </p>
        </div>
      </div>

      {/* Static Content Section */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          System Overview
        </h2>
        <p className="text-gray-600 leading-relaxed">
          This PayWage system is designed to simplify workforce management. 
          You can navigate to different modules using the buttons above. 
          Each module handles a specific part of employee management including workers, attendance, and payroll processing.
        </p>
      </div>
    </div>
  );
}
