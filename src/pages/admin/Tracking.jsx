import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";
import Toast from "../../components/Toast";
import transactionsData from "../../data/transactions.json";
import { MdCheckCircle, MdRadioButtonUnchecked, MdLocalLaundryService, MdRefresh, MdAccessTime, MdQrCode, MdPersonAdd, MdClose } from "react-icons/md";

const steps = ["Diterima", "Dicuci", "Dikeringkan", "Disetrika", "Selesai", "Diambil"];
const statusType = { Selesai: "success", Proses: "primary", Menunggu: "warning" };

const stepColors = {
  done: "text-emerald-500",
  current: "text-blue-500",
  pending: "text-gray-300",
  lineDone: "bg-emerald-400",
  linePending: "bg-gray-200",
};

function TrackingBar({ current }) {
  const idx = steps.indexOf(current);
  return (
    <div className="flex items-start mt-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            {i < idx
              ? <MdCheckCircle className={`${stepColors.done} text-xl`} />
              : i === idx
              ? <div className="w-5 h-5 rounded-full border-2 border-blue-500 bg-blue-100 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
              : <MdRadioButtonUnchecked className={`${stepColors.pending} text-xl`} />}
            <span className={`text-[10px] mt-1 text-center leading-tight w-12 ${
              i <= idx ? (i === idx ? "text-blue-600 font-bold" : "text-emerald-600 font-semibold") : "text-gray-400"
            }`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 mb-5 ${i < idx ? stepColors.lineDone : stepColors.linePending}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Tracking() {
  const active = transactionsData.filter(t => t.status !== "Selesai" || t.trackingStatus !== "Diambil").slice(0, 8);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [pendingVisits, setPendingVisits] = useState([]);
  const [approvedVisits, setApprovedVisits] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const loadVisits = () => {
    const stored = JSON.parse(localStorage.getItem("pendingVisits") || "[]");
    setPendingVisits(stored.filter(v => !v.approved));
    setApprovedVisits(stored.filter(v => v.approved));
  };

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    loadVisits();
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString("id-ID"));
      loadVisits();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const approveVisit = (customerId, customerName) => {
    // 1. Tandai approved di pendingVisits
    const stored = JSON.parse(localStorage.getItem("pendingVisits") || "[]");
    const visit = stored.find(v => v.customerId === customerId);
    const updated = stored.map(v => v.customerId === customerId ? { ...v, approved: true } : v);
    localStorage.setItem("pendingVisits", JSON.stringify(updated));

    // 2. Tambahkan ke daftar pelanggan (extraCustomers) kalau belum ada
    const extraCustomers = JSON.parse(localStorage.getItem("extraCustomers") || "[]");
    const alreadyExists = extraCustomers.find(c => c.customerId === customerId);
    if (!alreadyExists && visit) {
      const newCustomer = {
        customerId,
        customerName: visit.customerName,
        phone: visit.phone,
        email: "",
        address: "",
        customerType: "Lainnya",
        segment: visit.segment || "New",
        points: 0,
        totalTransactions: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString().split("T")[0],
        lastTransaction: "-",
        status: "active",
      };
      extraCustomers.push(newCustomer);
      localStorage.setItem("extraCustomers", JSON.stringify(extraCustomers));
    }

    loadVisits();
    setToast({ show: true, type: "success", message: `${customerName} berhasil disetujui dan ditambahkan ke pelanggan.` });
  };

  const dismissVisit = (customerId) => {
    const stored = JSON.parse(localStorage.getItem("pendingVisits") || "[]");
    const updated = stored.filter(v => v.customerId !== customerId);
    localStorage.setItem("pendingVisits", JSON.stringify(updated));
    loadVisits();
  };

  const selesai = active.filter(t => t.status === "Selesai").length;
  const proses = active.filter(t => t.status === "Proses").length;
  const menunggu = active.filter(t => t.status === "Menunggu").length;

  return (
    <div>
      <PageHeader title="Tracking Status Laundry" breadcrumb={["Dashboard", "Tracking"]} />

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Selesai", value: selesai, bg: "bg-green-50", text: "text-green-600", border: "border-green-200" },
          { label: "Proses", value: proses, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200" },
          { label: "Menunggu", value: menunggu, bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-200" },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} border ${s.border} rounded-2xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className="text-xs text-teks-samping font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Last updated */}
      {lastUpdated && (
        <div className="flex items-center gap-2 text-xs text-teks-samping mb-4 bg-white rounded-xl px-4 py-2.5 border border-garis/50 w-fit">
          <MdRefresh className="text-primary animate-spin" style={{ animationDuration: "3s" }} />
          <MdAccessTime className="text-teks-samping" />
          <span>Terakhir diperbarui: <strong className="text-primary">{lastUpdated}</strong></span>
        </div>
      )}

      {/* Pending QR Visits */}
      {pendingVisits.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <MdQrCode className="text-amber-500 text-lg" />
            <h3 className="font-semibold text-teks text-sm">Pelanggan Menunggu Persetujuan QR</h3>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-0.5 rounded-full">{pendingVisits.length}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {pendingVisits.map(v => (
              <div key={v.customerId} className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center font-bold text-amber-700">
                    {v.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-teks text-sm">{v.customerName}</p>
                    <p className="text-xs text-teks-samping">{v.phone} · {v.segment}</p>
                    <p className="text-xs text-teks-samping">
                      Scan: {new Date(v.scanTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => approveVisit(v.customerId, v.customerName)}
                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                  >
                    <MdPersonAdd className="text-base" /> Setujui
                  </button>
                  <button
                    onClick={() => dismissVisit(v.customerId)}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-400 transition"
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {active.length === 0 && approvedVisits.length === 0 ? (
        <EmptyState icon={<MdLocalLaundryService />} title="Tidak ada laundry aktif" description="Semua laundry sudah selesai diproses." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Kartu dari pelanggan yang sudah disetujui QR */}
          {approvedVisits.map(v => (
            <div key={v.customerId} className="bg-white rounded-2xl shadow-sm border-2 border-green-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-full">✓ Check-in QR</span>
                  </div>
                  <p className="font-bold text-teks">{v.customerName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-teks-samping">{v.phone}</span>
                    <span className="text-xs text-teks-samping">·</span>
                    <span className="text-xs text-teks-samping">
                      {new Date(v.scanTime).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge type="success">Hadir</Badge>
                  <button
                    onClick={() => dismissVisit(v.customerId)}
                    className="p-1 text-gray-300 hover:text-red-400 transition"
                    title="Hapus dari tracking"
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
              <TrackingBar current="Diterima" />
            </div>
          ))}

          {/* Kartu transaksi dari data JSON */}
          {active.map(t => (
            <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-garis/50 p-5 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-teks">{t.customerName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-teks-samping bg-latar px-2 py-0.5 rounded-lg">{t.id}</span>
                    <span className="text-xs text-teks-samping">{t.service}</span>
                    <span className="text-xs text-teks-samping">·</span>
                    <span className="text-xs text-teks-samping">{t.weight} kg</span>
                  </div>
                </div>
                <Badge type={statusType[t.status]}>{t.status}</Badge>
              </div>
              <TrackingBar current={t.trackingStatus} />
            </div>
          ))}
        </div>
      )}
      <Toast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast(t => ({ ...t, show: false }))} />
    </div>
  );
}
