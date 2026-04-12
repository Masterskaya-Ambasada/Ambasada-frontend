import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./shared/styles/variables.css";
import "./shared/styles/commonStyles.css";
import "./shared/styles/reset.css";
import App from "./App.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
