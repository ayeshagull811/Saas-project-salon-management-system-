import axios from "axios";

const API_URL = "http://localhost:8000/category";

export const getCategories = async (salonId) => {
  const res = await axios.get(`${API_URL}/getcategory/${salonId}`);
  return res.data;
};

// ✅ Create category
export const createCategory = async (data) => {
  const res = await axios.post(`${API_URL}/createcategory`, data,{
    headers: { "Content-Type": "application/json" }
  });
  return res.data;
};

// ✅ Update category
export const updateCategory = async (id, data) => {
  const res = await axios.put(`${API_URL}/updatecategory/${id}`, data);
  return res.data;
};

// ✅ Delete category
export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_URL}/deletedcategory/${id}`);
  return res.data;
};

// ✅ Toggle active/inactive
export const toggleCategoryStatus = async (id) => {
  const res = await axios.patch(`${API_URL}/${id}/toggle`);
  return res.data;
};

const schedule_URL = "http://localhost:8000/schedule";
export const getSchedule = async (userId, startDate, endDate) => {
  try {
    const res = await axios.get(`${schedule_URL}/getstaff/${userId}`, {
      params: {
        start_date: startDate, 
        end_date: endDate,
      },
    });
    return res.data;
  } catch (error) {
    console.error("API getSchedule error:", error.response?.data || error.message);
    throw error;
  }
};



export const createSchedule = async (data) => {
  try {
    const res = await axios.post(`${schedule_URL}/staffschedule`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    console.error("API createSchedule error:", {
      message: error?.message,
      status: error?.response?.status,
      data: error?.response?.data,
      url: error?.config?.url,
      method: error?.config?.method,
    });
    throw error;
  }
};
