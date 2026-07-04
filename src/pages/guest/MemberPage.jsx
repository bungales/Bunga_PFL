import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  MdStar, MdLocalLaundryService, MdLogout, MdHistory,
  MdCardGiftcard, MdQrCode, MdCheckCircle, MdAccessTime,
  MdPhone, MdEmail, MdLocationOn, MdPerson
} from "react-icons/md";
import customersData from "../../data/customers.json";
import transactionsData from "../../data/transactions.json";

const TRACKING_STEPS = ["Diterima", "Dicuci", "Dikeringkan", "Disetrika", "Quality Check", "Siap Diambil", "Selesai"];

const SEGMENT_CONFIG = {
  VIP:     { bg: "from-yellow-400 to-orange-400", badge: "bg-yellow-100 text-yellow-700", icon: "👑" },
  Loyal:   { bg: "from-purple-500 to-indigo-500", badge: "bg-purple-100 text-purple-700", icon: "💜" },
  Regular: { bg: "from-blue-500 to-indigo-600",   badge: "bg-blue-100 text-blue-700",    icon: "⭐" },
  New:     { bg: "from-emerald-400 to-teal-500",  badge: "bg-emerald-100 text-emerald-700", icon: "🌱" },
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

export default function MemberPage() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const memberId = localStorage.getItem("memberId");
    if (!memberId) { navigate("/login"); return; }
    const allCustomers = getAllCustomers();
    const found = allCustomers.find(c => c.customerId === memberId);
    if (!found) { navigate("/login"); return; }
    setCustomer(found);
    setTransactions(transactionsData.filter(t => t.customerId === memberId));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("memberId");
    navigate("/login");
  };

  if (!customer) return null;

  const seg = SEGMENT_CONFIG[customer.segment] || SEGMENT_CONFIG.Regular;
  const activeTx = transactions.find(t => t.trackingStatus !== "Diambil");
  const currentStepIdx = TRACKING_STEPS.indexOf(activeTx?.trackingStatus || "");

  // Hitung level progress ke tier berikutnya
  const tierThresholds = { New: 0, Regular: 200, Loyal: 600, VIP: 1200 };
  const tiers = ["New", "Regular", "Loyal", "VIP"];
  const currentTierIdx = tiers.indexOf(customer.segment);
  const nextTier = tiers[currentTierIdx + 1];
  const nextThreshold = tierThresholds[nextTier];
  const currentThreshold = tierThresholds[customer.segment];
  const progressPct = nextTier
    ? Math.min(100, ((customer.points - currentThreshold) / (nextThreshold - currentThreshold)) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* ===== HERO HEADER ===== */}
      <div className={`bg-gradient-to-br ${seg.bg} text-white relative overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />

        <div className="relative max-w-md mx-auto px-5 pt-10 pb-20">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold shadow-lg">
                {customer.customerName.charAt(0)}
              </div>
              <div>
                <p className="text-white/70 text-xs">Selamat datang,</p>
                <h1 className="text-lg font-bold leading-tight">{customer.customerName}</h1>
                <span className={`inline-block mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${seg.badge}`}>
                  {seg.icon} {customer.segment} Member
                </span>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition">
              <MdLogout className="text-lg" />
            </button>
          </div>

          {/* Points big display */}
          <div className="mt-6 bg-white/15 backdrop-blur rounded-2xl p-4">
            <p className="text-white/70 text-xs mb-1">Total Poin Loyalitas</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold">{customer.points.toLocaleString()}</span>
              <span className="text-white/60 text-sm mb-1">poin</span>
              <MdStar className="text-yellow-300 text-2xl mb-0.5 ml-auto" />
            </div>
            {/* Progress to next tier */}
            {nextTier && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-white/70 mb-1">
                  <span>{customer.segment}</span>
                  <span>{nextTier} ({nextThreshold - customer.points} poin lagi)</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}
            {!nextTier && (
              <p className="text-xs text-white/70 mt-2">🏆 Kamu sudah di tier tertinggi!</p>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: "Transaksi", value: customer.totalTransactions },
              { label: "Total Belanja", value: `Rp ${(customer.totalSpent / 1000).toFixed(0)}k` },
              { label: "Bergabung", value: new Date(customer.joinDate).toLocaleDateString("id-ID", { month: "short", year: "2-digit" }) },
            ].map((s, i) => (
              <div key={i} className="bg-white/15 rounded-xl p-2.5 text-center">
                <p className="font-bold text-sm">{s.value}</p>
                <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="max-w-md mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-4">
          <div className="flex">
            {[
              { id: "home", label: "Beranda", icon: "🏠" },
              { id: "tracking", label: "Tracking", icon: "📦" },
              { id: "history", label: "Riwayat", icon: "🧾" },
              { id: "profile", label: "Profil", icon: "👤" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-xs font-semibold transition flex flex-col items-center gap-0.5 ${
                  activeTab === tab.id
                    ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50"
                    : "text-gray-400"
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== TAB: BERANDA ===== */}
        {activeTab === "home" && (
          <div className="space-y-4 pb-8">
            {/* Laundry aktif */}
            {activeTx ? (
              <div
                className="bg-indigo-600 rounded-2xl p-5 text-white cursor-pointer hover:bg-indigo-700 transition"
                onClick={() => setActiveTab("tracking")}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MdLocalLaundryService className="text-indigo-200 text-xl" />
                    <span className="text-indigo-200 text-xs uppercase tracking-wide font-semibold">Cucian Aktif</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    activeTx.status === "Proses" ? "bg-blue-400 text-blue-900" :
                    activeTx.status === "Menunggu" ? "bg-amber-400 text-amber-900" :
                    "bg-green-400 text-green-900"
                  }`}>{activeTx.status}</span>
                </div>
                <p className="font-bold text-xl font-mono">{activeTx.id}</p>
                <p className="text-indigo-200 text-sm mt-0.5">{activeTx.service} · {activeTx.weight} kg</p>
                <div className="mt-3 text-indigo-200 text-xs flex items-center gap-1">
                  <MdAccessTime /> Tap untuk lihat tracking
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
                <MdLocalLaundryService className="text-4xl text-gray-200 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Tidak ada cucian aktif</p>
              </div>
            )}

            {/* Promo card */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute right-3 bottom-0 text-6xl opacity-20">🎁</div>
              <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Promo Member</p>
              <p className="font-bold text-lg">Cuci 5 Dapat 1 Gratis!</p>
              <p className="text-white/70 text-sm mt-1">Kumpulkan stamp dari setiap transaksi cuci kering.</p>
              <div className="flex gap-2 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm border-2 ${
                    i < (customer.totalTransactions % 5) ? "bg-white text-indigo-600 border-white" : "border-white/40 text-white/40"
                  }`}>
                    {i < (customer.totalTransactions % 5) ? "✓" : i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick scan */}
            <Link
              to={`/scan/${customer.customerId}`}
              className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <MdQrCode className="text-indigo-500 text-xl" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Halaman Tracking Saya</p>
                  <p className="text-xs text-gray-400">Lihat status cucian lengkap</p>
                </div>
              </div>
              <span className="text-gray-300 text-lg">›</span>
            </Link>
          </div>
        )}

        {/* ===== TAB: TRACKING ===== */}
        {activeTab === "tracking" && (
          <div className="space-y-4 pb-8">
            {activeTx ? (
              <>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-gray-800 text-lg font-mono">{activeTx.id}</p>
                      <p className="text-sm text-gray-500">{activeTx.service} · {activeTx.weight} kg</p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      activeTx.status === "Proses" ? "bg-blue-100 text-blue-700" :
                      activeTx.status === "Menunggu" ? "bg-amber-100 text-amber-700" :
                      "bg-green-100 text-green-700"
                    }`}>{activeTx.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm pb-4 border-b border-gray-100">
                    <div><p className="text-xs text-gray-400">Tanggal</p><p className="font-semibold">{activeTx.date}</p></div>
                    <div><p className="text-xs text-gray-400">Harga</p><p className="font-semibold">Rp {activeTx.price.toLocaleString()}</p></div>
                  </div>
                  <div className="mt-4">
                    {TRACKING_STEPS.map((step, i) => {
                      const isDone = i < currentStepIdx;
                      const isCurrent = i === currentStepIdx;
                      const isPending = i > currentStepIdx;
                      return (
                        <div key={step} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isDone ? "bg-emerald-500" : isCurrent ? "bg-indigo-600" : "border-2 border-gray-200 bg-white"
                            }`}>
                              {isDone ? <MdCheckCircle className="text-white text-sm" />
                               : isCurrent ? <div className="w-2 h-2 rounded-full bg-white" />
                               : <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                            </div>
                            {i < TRACKING_STEPS.length - 1 && (
                              <div className={`w-0.5 my-1 min-h-[16px] flex-1 ${isDone ? "bg-emerald-400" : "bg-gray-200"}`} />
                            )}
                          </div>
                          <div className="pb-3 flex-1">
                            <p className={`text-sm font-semibold ${isPending ? "text-gray-300" : "text-gray-800"}`}>{step}</p>
                            <p className={`text-xs ${isPending ? "text-gray-200" : "text-gray-400"}`}>
                              {isDone || isCurrent ? "Selesai dikerjakan" : "Menunggu"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                <MdLocalLaundryService className="text-5xl text-gray-200 mx-auto mb-3" />
                <p className="font-semibold text-gray-600">Tidak ada cucian aktif</p>
                <p className="text-sm text-gray-400 mt-1">Semua cucian sudah selesai.</p>
              </div>
            )}
          </div>
        )}

        {/* ===== TAB: RIWAYAT ===== */}
        {activeTab === "history" && (
          <div className="pb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {transactions.length === 0 ? (
                <div className="p-8 text-center">
                  <MdHistory className="text-5xl text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Belum ada riwayat transaksi.</p>
                </div>
              ) : (
                transactions.map((tx, i) => (
                  <div key={tx.id} className={`flex items-center gap-3 p-4 ${i < transactions.length - 1 ? "border-b border-gray-50" : ""}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.status === "Selesai" ? "bg-green-50" : tx.status === "Proses" ? "bg-blue-50" : "bg-amber-50"
                    }`}>
                      <MdLocalLaundryService className={
                        tx.status === "Selesai" ? "text-green-500" : tx.status === "Proses" ? "text-blue-500" : "text-amber-500"
                      } />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{tx.service}</p>
                      <p className="text-xs text-gray-400">{tx.id} · {tx.weight} kg · {tx.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-indigo-600">Rp {tx.price.toLocaleString()}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        tx.status === "Selesai" ? "bg-green-100 text-green-600" :
                        tx.status === "Proses" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"
                      }`}>{tx.status}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ===== TAB: PROFIL ===== */}
        {activeTab === "profile" && (
          <div className="space-y-4 pb-8">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {[
                { icon: <MdPerson />, label: "Nama", value: customer.customerName },
                { icon: <MdPhone />, label: "No. HP", value: customer.phone },
                { icon: <MdEmail />, label: "Email", value: customer.email },
                { icon: <MdLocationOn />, label: "Alamat", value: customer.address },
              ].map((item, i, arr) => (
                <div key={i} className={`flex items-center gap-4 p-4 ${i < arr.length - 1 ? "border-b border-gray-50" : ""}`}>
                  <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800">{item.value || "-"}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-800">Program Loyalitas</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${seg.badge}`}>{customer.segment}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{customer.points.toLocaleString()} poin terkumpul</span>
                {nextTier && <span>Target: {nextThreshold.toLocaleString()}</span>}
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${seg.bg} rounded-full transition-all`} style={{ width: `${progressPct}%` }} />
              </div>
              {nextTier && (
                <p className="text-xs text-gray-400 mt-2 text-center">
                  {nextThreshold - customer.points} poin lagi untuk naik ke <strong>{nextTier}</strong>
                </p>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 font-semibold py-3 rounded-2xl transition text-sm border border-red-100"
            >
              <MdLogout /> Keluar dari Akun
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
