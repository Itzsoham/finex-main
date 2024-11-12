import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { lazy, Suspense } from "react";

import Dashboard from "./pages/Dashboard";
import Line from "./pages/Line";
import Pie from "./pages/Pie";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/Spinner";

const Team = lazy(() => import("./pages/Team"));
const ExpenseType = lazy(() => import("./pages/ExpenseType"));
const Expense = lazy(() => import("./pages/Expense"));
const Faq = lazy(() => import("./pages/Faq"));
const ExpenseEntry = lazy(() => import("./pages/ExpenseEntry"));
const ExpenseSummery = lazy(() => import("./pages/ExpenseSummery"));

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
              <Route
                path="/team"
                element={
                  <Suspense
                    fallback={
                      <div className="spinner">
                        <Spinner />
                      </div>
                    }
                  >
                    <Team />
                  </Suspense>
                }
              />
              <Route
                path="/type"
                element={
                  <Suspense
                    fallback={
                      <div className="spinner">
                        <Spinner />
                      </div>
                    }
                  >
                    <ExpenseType />
                  </Suspense>
                }
              />
              <Route
                path="/expense"
                element={
                  <Suspense
                    fallback={
                      <div className="spinner">
                        <Spinner />
                      </div>
                    }
                  >
                    <Expense />
                  </Suspense>
                }
              />
              <Route
                path="/summery"
                element={
                  <Suspense
                    fallback={
                      <div className="spinner">
                        <Spinner />
                      </div>
                    }
                  >
                    <ExpenseSummery />
                  </Suspense>
                }
              />
              <Route
                path="/add"
                element={
                  <Suspense
                    fallback={
                      <div className="spinner">
                        <Spinner />
                      </div>
                    }
                  >
                    <ExpenseEntry />
                  </Suspense>
                }
              />
              <Route
                path="/faq"
                element={
                  <Suspense
                    fallback={
                      <div className="spinner">
                        <Spinner />
                      </div>
                    }
                  >
                    <Faq />
                  </Suspense>
                }
              />
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
