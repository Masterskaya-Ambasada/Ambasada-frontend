import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// функция включения моков
async function enableMocking() {
  if (import.meta.env.VITE_USE_MSW === "true") {
    const { worker } = await import("./mocks/browser");

    return worker.start({
      onUnhandledRequest: "bypass", // реальные запросы не ломаются
    });
  }

  return Promise.resolve();
}

// ждём инициализацию MSW, потом рендерим приложение
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
