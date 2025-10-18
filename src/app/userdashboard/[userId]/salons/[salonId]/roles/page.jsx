"use client";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Users, Shield, X, Check } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import axiosInstance from "@/axiosInstance";

export default function RolesPermissionsPage() {
  const [roles, setRoles] = useState([]);
    const { salonId } = useParams(); 
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Your original backend connection code - unchanged
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch roles - your original code unchanged
const fetchRoles = async () => {
  try {
    setLoading(true);
    setError(null);
    console.log("🔍 Fetching roles for salonId:", salonId);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    console.log("🔑 Token available:", !!token);

    // Try multiple possible endpoints
    const possibleEndpoints = [
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/getrole?salonId=${salonId}`,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/getrole/${salonId}`,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/getrole?salonId=${salonId}`,
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/roles?salonId=${salonId}`,
    ];
    
    console.log("🌐 Trying API endpoints:", possibleEndpoints);
    
    let apiUrl = possibleEndpoints[0]; // Start with first one

   // Try the first endpoint
   let res;
   try {
     res = await axios.get(apiUrl, {
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
  withCredentials: true,
});
   } catch (firstError) {
     console.log("❌ First endpoint failed, trying alternatives...");
     
     // Try alternative endpoints
     for (let i = 1; i < possibleEndpoints.length; i++) {
       try {
         console.log(`🔄 Trying endpoint ${i + 1}:`, possibleEndpoints[i]);
         res = await axios.get(possibleEndpoints[i], {
           headers: {
             Authorization: token ? `Bearer ${token}` : "",
           },
           withCredentials: true,
         });
         console.log(`✅ Success with endpoint ${i + 1}!`);
         break;
       } catch (altError) {
         console.log(`❌ Endpoint ${i + 1} also failed:`, altError.message);
         if (i === possibleEndpoints.length - 1) {
           throw firstError; // Throw original error if all fail
         }
       }
     }
   }

    console.log("✅ Roles API Response:", res);
    console.log("📋 Roles data:", res.data);
    setRoles(res.data); // Axios data is already parsed
    setLoading(false);
  } catch (err) {
    console.error("❌ Error fetching roles:", err);
    console.error("❌ Error response:", err.response?.data);
    console.error("❌ Error status:", err.response?.status);
    console.error("❌ Error message:", err.message);
    setError(err.response?.data?.message || err.message || "Failed to fetch roles");
    setLoading(false);
    return null;
  }
};

  // Fetch permissions - your original code unchanged
 const fetchPermissions = async () => {
  try {
    console.log("🔍 Fetching permissions...");
    const token = localStorage.getItem("token");
    console.log("🔑 Token for permissions:", !!token);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/permission/get`;
    console.log("🌐 Permissions API URL:", apiUrl);

    const res = await axios.get(apiUrl, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      }
    );
    console.log("✅ Permissions API Response:", res);
    console.log("📋 Permissions data:", res.data);
    setPermissions(res.data);
  } catch (err) {
    console.error("❌ Error fetching permissions:", err);
    console.error("❌ Permissions error response:", err.response?.data);
    console.error("❌ Permissions error status:", err.response?.status);
    console.error("❌ Permissions error message:", err.message);
  }
};

  // Create Role with Permissions - your original code unchanged
const createRole = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/role/createrole`,
      {
        name: newRole,                // ✅ role ka name bhejo
        permissionIds: selectedPermissions, 
        salonId: salonId,             // ✅ salon ke hisaab se role create hoga
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("✅ Role created:", res.data);
    fetchRoles(); // refresh roles list after create
    setShowModal(false);
  } catch (err) {
    console.error("❌ Error creating role:", err);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
    }
  }
};



  // Handle checkbox select - your original code unchanged
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

      {/* Enhanced Roles Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-r from-[blue-50] to-purple-50 px-4 md:px-6 py-4 md:py-5 border-b border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-[#926848] flex items-center gap-2 md:gap-3">
                <div className="p-2 bg-[#926848] rounded-lg">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="hidden sm:inline">Roles Management</span>
                <span className="sm:hidden">Roles</span>
              </h2>
              <p className="text-slate-600 text-xs md:text-sm mt-1">Manage user roles and permissions</p>
            </div>
            <button
              className="bg-gradient-to-r from-[#926848] to-[#96745a] hover:from-[#bf9a7d] hover:to-[#cd9f7c] text-white px-4 md:px-6 py-2 md:py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base w-full md:w-auto justify-center"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Role</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Role Name
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">
                  Permissions
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roles.map((role, idx) => (
                <tr key={role.id} className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-purple-25 transition-all duration-200 group">
                  <td className="px-3 md:px-6 py-3 md:py-5">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-[#f4d9c4] to-[#f0c19c] rounded-full flex items-center justify-center">
                      <span className="text-xs md:text-sm font-semibold text-slate-700">{idx + 1}</span>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-5">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="p-1.5 md:p-2.5 bg-gradient-to-r from-[#a78469] to-[#cba88d] rounded-lg md:rounded-xl shadow-sm">
                        <Users className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <div>
                        <span className="text-sm md:text-base font-semibold text-slate-900">{role.name}</span>
                        <p className="text-xs text-slate-500 hidden sm:block">User Role</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-5 hidden sm:table-cell">
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {role.Permissions?.length > 0 ? (
                        role.Permissions.slice(0, 3).map((p, permIdx) => (
                          <span
                            key={permIdx}
                            className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 shadow-sm"
                          >
                            <Check className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                            {p.name}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-500 border border-slate-200">
                          No permissions
                        </span>
                      )}
                      {role.Permissions?.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                          +{role.Permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-5">
                    <div className="flex items-center gap-1 md:gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 md:p-2.5 text-[#926848] hover:bg-blue-50 rounded-lg md:rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105"
                        title="Edit Role"
                        onClick={() => console.log('Edit role:', role.id)}
                      >
                        <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                      <button
                        className="p-1.5 md:p-2.5 text-red-600 hover:bg-red-50 rounded-lg md:rounded-xl transition-all duration-200 hover:shadow-md hover:scale-105"
                        title="Delete Role"
                        onClick={() => console.log('Delete role:', role.id)}
                      >
                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#926848] mx-auto mb-4"></div>
            <p className="text-slate-500">Loading roles...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <p className="text-red-500 mb-4">Error: {error}</p>
            <button 
              onClick={() => fetchRoles()}
              className="px-4 py-2 bg-[#926848] text-white rounded-lg hover:bg-[#a48065] transition-colors"
            >
              Retry
            </button>
          </div>
        )}
        
        {!loading && !error && roles.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500">No roles found. Create your first role!</p>
          </div>
        )}
      </div>

      {/* Enhanced Add Role Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 md:px-6 py-4 md:py-5 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold text-slate-800 flex items-center gap-2 md:gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#926848] to-[#926848] rounded-lg">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:inline">Create New Role</span>
                  <span className="sm:hidden">New Role</span>
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-4 md:p-6 space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 md:mb-3">Role Name</label>
                <input
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 bg-slate-50 focus:bg-white text-sm md:text-base"
                  placeholder="Enter role name (e.g., Manager, Editor)"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 md:mb-3">
                  Assign Permissions ({selectedPermissions.length} selected)
                </label>
                <div className="border border-slate-200 rounded-xl p-3 md:p-4 max-h-48 md:max-h-64 overflow-y-auto bg-slate-50">
                  <div className="space-y-2 md:space-y-3">
                    {permissions.map((perm) => (
                      <label key={perm.id} className="flex items-center gap-2 md:gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white transition-colors">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(perm.id)}
                            onChange={() => handlePermissionToggle(perm.id)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 md:w-5 md:h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
                            selectedPermissions.includes(perm.id)
                              ? 'bg-gradient-to-r from-[#926848] to-[#c58c60] border-transparent shadow-sm'
                              : 'border-slate-300 group-hover:border-blue-400 bg-white'
                          }`}>
                            {selectedPermissions.includes(perm.id) && (
                              <Check className="w-2 h-2 md:w-3 md:h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-xs md:text-sm font-medium text-slate-700 group-hover:text-slate-900">
                          {perm.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 md:px-6 py-3 md:py-4 bg-slate-50 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3">
                <button
                  className="px-4 md:px-6 py-2 md:py-2.5 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors font-medium text-sm md:text-base w-full sm:w-auto"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-[#926848] to-[#c68e63] hover:from-[#a48065] hover:to-[#c69d7d] text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium text-sm md:text-base w-full sm:w-auto"
                  onClick={createRole}
                >
                  Create Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

               