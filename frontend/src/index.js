import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouteConfig from "./RouteConfig";

const root = ReactDOM.createRoot(document.getElementById("root")); // 🔹 `createRoot`
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  </React.StrictMode>
);

