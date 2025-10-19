"use client";
import axios from "axios";
import {
  Award,
  Calendar,
  Edit3,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AllStaffPage() {
  const [staffMember, setStaffMember] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null); // ✅ Added error state
  const params = useParams();
  const SalonId = params.salonId;

  console.log("Salon ID:", SalonId);

  // ✅ Filter logic
  const filterStaff = staffMember.filter(
    (staff) =>
      staff.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.position?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Fetch staff data
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/getstaff/${SalonId}`
        );
        console.log("GET /getstaff response:", res.data);

        if (res.data.success) {
          setStaffMember(res.data.data);
        } else {
          setError(res.data.message || "Failed to fetch staff members");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong while fetching staff data.");
      }
    };

    if (SalonId) fetchStaff();
  }, [SalonId]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#926848] mb-2">
          All Staff Members
        </h1>
        <p className="text-[#cd9469]">Manage your salon team</p>
      </div>

      {/* Search + Add Button */}
      <div className="flex justify-between items-center">
        <div className="p-4 mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff by name or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        <div className="p-4 mb-6">
          <Link href={`/admindashboard/${SalonId}/staff/add`}>
            <button
              type="button"
              className="relative shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden px-7 py-3 bg-gradient-to-r from-[#a27450] to-[#be885e] text-white font-semibold rounded-2xl hover:opacity-90 group"
            >
              <span className="relative z-10 flex justify-center gap-3">
                <Plus className="h-6 w-6" />
                Add Staff
              </span>
              <span className="absolute left-0 top-0 h-full w-0 bg-[#74543c] transition-all duration-500 group-hover:w-full"></span>
            </button>
          </Link>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mx-5 mb-6">
          {error}
        </div>
      )}

      {/* Staff Cards */}
      <div className="flex gap-8 flex-wrap ml-5">
        {filterStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex overflow-hidden border border-gray-100 group rounded-2xl gap-4"
          >
            {/* Card Header */}
            <div className="relative bg-gradient-to-t from-amber-700/70 to-amber-800/70 p-4 text-white">
              <div className="items-center space-y-4">
                <img
                  src={
                    staff.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRseRj5MjxLYtgPrmGHS01YBytPjIkGKk8Zaw&s"
                  }
                  alt={staff.firstname}
                  className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div>
                  <h3 className="text-md font-bold">
                    {staff.firstname} {staff.lastname}
                  </h3>
                  <p className="text-amber-100 text-sm">{staff.position}</p>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-3 text-amber-500" />
                  <span className="text-sm">{staff.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-3 text-amber-500" />
                  <span className="text-sm">{staff.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-3 text-amber-500" />
                  <span className="text-sm">{staff.shift}</span>
                </div>
              </div>

              {/* Experience & Specialties */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Award className="h-4 w-4 mr-2 text-amber-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {staff.experience} Experience
                  </span>
                </div>
                <p className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full border border-amber-200">
                  {staff.specialization}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <Edit3 className="h-4 w-4 mr-1" />
                  <span className="text-sm">Edit</span>
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200">
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="text-sm">Remove</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filterStaff.length === 0 && !error && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-500">
            No staff members found
          </p>
          <p className="text-sm text-gray-400">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
