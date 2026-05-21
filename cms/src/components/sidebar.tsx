import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      ),
    },
    {
      name: "Places",
      path: "/places",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
    },
    {
      name: "Events",
      path: "/events",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
    },
    {
      name: "Users",
      path: "/users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 110,
      }}
    >
      {/* Brand logo section */}
      <div
        style={{
          padding: "24px 30px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid var(--border-color)",
          height: "75px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "var(--accent-gradient)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-glow)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.5 12H16c-.7 0-1.3-.4-1.6-1L12.5 7c-.6-1.2-2.4-1.2-3 0L7.6 11c-.3.6-.9 1-1.6 1H2.5"></path>
          </svg>
        </div>
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text-main)" }}>
            Go<span style={{ color: "var(--accent-blue)" }}>Tour</span>
          </h2>
          <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 700 }}>
            Admin Center
          </span>
        </div>
      </div>

      {/* Navigation menu list */}
      <div style={{ flex: 1, padding: "30px 18px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <span
          style={{
            fontSize: "0.7rem",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "var(--text-muted)",
            letterSpacing: "1px",
            paddingLeft: "12px",
            marginBottom: "8px",
          }}
        >
          Main Navigation
        </span>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "12px 16px",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.92rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#fff" : "var(--text-muted)",
                    background: isActive ? "rgba(79, 70, 229, 0.15)" : "transparent",
                    border: isActive ? "1px solid rgba(79, 70, 229, 0.3)" : "1px solid transparent",
                    transition: "all var(--transition-fast)",
                    boxShadow: isActive ? "0 4px 12px rgba(79, 70, 229, 0.1)" : "none",
                  }}
                  className="nav-link"
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-main)";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <span style={{ color: isActive ? "var(--accent-blue)" : "inherit" }}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                  {isActive && (
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: "var(--accent-blue)",
                        boxShadow: "0 0 6px var(--accent-blue)",
                      }}
                    ></span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer / User Profile Summary */}
      <div
        style={{
          padding: "20px 24px",
          borderTop: "1px solid var(--border-color)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "var(--status-success)",
              boxShadow: "0 0 6px var(--status-success)",
            }}
          ></div>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>v1.2.0 (Stable)</span>
        </div>
      </div>
    </div>
  );
}