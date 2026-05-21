import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Alert from "../components/Alert";
import Toast from "../components/Toast";
import SectionTitle from "../components/SectionTitle";
import { MdWhatsapp, MdSms, MdAdd, MdSend } from "react-icons/md";

const initialNotifs = [
  { id: 1, customer: "Andi Pratama", phone: "081234567890", message: "Cucian Anda sudah selesai dan siap diambil!", type: "WhatsApp", time: "10:30", status: "Terkirim" },
  { id: 2, customer: "Dian Rahayu", phone: "084567890123", message: "Pengingat: Cucian Anda sudah 2 hari belum diambil.", type: "SMS", time: "09:15", status: "Terkirim" },
  { id: 3, customer: "Gilang Permana", phone: "087890123456", message: "Promo spesial! Diskon 20% untuk cuci setrika hari ini.", type: "WhatsApp", time: "08:00", status: "Pending" },
  { id: 4, customer: "Sari Wulandari", phone: "081012345678", message: "Cucian Anda sedang dalam proses pencucian.", type: "WhatsApp", time: "11:00", status: "Terkirim" },
  { id: 5, customer: "Budi Santoso", phone: "082345678901", message: "Terima kasih telah menggunakan layanan kami!", type: "SMS", time: "07:45", status: "Terkirim" },
];

const typeIcon = { WhatsApp: <MdWhatsapp className="text-hijau text-xl" />, SMS: <MdSms className="text-primary text-xl" /> };
const statusType = { Terkirim: "success", Pending: "warning" };

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", message: "", type: "WhatsApp" });
  const [alert, setAlert] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });

  const handleSend = (e) => {
    e.preventDefault();
    setNotifs(prev => [{
      id: prev.length + 1, ...form,
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      status: "Terkirim"
    }, ...prev]);
    setShowModal(false);
    setForm({ customer: "", phone: "", message: "", type: "WhatsApp" });
    setAlert(true);
    setToast({ show: true, type: "success", message: `Notifikasi berhasil dikirim ke ${form.customer}.` });
  };

  return (
    <div>
      <PageHeader title="Notifikasi Otomatis" breadcrumb={["Dashboard", "Notifikasi"]}>
        <Button type="primary" onClick={() => setShowModal(true)}>
          <span className="flex items-center gap-1"><MdAdd className="text-lg" /> Kirim Notifikasi</span>
        </Button>
      </PageHeader>

      {alert && (
        <div className="mb-4">
          <Alert type="success" message="Notifikasi berhasil dikirim ke pelanggan." onClose={() => setAlert(false)} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Terkirim", value: notifs.filter(n => n.status === "Terkirim").length, type: "success" },
          { label: "Via WhatsApp", value: notifs.filter(n => n.type === "WhatsApp").length, type: "primary" },
          { label: "Via SMS", value: notifs.filter(n => n.type === "SMS").length, type: "primary" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
            <p className="text-teks-samping text-sm">{s.label}</p>
            <p className="text-3xl font-bold text-teks">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <SectionTitle title="Riwayat Notifikasi" subtitle={`${notifs.length} notifikasi terkirim`} />
        <div className="space-y-3">
          {notifs.map(n => (
            <div key={n.id} className="flex items-start space-x-4 p-4 border border-garis rounded-xl hover:bg-latar transition">
              <div className="p-2 bg-latar rounded-xl">{typeIcon[n.type]}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-teks text-sm">{n.customer}</p>
                  <Badge type={statusType[n.status]}>{n.status}</Badge>
                </div>
                <p className="text-xs text-teks-samping mt-0.5">{n.phone} · {n.type} · {n.time}</p>
                <p className="text-sm text-teks mt-1">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)} title="Kirim Notifikasi">
        <form onSubmit={handleSend} className="space-y-4">
          <InputField label="Nama Pelanggan" placeholder="Nama pelanggan" value={form.customer}
            onChange={e => setForm({ ...form, customer: e.target.value })} required />
          <InputField label="Nomor Telepon" placeholder="08xxxxxxxxxx" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} required />
          <SelectField label="Media" value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            options={["WhatsApp", "SMS"]} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-teks">Pesan <span className="text-merah">*</span></label>
            <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar resize-none" required />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="secondary" className="flex-1" onClick={() => setShowModal(false)}>Batal</Button>
            <Button type="primary" className="flex-1">
              <span className="flex items-center justify-center gap-1"><MdSend /> Kirim</span>
            </Button>
          </div>
        </form>
      </Modal>

      <Toast show={toast.show} type={toast.type} message={toast.message}
        onClose={() => setToast(t => ({ ...t, show: false }))} />
    </div>
  );
}
