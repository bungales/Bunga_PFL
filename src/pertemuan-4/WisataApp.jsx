import { useState } from "react";
import WisataGuest from "./WisataGuest";
import WisataAdmin from "./WisataAdmin";

export default function WisataApp() {
  const [mode, setMode] = useState("guest");

  return (
    <div>
      {/* Toggle Navbar */}
      <nav className="bg-stone-800 text-amber-100 px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-10">
        <span className="font-bold text-lg">🗺️ Wisata Indonesia</span>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("guest")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
              mode === "guest"
                ? "bg-amber-500 text-white"
                : "bg-stone-700 text-stone-300 hover:bg-stone-600"
            }`}
          >
            👤 Guest
          </button>
          <button
            onClick={() => setMode("admin")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
              mode === "admin"
                ? "bg-amber-500 text-white"
                : "bg-stone-700 text-stone-300 hover:bg-stone-600"
            }`}
          >
            🔧 Admin
          </button>
        </div>
      </nav>

      {/* Conditional rendering: Guest atau Admin */}
      {mode === "guest" ? <WisataGuest /> : <WisataAdmin />}
    </div>
  );
}
