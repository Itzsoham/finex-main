import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Topbar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Team from "./pages/Team";
import ExpenseType from "./pages/ExpenseType";
import Expense from "./pages/Expense";
import Faq from "./pages/Faq";
import Calendar from "./pages/Calendar";
import Bar from "./pages/Bar";
import Line from "./pages/Line";
import Pie from "./pages/Pie";
import ExpenseEntry from "./pages/ExpenseEntry";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ToastContainer />
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/type" element={<ExpenseType />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/add" element={<ExpenseEntry />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
