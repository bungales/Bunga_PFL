import { useParams, Link } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import EmptyState from "../../components/EmptyState";
import customersData from "../../data/customers.json";
import transactionsData from "../../data/transactions.json";
import { MdArrowBack, MdPerson, MdEmail, MdPhone, MdStar, MdReceipt, MdLocationOn, MdPeople, MdCalendarToday, MdShoppingCart } from "react-icons/md";

const segmentType = { VIP: "gold", Loyal: "silver", Regular: "primary", New: "info" };
const statusType = { Selesai: "success", Proses: "primary", Menunggu: "warning" };

export default function CustomerDetail() {
  const { id } = useParams();
  const customer = customersData.find((c) => c.customerId === id);
  const customerTransactions = customer
    ? transactionsData.filter((t) => t.customerId === customer.customerId)
    : [];

  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-teks-samping">
        <MdPerson className="text-6xl mb-4 opacity-30" />
        <p className="text-lg font-medium">Pelanggan tidak ditemukan</p>
        <Link to="/customers" className="mt-4 text-primary hover:underline text-sm">← Kembali ke Pelanggan</Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Detail Pelanggan" breadcrumb={["Dashboard", "Pelanggan", customer.customerName]}>
        <Link to="/customers" className="flex items-center gap-1 text-sm text-teks-samping hover:text-teks transition">
          <MdArrowBack /> Kembali
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Pelanggan */}
        <Card>
          <div className="flex flex-col items-center text-center gap-4">
            <Avatar
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.customerName)}&background=2563eb&color=fff&size=128`}
              name={customer.customerName}
              size="lg"
            />
            <div>
              <h2 className="font-bold text-teks text-xl">{customer.customerName}</h2>
              <p className="text-sm text-teks-samping">{customer.customerId}</p>
            </div>
            <Badge type={segmentType[customer.segment] || "info"}>{customer.segment} Member</Badge>
          </div>

          <div className="mt-6 space-y-3 border-t border-garis pt-4">
            <InfoRow icon={<MdEmail />} label="Email" value={customer.email} />
            <InfoRow icon={<MdPhone />} label="No. HP / WhatsApp" value={customer.phone} />
            <InfoRow icon={<MdLocationOn />} label="Alamat" value={customer.address} />
            <InfoRow icon={<MdPeople />} label="Jenis Pelanggan" value={customer.customerType} />
            <InfoRow icon={<MdCalendarToday />} label="Tanggal Bergabung" value={customer.joinDate} />
            <InfoRow icon={<MdCalendarToday />} label="Transaksi Terakhir" value={customer.lastTransaction} />
            <InfoRow icon={<MdStar />} label="Poin Loyalitas" value={customer.points} />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <MiniStat label="Total Belanja" value={`Rp ${(customer.totalSpent / 1000).toFixed(0)}k`} />
            <MiniStat label="Transaksi" value={customer.totalTransactions} />
            <MiniStat label="Status" value={customer.status === "active" ? "Aktif" : "Tidak Aktif"} />
          </div>
        </Card>

        {/* Riwayat Transaksi */}
        <Card className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <MdReceipt className="text-primary text-xl" />
            <h2 className="font-semibold text-teks">Riwayat Transaksi</h2>
            <span className="ml-auto text-xs text-teks-samping">{customerTransactions.length} transaksi</span>
          </div>

          {customerTransactions.length > 0 ? (
            <div className="space-y-3">
              {customerTransactions.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-4 border border-garis rounded-xl hover:bg-latar transition">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-teks-samping">{t.id}</span>
                      <Badge type={statusType[t.status]}>{t.status}</Badge>
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
            <EmptyState
              icon={<MdReceipt />}
              title="Belum ada transaksi"
              description="Pelanggan ini belum memiliki riwayat transaksi."
            />
          )}
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-primary text-lg mt-0.5">{icon}</span>
      <div className="flex-1">
        <p className="text-xs text-teks-samping">{label}</p>
        <p className="text-sm font-medium text-teks">{value}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-latar rounded-xl p-3 text-center">
      <p className="text-xs text-teks-samping mb-1">{label}</p>
      <p className="font-bold text-teks text-sm">{value}</p>
    </div>
  );
}
