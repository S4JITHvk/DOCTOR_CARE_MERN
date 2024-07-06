import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Siderbar from "../../Pages/Admin/AdminHome";
import Adminhead from "../../components/Admin/Adminhead";
const UsersList = lazy(() => import("../../components/Admin/UsersList"));
const DoctorsList = lazy(() => import("../../components/Admin/DoctorsList"));
const ApprovalsList = lazy(() => import("../../components/Admin/Approvals"));
const AppointmentsList = lazy(() => import("../../components/Admin/BookingList"));
const AdminDash = lazy(() => import("../../components/Admin/AdminDash"));
const Cancelled_booking = lazy(() =>import("../../components/Admin/CancelBookings"));

function AdminRoutes() {
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="w-2/12 bg-background sticky left-0 top-0 h-full shadow-md z-10">
          <Siderbar />
        </div>
        <div className="w-10/12 flex flex-col">
          <div className="sticky top-0 z-10 bg-background shadow-md">
            <Adminhead />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<AdminDash />} />
                <Route path="/userList" element={<UsersList />} />
                <Route path="/doctors" element={<DoctorsList />} />
                <Route path="/approvals" element={<ApprovalsList />} />
                <Route path="/appointments" element={<AppointmentsList />} />
                <Route path="/cancelled_bookings" element={<Cancelled_booking />}/>
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRoutes;
