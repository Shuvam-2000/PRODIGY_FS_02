import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

const EmployeeProfile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/employee/selfInfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data.user);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed fetching profile. Try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success('Logout SuccessFul')
    navigate("/employee/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center max-w-5xl mx-auto mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Hi, <span className="text-blue-600">{profile?.name || "Employee"}</span>
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 text-sm md:text-base text-white rounded-lg shadow cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center border border-gray-200">
        {/* Left: Info */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Profile Info</h3>
          <div className="space-y-3 text-gray-700 text-base md:text-lg">
            <p><span className="font-medium text-gray-900">Name:</span> {profile?.name}</p>
            <p><span className="font-medium text-gray-900">Email:</span> {profile?.email}</p>
            <p><span className="font-medium text-gray-900">Phone:</span> {profile?.phoneNumber}</p>
            <p><span className="font-medium text-gray-900">Department:</span> {profile?.department}</p>
            <p><span className="font-medium text-gray-900">Position:</span> {profile?.position}</p>
            <p><span className="font-medium text-gray-900">Salary:</span> ₹ {profile?.salary}</p>
          </div>

          <button
            onClick={() => navigate("/employee/profile-update")}
            className="mt-8 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-medium shadow cursor-pointer"
          >
            Update Profile
          </button>
        </div>

        {/* Right: Profile Icon */}
        <div className="flex justify-center md:justify-end">
          <UserCircle className="text-gray-300" size={180} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
