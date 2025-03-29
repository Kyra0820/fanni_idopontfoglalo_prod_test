import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./styles.css";
import "./Consent.css";
import logo from "./images/sketch1732705193768.png";
import background from "./images/sketch1736085284692.jpg";
import facebookIcon from "./images/facebook.png";
import instagramIcon from "./images/instagram.png";
import tiktokIcon from "./images/tik-tok.png";
import placeholderIcon from "./images/placeholder.png";

function App() {
  useEffect(() => {
    document.title = "InnaFaithTattoo";
  }, []);

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target.closest("form");

    if (!form.checkValidity()) {
      Swal.fire({
        icon: "warning",
        title: "Hiányzó adatok!",
        text: "Kérlek töltsd ki az összes kötelező mezőt.",
      });
      return;
    }



    const formData = new FormData(form);
    let userData = {};

    formData.forEach((value, key) => {
      if (key === "consent" || key === "terms") {
        userData[key] = form.querySelector(`[name="${key}"]`).checked;
      } else {
        userData[key] = value;
      }
    });

    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/appointment-selector");
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${background})` }}>
      <header className="header">
        <h1 className="header-title">INNA FAITH TATTOO</h1>
      </header>
      <main className="form-container">
        <h1 className="idopont">Időpontfoglalás</h1>
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Vezetéknév*
            <input type="text" name="last_name" required />
          </label>
          <label>
            Keresztnév*
            <input type="text" name="first_name" required />
          </label>
          <label>
            E-mail*
            <input type="email" name="email" required />
          </label>
          <label>
            Instagram
            <input type="text" name="instagram" />
          </label>
          <label>
            Telefonszám*
            <input type="tel" name="phone" required />
          </label>
          <label>
            Lakhely (város)*
            <input type="text" name="city" required />
          </label>
          <label>
            Életkor (csak 18 év felett)*
            <input type="number" name="age" min="18" required />
          </label>
          <label>
            Tetoválás minta*
            <input type="text" name="design" required />
          </label>
          <label>
            Az ötleted részletesen*
            <textarea name="ideaDetails" rows="4" required />
          </label>
          <label>
            Testrész*
            <input type="text" name="body_Part" required />
          </label>
          <label>
            Tetoválás színe*
            <div className="radio-group">
              <div className="radio-item">
                <input type="radio" name="color" value="blackWhite" required />
                <span>Fekete-fehér</span>
              </div>
              <div className="radio-item">
                <input type="radio" name="color" value="colorful" required />
                <span>Színes</span>
              </div>
            </div>
          </label>
          <label>
            Tetováltattál már nálam?*
            <div className="radio-group">
              <div className="radio-item">
                <input type="radio" name="previous" value="yes" required />
                <span>Igen</span>
              </div>
              <div className="radio-item">
                <input type="radio" name="previous" value="no" required />
                <span>Nem</span>
              </div>
            </div>
          </label>
          
          <div className="consent">
            <label>
              Elfogadom a Beleegyező Nyilatkozatot*
              <input type="checkbox" name="consent" required />
            </label>
            <label>
              Elfogadom az ÁSZF-et*
              <input type="checkbox" name="terms" required />
            </label>
          </div>

          <button type="submit" className="submit-btn">
            Tovább az időpontfoglaló felületre
          </button>
        </form>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <h3>
              Elérhetőség
              <span className="tooltip-container">
                <img src={placeholderIcon} alt="Location Icon" className="location-icon" />
                <span className="tooltip-text">9700 Szombathely, Kiskar utca 3</span>
              </span>
            </h3>
            <p>
              <a href="mailto:innafaithtattoo@gmail.com" className="footer-link">
                innafaithtattoo@gmail.com
              </a>
            </p>
            <a href="tel:+36 30 488 0886" className="footer-link">
              +36 30 488 0886
            </a>
            <p>
              <Link to="/gtc" className="footer-link" target="_blank">
                Általános Szerződési Feltételek
              </Link>
            </p>
            <p>
              <Link to="/consent" className="footer-link" target="_blank">
                Beleegyező Nyilatkozat
              </Link>
            </p>
          </div>

          <div className="footer-center">
            <h3>Kövess Be</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/mikann001" target="_blank" rel="noopener noreferrer">
                <img src={facebookIcon} alt="Facebook" />
              </a>
              <a href="https://www.instagram.com/inna.faith.tattoo/" target="_blank" rel="noopener noreferrer">
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a href="https://www.tiktok.com/@inna.faith.tattoo" target="_blank" rel="noopener noreferrer">
                <img src={tiktokIcon} alt="TikTok" />
              </a>
            </div>
          </div>

          <div className="footer-right">
            <img src={logo} alt="Inna Faith Tattoo Logo" className="logo" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
