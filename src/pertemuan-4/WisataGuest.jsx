import { useState } from "react";
import wisataData from "./wisata.json";

// ── Reusable: Tag Badge ────────────────────────────────────────────────────
function TagBadge({ tag }) {
  return (
    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-medium">
      {tag}
    </span>
  );
}

// ── Reusable: Modal Detail ─────────────────────────────────────────────────
function ModalDetail({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-50 rounded-2xl shadow-2xl w-full max-w-lg border border-amber-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gambar */}
        <div className="relative">
          <img
            src={item.gambar}
            alt={item.nama}
            className="w-full h-52 object-cover"
            onError={(e) => { e.target.src = "https://placehold.co/400x200?text=Wisata"; }}
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-stone-800/70 text-amber-100 w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-900 transition text-lg font-bold"
          >
            ✕
          </button>
          <span className="absolute top-3 left-3 bg-stone-800/80 text-amber-100 text-xs font-semibold px-2 py-1 rounded-full">
            {item.kategori}
          </span>
        </div>

        {/* Konten */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h2 className="text-xl font-bold text-stone-700">{item.nama}</h2>
            <span className="bg-amber-400 text-white text-sm font-bold px-2 py-0.5 rounded-full ml-2 shrink-0">
              ⭐ {item.rating}
            </span>
          </div>

          <p className="text-stone-500 text-sm mb-4">📍 {item.provinsi}</p>

          {/* Info detail */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 space-y-2 text-sm">
            <p className="text-stone-600">
              <span className="font-semibold text-stone-700">Pengelola</span>
              <span className="mx-2">:</span>
              {item.detail.pengelola}
            </p>
            <p className="text-stone-600">
              <span className="font-semibold text-stone-700">Jam Buka</span>
              <span className="mx-2">:</span>
              {item.detail.jamBuka}
            </p>
            <div>
              <span className="font-semibold text-stone-700">Fasilitas</span>
              <span className="mx-2">:</span>
              <span className="text-stone-600">{item.detail.fasilitas.join(", ")}</span>
            </div>
          </div>

          {/* Harga */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-stone-400">Harga Tiket</p>
              <p className="text-lg font-bold text-amber-700">
                {item.harga === 0 ? "Gratis" : `Rp ${item.harga.toLocaleString("id-ID")}`}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
              {item.tags.map((tag, i) => <TagBadge key={i} tag={tag} />)}
            </div>
          </div>

          {/* Tombol tutup */}
          <button
            onClick={onClose}
            className="w-full bg-stone-700 hover:bg-stone-800 text-amber-100 font-semibold py-2 rounded-lg transition"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Reusable: WisataCard ───────────────────────────────────────────────────
function WisataCard({ item, onDetail }) {
  return (
    <div className="bg-stone-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-amber-100">
      <div className="relative">
        <img
          src={item.gambar}
          alt={item.nama}
          className="w-full h-48 object-cover"
          onError={(e) => { e.target.src = "https://placehold.co/400x200?text=Wisata"; }}
        />
        <span className="absolute top-3 left-3 bg-stone-800/80 text-amber-100 text-xs font-semibold px-2 py-1 rounded-full">
          {item.kategori}
        </span>
        <span className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full">
          ⭐ {item.rating}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-stone-700 mb-1">{item.nama}</h3>
        <p className="text-sm text-stone-500 mb-1">📍 {item.provinsi}</p>
        <p className="text-sm text-stone-500 mb-1">🕐 {item.detail.jamBuka}</p>
        <p className="text-sm text-stone-500 mb-3">👤 {item.detail.pengelola}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.map((tag, i) => <TagBadge key={i} tag={tag} />)}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-amber-700 font-bold text-base">
            {item.harga === 0 ? "Gratis" : `Rp ${item.harga.toLocaleString("id-ID")}`}
          </span>
          <button
            onClick={() => onDetail(item)}
            className="bg-stone-700 hover:bg-stone-800 text-amber-100 text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function WisataGuest() {
  /** Deklarasi state **/
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedKategori: "",
    selectedProvinsi: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);

  /** Handle perubahan nilai input form **/
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  /** Deklarasi Logic Search & Filter **/
  const _search = dataForm.searchTerm.toLowerCase();
  const filteredData = wisataData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(_search) ||
      item.provinsi.toLowerCase().includes(_search);
    const matchKategori = dataForm.selectedKategori
      ? item.kategori === dataForm.selectedKategori
      : true;
    const matchProvinsi = dataForm.selectedProvinsi
      ? item.provinsi === dataForm.selectedProvinsi
      : true;
    return matchSearch && matchKategori && matchProvinsi;
  });

  /** Unique values untuk filter **/
  const allKategori = [...new Set(wisataData.map((d) => d.kategori))];
  const allProvinsi = [...new Set(wisataData.map((d) => d.provinsi))];

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      {/* Modal Detail — conditional rendering */}
      {selectedItem && (
        <ModalDetail item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          Destinasi Wisata
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-stone-700 mb-2">
          Wisata Indonesia
        </h1>
        <p className="text-stone-400 text-sm md:text-base">
          Temukan destinasi wisata terbaik di seluruh Indonesia
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 max-w-4xl mx-auto">
        <input
          type="text"
          name="searchTerm"
          placeholder="Cari destinasi wisata..."
          onChange={handleChange}
          className="w-full px-3 py-2 border-2 border-stone-200 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-400 focus:bg-white outline-none text-stone-700 placeholder-stone-300"
        />
        <select
          name="selectedKategori"
          onChange={handleChange}
          className="w-full md:w-48 px-3 py-2 border-2 border-stone-200 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-400 outline-none text-stone-700"
        >
          <option value="">Semua Kategori</option>
          {allKategori.map((k, i) => (
            <option key={i} value={k}>{k}</option>
          ))}
        </select>
        <select
          name="selectedProvinsi"
          onChange={handleChange}
          className="w-full md:w-56 px-3 py-2 border-2 border-stone-200 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-400 outline-none text-stone-700"
        >
          <option value="">Semua Provinsi</option>
          {allProvinsi.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Info hasil */}
      <p className="text-center text-sm text-stone-400 mb-5">
        Menampilkan {filteredData.length} dari {wisataData.length} destinasi
      </p>

      {/* Grid Card — Responsive */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {filteredData.map((item) => (
            <WisataCard key={item.id} item={item} onDetail={setSelectedItem} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-semibold">Destinasi tidak ditemukan</p>
          <p className="text-sm">Coba kata kunci atau filter lain</p>
        </div>
      )}
    </div>
  );
}
