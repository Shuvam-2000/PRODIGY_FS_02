import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const EmployeeDetailPage = () => {
  const [adminName, setAdminName] = useState(null);
  const [employeeDetail, setEmployeeDetail] = useState(null);
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
      setEmployeeDetail(res?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch employee details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout Successful");
    navigate("/admin/login");
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/employee/deleteemployee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Employee deleted successfully");
      navigate("/admin/allemployee");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete employee.");
    }
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

      {/* Employee Profile Card */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Employee Profile</h2>

        {employeeDetail ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{employeeDetail.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{employeeDetail.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone Number:</p>
              <p>{employeeDetail.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Department:</p>
              <p>{employeeDetail.department}</p>
            </div>
            <div>
              <p className="font-semibold">Position:</p>
              <p>{employeeDetail.position}</p>
            </div>
            <div>
              <p className="font-semibold">Salary:</p>
              <p>₹ {employeeDetail.salary}</p>
            </div>
            <div>
              <p className="font-semibold">Role:</p>
              <p>{employeeDetail.role}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading employee details...</p>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => navigate(`/admin/employee-update/${id}`)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg shadow cursor-pointer"
          >
            <Pencil size={18} /> Update Employee Info
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg shadow cursor-pointer"
          >
            <Trash size={18} /> Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
