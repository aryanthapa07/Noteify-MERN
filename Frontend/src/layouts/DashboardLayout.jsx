import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
