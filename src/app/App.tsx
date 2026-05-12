import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./providers/router";
import { QueryProvider } from "./providers/query/QueryProvider";
//import { useTranslation } from "react-i18next"

function App() {
  // const { t } = useTranslation("common");
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
