import React, { useEffect, useState } from "react";
import "./AdminPage.css"; 
import background from "./images/sketch1736085284692.jpg"; 
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AdminPage() {
   useEffect(() => {
        document.title = "Adminisztrációs oldal";
      }, []);
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);     
  const [newTimeSlot, setNewTimeSlot] = useState("");  
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/appointments/");
      const data = await res.json();
      if (data.appointments) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); 
    window.location.href = "/login";
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setTimeSlots([]);
  };

  const handleAddTimeSlot = () => {
    if (newTimeSlot && !timeSlots.includes(newTimeSlot)) {
      setTimeSlots((prev) => [...prev, newTimeSlot]);
      setNewTimeSlot("");
    }
  };

  const handleRemoveTimeSlot = (slot) => {
    setTimeSlots(timeSlots.filter((t) => t !== slot));
  };

  const handleSubmitTimeslots = async () => {
    if (!selectedDate) {
      Swal.fire("Hiba", "Válassz egy dátumot!", "error");
      return;
    }
    try {
      const response = await fetch("/api/save-time-slots/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          time_slots: timeSlots,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire("Siker!", "Időpontok sikeresen mentve!", "success");
        setSelectedDate("");
        setTimeSlots([]);
      } else {
        Swal.fire("Hiba", data.error, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Hálózati hiba", "Próbáld újra!", "error");
    }
  };

  const handlePaidChange = async (appointmentId, newPaidValue) => {
    try {
      const response = await fetch(
        `/api/appointments/${appointmentId}/update/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paid: newPaidValue }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAppointments((prev) =>
          prev.map((ap) =>
            ap.id === appointmentId ? { ...ap, paid: newPaidValue } : ap
          )
        );
        Swal.fire("Siker!", "Foglaló állapot módosítva.", "success");
      } else {
        Swal.fire("Hiba", data.error, "error");
      }
    } catch (error) {
      Swal.fire("Hiba", "Nem sikerült frissíteni az adatokat.", "error")
    }
  };

  const handleTattooedChange = async (appointmentId, newTattooedValue) => {
    if (newTattooedValue === true) {
      try {
        const response = await fetch(
          `/api/appointments/${appointmentId}/update/`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tattooed: true }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAppointments((prev) => prev.filter((ap) => ap.id !== appointmentId));
          Swal.fire("Siker!", "Az időpont törölve lett.", "success");
        } else {
          Swal.fire("Hiba", data.error, "error");
        }
      } catch (error) {
        console.error("Error deleting appointment:", error);
      }
    } else {
      Swal.fire("Hiba", "Nem sikerült törölni az időpontot.", "error");
    }
  };

  return (
    <div
      className="admin-page-wrapper"
      style={{
        paddingTop: "40px", 
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
        <div className="button-container">
          <button className="logout-button" onClick={handleLogout}>
            Kijelentkezés
          </button>

          <button 
            className="view-timeslots-button"
            onClick={() => navigate("/timeslots")}
          >
            Szabad időpontok megtekintése
          </button>
        </div>

      <div
        className="admin-container"
        style={{
          margin: "0 auto",
          maxWidth: "500px",
          backgroundColor: "#978274",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          marginBottom: "40px",
        }}
      >
        <h1 style={{ color: "#ffffff", textAlign: "center" }}>
          Adminisztrációs felület
        </h1>
        <div className="form-group">
          <label style={{ color: "#ffffff" }}>Dátum kiválasztása:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "#ffffff" }}>Új időpont hozzáadása:</label>
          <input
            type="time"
            value={newTimeSlot}
            onChange={(e) => setNewTimeSlot(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          />
          <button
            type="button"
            onClick={handleAddTimeSlot}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Hozzáadás
          </button>
          <button
            type="button"
            onClick={handleSubmitTimeslots}
            style={{
              backgroundColor: "#5cb85c",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Mentés
          </button>
        </div>
        <div className="time-slots-list" style={{ marginTop: "20px" }}>
          <h3 style={{ color: "#ffffff" }}>Szabad időpontok:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {timeSlots.map((slot, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "10px",
                  marginBottom: "5px",
                  borderRadius: "4px",
                  color: "#ffffff",
                }}
              >
                {slot}
                <button
                  type="button"
                  onClick={() => handleRemoveTimeSlot(slot)}
                  style={{
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Törlés
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="appointments-container"
        style={{
          margin: "0 auto",
          maxWidth: "800px",
          backgroundColor: "#978274",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          marginBottom: "40px",
          maxHeight: "400px",
          overflowY: "auto",
        }}
      >
        <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>
          Foglalások
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", color: "#fff", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #fff", padding: "8px" }}>
                  Vezetéknév
                </th>
                <th style={{ borderBottom: "2px solid #fff", padding: "8px" }}>
                  Keresztnév
                </th>
                <th style={{ borderBottom: "2px solid #fff", padding: "8px" }}>
                  E-mail
                </th>
                <th style={{ borderBottom: "2px solid #fff", padding: "8px" }}>
                  Telefon
                </th>
                <th style={{ borderBottom: "2px solid #fff", padding: "8px" }}>
                  Foglalt idő
                </th>
                <th style={{ borderBottom: "2px solid #fff", padding: "8px" }}>
                  Foglaló
                </th>
                <th style={{ borderBottom: "2px solid #fff", padding: "8px" }}>
                  Tetovált?
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((ap) => (
                <tr key={ap.id}>
                  <td style={{ borderBottom: "1px solid #fff", padding: "8px" }}>
                    {ap.last_name}
                  </td>
                  <td style={{ borderBottom: "1px solid #fff", padding: "8px" }}>
                    {ap.first_name}
                  </td>
                  <td style={{ borderBottom: "1px solid #fff", padding: "8px" }}>
                    {ap.email}
                  </td>
                  <td style={{ borderBottom: "1px solid #fff", padding: "8px" }}>
                    {ap.phone}
                  </td>
                  <td style={{ borderBottom: "1px solid #fff", padding: "8px" }}>
                    {ap.reserved ? (
                      new Date(ap.reserved).toLocaleString("hu-HU", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    ) : (
                      "Nincs lefoglalva"
                    )}
                  </td>
                  <td style={{ borderBottom: "1px solid #fff", padding: "8px" }}>
                    <input
                      type="checkbox"
                      checked={ap.paid}
                      onChange={(e) => handlePaidChange(ap.id, e.target.checked)}
                    />
                  </td>
                  <td style={{ borderBottom: "1px solid #fff", padding: "8px" }}>
                    <input
                      type="checkbox"
                      onChange={(e) => handleTattooedChange(ap.id, e.target.checked)}
                      checked={false} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
