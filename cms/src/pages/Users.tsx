import React, { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Tour Guide" | "Tour Member";
  status: "Aktif" | "Ditangguhkan";
  joined: string;
};

const ROLES = ["Admin", "Tour Guide", "Tour Member"] as const;

const USER_PRESETS = [
  {
    name: "Budi Santoso",
    email: "budi@gotour.com",
    role: "Admin" as const,
    status: "Aktif" as const,
    joined: "2024-11-05",
  },
  {
    name: "Ahmad Dani",
    email: "dani@gotour.com",
    role: "Tour Guide" as const,
    status: "Aktif" as const,
    joined: "2025-01-12",
  },
  {
    name: "Sarah Wijaya",
    email: "sarah@gmail.com",
    role: "Tour Member" as const,
    status: "Aktif" as const,
    joined: "2025-03-24",
  },
  {
    name: "Lisa Permata",
    email: "lisa.p@gotour.com",
    role: "Tour Guide" as const,
    status: "Ditangguhkan" as const,
    joined: "2025-02-18",
  },
];

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("Semua");

  // Load users
  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      setUsers(JSON.parse(data));
    } else {
      const initial: User[] = USER_PRESETS.map((usr, idx) => ({
        id: idx + 1,
        ...usr,
      }));
      localStorage.setItem("users", JSON.stringify(initial));
      setUsers(initial);
    }
  }, []);

  const saveToLocalStorage = (updatedUsers: User[]) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const toggleStatus = (id: number) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        const newStatus: "Aktif" | "Ditangguhkan" = u.status === "Aktif" ? "Ditangguhkan" : "Aktif";
        return { ...u, status: newStatus };
      }
      return u;
    });
    saveToLocalStorage(updated);
  };

  const changeRole = (id: number, role: User["role"]) => {
    const updated = users.map((u) => (u.id === id ? { ...u, role } : u));
    saveToLocalStorage(updated);
  };

  const deleteUser = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus akun ini?")) {
      const filtered = users.filter((u) => u.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  // Filter
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole = selectedRole === "Semua" || u.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            Kelola Pengguna & Pemandu
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            Kelola peran administrator, daftarkan pemandu wisata (tour guides) berlisensi, dan pantau status akun anggota pariwisata.
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
            placeholder="Cari pengguna berdasarkan nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "40px", height: "42px", fontSize: "0.9rem" }}
          />
        </div>

        {/* Role Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
            Peran:
          </span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{ width: "180px", height: "42px", fontSize: "0.9rem" }}
          >
            <option value="Semua">Semua Peran</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Pengguna</th>
              <th>Email</th>
              <th>Peran Akun</th>
              <th>Tanggal Bergabung</th>
              <th>Status</th>
              <th style={{ width: "200px", textAlign: "right" }}>Aksi Cepat</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  Tidak ada data pengguna yang terdaftar.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  {/* User Profile Cell */}
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: u.role === "Admin" ? "var(--accent-gradient)" : u.role === "Tour Guide" ? "rgba(6, 182, 212, 0.15)" : "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          color: u.role === "Admin" ? "#fff" : u.role === "Tour Guide" ? "var(--accent-cyan)" : "var(--text-main)",
                          fontSize: "0.85rem",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {u.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong style={{ color: "#fff", fontSize: "0.95rem" }}>{u.name}</strong>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span style={{ fontSize: "0.88rem", fontFamily: "monospace", color: "var(--text-muted)" }}>
                      {u.email}
                    </span>
                  </td>

                  {/* Role Selection Dropdown */}
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => changeRole(u.id, e.target.value as User["role"])}
                      style={{
                        height: "32px",
                        padding: "4px 8px",
                        fontSize: "0.8rem",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        width: "140px",
                      }}
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Date Joined */}
                  <td>
                    <span style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>{u.joined}</span>
                  </td>

                  {/* Status Badge */}
                  <td>
                    {u.status === "Aktif" ? (
                      <span className="badge badge-success">Aktif</span>
                    ) : (
                      <span className="badge badge-danger">Ditangguhkan</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        className="btn-secondary"
                        onClick={() => toggleStatus(u.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.8rem",
                          height: "32px",
                          display: "inline-flex",
                          alignItems: "center",
                          borderColor: u.status === "Aktif" ? "var(--status-warning)" : "var(--status-success)",
                          color: u.status === "Aktif" ? "var(--status-warning)" : "var(--status-success)",
                          background: "transparent",
                        }}
                      >
                        {u.status === "Aktif" ? "Tangguhkan" : "Aktifkan"}
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => deleteUser(u.id)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "var(--radius-sm)",
                          fontSize: "0.8rem",
                          height: "32px",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
