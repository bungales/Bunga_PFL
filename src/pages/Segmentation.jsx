import PageHeader from "../components/PageHeader";
import CustomerCard from "../components/CustomerCard";
import Badge from "../components/Badge";
import SectionTitle from "../components/SectionTitle";
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

const segBadgeType = ["primary", "danger", "warning", "secondary"];

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
          const list = customers.filter(seg.filter).slice(0, 3);
          return (
            <div key={si} className="bg-white rounded-2xl shadow-sm p-5">
              <SectionTitle
                title={seg.label}
                action={<Badge type={segBadgeType[si]}>{customers.filter(seg.filter).length} pelanggan</Badge>}
              />
              <div className="space-y-3">
                {list.map(c => (
                  <CustomerCard key={c.id} customer={c} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
