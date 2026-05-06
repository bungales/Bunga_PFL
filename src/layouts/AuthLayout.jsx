import { Outlet } from "react-router-dom";
import { MdVerified, MdAccessTime, MdBarChart } from "react-icons/md";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl">

        {/* ── Kiri: Form ── */}
        <div className="w-full lg:w-[45%] bg-white flex flex-col justify-center px-10 py-12">
          <Outlet />
          <p className="text-[11px] text-teks-samping mt-8 text-center">
            © 2026 Netto Laundry. All rights reserved.
          </p>
        </div>

        {/* ── Kanan: Branding ── */}
        <div className="hidden lg:flex w-[55%] relative overflow-hidden
                        bg-gradient-to-br from-[#1a56db] via-[#1e40af] to-[#1e3a8a]
                        flex-col items-center justify-center p-10">

          {/* Blob dekoratif */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="relative z-10 text-center">

            {/* Logo — putih bg supaya tulisan kelihatan */}
            <div className="w-36 h-36 rounded-3xl bg-white mx-auto mb-6 shadow-2xl
                            flex items-center justify-center overflow-hidden">
              <img
                src="/img/logo Netto loundry.jpeg"
                alt="Netto Laundry"
                className="w-full h-full object-contain"
              />
            </div>

            <h2 className="text-white font-bold text-2xl mb-2">
              Sistem Manajemen Laundry
            </h2>
            <p className="text-blue-200 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
              Kelola pelanggan, transaksi, dan layanan laundry dengan mudah melalui dashboard admin.
            </p>

            {/* Icon fitur */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { icon: "🧺", label: "Tracking" },
                { icon: "⭐", label: "Loyalitas" },
                { icon: "📊", label: "Laporan" },
              ].map((f, i) => (
                <div key={i}
                  className="flex flex-col items-center bg-white/15 backdrop-blur-sm
                             rounded-2xl px-5 py-4 border border-white/20 hover:bg-white/20 transition">
                  <span className="text-2xl mb-1">{f.icon}</span>
                  <span className="text-white text-xs font-medium">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Badge bawah */}
            <div className="flex justify-center gap-5 text-blue-200 text-xs">
              <span className="flex items-center gap-1">
                <MdVerified className="text-base" /> Sistem Terjamin
              </span>
              <span className="flex items-center gap-1">
                <MdAccessTime className="text-base" /> 24/7 Akses
              </span>
              <span className="flex items-center gap-1">
                <MdBarChart className="text-base" /> Real-time Data
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
