import PageHeader from "../components/PageHeader";
import transactionsData from "../data/transactions.json";
import { MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";

const steps = ["Diterima", "Dicuci", "Dikeringkan", "Disetrika", "Selesai", "Diambil"];
const statusColor = { Selesai: "text-hijau bg-green-100", Proses: "text-primary bg-primary-light", Menunggu: "text-kuning bg-yellow-100" };

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

  return (
    <div>
      <PageHeader title="Tracking Status Laundry" breadcrumb={["Dashboard", "Tracking"]} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {active.map(t => (
          <div key={t.id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-teks">{t.customerName}</p>
                <p className="text-xs text-teks-samping">{t.id} · {t.service} · {t.weight} kg</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span>
            </div>
            <TrackingBar current={t.trackingStatus} />
          </div>
        ))}
      </div>
    </div>
  );
}
