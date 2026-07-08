import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Toast from "../../components/Toast";
import customersData from "../../data/customers.json";
import {
  MdAdd, MdEdit, MdDelete, MdVisibility, MdQrCode, MdDownload,
  MdPeople, MdStar, MdSearch, MdClose, MdFilterList,
  MdTrendingUp, MdVerified, MdNewReleases
} from "react-icons/md";

const segmentType = { VIP: "gold", Loyal: "silver", Regular: "primary", New: "info" };
const segmentColor = {
  VIP: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "👑" },
  Loyal: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", icon: "💎" },
  Regular: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "⭐" },
  New: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: "🌱" },
};
const statusType = { active: "success", inactive: "danger" };

const emptyForm = {
  customerName: "", email: "", phone: "", address: "",
  customerType: "Pekerja", segment: "New"
};

export default function Customers() {
  const [customers, setCustomers] = useState(() => {
    const extra = JSON.parse(localStorage.getItem("extraCustomers") || "[]");
    const existing = customersData.map(c => {
      const updated = extra.find(e => e.customerId === c.customerId);
      return updated || c;
    });
    const newOnes = extra.filter(e => !customersData.find(c => c.customerId === e.customerId));
    return [...existing, ...newOnes];
  });
  const [search, setSearch] = useState("");
  const [filterSegment, setFilterSegment] = useState("Semua");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });
  const [qrCustomer, setQrCustomer] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => { if (searchRef.current) searchRef.current.focus(); }, []);

  const showToast = (type, message) => setToast({ show: true, type, message });

  const filtered = customers.filter(c => {
    const matchSearch = c.customerName.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search);
    const matchSegment = filterSegment === "Semua" || c.segment === filterSegment;
    return matchSearch && matchSegment;
  });

  const stats = [
    { label: "Total Pelanggan", value: customers.length, icon: <MdPeople />, gradient: "from-blue-500 to-blue-600", light: "bg-blue-50 text-blue-600" },
    { label: "VIP", value: customers.filter(c => c.segment === "VIP").length, icon: "👑", gradient: "from-amber-400 to-amber-500", light: "bg-amber-50 text-amber-600" },
    { label: "Aktif", value: customers.filter(c => c.status === "active").length, icon: <MdVerified />, gradient: "from-emerald-500 to-emerald-600", light: "bg-emerald-50 text-emerald-600" },
    { label: "Baru (30 hari)", value: customers.filter(c => c.segment === "New").length, icon: <MdNewReleases />, gradient: "from-violet-500 to-violet-600", light: "bg-violet-50 text-violet-600" },
  ];

  const openAdd = () => { setForm(emptyForm); setEditData(null); setShowModal(true); };
  const openEdit = (c) => {
    setForm({ customerName: c.customerName, email: c.email, phone: c.phone, address: c.address, customerType: c.customerType, segment: c.segment });
    setEditData(c); setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Hapus pelanggan ini?")) {
      setCustomers(prev => prev.filter(c => c.customerId !== id));
      showToast("success", "Pelanggan berhasil dihapus.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let savedCustomer;
    if (editData) {
      const updated = { ...editData, ...form };
      setCustomers(prev => prev.map(c => c.customerId === editData.customerId ? updated : c));
      showToast("success", "Data pelanggan berhasil diperbarui.");
      savedCustomer = updated;
      const stored = JSON.parse(localStorage.getItem("extraCustomers") || "[]");
      localStorage.setItem("extraCustomers", JSON.stringify(stored.map(c => c.customerId === editData.customerId ? updated : c)));
    } else {
      const newC = { ...form, customerId: "C" + Date.now(), points: 0, totalTransactions: 0, totalSpent: 0, joinDate: new Date().toISOString().split("T")[0], lastTransaction: "-", status: "active" };
      setCustomers(prev => [...prev, newC]);
      showToast("success", "Pelanggan baru berhasil ditambahkan.");
      savedCustomer = newC;
      const stored = JSON.parse(localStorage.getItem("extraCustomers") || "[]");
      stored.push(newC);
      localStorage.setItem("extraCustomers", JSON.stringify(stored));
    }
    setShowModal(false);
    setQrCustomer(savedCustomer);
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-modal-svg");
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300; canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "white"; ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const a = document.createElement("a");
      a.download = `QR-${qrCustomer?.customerId}.png`;
      a.href = canvas.toDataURL("image/png"); a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgStr)));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs text-teks-samping mb-1">Dashboard / Pelanggan</p>
          <h1 className="text-2xl font-bold text-teks">Manajemen Pelanggan</h1>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-200 transition-all duration-200 text-sm">
          <MdAdd className="text-lg" /> Tambah Pelanggan
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`${s.light} p-3 rounded-xl text-xl flex-shrink-0`}>
              {typeof s.icon === "string" ? <span>{s.icon}</span> : s.icon}
            </div>
            <div>
              <p className="text-xs text-teks-samping font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-teks">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input ref={searchRef} value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama atau nomor HP..."
              className="w-full pl-9 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <MdClose className="text-sm" />
              </button>
            )}
          </div>
          {/* Segment filter */}
          <div className="flex gap-1.5 bg-gray-50 rounded-xl p-1 border border-gray-100">
            {["Semua", "VIP", "Loyal", "Regular", "New"].map(seg => (
              <button key={seg} onClick={() => setFilterSegment(seg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${filterSegment === seg ? "bg-white text-blue-600 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700"}`}>
                {seg}
              </button>
            ))}
          </div>
          <span className="text-xs text-teks-samping ml-auto">{filtered.length} pelanggan</span>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdPeople className="text-3xl text-gray-400" />
            </div>
            <p className="font-semibold text-teks mb-1">Tidak ada pelanggan</p>
            <p className="text-sm text-teks-samping mb-4">Coba ubah filter atau tambah pelanggan baru</p>
            <button onClick={openAdd} className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">Tambah Pelanggan</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Pelanggan", "No. HP", "Jenis", "Segmen", "Poin", "Total Belanja", "Status", "Aksi"].map(h => (
                    <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const seg = segmentColor[c.segment] || segmentColor.New;
                  return (
                    <tr key={c.customerId} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.customerName)}&background=2563eb&color=fff&size=64`}
                              alt={c.customerName} className="w-9 h-9 rounded-full ring-2 ring-white shadow-sm" />
                            {c.segment === "VIP" && <span className="absolute -top-1 -right-1 text-xs">👑</span>}
                          </div>
                          <div>
                            <Link to={`/admin/customers/${c.customerId}`} className="font-semibold text-teks hover:text-blue-600 transition-colors text-sm">{c.customerName}</Link>
                            <p className="text-xs text-teks-samping">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-teks-samping">{c.phone}</td>
                      <td className="py-3.5 px-4 text-sm text-teks-samping">{c.customerType}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${seg.bg} ${seg.text} ${seg.border}`}>
                          {seg.icon} {c.segment}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="flex items-center gap-1 font-bold text-blue-600 text-sm">
                          <MdStar className="text-amber-400" />{c.points}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-teks text-sm">
                        Rp {c.totalSpent.toLocaleString("id-ID")}
                      </td>
                      <td className="py-3.5 px-4">
                        {c.status === "active" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />Aktif
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />Tidak Aktif
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                          <Link to={`/admin/customers/${c.customerId}`}>
                            <button className="w-8 h-8 flex items-center justify-center bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors" title="Detail">
                              <MdVisibility className="text-base" />
                            </button>
                          </Link>
                          <button onClick={() => setQrCustomer(c)} className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors" title="QR Code">
                            <MdQrCode className="text-base" />
                          </button>
                          <button onClick={() => openEdit(c)} className="w-8 h-8 flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" title="Edit">
                            <MdEdit className="text-base" />
                          </button>
                          <button onClick={() => handleDelete(c.customerId)} className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors" title="Hapus">
                            <MdDelete className="text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title={editData ? "Edit Pelanggan" : "Tambah Pelanggan Baru"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Nama Lengkap" placeholder="Nama lengkap" value={form.customerName}
            onChange={e => setForm({ ...form, customerName: e.target.value })} required />
          <InputField label="Email" type="email" placeholder="email@domain.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
          <InputField label="No. HP / WhatsApp" placeholder="08xxxxxxxxxx" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} required />
          <InputField label="Alamat" placeholder="Jl. Nama Jalan, Kota" value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Jenis Pelanggan" value={form.customerType}
              onChange={e => setForm({ ...form, customerType: e.target.value })}
              options={["Pelajar", "Pekerja", "Ibu Rumah Tangga", "Lainnya"]} />
            <SelectField label="Segmen" value={form.segment}
              onChange={e => setForm({ ...form, segment: e.target.value })}
              options={["New", "Regular", "Loyal", "VIP"]} />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="secondary" className="flex-1" onClick={() => setShowModal(false)}>Batal</Button>
            <Button type="primary" className="flex-1">Simpan</Button>
          </div>
        </form>
      </Modal>

      <Toast show={toast.show} type={toast.type} message={toast.message} onClose={() => setToast(t => ({ ...t, show: false }))} />

      {/* Modal QR Code */}
      <Modal show={!!qrCustomer} onClose={() => setQrCustomer(null)} title="QR Check-In Pelanggan">
        {qrCustomer && (() => {
          const scanUrl = `${window.location.origin}/scan/${qrCustomer.customerId}`;
          return (
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 mb-4">
                <p className="font-bold text-teks text-lg">{qrCustomer.customerName}</p>
                <p className="text-sm text-teks-samping">{qrCustomer.phone} · {qrCustomer.segment}</p>
              </div>
              <div className="flex justify-center mb-4">
                <div className="p-4 border-2 border-blue-100 rounded-2xl bg-white shadow-sm">
                  <QRCodeSVG id="qr-modal-svg" value={scanUrl} size={200} level="M" includeMargin={false} />
                </div>
              </div>
              <a href={scanUrl} target="_blank" rel="noreferrer"
                className="block text-xs text-blue-600 hover:underline mb-5 break-all px-2">{scanUrl}</a>
              <div className="flex gap-2">
                <Button type="secondary" className="flex-1" onClick={() => setQrCustomer(null)}>Tutup</Button>
                <a href={scanUrl} target="_blank" rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 border border-gray-200 rounded-xl text-sm font-semibold text-teks hover:bg-gray-50 transition">
                  Buka Tab
                </a>
                <Button type="primary" className="flex-1" onClick={handleDownloadQR}>
                  <span className="flex items-center justify-center gap-1"><MdDownload /> Unduh</span>
                </Button>
              </div>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
