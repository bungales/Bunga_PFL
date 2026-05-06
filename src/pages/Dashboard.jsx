import PageHeader from "../components/PageHeader";
import { MdPeople, MdReceipt, MdStar, MdTrendingUp, MdLocalLaundryService, MdNotifications } from "react-icons/md";
import customers from "../data/customers.json";
import transactions from "../data/transactions.json";

const stats = [
  {
    label: "Total Pelanggan", icon: <MdPeople className="text-3xl text-white" />,
    value: customers.length, sub: "+5 bulan ini", color: "bg-primary", light: "bg-primary-light", textColor: "text-primary"
  },
  {
    label: "Transaksi Bulan Ini", icon: <MdReceipt className="text-3xl text-white" />,
    value: transactions.filter(t => t.date.startsWith("2026-04") || t.date.startsWith("2026-05")).length,
    sub: "+12% dari bulan lalu", color: "bg-hijau", light: "bg-green-100", textColor: "text-hijau"
  },
  {
    label: "Pelanggan Aktif", icon: <MdStar className="text-3xl text-white" />,
    value: customers.filter(c => c.status === "active").length,
    sub: `${customers.filter(c => c.loyalty === "Gold").length} Gold member`, color: "bg-kuning", light: "bg-yellow-100", textColor: "text-kuning"
  },
  {
    label: "Pendapatan Bulan Ini", icon: <MdTrendingUp className="text-3xl text-white" />,
    value: "Rp " + (transactions.reduce((a, b) => a + b.price, 0) / 1000).toFixed(0) + "k",
    sub: "+8% dari bulan lalu", color: "bg-ungu", light: "bg-purple-100", textColor: "text-ungu"
  },
];

const recentTransactions = transactions.slice(0, 5);
const topCustomers = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5);

const loyaltyColor = { Gold: "text-kuning bg-yellow-100", Silver: "text-gray-500 bg-gray-100", Bronze: "text-orange-500 bg-orange-100" };
const statusColor = { Selesai: "text-hijau bg-green-100", Proses: "text-primary bg-primary-light", Menunggu: "text-kuning bg-yellow-100" };

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" breadcrumb={["Home", "Dashboard"]} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 flex items-center space-x-4">
            <div className={`${s.color} rounded-2xl p-3 flex-shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-teks-samping text-xs font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-teks">{s.value}</p>
              <p className={`text-xs font-medium ${s.textColor}`}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-teks">Transaksi Terbaru</h3>
            <span className="text-xs text-primary cursor-pointer hover:underline">Lihat semua</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-teks-samping text-xs border-b border-garis">
                  <th className="text-left pb-2 font-medium">Pelanggan</th>
                  <th className="text-left pb-2 font-medium">Layanan</th>
                  <th className="text-left pb-2 font-medium">Total</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="border-b border-garis last:border-0">
                    <td className="py-3 font-medium text-teks">{t.customerName}</td>
                    <td className="py-3 text-teks-samping">{t.service}</td>
                    <td className="py-3 font-semibold text-teks">Rp {t.price.toLocaleString()}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-teks mb-4">Top Pelanggan</h3>
          <div className="space-y-3">
            {topCustomers.map((c, i) => (
              <div key={c.id} className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-primary-light text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <img src={`https://avatar.iran.liara.run/public/${i + 10}`} className="w-8 h-8 rounded-full" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-teks truncate">{c.name}</p>
                  <p className="text-xs text-teks-samping">Rp {c.totalSpent.toLocaleString()}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${loyaltyColor[c.loyalty]}`}>{c.loyalty}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary rounded-2xl p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <MdLocalLaundryService className="text-3xl text-blue-200" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Hari ini</span>
          </div>
          <p className="text-3xl font-bold">{transactions.filter(t => t.status === "Proses").length}</p>
          <p className="text-blue-200 text-sm mt-1">Sedang Diproses</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <MdNotifications className="text-3xl text-kuning" />
            <span className="text-xs bg-yellow-100 text-kuning px-2 py-1 rounded-full">Perlu aksi</span>
          </div>
          <p className="text-3xl font-bold text-teks">{customers.filter(c => c.status === "inactive").length}</p>
          <p className="text-teks-samping text-sm mt-1">Pelanggan Tidak Aktif</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <MdStar className="text-3xl text-kuning" />
            <span className="text-xs bg-yellow-100 text-kuning px-2 py-1 rounded-full">Loyalty</span>
          </div>
          <p className="text-3xl font-bold text-teks">{customers.filter(c => c.loyalty === "Gold").length}</p>
          <p className="text-teks-samping text-sm mt-1">Gold Members</p>
        </div>
      </div>
    </div>
  );
}
