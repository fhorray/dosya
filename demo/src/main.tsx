import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DosyaProvider } from "@fhorray/dosya";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DosyaProvider>
      <App />
    </DosyaProvider>
  </StrictMode>
);
