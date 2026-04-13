import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App";

// функция включения моков
async function enableMocking() {
  const shouldMock =
    import.meta.env.DEV && import.meta.env.VITE_USE_MSW === "true";

  if (!shouldMock) return;

  const { worker } = await import("./mocks/browser");

  return worker.start({
    onUnhandledRequest: "bypass",
  });
}

// ждём инициализацию MSW, потом рендерим приложение
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
