import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "./images/sketch1736085284692.jpg";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Siker!",
          text: "Sikeres bejelentkezés!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.setItem("loggedIn", "true");
          navigate("/admin");
        });
      } else {
        Swal.fire({
          title: "Hiba!",
          text: data.error || "Hibás bejelentkezési adatok!",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Hálózati hiba!",
        text: "Nem sikerült csatlakozni a szerverhez.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div
      className="admin-page-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
      }}
    >
      <div
        className="admin-container"
        style={{
          width: "90%",
          maxWidth: "450px",
          backgroundColor: "rgba(151, 130, 116, 0.95)",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <h1 style={{ color: "#fff", fontSize: "24px", marginBottom: "20px" }}>
          Bejelentkezés
        </h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <label style={{ color: "#ffffff", fontSize: "18px", textAlign: "left" }}>
            Felhasználónév
            <input
              type="text"
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                borderRadius: "6px",
                marginTop: "5px",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label style={{ color: "#ffffff", fontSize: "18px", textAlign: "left" }}>
            Jelszó
            <input
              type="password"
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.6)",
                borderRadius: "6px",
                marginTop: "5px",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            style={{
              padding: "12px",
              fontSize: "18px",
              backgroundColor: "#fff",
              color: "#978274",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
          >
            Belépés
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
