import { Route, Routes } from "react-router-dom";
import React from "react";
import UserRoute from "./Routes/userRoutes/UserRoute";
import Protect from "./components/Auth/Protect";
import { Toaster } from "react-hot-toast";
import Doctorroute from "./Routes/DoctorRoutes/Doctorroute";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoute";
function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route element={<Protect role="ADMIN" />}>
          <Route path={"/admin/*"} element={<AdminRoutes />} />
        </Route>
        <Route path={"/*"} element={<UserRoute />} />
        <Route path={"/doctor/*"} element={<Doctorroute />} />
      </Routes>
    </>
  );
}

export default App;
