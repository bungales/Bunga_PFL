import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import customers from "../../data/customers.json";
import transactions from "../../data/transactions.json";
import { MdDownload, MdTrendingUp, MdPeople, MdRepeat, MdStar, MdAttachMoney, MdTableChart, MdPictureAsPdf } from "react-icons/md";

const monthlyData = [
  { month: "Jan", revenue: 1200000, customers: 18, transactions: 45 },
  { month: "Feb", revenue: 1450000, customers: 20, transactions: 52 },
  { month: "Mar", revenue: 1100000, customers: 17, transactions: 40 },
  { month: "Apr", revenue: 1800000, customers: 25, transactions: 68 },
  { month: "Mei", revenue: 950000, customers: 14, transactions: 35 },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function Reports() {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const activeCount = customers.filter(c => c.status === "active").length;
  const inactiveCount = customers.filter(c => c.status === "inactive").length;
  const totalRevenue = transactions.reduce((a, b) => a + b.price, 0);
  const retention = ((activeCount / customers.length) * 100).toFixed(0);

  const exportCSV = () => {
    const rows = [
      ["ID", "Pelanggan", "Layanan", "Berat (kg)", "Total (Rp)", "Tanggal", "Status"],
      ...transactions.map(t => [t.id, t.customerName, t.service, t.weight, t.price, t.date, t.status])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-transaksi-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportCustomersCSV = () => {
    const rows = [
      ["ID", "Nama", "Email", "No. HP", "Segmen", "Poin", "Total Belanja", "Status"],
      ...customers.map(c => [c.customerId, c.customerName, c.email, c.phone, c.segment, c.points, c.totalSpent, c.status])
    ];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `laporan-pelanggan-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const kpis = [
    { label: "Pelanggan Aktif", value: activeCount, icon: <MdPeople />, bg: "bg-blue-50", text: "text-blue-600", trend: "+5%" },
    { label: "Tidak Aktif", value: inactiveCount, icon: <MdPeople />, bg: "bg-red-50", text: "text-red-600", trend: "-2%" },
    { label: "Tingkat Retensi", value: retention + "%", icon: <MdRepeat />, bg: "bg-green-50", text: "text-green-600", trend: "+3%" },
    { label: "Total Pendapatan", value: "Rp " + (totalRevenue / 1000000).toFixed(1) + "jt", icon: <MdAttachMoney />, bg: "bg-yellow-50", text: "text-yellow-600", trend: "+8%" },
  ];

  return (
    <div>
      <PageHeader title="Laporan CRM" breadcrumb={["Dashboard", "Laporan"]}>
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(v => !v)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-all text-sm">
            <MdDownload className="text-lg" /> Export Laporan ▾
          </button>
          {showExportMenu && (
            <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 w-56 overflow-hidden">
              <div className="p-2">
                <button onClick={exportCSV}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-left transition-colors text-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                    <MdTableChart />
                  </div>
                  <div>
                    <p className="font-semibold text-teks">Data Transaksi</p>
                    <p className="text-xs text-teks-samping">Download .CSV</p>
                  </div>
                </button>
                <button onClick={exportCustomersCSV}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-left transition-colors text-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    <MdPeople />
                  </div>
                  <div>
                    <p className="font-semibold text-teks">Data Pelanggan</p>
                    <p className="text-xs text-teks-samping">Download .CSV</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-garis/50 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`${k.bg} ${k.text} p-2.5 rounded-xl text-xl`}>{k.icon}</div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${k.trend.startsWith("+") ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {k.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-teks">{k.value}</p>
            <p className="text-xs text-teks-samping mt-0.5 font-medium">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="mb-5">
        <SectionTitle title="Pendapatan Bulanan" subtitle="Periode 2026" />
        <div className="flex items-end gap-3 pt-2" style={{ height: 180 }}>
          {monthlyData.map((d, i) => {
            const barH = Math.round((d.revenue / maxRevenue) * 130);
            const isMax = d.revenue === maxRevenue;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <span className="text-xs text-teks-samping opacity-0 group-hover:opacity-100 transition-opacity">
                  Rp{(d.revenue / 1000000).toFixed(1)}jt
                </span>
                <div
                  className={`w-full rounded-t-xl transition-all cursor-pointer hover:opacity-90 ${isMax ? "bg-gradient-to-t from-blue-600 to-blue-400" : "bg-gradient-to-t from-blue-300 to-blue-200 hover:from-blue-600 hover:to-blue-400"}`}
                  style={{ height: barH }}
                  title={`Rp ${d.revenue.toLocaleString()}`}
                />
                <span className="text-xs text-teks-samping font-medium">{d.month}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Layanan */}
        <Card>
          <SectionTitle title="Layanan Terpopuler" />
          <div className="space-y-4 mt-2">
            {["Cuci Kering", "Cuci Setrika", "Dry Clean"].map((svc, i) => {
              const count = transactions.filter(t => t.service === svc).length;
              const pct = Math.round((count / transactions.length) * 100);
              const colors = ["bg-blue-500", "bg-emerald-500", "bg-purple-500"];
              return (
                <div key={svc}>
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${colors[i]}`} />
                      <span className="font-semibold text-teks">{svc}</span>
                    </div>
                    <span className="text-teks-samping">{count} transaksi <span className="font-bold text-teks">({pct}%)</span></span>
                  </div>
                  <div className="w-full bg-latar rounded-full h-2.5">
                    <div className={`${colors[i]} h-2.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Segmen */}
        <Card>
          <SectionTitle title="Distribusi Segmen" action={<MdStar className="text-yellow-400 text-xl" />} />
          <div className="space-y-4 mt-2">
            {[
              { seg: "VIP", color: "bg-yellow-400" },
              { seg: "Loyal", color: "bg-blue-500" },
              { seg: "Regular", color: "bg-gray-400" },
              { seg: "New", color: "bg-green-400" },
            ].map(({ seg, color }) => {
              const count = customers.filter(c => c.segment === seg).length;
              const pct = Math.round((count / customers.length) * 100);
              return (
                <div key={seg}>
                  <div className="flex justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                      <span className="font-semibold text-teks">{seg}</span>
                    </div>
                    <span className="text-teks-samping">{count} pelanggan <span className="font-bold text-teks">({pct}%)</span></span>
                  </div>
                  <div className="w-full bg-latar rounded-full h-2.5">
                    <div className={`${color} h-2.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
