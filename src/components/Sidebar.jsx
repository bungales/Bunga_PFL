import { NavLink } from "react-router-dom";
import {
  MdDashboard, MdPeople, MdReceipt, MdNotifications,
  MdStar, MdLocalLaundryService, MdBarChart, MdSegment,
  MdFeedback, MdLogout
} from "react-icons/md";

const menuItems = [
  { id: "menu-dashboard", to: "/", label: "Dashboard", icon: <MdDashboard /> },
  { id: "menu-customers", to: "/customers", label: "Pelanggan", icon: <MdPeople /> },
  { id: "menu-transactions", to: "/transactions", label: "Transaksi", icon: <MdReceipt /> },
  { id: "menu-tracking", to: "/tracking", label: "Tracking Laundry", icon: <MdLocalLaundryService /> },
  { id: "menu-notifications", to: "/notifications", label: "Notifikasi", icon: <MdNotifications /> },
  { id: "menu-loyalty", to: "/loyalty", label: "Program Loyalitas", icon: <MdStar /> },
  { id: "menu-segmentation", to: "/segmentation", label: "Segmentasi", icon: <MdSegment /> },
  { id: "menu-feedback", to: "/feedback", label: "Feedback", icon: <MdFeedback /> },
  { id: "menu-reports", to: "/reports", label: "Laporan CRM", icon: <MdBarChart /> },
];

const menuClass = ({ isActive }) =>
  `relative flex cursor-pointer items-center px-6 py-3 font-medium text-sm transition-all group
  ${isActive
    ? "text-primary bg-blue-50/50 font-bold"
    : "text-[#202224] hover:bg-gray-50 hover:text-primary"}`;

export default function Sidebar() {
  return (
    <div id="sidebar" className="flex min-h-screen w-64 flex-col bg-white border-r border-gray-100 shadow-sm font-barlow">
      
      {/* Logo Section - Sekarang Menggunakan Gambar Asli */}
      <div id="sidebar-logo" className="px-6 py-8 flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl shadow-md">
           {/* Mengarahkan ke file logo di folder public/img/ */}
           <img 
             src="/img/logo Netto loundry.jpeg" 
             alt="Netto Laundry Logo" 
             className="w-full h-full object-cover"
           />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#202224]">
          <span className="text-primary font-poppins">Netto</span>Laundry
        </h1>
      </div>

      {/* Menu Utama */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto">
        <div className="px-6 mb-4 mt-2">
          <p className="text-[#202224] opacity-40 text-[11px] font-bold uppercase tracking-[2px]">
            Menu Utama
          </p>
        </div>
        
        <ul id="menu-list" className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink id={item.id} to={item.to} end={item.to === "/"} className={menuClass}>
                {({ isActive }) => (
                  <>
                    {/* Garis Vertikal Biru (Persis Foto DashStack) */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-r-full" />
                    )}
                    
                    <span className={`mr-3 text-xl transition-colors ${
                      isActive ? 'text-primary' : 'text-[#202224] opacity-70 group-hover:text-primary'
                    }`}>
                      {item.icon}
                    </span>
                    
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Profile & Logout */}
      <div id="sidebar-footer" className="p-4 border-t border-gray-50">
        <div className="flex items-center space-x-3 mb-4 px-2">
          <div className="relative">
            <img 
              src="https://avatar.iran.liara.run/public/1" 
              className="w-10 h-10 rounded-full border border-gray-100" 
              alt="admin" 
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-hijau border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#202224] text-sm font-bold truncate uppercase">Admin Netto</p>
            <p className="text-gray-400 text-[10px] truncate">Manajer Operasional</p>
          </div>
        </div>
        
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.href = "/login";
          }}
          className="w-full flex items-center px-4 py-2 text-gray-500 hover:text-merah text-sm font-medium transition-all rounded-xl hover:bg-red-50 group"
        >
          <MdLogout className="mr-3 text-xl group-hover:scale-110 transition-transform" /> 
          Keluar
        </button>
      </div>
    </div>
  );
}