import "@shared/config/i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../shared/styles/variables.css";
import "../shared/styles/reset.css";
import "../shared/styles/commonStyles.css";
import App from "./App";

async function enableMocking() {
  console.log("[MSW] init check...");

  if (!import.meta.env.DEV || import.meta.env.VITE_USE_MSW !== "true") {
    console.log("[MSW] skipped by env");
    return;
  }

  const { worker } = await import("../mocks/browser");

  console.log("[MSW] starting worker...");

  await worker.start({
    serviceWorker: {
      url: "/mockServiceWorker.js",
    },
    onUnhandledRequest: "bypass",
  });

  console.log("[MSW] worker started");
}

(async () => {
  await enableMocking();

  console.log("[APP] render");

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
})();
