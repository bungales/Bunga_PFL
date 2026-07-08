import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Toast from "../../components/Toast";
import transactionsData from "../../data/transactions.json";
import {
  MdAdd, MdReceipt, MdCheckCircle, MdAutorenew, MdSchedule,
  MdSearch, MdClose, MdLocalLaundryService, MdTrendingUp,
  MdCalendarToday, MdPerson
} from "react-icons/md";

const statusConfig = {
  Selesai: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
  Proses:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    dot: "bg-blue-500 animate-pulse" },
  Menunggu:{ bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400" },
};

const serviceIcon = {
  "Cuci Kering": "🧺",
  "Cuci Setrika": "👕",
  "Dry Clean": "✨",
};

const emptyForm = { customerName: "", service: "Cuci Kering", weight: "", price: "", status: "Menunggu" };

export default function Transactions() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const filtered = transactions.filter(t => {
    const matchSearch = t.customerName.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "Semua" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newT = {
      ...form,
      id: "T" + (transactions.length + 1).toString().padStart(3, "0"),
      customerId: "C000",
      date: new Date().toISOString().split("T")[0],
      trackingStatus: "Diterima",
      weight: parseFloat(form.weight),
      price: parseInt(form.price),
    };
    setTransactions(prev => [newT, ...prev]);
    setShowModal(false);
    setForm(emptyForm);
    setToast({ show: true, type: "success", message: "Transaksi baru berhasil ditambahkan." });
  };

  const totalRevenue = transactions.reduce((sum, t) => sum + (t.price || 0), 0);

  const stats = [
    { label: "Total Transaksi", value: transactions.length, icon: <MdReceipt />, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", trend: "+12%" },
    { label: "Selesai", value: transactions.filter(t => t.status === "Selesai").length, icon: <MdCheckCircle />, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", trend: "+8%" },
    { label: "Proses", value: transactions.filter(t => t.status === "Proses").length, icon: <MdAutorenew />, bg: "bg-blue-50", text: "text-violet-600", border: "border-violet-100", trend: "aktif" },
    { label: "Menunggu", value: transactions.filter(t => t.status === "Menunggu").length, icon: <MdSchedule />, bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", trend: "antrian" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-teks-samping mb-1">Dashboard / Transaksi</p>
          <h1 className="text-2xl font-bold text-teks">Riwayat Transaksi</h1>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 text-sm">
          <MdAdd className="text-lg" /> Tambah Transaksi
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl border ${s.border} shadow-sm p-5 hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-3">
              <div className={`${s.bg} ${s.text} p-2.5 rounded-xl text-xl`}>{s.icon}</div>
              <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">{s.trend}</span>
            </div>
            <p className="text-3xl font-bold text-teks mb-0.5">{s.value}</p>
            <p className="text-xs text-teks-samping font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-5 flex items-center justify-between text-white shadow-lg shadow-blue-200">
        <div>
          <p className="text-blue-200 text-sm font-medium mb-1">Total Pendapatan</p>
          <p className="text-3xl font-bold">Rp {totalRevenue.toLocaleString("id-ID")}</p>
          <p className="text-blue-200 text-xs mt-1">dari {transactions.length} transaksi</p>
        </div>
        <div className="opacity-20 text-7xl"><MdTrendingUp /></div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari pelanggan atau ID transaksi..."
              className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <MdClose className="text-sm" />
              </button>
            )}
          </div>
          <div className="flex gap-1.5 bg-gray-50 rounded-xl p-1 border border-gray-100">
            {["Semua", "Selesai", "Proses", "Menunggu"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterStatus === s ? "bg-white text-blue-600 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700"}`}>
                {s}
              </button>
            ))}
          </div>
          <span className="text-xs text-teks-samping ml-auto">{filtered.length} transaksi</span>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdReceipt className="text-3xl text-gray-400" />
            </div>
            <p className="font-semibold text-teks mb-1">Tidak ada transaksi</p>
            <p className="text-sm text-teks-samping">Coba ubah filter atau tambah transaksi baru</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["ID", "Pelanggan", "Layanan", "Berat", "Total", "Tanggal", "Status"].map(h => (
                    <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(t => {
                  const sc = statusConfig[t.status] || statusConfig.Menunggu;
                  return (
                    <tr key={t.id} className="border-b border-gray-50 hover:bg-blue-50/20 transition-colors group">
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-semibold">{t.id}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs font-bold flex-shrink-0">
                            {t.customerName.charAt(0)}
                          </div>
                          <span className="font-semibold text-teks text-sm">{t.customerName}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="flex items-center gap-1.5 text-sm text-teks-samping">
                          <span>{serviceIcon[t.service] || "🧺"}</span>
                          {t.service}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-teks-samping text-center">{t.weight} kg</td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-blue-600 text-sm">Rp {t.price.toLocaleString("id-ID")}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="flex items-center gap-1.5 text-sm text-teks-samping">
                          <MdCalendarToday className="text-gray-400 text-xs" />{t.date}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title="Tambah Transaksi Baru">
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nama Pelanggan" placeholder="Nama pelanggan" value={form.customerName}
            onChange={e => setForm({ ...form, customerName: e.target.value })} required />
          <SelectField label="Layanan" value={form.service}
            onChange={e => setForm({ ...form, service: e.target.value })}
            options={["Cuci Kering", "Cuci Setrika", "Dry Clean"]} />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Berat (kg)" type="number" placeholder="0.0" value={form.weight}
              onChange={e => setForm({ ...form, weight: e.target.value })} required />
            <InputField label="Harga (Rp)" type="number" placeholder="0" value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })} required />
          </div>
          <SelectField label="Status" value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            options={["Menunggu", "Proses", "Selesai"]} />
          <div className="flex gap-3 pt-2">
            <Button type="secondary" className="flex-1" onClick={() => setShowModal(false)}>Batal</Button>
            <Button type="primary" className="flex-1">Simpan</Button>
          </div>
        </form>
      </Modal>

      <Toast show={toast.show} type={toast.type} message={toast.message}
        onClose={() => setToast(t => ({ ...t, show: false }))} />
    </div>
  );
}
