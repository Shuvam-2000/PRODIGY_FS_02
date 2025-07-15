import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

const EmployeeProfileUpdate = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  // fetch the default data from the backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/employee/selfInfo", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { name, email, phoneNumber } = res.data.user;
        setValue("name", name);
        setValue("email", email);
        setValue("phoneNumber", phoneNumber);
      } catch (err) {
        toast.error("Failed to load profile.", err);
      }
    };
    fetchProfile();
  }, [setValue]);

  // update the profile info
  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("http://localhost:8000/api/employee/selfupdate", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message || "Profile Updated!");
      navigate("/employee/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Update failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success('Logout SuccessFul')
    navigate("/employee/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6">
      {/* Top Bar */}
      <div className="flex justify-end items-center max-w-5xl mx-auto mb-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 text-sm md:text-base text-white rounded-lg shadow cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Update Form Card */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-12 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Update Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Phone Number</label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 mt-10">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg cursor-pointer"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/employee/profile")}
              className="w-full bg-gray-300 hover:bg-gray-400 transition text-gray-800 font-semibold py-3 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfileUpdate;
