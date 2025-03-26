"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-800">Total Revenue</h2>
          <p className="text-2xl text-blue-600">฿150,000</p>
        </div>
        <div className="p-6 bg-green-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-green-800">
            Pending Payments
          </h2>
          <p className="text-2xl text-green-600">12</p>
        </div>
        <div className="p-6 bg-purple-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-purple-800">Users</h2>
          <p className="text-2xl text-purple-600">245</p>
        </div>
      </div>
    </div>
  );
}
