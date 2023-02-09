import { UserAuth } from "../context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const ProtectedRoute = () => {
  const [userinfo] = UserAuth();

  if (userinfo.loading) {
    return (
      <div className="loading-container">
        <Skeleton
          className="loading-circle"
          variant="circular"
          width={80}
          height={80}
        >
        </Skeleton>
        <Skeleton variant="rectangular" width={300} height={25}>
          Loading...
        </Skeleton>
      </div>
    );
  }
  return userinfo.email ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
