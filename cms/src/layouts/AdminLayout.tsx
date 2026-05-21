import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflowY: "auto",
          background: "var(--bg-primary)",
        }}
      >
        {/* Dynamic header */}
        <Header />

        {/* Dynamic content outlet */}
        <main style={{ flex: 1, padding: "30px 40px", overflowY: "auto" }} className="animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}