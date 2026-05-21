import React, { useState, useEffect } from "react";

type Place = {
  id: number;
  name: string;
  location: string;
  category: string;
  rating: number;
  image: string;
  description: string;
};

const CATEGORIES = [
  "Candi & Sejarah",
  "Pantai & Bahari",
  "Gunung & Alam",
  "Seni & Kuliner Nusantara",
  "Lain-lain",
];

const PRESETS = [
  {
    name: "Candi Borobudur",
    location: "Magelang, Jawa Tengah",
    category: "Candi & Sejarah",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&w=800&q=80",
    description: "Candi Buddha terbesar di dunia yang merupakan salah satu mahakarya arsitektur kuno nusantara.",
  },
  {
    name: "Pantai Kuta",
    location: "Badung, Bali",
    category: "Pantai & Bahari",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    description: "Pantai berpasir putih legendaris yang menjadi ikon pariwisata Bali dengan sunset terindah.",
  },
  {
    name: "Gunung Bromo",
    location: "Probolinggo, Jawa Timur",
    category: "Gunung & Alam",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602192102148-bd1d9c9b46d0?auto=format&fit=crop&w=800&q=80",
    description: "Gunung berapi aktif legendaris yang menawarkan lautan pasir berkabut luas dan matahari terbit magis.",
  },
];

export default function Places() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Modal form states
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [rating, setRating] = useState(5.0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  // Load places on mount
  useEffect(() => {
    const data = localStorage.getItem("places");
    if (data) {
      setPlaces(JSON.parse(data));
    } else {
      // Seed initial mock places with all advanced properties
      const initial: Place[] = PRESETS.map((p, idx) => ({
        id: idx + 1,
        ...p,
      }));
      localStorage.setItem("places", JSON.stringify(initial));
      setPlaces(initial);
    }
  }, []);

  // Sync back to localStorage
  const saveToLocalStorage = (updatedPlaces: Place[]) => {
    localStorage.setItem("places", JSON.stringify(updatedPlaces));
    setPlaces(updatedPlaces);
  };

  const openAddModal = () => {
    setEditId(null);
    setName("");
    setLocation("");
    setCategory(CATEGORIES[0]);
    setRating(5.0);
    setImage("");
    setDescription("");
    setShowModal(true);
  };

  const openEditModal = (p: Place) => {
    setEditId(p.id);
    setName(p.name);
    setLocation(p.location);
    setCategory(p.category);
    setRating(p.rating);
    setImage(p.image);
    setDescription(p.description);
    setShowModal(true);
  };

  const deletePlace = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus tempat wisata ini?")) {
      const filtered = places.filter((p) => p.id !== id);
      saveToLocalStorage(filtered);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location) {
      alert("Mohon isi Nama Tempat dan Lokasi!");
      return;
    }

    const fallbackImage = image.trim() || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";

    if (editId) {
      // Edit
      const updated = places.map((p) =>
        p.id === editId
          ? {
              ...p,
              name,
              location,
              category,
              rating: Number(rating),
              image: fallbackImage,
              description,
            }
          : p
      );
      saveToLocalStorage(updated);
    } else {
      // Add
      const newPlace: Place = {
        id: Date.now(),
        name,
        location,
        category,
        rating: Number(rating),
        image: fallbackImage,
        description,
      };
      saveToLocalStorage([...places, newPlace]);
    }
    setShowModal(false);
  };

  // Filter logic
  const filteredPlaces = places.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = selectedCategory === "Semua" || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
      {/* Page Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
            Kelola Tempat Wisata
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            Tambahkan, ubah, atau hapus destinasi wisata unggulan GoTour.
          </p>
        </div>
        <button className="btn-primary" onClick={openAddModal}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Tambah Tempat Baru
        </button>
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
            placeholder="Cari berdasarkan nama, lokasi, atau deskripsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "40px", height: "42px", fontSize: "0.9rem" }}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500, whiteSpace: "nowrap" }}>
            Kategori:
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ width: "200px", height: "42px", fontSize: "0.9rem" }}
          >
            <option value="Semua">Semua Kategori</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Places Data Table */}
      <div className="table-container animate-fade-in">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>Gambar</th>
              <th>Nama Wisata</th>
              <th>Kategori</th>
              <th>Lokasi</th>
              <th style={{ width: "100px" }}>Rating</th>
              <th style={{ width: "150px", textAlign: "right" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlaces.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--text-muted)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ marginBottom: "12px", opacity: 0.5 }}
                  >
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                    <line x1="7" y1="2" x2="7" y2="22"></line>
                    <line x1="17" y1="2" x2="17" y2="22"></line>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                  </svg>
                  <div>Tidak ada destinasi wisata yang cocok dengan pencarian Anda.</div>
                </td>
              </tr>
            ) : (
              filteredPlaces.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div
                      style={{
                        width: "60px",
                        height: "44px",
                        borderRadius: "var(--radius-sm)",
                        backgroundImage: `url(${p.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    ></div>
                  </td>
                  <td>
                    <div>
                      <strong style={{ color: "#fff", fontSize: "0.95rem" }}>{p.name}</strong>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-muted)",
                          marginTop: "3px",
                          maxWidth: "320px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.description || "Tidak ada deskripsi."}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-info">{p.category}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.88rem" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      </svg>
                      {p.location}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--status-warning)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>{p.rating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px" }}>
                      <button
                        className="btn-secondary"
                        onClick={() => openEditModal(p)}
                        style={{ padding: "6px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", height: "32px", display: "inline-flex", alignItems: "center" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => deletePlace(p.id)}
                        style={{ padding: "6px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", height: "32px", display: "inline-flex", alignItems: "center" }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
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

      {/* Floating Overlay Modal Form */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          className="animate-fade-in"
        >
          <div
            className="glass-panel animate-scale"
            style={{
              width: "100%",
              maxWidth: "580px",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid rgba(255,255,255,0.12)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid var(--border-color)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: 700 }}>
                {editId ? "Ubah Tempat Wisata" : "Tambah Tempat Wisata"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                  borderRadius: "50%",
                  transition: "var(--transition-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <form onSubmit={handleSave} style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {/* Name */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>Nama Wisata</label>
                  <input
                    type="text"
                    placeholder="Contoh: Candi Prambanan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                {/* Location & Category (Two columns) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>Lokasi</label>
                    <input
                      type="text"
                      placeholder="Contoh: Sleman, Yogyakarta"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>Kategori</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rating & Image (Two columns) */}
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1.0"
                      max="5.0"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      required
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>URL Gambar (Wisata)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg (Kosongkan untuk default)"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                </div>

                {/* Description */}
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)" }}>Deskripsi</label>
                  <textarea
                    rows={3}
                    placeholder="Tulis ringkasan penjelasan destinasi wisata ini..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ resize: "vertical" }}
                  />
                </div>
              </div>

              {/* Form Actions Footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "12px",
                  marginTop: "30px",
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "20px",
                }}
              >
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>
                  Batalkan
                </button>
                <button type="submit" className="btn-primary">
                  {editId ? "Simpan Perubahan" : "Tambahkan Destinasi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}