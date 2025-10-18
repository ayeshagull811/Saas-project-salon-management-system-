"use client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Shield, X } from "lucide-react";
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
  const [editingRoleId, setEditingRoleId] = useState(null); // 👈 for edit mode
  const { salonId } = useParams();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ✅ Fetch Roles
  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/getrole?salonId=${salonId}`,
        { headers: { Authorization: token ? `Bearer ${token}` : "" }, withCredentials: true }
      );
      const filtered = res.data.filter(
        (role) => role.name?.toLowerCase() !== "owner"
      );
      setRoles(filtered);
    } catch (err) {
      console.error("Error fetching roles:", err);
      setError(err.response?.data?.message || "Failed to fetch roles.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Permissions
  const fetchPermissions = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/permission/get`,
        { headers: { Authorization: token ? `Bearer ${token}` : "" }, withCredentials: true }
      );
      setPermissions(res.data);
    } catch (err) {
      console.error("Error fetching permissions:", err);
      setPermissions([]);
    }
  };

  useEffect(() => {
    if (salonId) {
      fetchRoles();
      fetchPermissions();
    }
  }, [salonId]);

  // ✅ Create or Update Role
  const createOrUpdateRole = async () => {
    if (!newRole.trim()) return alert("Please enter a role name.");
    try {
      if (editingRoleId) {
        // Edit existing role
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/updaterole/${editingRoleId}`,
          { name: newRole.trim(), permissionIds: selectedPermissions },
          { headers: { Authorization: token ? `Bearer ${token}` : "" }, withCredentials: true }
        );
        setEditingRoleId(null);
      } else {
        // Create new role
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/createrole`,
          { name: newRole.trim(), permissionIds: selectedPermissions, salonId },
          { headers: { Authorization: token ? `Bearer ${token}` : "" }, withCredentials: true }
        );
      }

      setShowModal(false);
      setNewRole("");
      setSelectedPermissions([]);
      fetchRoles();
    } catch (err) {
      console.error("Error creating/updating role:", err);
      alert("Failed to save role. Please try again.");
    }
  };

  // ✅ Delete Role
  const deleteRole = async (roleId) => {
    if (!confirm("Are you sure you want to delete this role?")) return;
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/deleterole/${roleId}`,
        { headers: { Authorization: token ? `Bearer ${token}` : "" }, withCredentials: true }
      );
      setRoles(roles.filter((r) => r.id !== roleId));
    } catch (err) {
      console.error("Error deleting role:", err);
      alert("Failed to delete role");
    }
  };

  // ✅ Handle permission toggle
  const handlePermissionToggle = (permId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  // ✅ Open modal for edit
  const openEditModal = (role) => {
    setShowModal(true);
    setNewRole(role.name);
    setSelectedPermissions(role.Permissions?.map((p) => p.id) || []);
    setEditingRoleId(role.id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left bg-gradient-to-r from-[#cf9060] to-[#e1a577] bg-clip-text text-transparent">
        Roles Management
      </h1>

      {/* Roles Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 md:px-6 py-4 md:py-5 border-b border-slate-200 flex justify-between items-center flex-wrap gap-3">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-[#926848] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#926848]" />
              Roles Management
            </h2>
            <p className="text-slate-600 text-xs mt-1">
              Manage user roles and permissions
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-[#926848] to-[#a07455] text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all hover:shadow-lg"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4" /> Add Role
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Role Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Permissions</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((role, idx) => (
                <tr key={role.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{role.name}</td>
                  <td className="px-4 py-3">
                    {role.Permissions?.length > 0
                      ? role.Permissions.map((p) => (
                          <span key={p.id} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs mr-1">
                            {p.name}
                          </span>
                        ))
                      : "No permissions"}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button className="text-[#926848] hover:text-blue-700" onClick={() => openEditModal(role)}>
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800" onClick={() => deleteRole(role.id)}>
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && <div className="text-center py-6 text-slate-500">Loading roles...</div>}
        {!loading && roles.length === 0 && <div className="text-center py-6 text-slate-500">No roles found. Create your first one!</div>}
      </div>

      {/* Add/Edit Role Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editingRoleId ? "Edit Role" : "Create New Role"}</h3>
              <button onClick={() => { setShowModal(false); setEditingRoleId(null); }}>
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
                <label key={perm.id} className="flex items-center gap-2 py-1 cursor-pointer">
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
                onClick={() => { setShowModal(false); setEditingRoleId(null); }}
                className="px-4 py-2 bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={createOrUpdateRole}
                className="px-4 py-2 bg-[#926848] text-white rounded-lg"
              >
                {editingRoleId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
