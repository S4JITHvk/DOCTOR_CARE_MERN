import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const UsersList = lazy(() => import("../../components/Admin/UsersList"));
const DoctorsList = lazy(() => import("../../components/Admin/DoctorsList"));
const ApprovalsList = lazy(() => import("../../components/Admin/Approvals"));
const AppointmentsList = lazy(() => import("../../components/Admin/Appointments"));
import Siderbar from "../../Pages/Admin/AdminHome"
import Adminhead from "../../components/Admin/Adminhead"
const AdminDash = lazy(() => import("../../components/Admin/AdminDash"));

function AdminRoutes() {
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <div
          className="col-span-2 bg-background sticky left-0 h-screen overflow-auto shadow-md z-10"
        >
          <Siderbar />
        </div>
        <div className="col-span-10">
          <div className="col-span-12 sticky top-0 z-10 bg-background shadow-md">
            <Adminhead />
          </div>
          <div className="col-span-12 ">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<AdminDash />} />
                <Route path="/userList" element={<UsersList />} />
                <Route path="/doctors" element={<DoctorsList />} />
                <Route path="/approvals" element={<ApprovalsList />} />
                <Route path="/appointments" element={<AppointmentsList />} />              
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRoutes;
