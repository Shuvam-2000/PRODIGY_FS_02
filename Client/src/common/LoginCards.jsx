import { LogIn, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginCards = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-30 bg-gray-100 flex flex-col items-center justify-start py-10 px-4">
      {/* Heading */}
      <h1 className="sm:text-4xl text-xl font-bold text-gray-800 mb-10 text-center">
        Employee Management System
      </h1>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {/* Employee Login Card */}
        <div
          onClick={() => navigate("/employee/login")}
          className="w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 flex flex-col items-center justify-center"
        >
          <LogIn className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">
            Employee Login
          </h2>
        </div>

        {/* Admin Login Card */}
        <div
          onClick={() => navigate("/admin/login")}
          className="w-72 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6 flex flex-col items-center justify-center"
        >
          <UserCog className="h-12 w-12 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Admin Login</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginCards;
