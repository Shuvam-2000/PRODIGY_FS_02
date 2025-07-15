import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const AdminRegister = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        data
      );
      const token = response.data.token;
      const role = response.data?.user?.role;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        toast.success(
          response.data.message || "Admin registered successfully!"
        );
        reset();
        navigate("/admin/allemployee");
      } else {
        toast.error("Token not found in response");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="max-w-2xl w-full bg-white p-10 rounded-2xl shadow-2xl border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Admin Registration Form
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Phone Number */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              {...register("phoneNumber")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Department */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              {...register("department")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Position */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              {...register("position")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Salary */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Salary (₹)
            </label>
            <input
              type="number"
              {...register("salary")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Role */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Role</label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg cursor-pointer"
            >
              Register
            </button>
          </div>
          {/* Already registered link */}
          <div className="col-span-1 md:col-span-2 text-center text-sm mt-2">
            Already registered?{" "}
            <Link
              to="/admin/login"
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
