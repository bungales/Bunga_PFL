import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MdLocalLaundryService, MdCheckCircle, MdArrowBack,
  MdAccessTime, MdStar, MdQrCode
} from "react-icons/md";
import customersData from "../../data/customers.json";
import transactionsData from "../../data/transactions.json";

const TRACKING_STEPS = [
  { key: "Diterima",      label: "Pesanan Diterima",    icon: "📥" },
  { key: "Dicuci",        label: "Sedang Dicuci",        icon: "🫧" },
  { key: "Dikeringkan",   label: "Sedang Dikeringkan",   icon: "💨" },
  { key: "Disetrika",     label: "Sedang Disetrika",     icon: "👕" },
  { key: "Quality Check", label: "Quality Check",        icon: "✅" },
  { key: "Siap Diambil",  label: "Siap Diambil",         icon: "📦" },
  { key: "Selesai",       label: "Selesai",              icon: "🎉" },
];

const STATUS_COLOR = {
  Proses:   "bg-blue-500",
  Menunggu: "bg-amber-400 text-amber-900",
  Selesai:  "bg-emerald-500",
};

function getAllCustomers() {
  const extra = JSON.parse(localStorage.getItem("extraCustomers") || "[]");
  const merged = [...customersData];
  extra.forEach(e => {
    const idx = merged.findIndex(c => c.customerId === e.customerId);
    if (idx === -1) merged.push(e); else merged[idx] = e;
  });
  return merged;
}

