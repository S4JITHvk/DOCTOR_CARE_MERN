import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types"
import { useSelector } from "react-redux";

export default function Authprotect({ role }) {
  const doctor = useSelector((state) => state.doctor);
  const token = Cookies.get("doctortoken");
  console.log(doctor.data,"==>doctortoken",role,token)
  const isAuth = token && doctor?.data && doctor.data?.role === role || false;
  console.log(isAuth,"===>auth")
  return <>{isAuth ? <Outlet /> : <Navigate to="/doctor/login" />}</>;
}

Authprotect.propTypes = {
  role: PropTypes.string.isRequired,
};