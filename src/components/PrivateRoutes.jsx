import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const admin = useSelector((state) => state.admin);

  return admin.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
