import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Alert from "../../components/Alert";
import Toast from "../../components/Toast";
import { MdWhatsapp, MdSms, MdAdd, MdSend, MdNotifications, MdCheckCircle, MdSchedule, MdPerson } from "react-icons/md";

const initialNotifs = [
  { id: 1, customer: "Andi Pratama", phone: "081234567890", message: "Cucian Anda sudah selesai dan siap diambil!", type: "WhatsApp", time: "10:30", status: "Terkirim" },
  { id: 2, customer: "Dian Rahayu", phone: "084567890123", message: "Pengingat: Cucian Anda sudah 2 hari belum diambil.", type: "SMS", time: "09:15", status: "Terkirim" },
  { id: 3, customer: "Gilang Permana", phone: "087890123456", message: "Promo spesial! Diskon 20% untuk cuci setrika hari ini.", type: "WhatsApp", time: "08:00", status: "Pending" },
  { id: 4, customer: "Sari Wulandari", phone: "081012345678", message: "Cucian Anda sedang dalam proses pencucian.", type: "WhatsApp", time: "11:00", status: "Terkirim" },
  { id: 5, customer: "Budi Santoso", phone: "082345678901", message: "Terima kasih telah menggunakan layanan kami!", type: "SMS", time: "07:45", status: "Terkirim" },
];

const statusType = { Terkirim: "success", Pending: "warning" };

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer: "", phone: "", message: "", type: "WhatsApp" });
  const [alert, setAlert] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });
  const [filter, setFilter] = useState("Semua");

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

  const filtered = notifs.filter(n => {
    if (filter === "Semua") return true;
    if (filter === "WhatsApp") return n.type === "WhatsApp";
    if (filter === "SMS") return n.type === "SMS";
    if (filter === "Pending") return n.status === "Pending";
    return true;
  });

  const stats = [
    {
      label: "Total Terkirim",
      value: notifs.filter(n => n.status === "Terkirim").length,
      icon: <MdCheckCircle className="text-2xl" />,
      bg: "bg-gradient-to-br from-green-500 to-emerald-600",
      light: "bg-green-50",
      text: "text-green-600",
    },
    {
      label: "Via WhatsApp",
      value: notifs.filter(n => n.type === "WhatsApp").length,
      icon: <MdWhatsapp className="text-2xl" />,
      bg: "bg-gradient-to-br from-green-400 to-teal-500",
      light: "bg-teal-50",
      text: "text-teal-600",
    },
    {
      label: "Via SMS",
      value: notifs.filter(n => n.type === "SMS").length,
      icon: <MdSms className="text-2xl" />,
      bg: "bg-gradient-to-br from-blue-500 to-blue-600",
      light: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      label: "Pending",
      value: notifs.filter(n => n.status === "Pending").length,
      icon: <MdSchedule className="text-2xl" />,
      bg: "bg-gradient-to-br from-amber-400 to-orange-500",
      light: "bg-amber-50",
      text: "text-amber-600",
    },
  ];

  const tabs = ["Semua", "WhatsApp", "SMS", "Pending"];

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

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4 border border-garis/50">
            <div className={`${s.light} ${s.text} p-3 rounded-2xl`}>
              {s.icon}
            </div>
            <div>
              <p className="text-teks-samping text-xs font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-teks">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Riwayat */}
      <div className="bg-white rounded-2xl shadow-sm p-5 border border-garis/50">
        {/* Header + Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-bold text-teks">Riwayat Notifikasi</h3>
            <p className="text-xs text-teks-samping mt-0.5">{filtered.length} dari {notifs.length} notifikasi</p>
          </div>
          <div className="flex gap-2 bg-latar rounded-xl p-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filter === tab
                    ? "bg-white text-primary shadow-sm"
                    : "text-teks-samping hover:text-teks"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-teks-samping">
              <MdNotifications className="text-5xl mx-auto mb-3 opacity-20" />
              <p className="text-sm">Tidak ada notifikasi di kategori ini</p>
            </div>
          ) : (
            filtered.map(n => (
              <div key={n.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${
                n.status === "Pending" ? "border-amber-200 bg-amber-50/40" : "border-garis hover:bg-latar"
              }`}>
                {/* Avatar icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg ${
                  n.type === "WhatsApp" ? "bg-gradient-to-br from-green-400 to-emerald-500" : "bg-gradient-to-br from-blue-400 to-blue-600"
                }`}>
                  {n.type === "WhatsApp" ? <MdWhatsapp /> : <MdSms />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <MdPerson className="text-teks-samping text-sm" />
                      <span className="font-semibold text-teks text-sm">{n.customer}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        n.type === "WhatsApp" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      }`}>{n.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-teks-samping">{n.time}</span>
                      <Badge type={statusType[n.status]}>{n.status}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-teks-samping mt-0.5 mb-1">{n.phone}</p>
                  <p className="text-sm text-teks leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} title="Kirim Notifikasi Baru">
        <form onSubmit={handleSend} className="space-y-4">
          <InputField label="Nama Pelanggan" placeholder="Nama pelanggan" value={form.customer}
            onChange={e => setForm({ ...form, customer: e.target.value })} required />
          <InputField label="Nomor Telepon" placeholder="08xxxxxxxxxx" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })} required />
          <SelectField label="Media Pengiriman" value={form.type}
            onChange={e => setForm({ ...form, type: e.target.value })}
            options={["WhatsApp", "SMS"]} />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-teks">Pesan <span className="text-merah">*</span></label>
            <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
              placeholder="Tulis pesan notifikasi..."
              className="w-full px-4 py-2.5 border border-garis rounded-xl text-sm outline-none focus:border-primary bg-latar resize-none transition" required />
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
