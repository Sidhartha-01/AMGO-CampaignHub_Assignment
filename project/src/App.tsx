import { BrowserRouter } from "react-router-dom";
import AppRouters from "./routes/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
  );
}

export default App;
