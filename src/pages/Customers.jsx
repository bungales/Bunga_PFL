import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import customersData from "../data/customers.json";
import { MdSearch, MdAdd, MdEdit, MdDelete, MdClose, MdVisibility } from "react-icons/md";

const loyaltyColor = { Gold: "text-kuning bg-yellow-100", Silver: "text-gray-500 bg-gray-100", Bronze: "text-orange-500 bg-orange-100" };
const statusColor = { active: "text-hijau bg-green-100", inactive: "text-merah bg-red-100" };

const emptyForm = { name: "", email: "", phone: "", loyalty: "Bronze" };

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const openAdd = () => { setForm(emptyForm); setEditData(null); setShowModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, email: c.email, phone: c.phone, loyalty: c.loyalty }); setEditData(c); setShowModal(true); };
  const handleDelete = (id) => { if (confirm("Hapus pelanggan ini?")) setCustomers(prev => prev.filter(c => c.id !== id)); };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      setCustomers(prev => prev.map(c => c.id === editData.id ? { ...c, ...form } : c));
    } else {
      const newC = { ...form, id: "C" + (customers.length + 1).toString().padStart(3, "0"), points: 0, lastTransaction: "-", totalSpent: 0, status: "active" };
      setCustomers(prev => [...prev, newC]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader title="Manajemen Pelanggan" breadcrumb={["Dashboard", "Pelanggan"]}>
        <button onClick={openAdd} className="flex items-center bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition">
          <MdAdd className="mr-1 text-lg" /> Tambah Pelanggan
        </button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        {/* Search */}
        <div className="relative mb-4 max-w-sm">
          <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-teks-samping text-lg" />
          <input
            type="text" placeholder="Cari nama atau telepon..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-garis rounded-xl text-sm w-full outline-none focus:border-primary bg-latar"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-teks-samping text-xs border-b border-garis">
                <th className="text-left pb-3 font-medium">Pelanggan</th>
                <th className="text-left pb-3 font-medium">Telepon</th>
                <th className="text-left pb-3 font-medium">Loyalty</th>
                <th className="text-left pb-3 font-medium">Poin</th>
                <th className="text-left pb-3 font-medium">Total Belanja</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-garis last:border-0 hover:bg-latar transition">
                  <td className="py-3">
                    <div className="flex items-center space-x-3">
                      <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=3b82f6&color=fff&size=64`} className="w-8 h-8 rounded-full" alt={c.name} />
                      <div>
                        <Link to={`/customers/${c.id}`} className="font-medium text-teks hover:text-primary hover:underline">{c.name}</Link>
                        <p className="text-xs text-teks-samping">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-teks-samping">{c.phone}</td>
                  <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${loyaltyColor[c.loyalty]}`}>{c.loyalty}</span></td>
                  <td className="py-3 font-semibold text-primary">{c.points}</td>
                  <td className="py-3 font-medium text-teks">Rp {c.totalSpent.toLocaleString()}</td>
                  <td className="py-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[c.status]}`}>{c.status === "active" ? "Aktif" : "Tidak Aktif"}</span></td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <Link to={`/customers/${c.id}`} className="p-1.5 bg-green-100 text-hijau rounded-lg hover:bg-green-200 transition" title="Lihat Detail"><MdVisibility /></Link>
                      <button onClick={() => openEdit(c)} className="p-1.5 bg-primary-light text-primary rounded-lg hover:bg-blue-200 transition"><MdEdit /></button>
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 bg-red-100 text-merah rounded-lg hover:bg-red-200 transition"><MdDelete /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-teks text-lg">{editData ? "Edit Pelanggan" : "Tambah Pelanggan"}</h3>
              <button onClick={() => setShowModal(false)} className="text-teks-samping hover:text-teks"><MdClose className="text-xl" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "phone"].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-teks mb-1 capitalize">{field === "name" ? "Nama" : field === "email" ? "Email" : "Telepon"}</label>
                  <input type="text" value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar" required />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-teks mb-1">Loyalty</label>
                <select value={form.loyalty} onChange={e => setForm({ ...form, loyalty: e.target.value })}
                  className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar">
                  <option>Bronze</option><option>Silver</option><option>Gold</option>
                </select>
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
