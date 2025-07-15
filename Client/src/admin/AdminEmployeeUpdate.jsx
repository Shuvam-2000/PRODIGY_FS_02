import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AdminEmployeeUpdate = () => {
  const [adminName, setAdminName] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    department: "",
    position: "",
    salary: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch admin name
  const getAdminName = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/employee/selfInfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminName(res?.data?.user);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed fetching profile.");
    }
  };

  // Fetch employee details
  const fetchEmployeeDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8000/api/employee/getemployee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch employee details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8000/api/employee/updateemployee/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Employee updated successfully");
      navigate("/admin/allemployee");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update employee.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout Successful");
    navigate("/admin/login");
  };

  useEffect(() => {
    getAdminName();
    fetchEmployeeDetails();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-6xl mx-auto mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Hi, <span className="text-blue-600">{adminName?.name || "Admin"}</span>
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 text-sm md:text-base text-white rounded-lg shadow cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Update Form */}
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Update Employee Info</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border px-4 py-2 rounded-lg border-gray-300"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="border px-4 py-2 rounded-lg border-gray-300"
          />
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border px-4 py-2 rounded-lg border-gray-300"
          />
          <input
            type="text"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
            placeholder="Department"
            className="border px-4 py-2 rounded-lg border-gray-300"
          />
          <input
            type="text"
            name="position"
            value={formData.position || ""}
            onChange={handleChange}
            placeholder="Position"
            className="border px-4 py-2 rounded-lg border-gray-300"
          />
          <input
            type="number"
            name="salary"
            value={formData.salary || ""}
            onChange={handleChange}
            placeholder="Salary"
            className="border px-4 py-2 rounded-lg border-gray-300"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-10">
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg cursor-pointer"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/admin/allemployee")}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg curosor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployeeUpdate;
