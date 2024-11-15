import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ExpenseFilterProvider } from "../features/expense/ExpenseFilterContext";

function AppLayout() {
  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <ExpenseFilterProvider>
          <Outlet />
        </ExpenseFilterProvider>
      </main>
    </>
  );
}

export default AppLayout;
