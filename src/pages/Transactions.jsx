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
import { MdAdd } from "react-icons/md";

const statusType = { Selesai: "success", Proses: "primary", Menunggu: "warning" };
const emptyForm = { customerName: "", service: "Cuci Kering", weight: "", price: "", status: "Menunggu" };

export default function Transactions() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const filtered = transactions.filter(t =>
    t.customerName.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase())
  );

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

  return (
    <div>
      <PageHeader title="Riwayat Transaksi" breadcrumb={["Dashboard", "Transaksi"]}>
        <Button type="primary" onClick={() => setShowModal(true)}>
          <span className="flex items-center gap-1"><MdAdd className="text-lg" /> Tambah Transaksi</span>
        </Button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="mb-4">
          <SearchBar value={search} onChange={e => setSearch(e.target.value)}
            onClear={() => setSearch("")} placeholder="Cari pelanggan atau ID..." />
        </div>
        <Table headers={["ID", "Pelanggan", "Layanan", "Berat (kg)", "Total", "Tanggal", "Status"]}>
          {filtered.map(t => (
            <tr key={t.id} className="border-b border-garis last:border-0 hover:bg-latar transition">
              <td className="py-3 font-mono text-xs text-teks-samping">{t.id}</td>
              <td className="py-3 font-medium text-teks">{t.customerName}</td>
              <td className="py-3 text-teks-samping">{t.service}</td>
              <td className="py-3 text-center text-teks-samping">{t.weight}</td>
              <td className="py-3 font-semibold text-teks">Rp {t.price.toLocaleString()}</td>
              <td className="py-3 text-teks-samping">{t.date}</td>
              <td className="py-3"><Badge type={statusType[t.status]}>{t.status}</Badge></td>
            </tr>
          ))}
        </Table>
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
