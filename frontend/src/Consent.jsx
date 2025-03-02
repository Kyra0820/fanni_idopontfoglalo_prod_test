import React, { useEffect } from "react";
import "./Consent.css"; 

const Consent = () => {
  useEffect(() => {
          document.title = "Beleegyező nyilatkozat";
        }, []);
  return (
    <div class="consent-container">
    <h1>ONLINE BELEEGYEZŐ NYILATKOZAT</h1>
  
    <h2>Tetováló Stúdió Adatai</h2>
    <ul>
      <li><span class="highlight">Tetováló neve:</span> Horváth Fanni</li>
      <li><span class="highlight">Működési helyszín:</span> 9700 Szombathely, Kiskar utca 3</li>
      <li><span class="highlight">Kapcsolattartó:</span> +36 30 488 0886, innafaithtattoo@gmail.com</li>
      <li><span class="highlight">Adószám:</span> 68366362-1-38</li>
    </ul>
  
    <h2>1. Jogi Nyilatkozat</h2>
    <ol>
      <li>
        <span class="highlight">Jogosultság és életkor: </span>  
        Kijelentem, hogy betöltöttem a 18. életévemet, és jogi cselekvőképességgel rendelkezem. Elfogadom, hogy a tetoválás kizárólag 18 éven felüli személyek számára elérhető, és a szükséges személyazonosító okmányokat bemutattam.
      </li>
      <li>
        <span class="highlight">Egészségügyi Állapot Nyilatkozat: </span>
        <ul>
          <li>Nem szenvedek fertőző vagy bőrbetegségben (pl. herpesz, ekcéma, pikkelysömör).</li>
          <li>Nincs ismert allergiám a tetováló eszközökre vagy festékanyagokra.</li>
          <li>Nem állok véralvadásgátló gyógyszeres kezelés alatt.</li>
          <li>Nem vagyok terhes vagy szoptató anya.</li>
          <li>Teljes felelősséget vállalok az általam megadott információk pontosságáért.</li>
        </ul>
      </li>
      <li>
        <span class="highlight">Tudomásul vétel: </span>  
        Elfogadom, hogy a tetoválás során fájdalom, bőrpír, duzzanat, allergiás reakciók vagy más nem várt események előfordulhatnak. Ezek természetes velejárói lehetnek a tetoválási eljárásnak.
      </li>
    </ol>
  
    <h2>2. Utókezelési Nyilatkozat</h2>
    <ol>
      <li>
        <span class="highlight">Utókezelési utasítások betartása: </span>  
        A tetoválóm által adott utókezelési utasításokat maradéktalanul betartom. Tudomásul veszem, hogy:
        <ul>
          <li>Az utókezelés elmulasztása esetén fertőzés vagy bőrkárosodás léphet fel.</li>
          <li>A tetováló nem vállal felelősséget az utókezelési mulasztásból eredő komplikációkért.</li>
        </ul>
      </li>
      <li>
        <span class="highlight">Termékhasználat: </span>  
        Elfogadom, hogy kizárólag a tetováló által ajánlott utókezelési termékeket használom. Bármilyen más készítmény alkalmazása saját felelősségemre történik.
      </li>
    </ol>
  
    <h2>3. Felelősség Kizárása</h2>
    <ol>
      <li>
        <span class="highlight">Egészségügyi kockázatok: </span>  
        A tetováló nem felelős semmilyen, általam elhallgatott egészségügyi állapotból adódó problémáért.
      </li>
      <li>
        <span class="highlight">Esztétikai eredmény: </span>  
        Elfogadom, hogy a tetoválás egy művészeti forma, és a végeredmény szubjektív lehet. A tetováló előzetes konzultációt követően a lehető legjobb tudása szerint készíti el a mintát.
      </li>
      <li>
        <span class="highlight">Tetoválás eltávolítása: </span>  
        Tudomásul veszem, hogy a tetoválás eltávolítása költséges, fájdalmas, és nem minden esetben lehetséges teljes mértékben.
      </li>
    </ol>
  
    <h2>4. Adatkezelés és Fotók</h2>
    <ol>
      <li>
        <span class="highlight">Személyes adatok kezelése: </span>  
        Elfogadom, hogy a megadott személyes adataimat a tetováló a GDPR szabályoknak megfelelően kezeli. Adataimat kizárólag az időpont-egyeztetés és a szolgáltatás teljesítése céljából használják fel.
      </li>
      <li>
        <span class="highlight">Fényképek készítése: </span>  
        Beleegyezem, hogy a tetoválóm fényképeket készíthet a tetoválás elkészítése előtt, közben és után.
        <ul>
          <li>A képek marketing célú felhasználását (pl. közösségi média, weboldal) engedélyezem.</li>
          <li>A képek használatához bármikor visszavonhatom a beleegyezésemet.</li>
        </ul>
      </li>
    </ol>
  
    <h2>5. Időpont Lemondása</h2>
    <ol>
      <li>
        <span class="highlight">Lemondási feltételek:</span>  
        Tudomásul veszem, hogy az időpont lemondását legalább 48 órával előre kell jelezni. Ennek elmulasztása esetén az előleget nem térítik vissza.
      </li>
    </ol>
  
    <h2>6. Nyilatkozat Elfogadása</h2>
    <p>
      A fentieket elolvastam, megértettem, és maradéktalanul elfogadom. A nyilatkozat elfogadása önkéntesen történik, kényszerítés nélkül.
    </p>
    <div className="back-button-container">
    <button
        onClick={() => window.close()}
        style={{
          padding: "10px 20px",
          backgroundColor: "red",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Bezárás
      </button>
      </div>
    </div>)
};
export default Consent;
