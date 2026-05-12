import { useState, useEffect } from "react";

type Place = {
  id: number;
  name: string;
  location: string;
};

export default function App() {
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
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🌴 CMS Data Wisata</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Nama Tempat Wisata"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: 10, padding: 8 }}
        />
        <input
          placeholder="Lokasi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginRight: 10, padding: 8 }}
        />
        <button onClick={savePlace} style={{ padding: "8px 15px" }}>
          {editId ? "Update" : "Tambah"}
        </button>
      </div>

      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Nama Tempat</th>
            <th>Lokasi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {places.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.location}</td>
              <td>
                <button onClick={() => editPlace(p)}>Edit</button>
                <button onClick={() => deletePlace(p.id)} style={{ marginLeft: 10 }}>
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