import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types"
import { useSelector } from "react-redux";

export default function Authprotect({ role }) {
  const doctor = useSelector((state) => state.doctor);
  const token = Cookies.get("doctortoken");
  const isAuth = token && doctor?.doctor&& doctor.doctor?.role === role || false;
  console.log(isAuth,"isauth")
  return <>{isAuth ? <Outlet /> : <Navigate to="/doctor/login" />}</>;
}

Authprotect.propTypes = {
  role: PropTypes.string.isRequired,
};