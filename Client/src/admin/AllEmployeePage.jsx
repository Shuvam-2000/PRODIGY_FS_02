import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Plus } from "lucide-react";

const AllEmployeePage = () => {
  const [getAllEmployees, setAllEmployees] = useState([]);
  const [adminName, setAdminName] = useState(null);
  const navigate = useNavigate();

  // Fetch admin info
  const getAdminName = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/employee/selfInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAdminName(res.data.user);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed fetching profile. Try again.");
    }
  };

  // Fetch all employees
  const fetchAllEmplyeesInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/employee/getemployee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllEmployees(res.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error Fetching Employee Info. Try again.");
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
    fetchAllEmplyeesInfo();
  }, []);

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

      {/* Page Title & Create Button */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-4">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800">All Employees</h3>
        <button
          onClick={() => navigate("/admin/create-employee")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white sm:px-4 sm:py-2 px-2 py-2 rounded-lg font-medium text-sm md:text-base shadow cursor-pointer"
        >
          <Plus size={18} />
          Add New Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300">
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {getAllEmployees?.map((emp) => (
              <tr key={emp._id} className="border-t border-gray-300 hover:bg-gray-100 transition">
                <td className="px-6 py-4">{emp.name}</td>
                <td className="px-6 py-4">{emp.email}</td>
                <td className="px-6 py-4">{emp.phoneNumber}</td>
                <td className="px-6 py-4">{emp.department}</td>
                <td className="px-6 py-4">{emp.position}</td>
                <td className="px-6 py-4">₹ {emp.salary}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => navigate(`/admin/employee-detail/${emp._id}`)}
                    className="text-blue-600 hover:underline font-medium cursor-pointer"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {getAllEmployees.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-6">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeePage;
