"use client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Users, Shield, X, Check } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { salonId } = useParams();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ Fetch Roles (clean + correct)
  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔍 Fetching roles for salonId:", salonId);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/getrole?salonId=${salonId}`;
      console.log("🌐 Roles API URL:", apiUrl);

      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      });

      console.log("✅ Roles fetched:", res.data);
      setRoles(res.data);
    } catch (err) {
      console.error("❌ Error fetching roles:", err);
      setError(
        err.response?.data?.message || "Failed to fetch roles. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Permissions (clean + correct)
  const fetchPermissions = async () => {
    try {
      console.log("🔍 Fetching permissions...");
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/permission/get`;

      const res = await axios.get(apiUrl, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("✅ Permissions fetched:", res.data);
      setPermissions(res.data);
    } catch (err) {
      console.error("❌ Error fetching permissions:", err);
      setPermissions([]);
    }
  };

  // ✅ Create Role
  const createRole = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/createrole`;
      const res = await axios.post(
        apiUrl,
        {
          name: newRole,
          permissionIds: selectedPermissions,
          salonId: salonId,
        },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("✅ Role created:", res.data);
      setShowModal(false);
      setNewRole("");
      setSelectedPermissions([]);
      fetchRoles();
    } catch (err) {
      console.error("❌ Error creating role:", err);
    }
  };

  // ✅ Handle checkbox toggle
  const handlePermissionToggle = (permId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  useEffect(() => {
    if (salonId) {
      fetchRoles();
      fetchPermissions();
    }
  }, [salonId]);

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#cf9060] to-[#e1a577] bg-clip-text text-transparent text-center md:text-left">
        Roles Management
      </h1>

      {/* Roles Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 md:px-6 py-4 md:py-5 border-b border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#926848] flex items-center gap-2 md:gap-3">
                <div className="p-2 bg-[#926848] rounded-lg">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span>Roles Management</span>
              </h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1">
                Manage user roles and permissions
              </p>
            </div>
            <button
              className="bg-gradient-to-r from-[#926848] to-[#96745a] hover:from-[#bf9a7d] hover:to-[#cd9f7c] text-white px-4 md:px-6 py-2 md:py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-4 h-4" /> Add Role
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                  #
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                  Role Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                  Permissions
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((role, idx) => (
                <tr key={role.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {role.name}
                  </td>
                  <td className="px-4 py-3">
                    {role.Permissions?.length > 0
                      ? role.Permissions.map((p) => (
                          <span
                            key={p.id}
                            className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs mr-1"
                          >
                            {p.name}
                          </span>
                        ))
                      : "No permissions"}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-[#926848] hover:text-blue-700">
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button className="text-red-600 hover:text-red-800 ml-2">
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="text-center py-6 text-slate-500">Loading roles...</div>
        )}
        {!loading && roles.length === 0 && (
          <div className="text-center py-6 text-slate-500">
            No roles found. Create your first one!
          </div>
        )}
      </div>

      {/* Add Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Create New Role</h3>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Enter role name"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <h4 className="font-semibold mb-2 text-sm">
              Assign Permissions ({selectedPermissions.length} selected)
            </h4>
            <div className="border rounded-lg p-3 max-h-60 overflow-y-auto">
              {permissions.map((perm) => (
                <label
                  key={perm.id}
                  className="flex items-center gap-2 py-1 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(perm.id)}
                    onChange={() => handlePermissionToggle(perm.id)}
                  />
                  {perm.name}
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createRole}
                className="px-4 py-2 bg-[#926848] text-white rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
