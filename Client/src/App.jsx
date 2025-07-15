import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoginCards from "./common/LoginCards";
import AdminLogin from "./admin/AdminLogin";
import AdminSignUp from "./admin/AdminSignUp";
import AllEmployeePage from "./admin/AllEmployeePage";
import EmployeeDetailPage from "./admin/EmployeeDetailPage";
import AdminEmployeeUpdate from "./admin/AdminEmployeeUpdate";
import EmployeeLogin from "./employee/EmployeeLogin";
import EmployeeProfile from "./employee/EmployeeProfile";
import EmployeeProfileUpdate from "./employee/EmployeeProfileUpdate";
import AdminCreateEmployee from "./admin/AdminCreateEmployee";
import ProtectRoute from "./common/RouteProtect";
import "./index.css";

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Common Route */}
          <Route path="/" element={<LoginCards />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route
            path="/admin/allemployee"
            element={
              <ProtectRoute allowedRoles={["admin"]}>
                <AllEmployeePage />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/employee-detail/:id"
            element={
              <ProtectRoute allowedRoles={["admin"]}>
                <EmployeeDetailPage />
              </ProtectRoute>
            }
          />
          <Route
            path="/admin/employee-update/:id"
            element={
              <ProtectRoute allowedRoles={["admin"]}>
                <AdminEmployeeUpdate />
              </ProtectRoute>
            }
          />
          <Route
            path="admin/create-employee"
            element={
              <ProtectRoute allowedRoles={["admin"]}>
                <AdminCreateEmployee />
              </ProtectRoute>
            }
          />

          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route
            path="/employee/profile"
            element={
              <ProtectRoute allowedRoles={["employee"]}>
                <EmployeeProfile />
              </ProtectRoute>
            }
          />
          <Route
            path="/employee/profile-update"
            element={
              <ProtectRoute allowedRoles={["employee"]}>
                <EmployeeProfileUpdate />
              </ProtectRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
