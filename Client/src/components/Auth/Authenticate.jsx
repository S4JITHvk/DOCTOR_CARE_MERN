import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Authenticate() {
  const navigate = useNavigate();
  const user=useSelector((state)=>state.user)
   
  console.log(user.user,"==>user")
  useEffect(() => {
    if (user.user?.role === "ADMIN") {
      navigate("/admin");
    } else if (user.user?.role === "USER") {
      navigate("/home");
    }
  }, [user, navigate]);
  return <>{!user.user ? <Outlet /> : null}</>;
}