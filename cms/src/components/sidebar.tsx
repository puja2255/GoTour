import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "200px",
        height: "100vh",
        background: "#222",
        color: "#fff",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/" style={{ color: "#fff" }}>Dashboard</Link>
        </li>
        <li>
          <Link to="/places" style={{ color: "#fff" }}>Places</Link>
        </li>
        <li>
          <Link to="/users" style={{ color: "#fff" }}>Users</Link>
        </li>
      </ul>
    </div>
  );
}