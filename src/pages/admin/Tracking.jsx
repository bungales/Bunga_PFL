import { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";
import transactionsData from "../../data/transactions.json";
import { MdCheckCircle, MdRadioButtonUnchecked, MdLocalLaundryService, MdRefresh, MdAccessTime } from "react-icons/md";

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

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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

      {active.length === 0 ? (
        <EmptyState icon={<MdLocalLaundryService />} title="Tidak ada laundry aktif" description="Semua laundry sudah selesai diproses." />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
    </div>
  );
}
