import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DosyaProvider } from "./providers/dosya-provider.tsx";
import { DosyaConfig } from "./store.ts";

const config = {
  defaultView: "list",
  baseUrl: "/baseurl",
  defaultFolder: "/defaultFolder",
} satisfies DosyaConfig;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DosyaProvider
      config={{
        defaultView: config.defaultView,
        baseUrl: config.baseUrl,
        defaultFolder: config.defaultFolder,
      }}
    >
      <App />
    </DosyaProvider>
  </StrictMode>
);
