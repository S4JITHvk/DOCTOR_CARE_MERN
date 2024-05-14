import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types"
import { useSelector } from "react-redux";

export default function Protect({ role }) {
  const user = useSelector((state) => state.user);
  const token = Cookies.get("token");
  const isAuth = token && user?.user && user.user?.role === role || false;
  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
}

Protect.propTypes = {
  role: PropTypes.string.isRequired,
};