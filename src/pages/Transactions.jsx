import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Toast from "../components/Toast";
import transactionsData from "../data/transactions.json";
import { MdAdd, MdReceipt, MdCheckCircle, MdAutorenew, MdSchedule } from "react-icons/md";

const statusType = { Selesai: "success", Proses: "primary", Menunggu: "warning" };
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
      ...form, id: "T" + (transactions.length + 1).toString().padStart(3, "0"),
      customerId: "C000", date: new Date().toISOString().split("T")[0],
      trackingStatus: "Diterima", weight: parseFloat(form.weight), price: parseInt(form.price),
    };
    setTransactions(prev => [newT, ...prev]);
    setShowModal(false);
    setForm(emptyForm);
    setToast({ show: true, type: "success", message: "Transaksi baru berhasil ditambahkan." });
  };

  const stats = [
    { label: "Total", value: transactions.length, icon: <MdReceipt />, bg: "bg-blue-50", text: "text-blue-600" },
    { label: "Selesai", value: transactions.filter(t => t.status === "Selesai").length, icon: <MdCheckCircle />, bg: "bg-green-50", text: "text-green-600" },
    { label: "Proses", value: transactions.filter(t => t.status === "Proses").length, icon: <MdAutorenew />, bg: "bg-purple-50", text: "text-purple-600" },
    { label: "Menunggu", value: transactions.filter(t => t.status === "Menunggu").length, icon: <MdSchedule />, bg: "bg-amber-50", text: "text-amber-600" },
  ];

  return (
    <div>
      <PageHeader title="Riwayat Transaksi" breadcrumb={["Dashboard", "Transaksi"]}>
        <Button type="primary" onClick={() => setShowModal(true)}>
          <span className="flex items-center gap-1"><MdAdd className="text-lg" /> Tambah Transaksi</span>
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl shadow-sm border border-garis/50 p-5 flex items-center gap-4`}>
            <div className={`${s.bg} ${s.text} p-3 rounded-2xl text-2xl`}>{s.icon}</div>
            <div>
              <p className="text-xs text-teks-samping font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-teks">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5 border border-garis/50">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex-1">
            <SearchBar value={search} onChange={e => setSearch(e.target.value)}
              onClear={() => setSearch("")} placeholder="Cari pelanggan atau ID transaksi..." />
          </div>
          <div className="flex gap-2 bg-latar rounded-xl p-1 self-start">
            {["Semua", "Selesai", "Proses", "Menunggu"].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterStatus === s ? "bg-white text-primary shadow-sm" : "text-teks-samping hover:text-teks"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <Table headers={["ID", "Pelanggan", "Layanan", "Berat", "Total", "Tanggal", "Status"]}>
          {filtered.map(t => (
            <tr key={t.id} className="border-b border-garis last:border-0 hover:bg-latar/60 transition">
              <td className="py-3.5 font-mono text-xs bg-latar/50 px-2 rounded-lg text-teks-samping">{t.id}</td>
              <td className="py-3.5 font-semibold text-teks">{t.customerName}</td>
              <td className="py-3.5 text-teks-samping text-sm">{t.service}</td>
              <td className="py-3.5 text-center text-teks-samping text-sm">{t.weight} kg</td>
              <td className="py-3.5 font-bold text-primary">Rp {t.price.toLocaleString()}</td>
              <td className="py-3.5 text-teks-samping text-sm">{t.date}</td>
              <td className="py-3.5"><Badge type={statusType[t.status]}>{t.status}</Badge></td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-teks-samping">
            <MdReceipt className="text-5xl mx-auto mb-3 opacity-20" />
            <p className="text-sm">Tidak ada transaksi ditemukan</p>
          </div>
        )}
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title="Tambah Transaksi">
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
