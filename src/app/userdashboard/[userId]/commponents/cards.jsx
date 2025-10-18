"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Clock, ListChecks, XCircle } from "lucide-react";

export default function Cards({ salonId }) {
  const [counts, setCounts] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://backend-salon-production.up.railway.app/appointment/getappointment/${salonId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const appointments = res.data;
        setCounts({
          total: appointments.length,
          completed: appointments.filter(a => a.status === "completed").length,
          pending: appointments.filter(a => a.status === "pending").length,
          cancelled: appointments.filter(a => a.status === "cancelled").length,
        });
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    if (salonId) fetchAppointments();
  }, [salonId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      <Card title="Total" count={counts.total} icon={<ListChecks className="w-5 h-5 text-blue-500" />} bg="bg-blue-200/50" />
      <Card title="Completed" count={counts.completed} icon={<CheckCircle className="w-5 h-5 text-green-500" />} bg="bg-green-200/50" />
      <Card title="Pending" count={counts.pending} icon={<Clock className="w-6 h-6 text-yellow-500" />} bg="bg-amber-200/50" />
      <Card title="Cancelled" count={counts.cancelled} icon={<XCircle className="w-5 h-5 text-red-500" />} bg="bg-red-200/50" />
    </div>
  );
}

function Card({ title, count, icon, bg }) {
  return (
    <div className="bg-white flex justify-between items-center shadow-lg rounded-xl p-6 text-center border border-amber-200">
      <div>
        <h1 className="text-lg font-bold text-amber-800">{title}</h1>
        <p className="text-2sm text-amber-600">{count}</p>
      </div>
      <div className={`${bg} rounded p-3`}>{icon}</div>
    </div>
  );
}
