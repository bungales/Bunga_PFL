import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
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
        <Button type="primary">
          <span className="flex items-center gap-1"><MdDownload className="text-lg" /> Export Laporan</span>
        </Button>
      </PageHeader>

      {/* KPI StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Pelanggan Aktif" value={activeCount} icon={<MdPeople />} iconBg="bg-primary-light" iconColor="text-primary" />
        <StatCard label="Tidak Aktif" value={inactiveCount} icon={<MdPeople />} iconBg="bg-red-100" iconColor="text-merah" />
        <StatCard label="Tingkat Retensi" value={retention + "%"} icon={<MdRepeat />} iconBg="bg-green-100" iconColor="text-hijau" />
        <StatCard label="Total Pendapatan" value={"Rp " + (totalRevenue / 1000000).toFixed(1) + "jt"} icon={<MdTrendingUp />} iconBg="bg-yellow-100" iconColor="text-kuning" />
      </div>

      {/* Revenue Chart */}
      <Card className="mb-4">
        <SectionTitle title="Pendapatan Bulanan" subtitle="2026" />
        <div className="flex items-end gap-3" style={{ height: 160 }}>
          {monthlyData.map((d, i) => {
            const barH = Math.round((d.revenue / maxRevenue) * 120);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-teks-samping">Rp{(d.revenue / 1000000).toFixed(1)}jt</span>
                <div
                  className="w-full bg-primary hover:bg-primary-dark rounded-t-lg transition-all"
                  style={{ height: barH }}
                />
                <span className="text-xs text-teks-samping">{d.month}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <SectionTitle title="Layanan Terpopuler" />
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
        </Card>

        <Card>
          <SectionTitle title="Distribusi Loyalty" action={<MdStar className="text-kuning text-xl" />} />
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
        </Card>
      </div>
    </div>
  );
}
