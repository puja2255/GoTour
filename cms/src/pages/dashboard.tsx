import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [placesCount, setPlacesCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    // Read count from localStorage dynamically
    const placesData = localStorage.getItem("places");
    if (placesData) {
      setPlacesCount(JSON.parse(placesData).length);
    } else {
      // Seed default
      const defaultPlaces = [
        { id: 1, name: "Candi Borobudur", location: "Magelang, Jawa Tengah" },
        { id: 2, name: "Pantai Kuta", location: "Badung, Bali" },
        { id: 3, name: "Gunung Bromo", location: "Probolinggo, Jawa Timur" },
      ];
      localStorage.setItem("places", JSON.stringify(defaultPlaces));
      setPlacesCount(defaultPlaces.length);
    }

    const eventsData = localStorage.getItem("events");
    if (eventsData) {
      setEventsCount(JSON.parse(eventsData).length);
    } else {
      // Seed default
      const defaultEvents = [
        { id: 1, name: "Bali Arts Festival", location: "Denpasar, Bali", date: "2026-06-15", price: "Gratis", status: "Akan Datang" },
        { id: 2, name: "Jazz Gunung Bromo", location: "Probolinggo, Jatim", date: "2026-07-20", price: "Rp 350.000", status: "Akan Datang" },
      ];
      localStorage.setItem("events", JSON.stringify(defaultEvents));
      setEventsCount(defaultEvents.length);
    }

    const usersData = localStorage.getItem("users");
    if (usersData) {
      setUsersCount(JSON.parse(usersData).length);
    } else {
      const defaultUsers = [
        { id: 1, name: "Ahmad Dani", role: "Tour Guide", email: "dani@gotour.com", status: "Aktif" },
        { id: 2, name: "Sarah Wijaya", role: "Tour Member", email: "sarah@gmail.com", status: "Aktif" },
        { id: 3, name: "Budi Santoso", role: "Admin", email: "budi@gotour.com", status: "Aktif" },
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
      setUsersCount(defaultUsers.length);
    }
  }, []);

  const stats = [
    {
      title: "Total Tempat Wisata",
      value: placesCount,
      trend: "+3.2%",
      trendUp: true,
      color: "var(--accent-blue)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
    },
    {
      title: "Event Berlangsung",
      value: eventsCount,
      trend: "+12.4%",
      trendUp: true,
      color: "var(--accent-purple)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
    },
    {
      title: "Pengguna & Pemandu",
      value: usersCount,
      trend: "+8.7%",
      trendUp: true,
      color: "var(--accent-cyan)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
    },
    {
      title: "Rating Wisata",
      value: "4.8",
      trend: "+0.2",
      trendUp: true,
      color: "var(--status-warning)",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--status-warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
  ];

  const categories = [
    { name: "Candi & Sejarah", count: 42, percentage: 85, color: "var(--accent-indigo)" },
    { name: "Pantai & Alam Bahari", count: 35, percentage: 70, color: "var(--accent-blue)" },
    { name: "Gunung & Hiking", count: 28, percentage: 55, color: "var(--accent-cyan)" },
    { name: "Seni & Kuliner Nusantara", count: 18, percentage: 38, color: "var(--accent-purple)" },
  ];

  const activities = [
    { id: 1, user: "Administrator", action: "Menambahkan tempat wisata baru: Candi Prambanan", time: "10 menit yang lalu", type: "place" },
    { id: 2, user: "Dani (Guide)", action: "Menyelesaikan tur di Gunung Bromo", time: "1 jam yang lalu", type: "tour" },
    { id: 3, user: "Sarah (Member)", action: "Mendaftar pada event 'Jazz Gunung Bromo'", time: "3 jam yang lalu", type: "event" },
    { id: 4, user: "System", action: "Pencadangan basis data mingguan berhasil diselesaikan", time: "12 jam yang lalu", type: "system" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* Welcome banner */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%)",
          border: "1px solid rgba(79, 70, 229, 0.2)",
          padding: "24px 30px",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "6px", color: "#fff" }}>
            Selamat Datang di GoTour Dashboard! ✈️
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", maxWidth: "600px" }}>
            Kelola destinasi wisata terbaik di Indonesia, koordinasikan acara seru, dan pantau aktivitas pengguna Anda dengan mudah dari satu pusat admin terpadu.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/places" className="btn-primary" style={{ padding: "10px 16px", fontSize: "0.85rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Tambah Tempat
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass-panel"
            style={{
              padding: "24px",
              borderRadius: "var(--radius-lg)",
              transition: "transform var(--transition-fast), border-color var(--transition-fast)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.borderColor = stat.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "var(--border-color)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                {stat.title}
              </span>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "10px",
                  background: `rgba(${stat.color === "var(--accent-blue)" ? "59, 130, 246" : stat.color === "var(--accent-purple)" ? "139, 92, 246" : stat.color === "var(--accent-cyan)" ? "6, 182, 212" : "245, 158, 11"}, 0.1)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
              <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{stat.value}</span>
              <span
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--status-success)",
                  background: "var(--status-success-bg)",
                  padding: "2px 8px",
                  borderRadius: "50px",
                }}
              >
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Activity Content */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px" }}>
        
        {/* Destination Category Popularity Panel */}
        <div className="glass-panel" style={{ padding: "26px", borderRadius: "var(--radius-lg)" }}>
          <div style={{ marginBottom: "22px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Kategori Tempat Terpopuler</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Persentase keterisian data destinasi berdasarkan peminat</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {categories.map((cat, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-main)" }}>{cat.name}</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)" }}>
                    {cat.count} Lokasi <span style={{ color: cat.color }}>({cat.percentage}%)</span>
                  </span>
                </div>
                <div style={{ height: "8px", background: "var(--bg-tertiary)", borderRadius: "100px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${cat.percentage}%`,
                      background: cat.color,
                      borderRadius: "100px",
                      boxShadow: `0 0 10px ${cat.color}`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Inline Graphic Circle */}
          <div
            style={{
              marginTop: "30px",
              padding: "16px",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              border: "1px dashed var(--border-color)",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "4px solid var(--accent-cyan)",
                borderTopColor: "transparent",
                animation: "spin 2s linear infinite",
                flexShrink: 0,
              }}
            ></div>
            <div>
              <h4 style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>Rekomendasi Pintar GoTour</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Destinasi <strong>Candi & Seni</strong> sedang naik tren sebesar 18% minggu ini.</p>
            </div>
          </div>
        </div>

        {/* Recent Activities Timeline Feed */}
        <div className="glass-panel" style={{ padding: "26px", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "22px" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Log Aktivitas Terkini</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Jejak audit tindakan sistem dan operasional admin</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
            {activities.map((act) => (
              <div key={act.id} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: act.type === "place" ? "var(--status-success-bg)" : act.type === "event" ? "rgba(139, 92, 246, 0.1)" : act.type === "tour" ? "rgba(6, 182, 212, 0.1)" : "rgba(255,255,255,0.05)",
                    border: `1px solid ${act.type === "place" ? "rgba(16, 185, 129, 0.2)" : act.type === "event" ? "rgba(139, 92, 246, 0.2)" : act.type === "tour" ? "rgba(6, 182, 212, 0.2)" : "rgba(255,255,255,0.1)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {act.type === "place" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path></svg>
                  ) : act.type === "event" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect></svg>
                  ) : act.type === "tour" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle></svg>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>{act.user}</span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{act.time}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{act.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}