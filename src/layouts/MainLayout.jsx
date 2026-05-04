import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="bg-latar min-h-screen flex">
      <div className="flex flex-row flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <div className="flex-1 p-6 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
