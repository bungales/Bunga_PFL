import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";
import EmptyState from "../components/EmptyState";
import transactionsData from "../data/transactions.json";
import { MdCheckCircle, MdRadioButtonUnchecked, MdLocalLaundryService, MdRefresh } from "react-icons/md";

const steps = ["Diterima", "Dicuci", "Dikeringkan", "Disetrika", "Selesai", "Diambil"];
const statusType = { Selesai: "success", Proses: "primary", Menunggu: "warning" };

function TrackingBar({ current }) {
  const idx = steps.indexOf(current);
  return (
    <div className="flex items-center mt-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            {i <= idx
              ? <MdCheckCircle className="text-primary text-lg" />
              : <MdRadioButtonUnchecked className="text-garis text-lg" />}
            <span className={`text-xs mt-1 ${i <= idx ? "text-primary font-semibold" : "text-teks-samping"}`}>{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < idx ? "bg-primary" : "bg-garis"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Tracking() {
  const active = transactionsData.filter(t => t.status !== "Selesai" || t.trackingStatus !== "Diambil").slice(0, 8);

  // useEffect: menjalankan side effect untuk update waktu terakhir refresh
  // dependency array kosong [] → hanya berjalan sekali saat komponen pertama kali dimount
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    // Set waktu pertama kali halaman dibuka
    setLastUpdated(new Date().toLocaleTimeString("id-ID"));

    // Interval tiap 30 detik update timestamp (simulasi polling status laundry)
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString("id-ID"));
    }, 30000);

    // Cleanup: hentikan interval saat komponen di-unmount agar tidak memory leak
    return () => clearInterval(interval);
  }, []); // dependency array kosong → efek hanya berjalan sekali saat mount

  return (
    <div>
      <PageHeader title="Tracking Status Laundry" breadcrumb={["Dashboard", "Tracking"]} />

      {/* Indikator last updated dari useEffect */}
      {lastUpdated && (
        <div className="flex items-center gap-2 text-xs text-teks-samping mb-4">
          <MdRefresh className="text-primary" />
          <span>Data diperbarui otomatis · Terakhir diperbarui: <strong className="text-primary">{lastUpdated}</strong></span>
        </div>
      )}

      {active.length === 0 ? (
        <EmptyState
          icon={<MdLocalLaundryService />}
          title="Tidak ada laundry aktif"
          description="Semua laundry sudah selesai diproses."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {active.map(t => (
            <Card key={t.id}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold text-teks">{t.customerName}</p>
                  <p className="text-xs text-teks-samping">{t.id} · {t.service} · {t.weight} kg</p>
                </div>
                <Badge type={statusType[t.status]}>{t.status}</Badge>
              </div>
              <TrackingBar current={t.trackingStatus} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
