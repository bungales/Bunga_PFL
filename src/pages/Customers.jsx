import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import SearchBar from "../components/SearchBar";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Table from "../components/Table";
import Toast from "../components/Toast";
import EmptyState from "../components/EmptyState";
import customersData from "../data/customers.json";
import { MdAdd, MdEdit, MdDelete, MdVisibility, MdPeople } from "react-icons/md";

const loyaltyType = { Gold: "gold", Silver: "silver", Bronze: "bronze" };
const statusType = { active: "success", inactive: "danger" };
const emptyForm = { name: "", email: "", phone: "", loyalty: "Bronze" };

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const showToast = (type, message) => setToast({ show: true, type, message });

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const openAdd = () => { setForm(emptyForm); setEditData(null); setShowModal(true); };
  const openEdit = (c) => { setForm({ name: c.name, email: c.email, phone: c.phone, loyalty: c.loyalty }); setEditData(c); setShowModal(true); };

  const handleDelete = (id) => {
    if (confirm("Hapus pelanggan ini?")) {
      setCustomers(prev => prev.filter(c => c.id !== id));
      showToast("success", "Pelanggan berhasil dihapus.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      setCustomers(prev => prev.map(c => c.id === editData.id ? { ...c, ...form } : c));
      showToast("success", "Data pelanggan berhasil diperbarui.");
    } else {
      const newC = { ...form, id: "C" + (customers.length + 1).toString().padStart(3, "0"), points: 0, lastTransaction: "-", totalSpent: 0, status: "active" };
      setCustomers(prev => [...prev, newC]);
      showToast("success", "Pelanggan baru berhasil ditambahkan.");
    }
    setShowModal(false);
  };

  return (
    <div>
      <PageHeader title="Manajemen Pelanggan" breadcrumb={["Dashboard", "Pelanggan"]}>
        <Button type="primary" onClick={openAdd}>
          <span className="flex items-center gap-1"><MdAdd className="text-lg" /> Tambah Pelanggan</span>
        </Button>
      </PageHeader>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="mb-4">
          <SearchBar
            value={search}
            onChange={e => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            placeholder="Cari nama atau telepon..."
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<MdPeople />}
            title="Pelanggan tidak ditemukan"
            description="Coba ubah kata kunci pencarian atau tambah pelanggan baru."
            action={<Button type="primary" onClick={openAdd}>Tambah Pelanggan</Button>}
          />
        ) : (
          <Table headers={["Pelanggan", "Telepon", "Loyalty", "Poin", "Total Belanja", "Status", "Aksi"]}>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-garis last:border-0 hover:bg-latar transition">
                <td className="py-3">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=2563eb&color=fff&size=64`}
                      name={c.name}
                      size="sm"
                    />
                    <div>
                      <Link to={`/customers/${c.id}`} className="font-medium text-teks hover:text-primary hover:underline">{c.name}</Link>
                      <p className="text-xs text-teks-samping">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-teks-samping text-sm">{c.phone}</td>
                <td className="py-3"><Badge type={loyaltyType[c.loyalty]}>{c.loyalty}</Badge></td>
                <td className="py-3 font-semibold text-primary text-sm">{c.points}</td>
                <td className="py-3 font-medium text-teks text-sm">Rp {c.totalSpent.toLocaleString()}</td>
                <td className="py-3"><Badge type={statusType[c.status]}>{c.status === "active" ? "Aktif" : "Tidak Aktif"}</Badge></td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <Link to={`/customers/${c.id}`}>
                      <Button type="success" size="sm"><MdVisibility /></Button>
                    </Link>
                    <Button type="primary" size="sm" onClick={() => openEdit(c)}><MdEdit /></Button>
                    <Button type="danger" size="sm" onClick={() => handleDelete(c.id)}><MdDelete /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title={editData ? "Edit Pelanggan" : "Tambah Pelanggan"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nama" placeholder="Nama lengkap" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required />
          <InputField label="Email" type="email" placeholder="email@domain.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <InputField label="Telepon" placeholder="08xxxxxxxxxx" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} required />
          <SelectField label="Loyalty" value={form.loyalty}
            onChange={e => setForm({ ...form, loyalty: e.target.value })}
            options={["Bronze", "Silver", "Gold"]} />
          <div className="flex gap-3 pt-2">
            <Button type="secondary" className="flex-1" onClick={() => setShowModal(false)}>Batal</Button>
            <Button type="primary" className="flex-1">Simpan</Button>
          </div>
        </form>
      </Modal>

      <Toast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast(t => ({ ...t, show: false }))} />
    </div>
  );
}
