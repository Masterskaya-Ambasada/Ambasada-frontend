import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
//import { useTranslation } from "react-i18next";

function App() {
// const { t } = useTranslation("common");
  return (
    <BrowserRouter>
      <AppRouter />
  </BrowserRouter>
  )
}

export default App;