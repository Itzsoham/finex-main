import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/TopBar";

function AppLayout() {
  return (
    <>
      <Sidebar />
      <main className="content">
        <Topbar />
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
