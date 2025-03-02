import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import "./AppointmentSelector.css";
import background from "./images/sketch1736085284692.jpg";
import Swal from "sweetalert2";

const monthNames = [
  "január",
  "február",
  "március",
  "április",
  "május",
  "június",
  "július",
  "augusztus",
  "szeptember",
  "október",
  "november",
  "december",
];

function AppointmentSelector() {
  useEffect(() => {
          document.title = "Időpontfoglalás";
        }, []);
  const [timeSlots, setTimeSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(
    () => JSON.parse(localStorage.getItem("selectedAppointment")) || null
  );
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonthIndex = new Date().getMonth();
    return currentMonthIndex + 1;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/time-slots/")
      .then((response) => response.json())
      .then((data) => {
        if (data.time_slots) {
          const groupedSlots = {};
          data.time_slots.forEach((slot) => {
            const [year, month, day] = slot.date.split("-");
            const monthNumber = parseInt(month, 10);

            if (!groupedSlots[monthNumber]) {
              groupedSlots[monthNumber] = {};
            }
            if (!groupedSlots[monthNumber][day]) {
              groupedSlots[monthNumber][day] = [];
            }

            groupedSlots[monthNumber][day].push(slot.time);
          });
          setTimeSlots(groupedSlots);
        }
      })
      .catch((error) => console.error("Error fetching time slots:", error));
  }, []);

  const handleSlotSelect = (month, day, time) => {
    const year = new Date().getFullYear();
    const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

    const selectedAppointment = {
      date: formattedDate,
      time: time,
    };

    console.log("Selected Date & Time:", selectedAppointment);

    localStorage.setItem("selectedAppointment", JSON.stringify(selectedAppointment));
    setSelectedSlot(selectedAppointment);
  };

  const handleSubmit = () => {
    if (!selectedSlot) {
      Swal.fire("Hiba", "Válassz ki egy időpontot!", "error");
      return;
    }
  
    setIsSubmitting(true);
  
    const storedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
    storedUserData.date = selectedSlot.date;
    storedUserData.time = selectedSlot.time;
  
    fetch("/api/appointment/create/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storedUserData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setTimeSlots((prevSlots) => {
            const updatedSlots = { ...prevSlots };
            const [month, day] = selectedSlot.date.split("-");
            const dayKey = String(parseInt(day, 10));
  
            if (
              updatedSlots[parseInt(month, 10)] &&
              updatedSlots[parseInt(month, 10)][dayKey]
            ) {
              updatedSlots[parseInt(month, 10)][dayKey] = updatedSlots[
                parseInt(month, 10)
              ][dayKey].filter((t) => t !== selectedSlot.time);
  
              if (updatedSlots[parseInt(month, 10)][dayKey].length === 0) {
                delete updatedSlots[parseInt(month, 10)][dayKey];
              }
            }
            return updatedSlots;
          });
  
          Swal.fire({
            title: "Siker!",
            text: "Időpont sikeresen mentve! Kérlek ellenőrizd az email fiókodat.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            const successUrl = `${window.location.origin}/success.html`; // Teljes URL
            window.location.href = successUrl;
          });                   
        } else {
          setIsSubmitting(false);
          Swal.fire("Hiba", "Hiba történt a foglalás során.", "error");
        }
      })
      .catch((error) => {
        console.error("Booking error:", error);
        setIsSubmitting(false);
        Swal.fire("Hiba", "Nem sikerült elmenteni az időpontot. Próbáld újra.", "error");
      });
};



  return (
    <div
      className="admin-container"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        className="form-container"
        style={{
          backgroundColor: "#978274",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#ffffff" }}>Elérhető Időpontok 2025</h1>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            marginBottom: "20px",
          }}
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index + 1}>
              {name}
            </option>
          ))}
        </select>

        {timeSlots[selectedMonth] && Object.keys(timeSlots[selectedMonth]).length > 0 ? (
          Object.keys(timeSlots[selectedMonth]).map((day) => {
            const year = 2025;
            const dayDate = `${year}-${String(selectedMonth).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            return (
              <div key={day} style={{ marginBottom: "10px" }}>
                <h3 style={{ color: "#ffffff" }}>{day}. nap</h3>
                <div className="appointment-list">
                  {timeSlots[selectedMonth][day].map((slotTime, index) => {
                    const isSelected =
                      selectedSlot &&
                      selectedSlot.date === dayDate &&
                      selectedSlot.time === slotTime;

                    return (
                      <button
                        key={index}
                        className="appointment-item"
                        onClick={() => handleSlotSelect(selectedMonth, day, slotTime)}
                        style={{
                          border: "2px solid white",
                          backgroundColor: isSelected ? "green" : "transparent",
                          color: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          margin: "5px",
                        }}
                      >
                        {slotTime}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ color: "#ffffff" }}>Nincs elérhető időpont.</p>
        )}

        <button
          type="button"
          className="submit-btn"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Foglalás megerősítése
        </button>
      </div>
    </div>
  );
}

export default AppointmentSelector;
