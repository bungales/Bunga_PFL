import PageHeader from "../../components/PageHeader";
import Badge from "../../components/Badge";
import SectionTitle from "../../components/SectionTitle";
import Avatar from "../../components/Avatar";
import customers from "../../data/customers.json";
import { MdPeople, MdPersonOff, MdTrendingUp, MdStar } from "react-icons/md";

const segments = [
  {
    label: "Pelanggan Aktif", icon: <MdPeople className="text-2xl" />,
    bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-600",
    badgeType: "primary", filter: c => c.status === "active", desc: "Transaksi dalam 30 hari terakhir"
  },
  {
    label: "Tidak Aktif", icon: <MdPersonOff className="text-2xl" />,
    bg: "bg-red-50", border: "border-red-200", text: "text-red-600",
    badgeType: "danger", filter: c => c.status === "inactive", desc: "Tidak ada transaksi > 30 hari"
  },
  {
    label: "High Value", icon: <MdTrendingUp className="text-2xl" />,
    bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-600",
    badgeType: "warning", filter: c => c.totalSpent >= 500000, desc: "Total belanja ≥ Rp 500.000"
  },
  {
    label: "VIP Member", icon: <MdStar className="text-2xl" />,
    bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-600",
    badgeType: "secondary", filter: c => c.segment === "VIP", desc: "Segmen pelanggan VIP"
  },
];

const segBadgeType = { VIP: "gold", Loyal: "silver", Regular: "primary", New: "info" };

export default function Segmentation() {
  return (
    <div>
      <PageHeader title="Segmentasi Pelanggan" breadcrumb={["Dashboard", "Segmentasi"]} />

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {segments.map((s, i) => {
          const count = customers.filter(s.filter).length;
          const pct = ((count / customers.length) * 100).toFixed(0);
          return (
            <div key={i} className={`${s.bg} border-2 ${s.border} rounded-2xl p-5`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`${s.text}`}>{s.icon}</div>
                <span className={`text-xs font-bold ${s.text} bg-white/60 px-2 py-0.5 rounded-full`}>{pct}%</span>
              </div>
              <p className={`text-3xl font-bold ${s.text}`}>{count}</p>
              <p className="font-semibold text-teks text-sm mt-1">{s.label}</p>
              <p className="text-xs text-teks-samping mt-0.5">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Segment Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {segments.map((seg, si) => {
          const list = customers.filter(seg.filter).slice(0, 4);
          const total = customers.filter(seg.filter).length;
          return (
            <div key={si} className="bg-white rounded-2xl shadow-sm border border-garis/50 p-5">
              <SectionTitle
                title={seg.label}
                action={<Badge type={seg.badgeType}>{total} pelanggan</Badge>}
              />
              <div className="space-y-3">
                {list.map(c => (
                  <div key={c.customerId} className="flex items-center gap-3 p-3 rounded-xl hover:bg-latar transition">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.customerName)}&background=2563eb&color=fff&size=64`}
                      name={c.customerName}
                      size="sm"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-teks truncate">{c.customerName}</p>
                      <p className="text-xs text-teks-samping">{c.phone}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <Badge type={segBadgeType[c.segment] || "info"}>{c.segment}</Badge>
                      <p className="text-xs text-teks-samping mt-1">Rp {(c.totalSpent / 1000).toFixed(0)}k</p>
                    </div>
                  </div>
                ))}
                {total > 4 && (
                  <p className="text-xs text-center text-teks-samping pt-1">+{total - 4} pelanggan lainnya</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
