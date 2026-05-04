import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { SlSettings } from "react-icons/sl";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <div id="header-container" className="flex justify-between items-center p-4 bg-white border-b border-garis sticky top-0 z-10">
      {/* Search */}
      <div id="search-bar" className="relative w-full max-w-md">
        <input
          id="search-input"
          type="text"
          placeholder="Cari pelanggan, transaksi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-garis p-2 pr-10 bg-latar w-full rounded-xl outline-none text-sm text-teks placeholder-teks-samping focus:border-primary transition"
        />
        <FaSearch id="search-icon" className="absolute right-3 top-1/2 -translate-y-1/2 text-teks-samping text-sm" />
      </div>

      {/* Icons & Profile */}
      <div id="icons-container" className="flex items-center space-x-3 ml-4">
        <div id="notification-icon" className="relative p-2 bg-primary-light rounded-xl text-primary cursor-pointer hover:bg-blue-200 transition">
          <FaBell className="text-lg" />
          <span id="notification-badge" className="absolute -top-1 -right-1 bg-merah text-white rounded-full px-1.5 py-0.5 text-xs font-bold">3</span>
        </div>
        <div id="settings-icon" className="p-2 bg-latar rounded-xl text-teks-samping cursor-pointer hover:bg-garis transition">
          <SlSettings className="text-lg" />
        </div>
        <div id="profile-container" className="flex items-center space-x-3 border-l pl-4 border-garis">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-teks">Admin</p>
            <p className="text-xs text-teks-samping">Super Admin</p>
          </div>
          <img
            id="profile-avatar"
            src="https://avatar.iran.liara.run/public/1"
            className="w-9 h-9 rounded-full border-2 border-primary"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
}
