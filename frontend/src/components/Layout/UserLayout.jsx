import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";
import Kunu from "../Common/Kunu";

const UserLayout = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
