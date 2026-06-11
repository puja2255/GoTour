import React, { useState, useEffect } from "react";

type TravelEvent = {
  id: number;
  name: string;
  location: string;
  date: string;
  price: string;
  status: "Akan Datang" | "Berlangsung" | "Selesai";
  image: string;
  description: string;
};

const STATUSES = ["Akan Datang", "Berlangsung", "Selesai"] as const;

const EVENT_PRESETS = [
  {
    name: "Bali Arts Festival 2026",
    location: "Denpasar, Bali",
    date: "2026-06-15",
    price: "Gratis",
    status: "Akan Datang" as const,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Festival tahunan seni budaya Bali terbesar, menampilkan parade tarian, musik tradisional, dan pameran kerajinan.",
  },
  {
    name: "Jazz Gunung Bromo 2026",
    location: "Probolinggo, Jawa Timur",
    date: "2026-07-20",
    price: "Rp 350.000",
    status: "Akan Datang" as const,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    description: "Pertunjukan musik jazz bertaraf internasional di amfiteater terbuka berlatar pemandangan pegunungan Bromo yang megah.",
  },
];

export default function Events() {
  const [events, setEvents] = useState<TravelEvent[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");

  const formatDateIndo = (dateStr: string) => {
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return dateStr;
      return dateObj.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  // Load events
  useEffect(() => {
    const data = localStorage.getItem("events");
    if (data) {
      setEvents(JSON.parse(data));
    } else {
      const initial: TravelEvent[] = EVENT_PRESETS.map((ev, idx) => ({
        id: idx + 1,
        ...ev,
      }));
      localStorage.setItem("events", JSON.stringify(initial));
      setEvents(initial);
    }
  }, []);

  // Filter
  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.name.toLowerCase().includes(search.toLowerCase()) ||
      ev.location.toLowerCase().includes(search.toLowerCase()) ||
      (ev.description && ev.description.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = selectedStatus === "Semua" || ev.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (s: TravelEvent["status"]) => {
    switch (s) {
      case "Akan Datang":
        return <span className="badge badge-warning">Akan Datang</span>;
      case "Berlangsung":
        return <span className="badge badge-success">Berlangsung</span>;
      case "Selesai":
        return <span className="badge badge-danger">Selesai</span>;
      default:
        return <span className="badge">{s}</span>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: "flex", justifySelf: "normal", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
          Info Event Pariwisata
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
          Lihat informasi event pariwisata yang tersedia.
        </p>
        </div>
        
      </div>

      {/* Filter and Search Bar */}
      <div
        className="glass-panel"
        style={{
          display: "flex",
          gap: "16px",
          padding: "16px 20px",
          borderRadius: "var(--radius-lg)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", flex: 1, minWidth: "260px" }}>
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
            placeholder="Cari event pariwisata berdasarkan nama, deskripsi, lokasi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "40px", height: "42px", fontSize: "0.9rem" }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
            Status:
          </span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ width: "180px", height: "42px", fontSize: "0.9rem" }}
          >
            <option value="Semua">Semua Status</option>
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Cards Grid */}
      {filteredEvents.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: "50px",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="1"
            style={{ marginBottom: "16px", opacity: 0.5 }}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <h4>Belum Ada Event</h4>
          <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>Silakan tambahkan event pariwisata baru untuk memulai.</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className="glass-panel"
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform var(--transition-fast), border-color var(--transition-fast)",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-md)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "var(--accent-purple)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              {/* Event poster image */}
              <div
                style={{
                  height: "180px",
                  backgroundImage: `url(${ev.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                {/* Floating indicators */}
                <div style={{ position: "absolute", top: "14px", left: "14px" }}>
                  {getStatusBadge(ev.status)}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "14px",
                    right: "14px",
                    background: "rgba(11, 15, 25, 0.8)",
                    backdropFilter: "blur(4px)",
                    padding: "4px 10px",
                    borderRadius: "50px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--accent-cyan)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {ev.price}
                </div>
              </div>

              {/* Event details content */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, gap: "12px" }}>
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{ev.name}</h4>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                      </svg>
                      {formatDateIndo(ev.date)}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      </svg>
                      {ev.location}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.5,
                    flex: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {ev.description || "Tidak ada deskripsi rinci untuk event ini."}
                </p>

                {/* Event actions button footer */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "8px",
                    borderTop: "1px solid var(--border-color)",
                    paddingTop: "14px",
                    marginTop: "6px",
                  }}
                >
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
