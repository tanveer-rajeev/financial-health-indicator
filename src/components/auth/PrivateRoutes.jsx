import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let authToken = localStorage.getItem("profile");

  console.log(authToken);
  return authToken ? <Outlet /> : <Navigate to="/auth" />;
};
export default PrivateRoutes;
