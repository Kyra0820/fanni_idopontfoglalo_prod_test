import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./Timeslots.css";
import Swal from "sweetalert2";

const monthNames = [
  "január", "február", "március", "április", "május", "június",
  "július", "augusztus", "szeptember", "október", "november", "december"
];

const Timeslots = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [availableSlots, setAvailableSlots] = useState({});
  const [deleteMode, setDeleteMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/time-slots/")
      .then((response) => response.json())
      .then((data) => {
        if (data.time_slots) {
          const groupedSlots = {};

          data.time_slots.forEach((slot) => {
            const [year, month, day] = slot.date.split("-");
            const monthNumber = parseInt(month, 10);
            const dayNumber = parseInt(day, 10);

            if (!groupedSlots[monthNumber]) {
              groupedSlots[monthNumber] = {};
            }
            if (!groupedSlots[monthNumber][dayNumber]) {
              groupedSlots[monthNumber][dayNumber] = [];
            }

            groupedSlots[monthNumber][dayNumber].push(slot.time);
          });

          setAvailableSlots(groupedSlots);
        }
      })
      .catch((error) => {
        Swal.fire("Hiba", "Nem sikerült lekérdezni az időpontokat!", "error");
        console.error("Error fetching time slots:", error);
      });
  }, []);

  const exportToExcel = () => {
    let data = [];

    Object.keys(availableSlots).forEach((month) => {
      Object.keys(availableSlots[month])
        .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
        .forEach((day) => {
          availableSlots[month][day]
            .sort((a, b) => a.localeCompare(b))
            .forEach((time) => {
              data.push({
                "Hónap": monthNames[month - 1],
                "Nap": `${day}.`,
                "Időpont": time,
              });
            });
        });
    });

    if (data.length === 0) {
      Swal.fire("Figyelem", "Nincs elérhető időpont az exporthoz!", "info");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Szabad időpontok");

    XLSX.writeFile(wb, "szabad_idopontok.xlsx");
    Swal.fire("Siker", "Az időpontokat tartalmazó Excel fájl letöltődött!", "success");
  };

  const handleDeleteSlot = (day, time) => {
    Swal.fire({
      title: "Biztosan törölni szeretnéd?",
      text: `${day}. nap, ${time} időpont törlése.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Igen, törlöm!",
      cancelButtonText: "Mégse",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("api/delete-time-slot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: `${new Date().getFullYear()}-${selectedMonth}-${day}`, time }),
        })
          .then((response) => response.json())
          .then(() => {
            Swal.fire("Törölve!", "Az időpont sikeresen törölve lett.", "success");
            setAvailableSlots((prevSlots) => {
              const updatedSlots = { ...prevSlots };
              updatedSlots[selectedMonth][day] = updatedSlots[selectedMonth][day].filter((t) => t !== time);
              if (updatedSlots[selectedMonth][day].length === 0) {
                delete updatedSlots[selectedMonth][day];
              }
              return updatedSlots;
            });
          })
          .catch((error) => {
            Swal.fire("Hiba", "Nem sikerült törölni az időpontot!", "error");
            console.error("Error deleting time slot:", error);
          });
      }
    });
  };

  return (
    <div className="timeslots-page">
      <div className="button-container">
        <button className="export-button" onClick={exportToExcel}>
          📥 Excel exportálás
        </button>
        <button className="delete-button" onClick={() => setDeleteMode(!deleteMode)}>
          {deleteMode ? "❌ Törlés leállítása" : "🗑️ Időpont kiválasztása törlésre"}
        </button>
        <button className="back-button" onClick={() => navigate("/admin")}>
          ⬅️ Vissza az admin oldalra
        </button>
      </div>

      <div className="timeslots-container">
        <h1 className="timeslots-title">Szabad időpontok</h1>

        <select
          className="timeslots-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index + 1}>
              {name}
            </option>
          ))}
        </select>

        <div className="timeslot-list">
          {availableSlots[selectedMonth] &&
          Object.keys(availableSlots[selectedMonth]).length > 0 ? (
            Object.keys(availableSlots[selectedMonth])
              .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
              .map((day) => (
                <div key={day}>
                  <h3 className="timeslot-day">{day}. nap</h3>
                  <p>
                    {availableSlots[selectedMonth][day]
                      .sort((a, b) => a.localeCompare(b))
                      .map((slotTime, index) => (
                        <span
                          key={index}
                          className={`timeslot-time ${deleteMode ? "deletable" : ""}`}
                          onClick={() => deleteMode && handleDeleteSlot(day, slotTime)}
                        >
                          {slotTime}
                        </span>
                      ))}
                  </p>
                </div>
              ))
          ) : (
            <p className="timeslot-day">Ebben a hónapban nincsenek szabad időpontok.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeslots;
