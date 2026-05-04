import { useState } from "react";
import PageHeader from "../components/PageHeader";
import transactionsData from "../data/transactions.json";
import { MdAdd, MdSearch, MdClose } from "react-icons/md";

const statusColor = { Selesai: "text-hijau bg-green-100", Proses: "text-primary bg-primary-light", Menunggu: "text-kuning bg-yellow-100" };
const emptyForm = { customerName: "", service: "Cuci Kering", weight: "", price: "", status: "Menunggu" };

export default function Transactions() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

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
  };

  return (
    <div>
      <PageHeader title="Riwayat Transaksi" breadcrumb={["Dashboard", "Transaksi"]}>
        <button onClick={() => setShowModal(true)} className="flex items-center bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition">
          <MdAdd className="mr-1 text-lg" /> Tambah Transaksi
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="relative mb-4 max-w-sm">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-teks-samping text-lg" />
          <input type="text" placeholder="Cari pelanggan atau ID..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-garis rounded-xl text-sm w-full outline-none focus:border-primary bg-latar" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-teks-samping text-xs border-b border-garis">
                {["ID", "Pelanggan", "Layanan", "Berat (kg)", "Total", "Tanggal", "Status"].map(h => (
                  <th key={h} className="text-left pb-3 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-garis last:border-0 hover:bg-latar transition">
                  <td className="py-3 font-mono text-xs text-teks-samping">{t.id}</td>
                  <td className="py-3 font-medium text-teks">{t.customerName}</td>
                  <td className="py-3 text-teks-samping">{t.service}</td>
                  <td className="py-3 text-center">{t.weight}</td>
                  <td className="py-3 font-semibold text-teks">Rp {t.price.toLocaleString()}</td>
                  <td className="py-3 text-teks-samping">{t.date}</td>
                  <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-teks text-lg">Tambah Transaksi</h3>
              <button onClick={() => setShowModal(false)}><MdClose className="text-xl text-teks-samping" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-teks mb-1">Nama Pelanggan</label>
                <input type="text" value={form.customerName} onChange={e => setForm({ ...form, customerName: e.target.value })}
                  className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-teks mb-1">Layanan</label>
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                  className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar">
                  <option>Cuci Kering</option><option>Cuci Setrika</option><option>Dry Clean</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-teks mb-1">Berat (kg)</label>
                  <input type="number" step="0.5" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })}
                    className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-teks mb-1">Harga (Rp)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                    className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar" required />
                </div>
              </div>
              <div className="flex space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-garis rounded-xl text-sm text-teks-samping hover:bg-latar transition">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
