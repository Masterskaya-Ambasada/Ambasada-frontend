import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../shared/styles/variables.css";
import "../shared/styles/reset.css";
import "../shared/styles/commonStyles.css";
import "./styles/index.css";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("../shared/mocks/");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
