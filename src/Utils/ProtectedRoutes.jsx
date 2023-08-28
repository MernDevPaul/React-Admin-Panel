import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from '../Utils/Cookies';
const ProtectedRoute = ({ children }) => {
  if (Cookies.get("is_admin") === true && Cookies.get("admin_token") !== "") {
    return <Navigate to="/" />;
  }
  if (!Cookies.get("is_admin") || !Cookies.get("admin_token")) {
    return <Navigate to="/login" />;
  }
  if (!Cookies.get("is_admin") && !Cookies.get("admin_token")) {
    return <Navigate to="/login" />;
  }
  if (Cookies.get("is_admin")===false || Cookies.get("admin_token")==="" || Cookies.get("admin_token")===null) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
