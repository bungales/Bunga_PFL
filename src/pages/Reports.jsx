import PageHeader from "../components/PageHeader";
import customers from "../data/customers.json";
import transactions from "../data/transactions.json";
import { MdDownload, MdTrendingUp, MdPeople, MdRepeat, MdStar } from "react-icons/md";

const monthlyData = [
  { month: "Jan", revenue: 1200000, customers: 18, transactions: 45 },
  { month: "Feb", revenue: 1450000, customers: 20, transactions: 52 },
  { month: "Mar", revenue: 1100000, customers: 17, transactions: 40 },
  { month: "Apr", revenue: 1800000, customers: 25, transactions: 68 },
  { month: "Mei", revenue: 950000, customers: 14, transactions: 35 },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

export default function Reports() {
  const activeCount = customers.filter(c => c.status === "active").length;
  const inactiveCount = customers.filter(c => c.status === "inactive").length;
  const totalRevenue = transactions.reduce((a, b) => a + b.price, 0);
  const retention = ((activeCount / customers.length) * 100).toFixed(0);

  return (
    <div>
      <PageHeader title="Laporan CRM" breadcrumb={["Dashboard", "Laporan"]}>
        <button className="flex items-center bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition">
          <MdDownload className="mr-1 text-lg" /> Export Laporan
        </button>
      </PageHeader>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Pelanggan Aktif", value: activeCount, icon: <MdPeople className="text-2xl text-primary" />, bg: "bg-primary-light" },
          { label: "Pelanggan Tidak Aktif", value: inactiveCount, icon: <MdPeople className="text-2xl text-merah" />, bg: "bg-red-100" },
          { label: "Tingkat Retensi", value: retention + "%", icon: <MdRepeat className="text-2xl text-hijau" />, bg: "bg-green-100" },
          { label: "Total Pendapatan", value: "Rp " + (totalRevenue / 1000000).toFixed(1) + "jt", icon: <MdTrendingUp className="text-2xl text-kuning" />, bg: "bg-yellow-100" },
        ].map((k, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 flex items-center space-x-4">
            <div className={`${k.bg} p-3 rounded-xl`}>{k.icon}</div>
            <div>
              <p className="text-teks-samping text-xs">{k.label}</p>
              <p className="text-2xl font-bold text-teks">{k.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart (CSS-based bar chart) */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-teks">Pendapatan Bulanan</h3>
          <span className="text-xs text-teks-samping">2026</span>
        </div>
        <div className="flex items-end space-x-4 h-40">
          {monthlyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <span className="text-xs text-teks-samping mb-1">Rp{(d.revenue / 1000000).toFixed(1)}jt</span>
              <div
                className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary-dark"
                style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
              />
              <span className="text-xs text-teks-samping mt-2">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-teks mb-4">Layanan Terpopuler</h3>
          {["Cuci Kering", "Cuci Setrika", "Dry Clean"].map(svc => {
            const count = transactions.filter(t => t.service === svc).length;
            const pct = Math.round((count / transactions.length) * 100);
            return (
              <div key={svc} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-teks font-medium">{svc}</span>
                  <span className="text-teks-samping">{count} transaksi ({pct}%)</span>
                </div>
                <div className="w-full bg-latar rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center mb-4">
            <MdStar className="text-kuning text-xl mr-2" />
            <h3 className="font-semibold text-teks">Distribusi Loyalty</h3>
          </div>
          {["Gold", "Silver", "Bronze"].map(tier => {
            const count = customers.filter(c => c.loyalty === tier).length;
            const pct = Math.round((count / customers.length) * 100);
            const colors = { Gold: "bg-kuning", Silver: "bg-gray-400", Bronze: "bg-orange-400" };
            return (
              <div key={tier} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-teks font-medium">{tier}</span>
                  <span className="text-teks-samping">{count} ({pct}%)</span>
                </div>
                <div className="w-full bg-latar rounded-full h-2">
                  <div className={`${colors[tier]} h-2 rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
