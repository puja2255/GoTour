import { useState, useEffect } from "react";

type Place = {
  id: number;
  name: string;
  location: string;
};

export default function Places() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("places");
    if (data) setPlaces(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  const savePlace = () => {
    if (!name || !location) return alert("Isi semua field");

    if (editId) {
      setPlaces(
        places.map((p) =>
          p.id === editId ? { ...p, name, location } : p
        )
      );
      setEditId(null);
    } else {
      setPlaces([
        ...places,
        { id: Date.now(), name, location }
      ]);
    }

    setName("");
    setLocation("");
  };

  const editPlace = (p: Place) => {
    setName(p.name);
    setLocation(p.location);
    setEditId(p.id);
  };

  const deletePlace = (id: number) => {
    setPlaces(places.filter((p) => p.id !== id));
  };

 return (
  <div style={{ fontFamily: "Arial" }}>
    <h2 style={{ marginBottom: 20 }}>Kelola Tempat Wisata</h2>

    {/* Form */}
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 20,
        background: "#f5f5f5",
        padding: 15,
        borderRadius: 8,
      }}
    >
      <input
        placeholder="Nama Tempat Wisata"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: 10, flex: 1 }}
      />
      <input
        placeholder="Lokasi"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ padding: 10, flex: 1 }}
      />
      <button
        onClick={savePlace}
        style={{
          padding: "10px 20px",
          background: "#1976d2",
          color: "white",
          border: "none",
          borderRadius: 6,
        }}
      >
        {editId ? "Update" : "Tambah"}
      </button>
    </div>

    {/* Table */}
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: "white",
      }}
    >
      <thead style={{ background: "#1976d2", color: "white" }}>
        <tr>
          <th style={{ padding: 12 }}>Nama Tempat</th>
          <th style={{ padding: 12 }}>Lokasi</th>
          <th style={{ padding: 12 }}>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {places.map((p) => (
          <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: 12 }}>{p.name}</td>
            <td style={{ padding: 12 }}>{p.location}</td>
            <td style={{ padding: 12 }}>
              <button
                onClick={() => editPlace(p)}
                style={{ marginRight: 8 }}
              >
                Edit
              </button>
              <button
                onClick={() => deletePlace(p.id)}
                style={{ background: "red", color: "white", border: "none", padding: "6px 10px", borderRadius: 4 }}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}