"use client";
import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function NewBooking({ salonId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!salonId) return;

    const fetchAppointments = async () => {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        // ✅ Dynamic API call with salonId
        const res = await axios.get(
          `https://backend-salon-production.up.railway.app/appointment/monthly/${salonId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        // Map backend data to chart format
        const formatted = res.data.map((item) => ({
          name: item.month,
          revenue: item.count, // or item.totalRevenue if backend provides it
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error fetching appointment data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [salonId]);

  return (
    <div className="bg-white shadow-md rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-700">📊 Appointments</h1>
        <User className="w-5 h-5 text-amber-500" />
      </div>

      {/* Chart */}
      {loading ? (
        <p className="text-gray-500 text-sm text-center">Loading data...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              interval={0}
              tick={{ fontSize: 12, fill: "#555" }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#CA9871" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
