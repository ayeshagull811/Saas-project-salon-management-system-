"use client";
import React, { useState, useMemo } from "react";
import { Search, Calendar, User, Edit3, Check, X, Clock } from "lucide-react";

const AppointmentsDashboard = () => {
  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
        id: 1,
        customerName: "Sarah Khan",
        service: "Hair Cut & Style",
        date: "2024-08-15",
        time: "10:00 AM",
        status: "pending",
        phone: "0300-1234567",
        price: 2500,
      },
      {
        id: 2,
        customerName: "Ali Raza",
        service: "Facial & Massage",
        date: "2024-08-18",
        time: "03:00 PM",
        status: "cancelled",
        phone: "0301-9876543",
        price: 3000,
      },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Filter appointments based on search term only
  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesName = appointment.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = appointment.date.includes(searchTerm);
      return matchesName || matchesDate;
    });
  }, [appointments, searchTerm]);

  // Update appointment status
  const updateStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      completed: "bg-green-100 text-green-800 border border-green-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
    };

    const labels = {
      pending: "Pending",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  return (
    <div
      className="min-h-screen  p-6 "
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-600 mb-2">
            Appointments Dashboard
          </h1>
          <p className="text-amber-500">Manage all your salon appointments</p>
        </div>
          <div className="p-4 mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments by name or date..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>
        <div>
          {filteredAppointments.length > 0 ? (
<div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-700/80 to-amber-600/60 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date & Time
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {appointment.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {appointment.service}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-medium">
                          {appointment.date}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {appointment.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {appointment.phone}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">
                          Rs. {appointment.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(appointment.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          {appointment.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  updateStatus(appointment.id, "completed")
                                }
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                title="Mark as Completed"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() =>
                                  updateStatus(appointment.id, "cancelled")
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Cancel Appointment"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}

                          {appointment.status === "cancelled" && (
                            <button
                              onClick={() =>
                                updateStatus(appointment.id, "pending")
                              }
                              className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                              title="Restore to Pending"
                            >
                              <Clock className="h-4 w-4" />
                            </button>
                          )}

                          <button
                            onClick={() =>
                              setEditingId(
                                editingId === appointment.id
                                  ? null
                                  : appointment.id
                              )
                            }
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            title="Edit Appointment"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </div>

                        {editingId === appointment.id && (
                          <div className="absolute z-10 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <div className="text-sm text-gray-600 mb-2">
                              Quick Actions:
                            </div>
                            <div className="space-y-2">
                              <button
                                onClick={() => {
                                  alert(
                                    "Edit functionality can be implemented here"
                                  );
                                  setEditingId(null);
                                }}
                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                              >
                                Edit Details
                              </button>
                              <button
                                onClick={() => {
                                  alert(
                                    "Reschedule functionality can be implemented here"
                                  );
                                  setEditingId(null);
                                }}
                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                              >
                                Reschedule
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Search className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">
                          No appointments found
                        </p>
                        <p className="text-sm">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
          ):(
         <div className="flex flex-col items-center">
                        <Search className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium text-gray-500">
                          No appointments found
                        </p>
                        <p className="text-sm text-gray-400">
                          Try adjusting your search criteria
                        </p>
                      </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default AppointmentsDashboard;
