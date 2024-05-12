import { Route, Routes } from 'react-router-dom';
import React from "react";
import UserRoute from "./Routes/userRoutes/UserRoute"
import AdminRoutes from "./Routes/adminRoutes/AdminRoutes";
import Protect from './components/Auth/Protect';

function App() {
  return (
    <>
    <Routes>
     <Route element={<Protect role="ADMIN"/>}>
          <Route path={"/admin/*"} element={<AdminRoutes />} />
     </Route>
     <Route path={"/*"} element={<UserRoute />} />
     </Routes>
    </>
  );
}

export default App;
