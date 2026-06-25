import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
import StatCard from "../../components/StatCard";
import Table from "../../components/Table";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import CustomerCard from "../../components/CustomerCard";
import SearchBar from "../../components/SearchBar";
import EmptyState from "../../components/EmptyState";
import SectionTitle from "../../components/SectionTitle";
import Accordion from "../../components/Accordion";
import ProgressBar from "../../components/ProgressBar";
import {
  MdPeople, MdReceipt, MdTrendingUp, MdHistory,
  MdSearch, MdLocalLaundryService, MdInbox
} from "react-icons/md";
const sampleCustomer = {
  id: "C001", name: "Budi Santoso", email: "budi@email.com",
  phone: "081234567890", loyalty: "Gold", totalSpent: 450000, points: 320,
};

const tableHeaders = ["ID", "Pelanggan", "Layanan", "Total", "Status"];
const tableRows = [
  { id: "T001", name: "Budi Santoso", service: "Cuci Setrika", total: "Rp 35.000", status: "Selesai", statusType: "success" },
  { id: "T002", name: "Siti Rahayu", service: "Dry Clean", total: "Rp 75.000", status: "Proses", statusType: "primary" },
  { id: "T003", name: "Ahmad Fauzi", service: "Cuci Kering", total: "Rp 20.000", status: "Menunggu", statusType: "warning" },
];

