import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { MdWhatsapp, MdSms, MdAdd, MdClose, MdSend } from "react-icons/md";

const initialNotifs = [
  { id: 1, customer: "Andi Pratama", phone: "081234567890", message: "Cucian Anda sudah selesai dan siap diambil!", type: "WhatsApp", time: "10:30", status: "Terkirim" },
  { id: 2, customer: "Dian Rahayu", phone: "084567890123", message: "Pengingat: Cucian Anda sudah 2 hari belum diambil.", type: "SMS", time: "09:15", status: "Terkirim" },
  { id: 3, customer: "Gilang Permana", phone: "087890123456", message: "Promo spesial! Diskon 20% untuk cuci setrika hari ini.", type: "WhatsApp", time: "08:00", status: "Pending" },
  { id: 4, customer: "Sari Wulandari", phone: "081012345678", message: "Cucian Anda sedang dalam proses pencucian.", type: "WhatsApp", time: "11:00", status: "Terkirim" },
  { id: 5, customer: "Budi Santoso", phone: "082345678901", message: "Terima kasih telah menggunakan layanan kami!", type: "SMS", time: "07:45", status: "Terkirim" },
];

const typeIcon = { WhatsApp: <MdWhatsapp className="text-hijau text-xl" />, SMS: <MdSms className="text-primary text-xl" /> };
const statusColor = { Terkirim: "text-hijau bg-green-100", Pending: "text-kuning bg-yellow-100" };

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", message: "", type: "WhatsApp" });

  const handleSend = (e) => {
    e.preventDefault();
    setNotifs(prev => [{
      id: prev.length + 1, ...form,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      status: "Terkirim"
    }, ...prev]);
    setShowModal(false);
    setForm({ customer: "", phone: "", message: "", type: "WhatsApp" });
  };

  return (
    <div>
      <PageHeader title="Notifikasi Otomatis" breadcrumb={["Dashboard", "Notifikasi"]}>
        <button onClick={() => setShowModal(true)} className="flex items-center bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition">
          <MdAdd className="mr-1 text-lg" /> Kirim Notifikasi
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Terkirim", value: notifs.filter(n => n.status === "Terkirim").length, color: "text-hijau" },
          { label: "Via WhatsApp", value: notifs.filter(n => n.type === "WhatsApp").length, color: "text-hijau" },
          { label: "Via SMS", value: notifs.filter(n => n.type === "SMS").length, color: "text-primary" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-teks-samping text-sm">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-semibold text-teks mb-4">Riwayat Notifikasi</h3>
        <div className="space-y-3">
          {notifs.map(n => (
            <div key={n.id} className="flex items-start space-x-4 p-4 border border-garis rounded-xl hover:bg-latar transition">
              <div className="p-2 bg-latar rounded-xl">{typeIcon[n.type]}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-teks text-sm">{n.customer}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[n.status]}`}>{n.status}</span>
                </div>
                <p className="text-xs text-teks-samping mt-0.5">{n.phone} · {n.type} · {n.time}</p>
                <p className="text-sm text-teks mt-1">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-teks text-lg">Kirim Notifikasi</h3>
              <button onClick={() => setShowModal(false)}><MdClose className="text-xl text-teks-samping" /></button>
            </div>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-teks mb-1">Nama Pelanggan</label>
                <input type="text" value={form.customer} onChange={e => setForm({ ...form, customer: e.target.value })}
                  className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-teks mb-1">Nomor Telepon</label>
                <input type="text" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-teks mb-1">Media</label>
                <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar">
                  <option>WhatsApp</option><option>SMS</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-teks mb-1">Pesan</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar resize-none" required />
              </div>
              <div className="flex space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-garis rounded-xl text-sm text-teks-samping hover:bg-latar transition">Batal</button>
                <button type="submit" className="flex-1 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-dark transition flex items-center justify-center">
                  <MdSend className="mr-1" /> Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
