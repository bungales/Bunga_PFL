import { useState } from "react";
import wisataData from "./wisata.json";

export default function WisataAdmin() {
  /** Deklarasi state **/
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedKategori: "",
    selectedProvinsi: "",
  });

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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-stone-700">Panel Admin Wisata</h1>
          <p className="text-sm text-stone-400">Kelola data destinasi wisata Indonesia</p>
        </div>
        <span className="bg-amber-100 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full self-start md:self-auto">
          Total: {filteredData.length} data
        </span>
      </div>

      {/* Search & Filter */}
      <div className="bg-stone-50 rounded-xl shadow-sm border border-amber-200 p-4 mb-5 flex flex-col md:flex-row gap-3">
        <input
          type="text"
          name="searchTerm"
          placeholder="Cari nama atau provinsi..."
          onChange={handleChange}
          className="w-full px-3 py-2 border-2 border-stone-200 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-400 focus:bg-white outline-none text-stone-700 placeholder-stone-300 text-sm"
        />
        <select
          name="selectedKategori"
          onChange={handleChange}
          className="w-full md:w-44 px-3 py-2 border-2 border-stone-200 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-400 outline-none text-stone-700 text-sm"
        >
          <option value="">Semua Kategori</option>
          {allKategori.map((k, i) => (
            <option key={i} value={k}>{k}</option>
          ))}
        </select>
        <select
          name="selectedProvinsi"
          onChange={handleChange}
          className="w-full md:w-52 px-3 py-2 border-2 border-stone-200 rounded-lg bg-amber-50 focus:ring-2 focus:ring-amber-400 outline-none text-stone-700 text-sm"
        >
          <option value="">Semua Provinsi</option>
          {allProvinsi.map((p, i) => (
            <option key={i} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Tabel — scroll horizontal di mobile */}
      <div className="bg-stone-50 rounded-xl shadow-sm border border-amber-200 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-700 text-amber-100">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Provinsi</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Pengelola</th>
              <th className="px-4 py-3">Jam Buka</th>
              <th className="px-4 py-3">Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-amber-100 hover:bg-amber-100 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-amber-50"
                  }`}
                >
                  <td className="px-4 py-3 text-stone-400">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-16 h-12 object-cover rounded-lg border border-amber-200"
                      onError={(e) => { e.target.src = "https://placehold.co/64x48?text=Wisata"; }}
                    />
                  </td>
                  <td className="px-4 py-3 font-semibold text-stone-700 whitespace-nowrap">
                    {item.nama}
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-500 whitespace-nowrap">{item.provinsi}</td>
                  <td className="px-4 py-3 text-amber-700 font-semibold whitespace-nowrap">
                    {item.harga === 0 ? "Gratis" : `Rp ${item.harga.toLocaleString("id-ID")}`}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-amber-500 font-bold">⭐ {item.rating}</span>
                  </td>
                  <td className="px-4 py-3 text-stone-500 whitespace-nowrap">
                    {item.detail.pengelola}
                  </td>
                  <td className="px-4 py-3 text-stone-500 whitespace-nowrap">
                    {item.detail.jamBuka}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, i) => (
                        <span key={i} className="bg-stone-200 text-stone-600 px-2 py-0.5 text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center py-12 text-stone-400">
                  🔍 Data tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
