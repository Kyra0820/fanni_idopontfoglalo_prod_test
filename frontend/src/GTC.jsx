import React, { useEffect } from "react";
import "./GTC.css";

const GeneralTerms = () => {
  useEffect(() => {
            document.title = "ÁSZF";
          }, []);
  return (
    <div className="terms-container">
      <h1>Általános Szerződési Feltételek</h1>

      <h2>1. Bevezető</h2>
      <p>
        Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) tartalmazzák a
        szolgáltató és a szolgáltatást igénybe vevő (továbbiakban: Ügyfél)
        közötti jogviszony alapvető feltételeit.
      </p>

      <h2>2. Szolgáltató Adatai</h2>
      <ul>
        <li><span className="highlight">Szolgáltató neve:</span> Horváth Fanni</li>
        <li><span className="highlight">Székhely:</span> 9700 Szombathely, Kiskar utca 3</li>
        <li><span className="highlight">Kapcsolattartó:</span> +36 30 488 0886, innafaithtattoo@gmail.com</li>
        <li><span className="highlight">Adószám:</span> 68366362-1-38</li>
      </ul>

      <h2>3. Szerződés Létrejötte</h2>
      <ol>
        <li>
          A szerződés a felek közötti megállapodással, valamint a szolgáltatás
          igénybevételével jön létre.
        </li>
        <li>
          A szerződés kizárólag a jelen ÁSZF-ben foglaltak elfogadásával
          érvényes.
        </li>
      </ol>

      <h2>4. Szolgáltatás Tartalma</h2>
      <p>
        A szolgáltató tetoválásokat készít az ügyfél igényei alapján. Az
        ügyfélnek a szolgáltatás megkezdése előtt részletesen ismertetnie kell a
        kért mintát, elhelyezést és méretet.
      </p>

      <h2>5. Árak és Fizetési Feltételek</h2>
      <ul>
        <li>A szolgáltatás díjazása az előzetes egyeztetés során kerül meghatározásra.</li>
        <li>A fizetés történhet készpénzben vagy banki átutalással.</li>
        <li>Az előleg megfizetése kötelező, amely a végösszegből levonásra kerül.</li>
      </ul>

      <h2>6. Lemondás és Módosítás</h2>
      <p>
        Az időpont lemondása vagy módosítása legkésőbb 48 órával a megbeszélt
        időpont előtt lehetséges. Ennek elmulasztása esetén az előleget a
        szolgáltató nem téríti vissza.
      </p>

      <h2>7. Egészségügyi Nyilatkozat</h2>
      <p>
        Az ügyfél kijelenti, hogy nem szenved semmilyen olyan egészségügyi
        problémában, amely a tetoválás elkészítését akadályozná vagy veszélyeztetné.
      </p>

      <h2>8. Felelősség Kizárása</h2>
      <ol>
        <li>
          A szolgáltató nem vállal felelősséget az ügyfél által elhallgatott
          egészségügyi állapotokból eredő problémákért.
        </li>
        <li>
          A tetoválás végleges kinézete eltérhet az ügyfél által elképzelttől,
          mivel ez művészeti alkotás.
        </li>
      </ol>

      <h2>9. Adatvédelem</h2>
      <p>
        Az ügyfél személyes adatait a szolgáltató a GDPR szabályainak megfelelően
        kezeli.
      </p>

      <h2>10. Záró rendelkezések</h2>
      <p>
        Jelen ÁSZF hatálya kiterjed minden, a szolgáltató által nyújtott
        szolgáltatásra. Az ÁSZF módosításának jogát a szolgáltató fenntartja.
      </p>

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
  );
};

export default GeneralTerms;