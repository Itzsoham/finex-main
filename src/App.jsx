import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Line from "./pages/Line";
import Pie from "./pages/Pie";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Team from "./pages/Team";
import ExpenseType from "./pages/ExpenseType";
import Expense from "./pages/Expense";
import ExpenseSummery from "./pages/ExpenseSummery";
import ExpenseEntry from "./pages/ExpenseEntry";
import Faq from "./pages/Faq";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <ToastContainer />
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/type" element={<ExpenseType />} />
              <Route path="/expense" element={<Expense />} />
              <Route path="/summery" element={<ExpenseSummery />} />
              <Route path="/add" element={<ExpenseEntry />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/line" element={<Line />} />
              <Route path="/pie" element={<Pie />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
