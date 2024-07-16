import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types"
import { useSelector } from "react-redux";

export default function Protect({ role }) {
  const user = useSelector((state) => state.user);
  const isAuth =  user?.user && user.user?.role === role && user.user?.is_banned!==true || false; 
  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
}

Protect.propTypes = {
  role: PropTypes.string.isRequired,
};