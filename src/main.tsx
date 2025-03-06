import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DosyaProvider } from "./providers/dosya-provider.tsx";
import { DosyaConfig } from "./types.ts";

const config = {
  defaultView: "grid",
  baseUrl: "/baseurl",
  defaultFolder: "/defaultFolder",
} satisfies DosyaConfig;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DosyaProvider config={config}>
      <App />
    </DosyaProvider>
  </StrictMode>
);
