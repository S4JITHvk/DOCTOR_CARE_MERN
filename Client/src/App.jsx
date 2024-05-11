import { Route, Routes } from 'react-router-dom';
import React from "react";
import UserRoute from "./Routes/userRoutes/UserRoute"
import AdminRoutes from "./Routes/adminRoutes/AdminRoutes";

function App() {
  return (
    <>
     <AdminRoutes />
     <UserRoute />
    </>
  );
}

export default App;
