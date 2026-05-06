import { NavLink } from "react-router-dom";
import {
  MdDashboard, MdPeople, MdReceipt, MdNotifications,
  MdStar, MdLocalLaundryService, MdBarChart, MdSegment,
  MdFeedback, MdLogout
} from "react-icons/md";

const menuItems = [
  { id: "menu-dashboard", to: "/", label: "Dashboard", icon: <MdDashboard className="mr-3 text-xl" /> },
  { id: "menu-customers", to: "/customers", label: "Pelanggan", icon: <MdPeople className="mr-3 text-xl" /> },
  { id: "menu-transactions", to: "/transactions", label: "Transaksi", icon: <MdReceipt className="mr-3 text-xl" /> },
  { id: "menu-tracking", to: "/tracking", label: "Tracking Laundry", icon: <MdLocalLaundryService className="mr-3 text-xl" /> },
  { id: "menu-notifications", to: "/notifications", label: "Notifikasi", icon: <MdNotifications className="mr-3 text-xl" /> },
  { id: "menu-loyalty", to: "/loyalty", label: "Program Loyalitas", icon: <MdStar className="mr-3 text-xl" /> },
  { id: "menu-segmentation", to: "/segmentation", label: "Segmentasi", icon: <MdSegment className="mr-3 text-xl" /> },
  { id: "menu-feedback", to: "/feedback", label: "Feedback", icon: <MdFeedback className="mr-3 text-xl" /> },
  { id: "menu-reports", to: "/reports", label: "Laporan CRM", icon: <MdBarChart className="mr-3 text-xl" /> },
];

const menuClass = ({ isActive }) =>
  `flex cursor-pointer items-center rounded-xl px-4 py-3 font-medium text-sm transition-all
  ${isActive
    ? "bg-white text-primary font-bold shadow-sm"
    : "text-blue-100 hover:bg-blue-700 hover:text-white"}`;

export default function Sidebar() {
  return (
    <div id="sidebar" className="flex min-h-screen w-64 flex-col bg-primary p-6 shadow-xl">
      {/* Logo */}
      <div id="sidebar-logo" className="flex justify-center mb-8">
        <img src="/img/logo Netto loundry.jpeg" alt="Netto Laundry" className="w-36 h-auto object-contain" />
      </div>

      {/* Menu */}
      <div id="sidebar-menu" className="flex-1">
        <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-3">Menu Utama</p>
        <ul id="menu-list" className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <NavLink id={item.id} to={item.to} end={item.to === "/"} className={menuClass}>
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div id="sidebar-footer" className="mt-auto pt-6 border-t border-blue-600">
        <div className="flex items-center space-x-3 mb-4">
          <img src="https://avatar.iran.liara.run/public/1" className="w-10 h-10 rounded-full border-2 border-white" alt="admin" />
          <div>
            <p className="text-white text-sm font-semibold">Admin</p>
            <p className="text-blue-200 text-xs">admin@nettolaundry.com</p>
          </div>
        </div>
        <NavLink
          to="/login"
          onClick={() => localStorage.removeItem("isLoggedIn")}
          className="flex items-center text-blue-200 hover:text-white text-sm transition-colors"
        >
          <MdLogout className="mr-2 text-lg" /> Keluar
        </NavLink>
      </div>
    </div>
  );
}
