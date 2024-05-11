import { Routes, Route, Navigate } from "react-router-dom";
import UsersList from "../../components/Admin/UsersList";
import DoctorsList from "../../components/Admin/DoctorsList";
import ApprovalsList from "../../components/Admin/Approvals";
import AppointmentsList from "../../components/Admin/Appointments";
import Dashboard from "../../Pages/Admin/AdminDash";

function AdminRoutes() {
  return (
    <div>
      <Dashboard />
      <Routes>
        <Route path="/admin/userList" element={<UsersList />} />
        <Route path="/admin/doctors" element={<DoctorsList />} />
        <Route path="/admin/approvals" element={<ApprovalsList />} />
        <Route path="/admin/appointments" element={<AppointmentsList />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
