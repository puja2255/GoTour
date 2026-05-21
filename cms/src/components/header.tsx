import React, { useState, useEffect } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 30px",
        height: "75px",
        borderBottom: "1px solid var(--border-color)",
        background: "rgba(21, 27, 44, 0.6)",
        backdropFilter: "blur(12px)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Search Input */}
      <div style={{ position: "relative", width: "300px" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="Cari destinasi, event, atau pengguna..."
          style={{
            paddingLeft: "40px",
            height: "38px",
            fontSize: "0.85rem",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "50px",
          }}
        />
      </div>

      {/* Right widgets */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        {/* Real-time Date and Time */}
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            {formattedDate}
          </span>
          <span
            style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--accent-cyan)",
              fontFamily: "monospace",
              letterSpacing: "0.5px",
            }}
          >
            {formattedTime}
          </span>
        </div>

        {/* Server Status Indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(16, 185, 129, 0.08)",
            border: "1px solid rgba(16, 185, 129, 0.15)",
            padding: "6px 12px",
            borderRadius: "50px",
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "var(--status-success)",
              borderRadius: "50%",
              boxShadow: "0 0 8px var(--status-success)",
            }}
          ></span>
          <span style={{ fontSize: "0.75rem", color: "var(--status-success)", fontWeight: 500 }}>
            Server Online
          </span>
        </div>

        {/* Notifications Icon with Glowing Pulse Badge */}
        <div
          style={{
            position: "relative",
            cursor: "pointer",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-main)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "9px",
              height: "9px",
              backgroundColor: "var(--status-danger)",
              borderRadius: "50%",
              boxShadow: "0 0 8px var(--status-danger)",
              border: "2px solid var(--bg-secondary)",
            }}
          ></span>
        </div>

        {/* Vertical divider */}
        <div style={{ width: "1px", height: "24px", background: "var(--border-color)" }}></div>

        {/* User Info Profile Widget */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ textAlign: "right" }}>
            <h4 style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "2px" }}>
              Administrator
            </h4>
            <span style={{ fontSize: "0.72rem", color: "var(--accent-purple)", fontWeight: 500 }}>
              Super Admin
            </span>
          </div>
          <div
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              color: "#fff",
              fontSize: "0.95rem",
              boxShadow: "0 0 10px rgba(79, 70, 229, 0.3)",
              border: "2px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            GT
            <span
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "10px",
                height: "10px",
                backgroundColor: "var(--status-success)",
                borderRadius: "50%",
                border: "2px solid var(--bg-secondary)",
              }}
            ></span>
          </div>
        </div>
      </div>
    </header>
  );
}
