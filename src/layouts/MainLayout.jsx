import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="bg-latar min-h-screen flex font-barlow">
      {/* Sidebar tetap di kiri */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header di atas */}
        <Header />
        
        {/* Konten Dashboard dengan padding yang pas */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}