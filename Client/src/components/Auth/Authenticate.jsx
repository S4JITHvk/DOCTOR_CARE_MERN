import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Authenticate() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isAuthenticated) {
      if (user.user?.role === "ADMIN") {
        navigate("/admin");
      } else if (user.user?.role === "USER" ) {
        navigate("/home");
      }
    }
  }, [user.isAuthenticated, user.user?.role]);

  return user.isAuthenticated ? null : <Outlet />;
}
