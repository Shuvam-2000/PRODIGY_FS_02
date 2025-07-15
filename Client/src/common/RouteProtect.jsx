import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef } from "react";

const ProtectRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const hasShownToast = useRef(false);

  if (!token) {
    if (!hasShownToast.current) {
      toast.error("You are required to login");
      hasShownToast.current = true;
    }

    // Dynamically decide which login page to show
    if (allowedRoles.includes("admin")) {
      return <Navigate to="/admin/login" />;
    } else if (allowedRoles.includes("employee")) {
      return <Navigate to="/employee/login" />;
    } else {
      return <Navigate to="/" />; // Fallback
    }
  }

  if (!allowedRoles.includes(role)) {
    if (!hasShownToast.current) {
      toast.error("Access Denied");
      hasShownToast.current = true;
    }

    // Redirect to correct login page if role doesn't match
    if (allowedRoles.includes("admin")) {
      return <Navigate to="/admin/login" />;
    } else if (allowedRoles.includes("employee")) {
      return <Navigate to="/employee/login" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  return children;
};

export default ProtectRoute;
