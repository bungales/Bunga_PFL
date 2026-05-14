import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import customersData from "../data/customers.json";
import transactionsData from "../data/transactions.json";
import { MdArrowBack, MdPerson, MdEmail, MdPhone, MdStar, MdReceipt } from "react-icons/md";

const loyaltyColor = {
  Gold: "text-kuning bg-yellow-100",
  Silver: "text-gray-500 bg-gray-100",
  Bronze: "text-orange-500 bg-orange-100",
};

const statusColor = {
  Selesai: "text-hijau bg-green-100",
  Proses: "text-primary bg-primary-light",
  Menunggu: "text-kuning bg-yellow-100",
};

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = customersData.find((c) => c.id === id);
  const customerTransactions = customer
    ? transactionsData.filter((t) => t.customerId === customer.id)
    : [];

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-teks-samping">
        <MdPerson className="text-6xl mb-4 opacity-30" />
        <p className="text-lg font-medium">Pelanggan tidak ditemukan</p>
        <Link to="/customers" className="mt-4 text-primary hover:underline text-sm">
          ← Kembali ke Pelanggan
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={`Detail Pelanggan`}
        breadcrumb={["Dashboard", "Pelanggan", customer.name]}
      >
        <Link
          to="/customers"
          className="flex items-center gap-1 text-sm text-teks-samping hover:text-teks transition"
        >
          <MdArrowBack /> Kembali
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Pelanggan */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=3b82f6&color=fff&size=128`}
              className="w-24 h-24 rounded-full border-4 border-primary-light"
              alt={customer.name}
            />
            <div>
              <h2 className="font-bold text-teks text-xl">{customer.name}</h2>
              <p className="text-sm text-teks-samping">{customer.id}</p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${loyaltyColor[customer.loyalty]}`}>
              {customer.loyalty} Member
            </span>
          </div>

          <div className="mt-6 space-y-3 border-t border-garis pt-4">
            <InfoRow icon={<MdEmail />} label="Email" value={customer.email} />
            <InfoRow icon={<MdPhone />} label="Telepon" value={customer.phone} />
            <InfoRow icon={<MdStar />} label="Poin Loyalitas" value={customer.points} />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <StatCard label="Total Belanja" value={`Rp ${customer.totalSpent.toLocaleString()}`} />
            <StatCard label="Transaksi" value={customerTransactions.length} />
          </div>
        </div>

        {/* Riwayat Transaksi */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <MdReceipt className="text-primary text-xl" />
            <h2 className="font-semibold text-teks">Riwayat Transaksi</h2>
            <span className="ml-auto text-xs text-teks-samping">
              {customerTransactions.length} transaksi
            </span>
          </div>

          {customerTransactions.length > 0 ? (
            <div className="space-y-3">
              {customerTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-4 border border-garis rounded-xl hover:bg-latar transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-teks-samping">{t.id}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-sm text-teks font-medium">{t.service}</p>
                    <p className="text-xs text-teks-samping">{t.date} • {t.weight} kg</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-teks">Rp {t.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-teks-samping">
              <MdReceipt className="text-4xl mx-auto mb-2 opacity-30" />
              <p className="text-sm">Belum ada transaksi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-primary text-lg">{icon}</span>
      <div className="flex-1">
        <p className="text-xs text-teks-samping">{label}</p>
        <p className="text-sm font-medium text-teks">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-latar rounded-xl p-3 text-center">
      <p className="text-xs text-teks-samping mb-1">{label}</p>
      <p className="font-bold text-teks">{value}</p>
    </div>
  );
}