export default function QRScan() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [activeTx, setActiveTx] = useState(null);
  const [checkInStatus, setCheckInStatus] = useState(null); // null | "pending" | "approved"
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const allCustomers = getAllCustomers();
    const found = allCustomers.find(c => c.customerId === customerId);
    setCustomer(found || null);

    const tx = transactionsData.find(
      t => t.customerId === customerId && t.trackingStatus !== "Diambil"
    );
    setActiveTx(tx || null);

    const visits = JSON.parse(localStorage.getItem("pendingVisits") || "[]");
    const existing = visits.find(v => v.customerId === customerId);
    if (existing) setCheckInStatus(existing.approved ? "approved" : "pending");

    setLoaded(true);
  }, [customerId]);

  // Poll approval setiap 2 detik
  useEffect(() => {
    if (checkInStatus !== "pending") return;
    const interval = setInterval(() => {
      const visits = JSON.parse(localStorage.getItem("pendingVisits") || "[]");
      const found = visits.find(v => v.customerId === customerId);
      if (found?.approved) setCheckInStatus("approved");
    }, 2000);
    return () => clearInterval(interval);
  }, [checkInStatus, customerId]);

  const handleCheckIn = () => {
    const allCustomers = getAllCustomers();
    const c = allCustomers.find(x => x.customerId === customerId);
    const visits = JSON.parse(localStorage.getItem("pendingVisits") || "[]");
    if (!visits.find(v => v.customerId === customerId)) {
      visits.push({
        customerId,
        customerName: c?.customerName || "Unknown",
        phone: c?.phone || "-",
        segment: c?.segment || "New",
        scanTime: new Date().toISOString(),
        approved: false,
      });
      localStorage.setItem("pendingVisits", JSON.stringify(visits));
    }
    setCheckInStatus("pending");
  };

  if (!loaded) return null;

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MdQrCode className="text-red-300 text-3xl" />
          </div>
          <h2 className="text-lg font-bold text-gray-700 mb-1">QR Tidak Valid</h2>
          <p className="text-gray-400 text-sm">Pelanggan tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  const currentStepIdx = TRACKING_STEPS.findIndex(s => s.key === activeTx?.trackingStatus);
  const initials = customer.customerName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* ── TOP BAR ── */}
      <div className="bg-white/80 backdrop-blur border-b border-gray-100 px-5 py-3 flex items-center justify-between sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm transition">
          <MdArrowBack /> Beranda
        </Link>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-indigo-600 rounded-md flex items-center justify-center">
            <MdLocalLaundryService className="text-white text-xs" />
          </div>
          <span className="text-indigo-600 font-bold text-sm">Netto Tracking</span>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4 pb-12">

        {/* ── PROFILE CARD ── */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 text-base truncate">{customer.customerName}</p>
            <p className="text-xs text-gray-400 mt-0.5">{customer.phone}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <MdStar className="text-amber-400 text-xs" />
              <span className="text-xs font-semibold text-amber-500">{customer.segment} Member</span>
              {customer.points > 0 && (
                <span className="text-xs text-gray-400 ml-1">· {customer.points} poin</span>
              )}
            </div>
          </div>
        </div>

        {/* ── TRANSAKSI AKTIF ── */}
        {activeTx ? (
          <>
            {/* Hero status card */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 rounded-3xl p-5 text-white overflow-hidden shadow-lg">
              {/* Decorative */}
              <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full" />
              <div className="absolute -right-2 top-8 w-16 h-16 bg-white/10 rounded-full" />

              <div className="relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-indigo-200 text-xs uppercase tracking-widest font-medium mb-1">Status Cucian Anda</p>
                    <h1 className="text-2xl font-bold font-mono">{activeTx.id}</h1>
                    <p className="text-indigo-200 text-sm mt-0.5">{activeTx.service}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
                    activeTx.status === "Proses" ? "bg-blue-400 text-white" :
                    activeTx.status === "Menunggu" ? "bg-amber-400 text-amber-900" :
                    "bg-emerald-400 text-white"
                  }`}>{activeTx.status}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Berat", value: `${activeTx.weight} kg` },
                    { label: "Harga", value: `Rp ${activeTx.price?.toLocaleString() || "-"}` },
                    { label: "Tanggal", value: activeTx.date },
                    { label: "Pembayaran", value: "Cash" },
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 rounded-xl px-3 py-2">
                      <p className="text-indigo-200 text-xs">{item.label}</p>
                      <p className="text-white font-semibold text-sm mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <MdAccessTime className="text-indigo-400 text-sm" />
                </div>
                <p className="font-bold text-gray-800">Timeline Proses Laundry</p>
              </div>

              <div>
                {TRACKING_STEPS.map((step, i) => {
                  const isDone    = i < currentStepIdx;
                  const isCurrent = i === currentStepIdx;
                  const isPending = i > currentStepIdx;
                  return (
                    <div key={step.key} className="flex gap-3">
                      {/* indicator */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold transition-all ${
                          isDone    ? "bg-emerald-500 shadow-sm shadow-emerald-200" :
                          isCurrent ? "bg-indigo-600 shadow-md shadow-indigo-200 scale-110" :
                          "bg-gray-100"
                        }`}>
                          {isDone
                            ? <MdCheckCircle className="text-white text-base" />
                            : <span className={isCurrent ? "text-white text-xs" : "text-gray-300 text-xs"}>{step.icon}</span>}
                        </div>
                        {i < TRACKING_STEPS.length - 1 && (
                          <div className={`w-0.5 my-1 min-h-[20px] flex-1 rounded-full ${isDone ? "bg-emerald-300" : "bg-gray-100"}`} />
                        )}
                      </div>

                      {/* content */}
                      <div className="pb-4 flex-1 flex justify-between items-start pt-1">
                        <div>
                          <p className={`text-sm font-semibold leading-tight ${
                            isDone ? "text-emerald-600" : isCurrent ? "text-indigo-700" : "text-gray-300"
                          }`}>{step.label}</p>
                          <p className={`text-xs mt-0.5 ${
                            isDone || isCurrent ? "text-gray-400" : "text-gray-200"
                          }`}>
                            {isDone ? "Selesai dikerjakan" : isCurrent ? "Sedang diproses..." : "Menunggu"}
                          </p>
                        </div>
                        {(isDone || isCurrent) && (
                          <span className="text-xs text-gray-300 shrink-0 ml-2 mt-0.5">
                            {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <MdLocalLaundryService className="text-indigo-300 text-2xl" />
            </div>
            <p className="font-semibold text-gray-600">Tidak ada cucian aktif</p>
            <p className="text-sm text-gray-400 mt-1">Semua cucian sudah selesai.</p>
          </div>
        )}

        {/* ── CHECK-IN SECTION ── */}
        {checkInStatus === null && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                <MdQrCode className="text-indigo-400 text-lg" />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">Check-In Pelanggan</p>
                <p className="text-xs text-gray-400">Notifikasi admin bahwa Anda sudah hadir</p>
              </div>
            </div>
            <button
              onClick={handleCheckIn}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3.5 rounded-2xl transition shadow-md shadow-indigo-200 text-sm"
            >
              Check In Sekarang
            </button>
          </div>
        )}

        {checkInStatus === "pending" && (
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-amber-400 animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-amber-700 text-sm">Menunggu Persetujuan</p>
                <p className="text-xs text-amber-500 mt-0.5">Admin sedang memproses check-in Anda...</p>
              </div>
            </div>
            {/* loading dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-amber-300 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {checkInStatus === "approved" && (
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-3xl p-6 text-center">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
              <MdCheckCircle className="text-white text-3xl" />
            </div>
            <p className="font-bold text-emerald-700 text-lg mb-1">Check-in Disetujui!</p>
            <p className="text-sm text-emerald-600 mb-5">
              Selamat datang kembali, <strong>{customer.customerName}</strong> 👋
            </p>
            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-emerald-200 text-sm"
            >
              Masuk sebagai Member →
            </Link>
          </div>
        )}

        {/* ── CTA daftar/login ── */}
        {checkInStatus === null && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
            <p className="text-sm text-gray-500 text-center mb-4">
              Daftar agar riwayat laundry tersimpan dan nikmati poin loyalitas serta promo member.
            </p>
            <div className="flex gap-3">
              <Link to="/register"
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-2xl text-center text-sm shadow-sm shadow-indigo-200">
                Daftar Akun
              </Link>
              <Link to="/login"
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-2xl text-center text-sm hover:bg-gray-50 transition">
                Login
              </Link>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 pb-2">
          Terima kasih telah mempercayakan cucian Anda kepada{" "}
          <span className="font-semibold text-indigo-400">Netto Express Laundry</span>
        </p>
      </div>
    </div>
  );
}
