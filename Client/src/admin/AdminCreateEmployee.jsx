import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";

const AdminCreateEmployee = () => {
  const [adminName, setAdminName] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

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
      toast.error(error?.response?.data?.message || "Failed fetching profile.");
    }
  };

  useEffect(() => {
    getAdminName();
  }, []);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");

      // add fixed role
      const payload = { ...data, role: "employee" };

      const res = await axios.post("http://localhost:8000/api/employee/createemployee", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "Employee created successfully");
      reset();
      navigate("/admin/allemployee");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating employee");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logout Successful");
    navigate("/admin/login");
  };

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

      {/* Add New Employee Form */}
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Add New Employee</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required", minLength: 6 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
            <input
              type="number"
              {...register("phoneNumber", {
                required: "Phone number is required",
                minLength: 10,
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Department</label>
            <input
              type="text"
              {...register("department", { required: "Department is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>}
          </div>

          {/* Position */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Position</label>
            <input
              type="text"
              {...register("position", { required: "Position is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Salary (₹)</label>
            <input
              type="number"
              {...register("salary", { required: "Salary is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-between gap-4 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg cursor-pointer"
            >
              Add Employee
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/allemployee")}
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCreateEmployee;
