import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", data);
      const token = response.data.token;
      const role = data.role;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        toast.success(response.data.message || "Login Successful");
        navigate("/admin/allemployee");
        reset();
      } else {
        toast.error("Token not found in response");
      }
    } catch (error) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4 relative">
      {/* Go Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium cursor-pointer">Go Back</span>
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-gray-200"
      >
        <div className="flex flex-col items-center mb-6">
          <p className="text-3xl font-mono font-bold text-gray-800">Admin Login</p>
          <div className="w-12 h-1 bg-[#f21c1c] mt-2 rounded-full" />
        </div>

        {/* Email Field */}
        <input
          type="text"
          className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter Your Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}

        {/* Password Field */}
        <input
          type="password"
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter Your Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}

        {/* Role Dropdown */}
        <select
          className={`w-full mt-4 px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f21c1c] ${
            errors.role ? "border-red-500" : "border-gray-300"
          }`}
          {...register("role", { required: "Role is required" })}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-[#f21c1c] hover:bg-red-600 transition-all text-white font-semibold py-3 rounded-lg cursor-pointer"
        >
          Login
        </button>
        {/* Admin Register Link */}
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            New Admin Register Here: {" "}
            <span
              onClick={() => navigate("/admin/signup")}
              className="text-[#f21c1c] cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