export default function Components() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [selectVal, setSelectVal] = useState("Bronze");
  const [alerts, setAlerts] = useState({ success: true, danger: true, warning: true, info: true });

  return (
    <div className="space-y-8">
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

      {/* 1. BUTTON */}
      <Card>
        <SectionTitle title="1. Button" subtitle="Berbagai varian tombol aksi" />
        <div className="flex flex-wrap gap-3">
          <Button type="primary">Primary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="success">Success</Button>
          <Button type="danger">Danger</Button>
          <Button type="warning">Warning</Button>
          <Button type="ghost">Ghost</Button>
          <Button type="primary" disabled>Disabled</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <Button type="primary" size="sm">Small</Button>
          <Button type="primary" size="md">Medium</Button>
          <Button type="primary" size="lg">Large</Button>
        </div>
      </Card>

      {/* 2. BADGE */}
      <Card>
        <SectionTitle title="2. Badge" subtitle="Label status data pelanggan & transaksi" />
        <div className="flex flex-wrap gap-3">
          <Badge type="primary">Aktif</Badge>
          <Badge type="success">Selesai</Badge>
          <Badge type="danger">Tidak Aktif</Badge>
          <Badge type="warning">Menunggu</Badge>
          <Badge type="secondary">Proses</Badge>
          <Badge type="gold">Gold</Badge>
          <Badge type="silver">Silver</Badge>
          <Badge type="bronze">Bronze</Badge>
        </div>
      </Card>

      {/* 3. AVATAR */}
      <Card>
        <SectionTitle title="3. Avatar" subtitle="Foto profil atau inisial pengguna" />
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col items-center gap-1">
            <Avatar name="Budi Santoso" size="sm" />
            <span className="text-xs text-teks-samping">Small</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar name="Siti Rahayu" size="md" />
            <span className="text-xs text-teks-samping">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar name="Ahmad Fauzi" size="lg" />
            <span className="text-xs text-teks-samping">Large</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar
              src="https://avatar.iran.liara.run/public/1"
              name="Admin"
              size="md"
              online
            />
            <span className="text-xs text-teks-samping">Online</span>
          </div>
        </div>
      </Card>

      {/* 4. STAT CARD */}
      <Card>
        <SectionTitle title="4. StatCard" subtitle="Kartu ringkasan statistik dashboard" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Pelanggan" value="1,284" trend="8.5%" isUp={true}
            icon={<MdPeople />} iconBg="bg-[#e5e7ff]" iconColor="text-[#4318ff]" />
          <StatCard label="Total Transaksi" value="3,920" trend="1.3%" isUp={true}
            icon={<MdReceipt />} iconBg="bg-[#fff3e0]" iconColor="text-[#ffb547]" />
          <StatCard label="Total Pendapatan" value="Rp 89jt" trend="4.3%" isUp={false}
            icon={<MdTrendingUp />} iconBg="bg-[#e2f9f0]" iconColor="text-hijau" />
          <StatCard label="Pending" value="24" trend="1.8%" isUp={true}
            icon={<MdHistory />} iconBg="bg-[#ffe5e5]" iconColor="text-merah" />
        </div>
      </Card>

      {/* 5. CARD */}
      <Card>
        <SectionTitle title="5. Card" subtitle="Pembungkus konten umum" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border border-garis">
            <h4 className="font-semibold text-teks mb-1">Judul Card</h4>
            <p className="text-sm text-teks-samping">Ini adalah isi dari card. Bisa berisi teks, gambar, atau komponen lain.</p>
          </Card>
          <Card className="border border-primary/30 bg-primary-light/30">
            <h4 className="font-semibold text-primary mb-1">Card Highlight</h4>
            <p className="text-sm text-teks-samping">Card dengan warna aksen untuk informasi penting.</p>
          </Card>
          <Card className="border border-hijau/30 bg-green-50">
            <h4 className="font-semibold text-hijau mb-1">Card Sukses</h4>
            <p className="text-sm text-teks-samping">Card untuk menampilkan status berhasil.</p>
          </Card>
        </div>
      </Card>

      {/* 6. TABLE */}
      <Card>
        <SectionTitle title="6. Table" subtitle="Tabel data transaksi" />
        <Table headers={tableHeaders}>
          {tableRows.map((row) => (
            <tr key={row.id} className="border-b border-garis last:border-0 hover:bg-latar transition">
              <td className="py-3 font-mono text-xs text-teks-samping px-2">{row.id}</td>
              <td className="py-3 font-medium text-teks px-2">{row.name}</td>
              <td className="py-3 text-teks-samping px-2">{row.service}</td>
              <td className="py-3 font-semibold text-teks px-2">{row.total}</td>
              <td className="py-3 px-2"><Badge type={row.statusType}>{row.status}</Badge></td>
            </tr>
          ))}
        </Table>
      </Card>

      {/* 7. INPUT FIELD */}
      <Card>
        <SectionTitle title="7. InputField" subtitle="Input form dengan label dan validasi" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
          <InputField label="Nama Pelanggan" placeholder="Masukkan nama..." value={inputVal}
            onChange={e => setInputVal(e.target.value)} required icon={<MdPeople />} />
          <InputField label="Email" type="email" placeholder="email@domain.com" />
          <InputField label="Dengan Error" placeholder="Isi field ini..." error="Field ini wajib diisi" />
          <InputField label="Tanpa Label" placeholder="Placeholder saja..." />
        </div>
      </Card>

      {/* 8. SELECT FIELD */}
      <Card>
        <SectionTitle title="8. SelectField" subtitle="Dropdown pilihan untuk form" />
        <div className="max-w-xs">
          <SelectField
            label="Tier Loyalitas"
            value={selectVal}
            onChange={e => setSelectVal(e.target.value)}
            options={["Bronze", "Silver", "Gold"]}
            required
          />
          <p className="text-xs text-teks-samping mt-2">Dipilih: <span className="font-semibold text-primary">{selectVal}</span></p>
        </div>
      </Card>

      {/* 9. SEARCH BAR */}
      <Card>
        <SectionTitle title="9. SearchBar" subtitle="Input pencarian dengan tombol clear" />
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          placeholder="Cari pelanggan atau transaksi..."
        />
        {search && <p className="text-xs text-teks-samping mt-2">Mencari: <span className="font-semibold text-primary">"{search}"</span></p>}
      </Card>

      {/* 10. ALERT */}
      <Card>
        <SectionTitle title="10. Alert" subtitle="Notifikasi feedback untuk pengguna" />
        <div className="space-y-3">
          {alerts.success && <Alert type="success" message="Data pelanggan berhasil disimpan." onClose={() => setAlerts(a => ({ ...a, success: false }))} />}
          {alerts.danger && <Alert type="danger" message="Gagal menghapus data. Coba lagi." onClose={() => setAlerts(a => ({ ...a, danger: false }))} />}
          {alerts.warning && <Alert type="warning" message="Sesi Anda akan berakhir dalam 5 menit." onClose={() => setAlerts(a => ({ ...a, warning: false }))} />}
          {alerts.info && <Alert type="info" message="Terdapat 3 transaksi baru yang perlu diproses." onClose={() => setAlerts(a => ({ ...a, info: false }))} />}
          {!Object.values(alerts).some(Boolean) && (
            <Button type="secondary" onClick={() => setAlerts({ success: true, danger: true, warning: true, info: true })}>
              Reset Alert
            </Button>
          )}
        </div>
      </Card>

      {/* 11. ACCORDION */}
      <Card>
        <SectionTitle title="11. Accordion" subtitle="Konten lipat untuk FAQ atau detail info" />
        <Accordion items={[
          {
            title: "Apa itu program loyalitas Netto Laundry?",
            content: "Program loyalitas memberikan poin setiap transaksi. Kumpulkan poin untuk naik tier Bronze → Silver → Gold dan dapatkan reward menarik.",
            defaultOpen: true,
          },
          {
            title: "Bagaimana cara mendapatkan poin?",
            content: "Setiap Rp 1.000 transaksi = 1 poin. Poin otomatis ditambahkan setelah transaksi berstatus Selesai.",
          },
          {
            title: "Apa keuntungan member Gold?",
            content: "Member Gold mendapat diskon 15% setiap transaksi, prioritas antrian, dan akses reward eksklusif.",
          },
          {
            title: "Apakah poin bisa kadaluarsa?",
            content: "Poin berlaku selama 12 bulan sejak transaksi terakhir. Pastikan rutin bertransaksi agar poin tidak hangus.",
          },
        ]} />
      </Card>

      {/* 12. CUSTOMER CARD */}
      <Card>
        <SectionTitle title="12. CustomerCard" subtitle="Kartu ringkasan info pelanggan" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CustomerCard customer={sampleCustomer} />
          <CustomerCard customer={{ ...sampleCustomer, id: "C002", name: "Siti Rahayu", email: "siti@email.com", loyalty: "Silver", totalSpent: 210000, points: 150 }} />
          <CustomerCard customer={{ ...sampleCustomer, id: "C003", name: "Ahmad Fauzi", email: "ahmad@email.com", loyalty: "Bronze", totalSpent: 85000, points: 40 }} />
        </div>
      </Card>

      {/* 13. PROGRESS BAR */}
      <Card>
        <SectionTitle title="13. ProgressBar" subtitle="Indikator progress poin loyalitas" />
        <div className="space-y-4 max-w-md">
          <ProgressBar label="Bronze → Silver" value={320} max={500} color="warning" size="md" />
          <ProgressBar label="Silver → Gold" value={750} max={1000} color="gold" size="md" />
          <ProgressBar label="Target Transaksi Bulan Ini" value={68} max={100} color="primary" size="lg" />
          <ProgressBar label="Kapasitas Mesin" value={3} max={5} color="success" size="sm" showPercent={false} />
        </div>
      </Card>

      {/* 14. EMPTY STATE */}
      <Card>
        <SectionTitle title="14. EmptyState" subtitle="Tampilan saat data kosong" />
        <EmptyState
          icon={<MdInbox />}
          title="Belum ada transaksi"
          description="Tambahkan transaksi pertama untuk mulai melacak laundry pelanggan."
          action={<Button type="primary">Tambah Transaksi</Button>}
        />
      </Card>

      {/* 15. SECTION TITLE */}
      <Card>
        <SectionTitle title="15. SectionTitle" subtitle="Header section dengan aksi opsional"
          action={<Button type="secondary" size="sm">Lihat Semua</Button>}
        />
        <div className="space-y-3">
          <SectionTitle title="Tanpa Aksi" subtitle="Subtitle deskriptif di sini" />
          <SectionTitle title="Dengan Aksi" action={<Button type="primary" size="sm">+ Tambah</Button>} />
          <SectionTitle title="Hanya Judul" />
        </div>
      </Card>
    </div>
  );
}
