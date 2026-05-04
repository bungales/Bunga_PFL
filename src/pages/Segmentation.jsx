import PageHeader from "../components/PageHeader";
import customers from "../data/customers.json";

const segments = [
  {
    label: "Pelanggan Aktif", color: "bg-primary", light: "bg-primary-light", textColor: "text-primary",
    filter: c => c.status === "active", desc: "Transaksi dalam 30 hari terakhir"
  },
  {
    label: "Pelanggan Tidak Aktif", color: "bg-merah", light: "bg-red-100", textColor: "text-merah",
    filter: c => c.status === "inactive", desc: "Tidak ada transaksi > 30 hari"
  },
  {
    label: "High Value", color: "bg-kuning", light: "bg-yellow-100", textColor: "text-kuning",
    filter: c => c.totalSpent >= 500000, desc: "Total belanja ≥ Rp 500.000"
  },
  {
    label: "Gold Member", color: "bg-ungu", light: "bg-purple-100", textColor: "text-ungu",
    filter: c => c.loyalty === "Gold", desc: "Poin ≥ 1000"
  },
];

const loyaltyColor = { Gold: "text-kuning bg-yellow-100", Silver: "text-gray-500 bg-gray-100", Bronze: "text-orange-500 bg-orange-100" };

export default function Segmentation() {
  return (
    <div>
      <PageHeader title="Segmentasi Pelanggan" breadcrumb={["Dashboard", "Segmentasi"]} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {segments.map((s, i) => {
          const count = customers.filter(s.filter).length;
          return (
            <div key={i} className={`${s.light} rounded-2xl p-5 border border-garis`}>
              <p className={`text-3xl font-bold ${s.textColor}`}>{count}</p>
              <p className="font-semibold text-teks mt-1">{s.label}</p>
              <p className="text-xs text-teks-samping mt-1">{s.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {segments.map((seg, si) => {
          const list = customers.filter(seg.filter).slice(0, 5);
          return (
            <div key={si} className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-teks">{seg.label}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold ${seg.light} ${seg.textColor}`}>{customers.filter(seg.filter).length} pelanggan</span>
              </div>
              <div className="space-y-2">
                {list.map(c => (
                  <div key={c.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-latar transition">
                    <div className="flex items-center space-x-3">
                      <img src={`https://avatar.iran.liara.run/public/${c.id.slice(1)}`} className="w-8 h-8 rounded-full" alt="" />
                      <div>
                        <p className="text-sm font-medium text-teks">{c.name}</p>
                        <p className="text-xs text-teks-samping">Rp {c.totalSpent.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${loyaltyColor[c.loyalty]}`}>{c.loyalty}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
