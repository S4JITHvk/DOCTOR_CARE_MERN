import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
const UsersList = lazy(() => import("../../components/Admin/UsersList"));
const  DoctorsList = lazy(() => import("../../components/Admin/DoctorsList"));
const ApprovalsList = lazy(() => import("../../components/Admin/Approvals"));
const AppointmentsList = lazy(() => import("../../components/Admin/Appointments"));
const   Siderbar = lazy(() => import("../../Pages/Admin/AdminHome"));
const Adminhead=lazy(()=>import("../../components/Admin/Adminhead"))
const AdminDash=lazy(()=>import("../../components/Admin/AdminDash"))
function AdminRoutes() {
  return (
    <>
    <div className="grid grid-cols-12 h-screen bg-background">
    <div className="col-span-2 text-text">
      <Siderbar/>
    </div>
    <div className="col-span-10">
    <div className="col-span-12 ">
    <Adminhead />
    </div>
    <Suspense fallback={<Loader />}>
      <Routes>  
        <Route path="/" element={<AdminDash/>} />
        <Route path="/userList" element={<UsersList />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/approvals" element={<ApprovalsList />} />
        <Route path="/appointments" element={<AppointmentsList />} />
      </Routes>
      </Suspense>
    </div>
    </div>
    </>
  );
}

export default AdminRoutes;
