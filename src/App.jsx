import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

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
import UserForm from "./pages/UserForm";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/type" element={<ExpenseType />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/form" element={<UserForm />} />
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
