import { useState, useRef, useEffect } from "react";
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

const segmentType = { VIP: "gold", Loyal: "silver", Regular: "primary", New: "info" };
const statusType = { active: "success", inactive: "danger" };

const emptyForm = {
  customerName: "", email: "", phone: "", address: "",
  customerType: "Pekerja", segment: "New"
};

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const searchRef = useRef(null);
  useEffect(() => { if (searchRef.current) searchRef.current.focus(); }, []);

  const showToast = (type, message) => setToast({ show: true, type, message });

  const filtered = customers.filter(c =>
    c.customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const openAdd = () => { setForm(emptyForm); setEditData(null); setShowModal(true); };
  const openEdit = (c) => {
    setForm({
      customerName: c.customerName, email: c.email, phone: c.phone,
      address: c.address, customerType: c.customerType, segment: c.segment
    });
    setEditData(c);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Hapus pelanggan ini?")) {
      setCustomers(prev => prev.filter(c => c.customerId !== id));
      showToast("success", "Pelanggan berhasil dihapus.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editData) {
      setCustomers(prev => prev.map(c => c.customerId === editData.customerId ? { ...c, ...form } : c));
      showToast("success", "Data pelanggan berhasil diperbarui.");
    } else {
      const newC = {
        ...form,
        customerId: "C" + (customers.length + 1).toString().padStart(3, "0"),
        points: 0, totalTransactions: 0, totalSpent: 0,
        joinDate: new Date().toISOString().split("T")[0],
        lastTransaction: "-", status: "active"
      };
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
            ref={searchRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            placeholder="Cari nama atau nomor HP..."
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
          <Table headers={["Pelanggan", "No. HP", "Jenis", "Segmen", "Poin", "Total Belanja", "Status", "Aksi"]}>
            {filtered.map((c) => (
              <tr key={c.customerId} className="border-b border-garis last:border-0 hover:bg-latar transition">
                <td className="py-3">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.customerName)}&background=2563eb&color=fff&size=64`}
                      name={c.customerName}
                      size="sm"
                    />
                    <div>
                      <Link to={`/customers/${c.customerId}`} className="font-medium text-teks hover:text-primary hover:underline">{c.customerName}</Link>
                      <p className="text-xs text-teks-samping">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-teks-samping text-sm">{c.phone}</td>
                <td className="py-3 text-sm text-teks-samping">{c.customerType}</td>
                <td className="py-3"><Badge type={segmentType[c.segment] || "info"}>{c.segment}</Badge></td>
                <td className="py-3 font-semibold text-primary text-sm">{c.points}</td>
                <td className="py-3 font-medium text-teks text-sm">Rp {c.totalSpent.toLocaleString()}</td>
                <td className="py-3"><Badge type={statusType[c.status]}>{c.status === "active" ? "Aktif" : "Tidak Aktif"}</Badge></td>
                <td className="py-3">
                  <div className="flex space-x-2">
                    <Link to={`/customers/${c.customerId}`}>
                      <Button type="success" size="sm"><MdVisibility /></Button>
                    </Link>
                    <Button type="primary" size="sm" onClick={() => openEdit(c)}><MdEdit /></Button>
                    <Button type="danger" size="sm" onClick={() => handleDelete(c.customerId)}><MdDelete /></Button>
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
          <InputField label="Nama Lengkap" placeholder="Nama lengkap" value={form.customerName}
            onChange={e => setForm({ ...form, customerName: e.target.value })} required />
          <InputField label="Email" type="email" placeholder="email@domain.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <InputField label="No. HP / WhatsApp" placeholder="08xxxxxxxxxx" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} required />
          <InputField label="Alamat" placeholder="Jl. Nama Jalan, Kota" value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })} />
          <SelectField label="Jenis Pelanggan" value={form.customerType}
            onChange={e => setForm({ ...form, customerType: e.target.value })}
            options={["Pelajar", "Pekerja", "Ibu Rumah Tangga", "Lainnya"]} />
          <SelectField label="Segmen" value={form.segment}
            onChange={e => setForm({ ...form, segment: e.target.value })}
            options={["New", "Regular", "Loyal", "VIP"]} />
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
