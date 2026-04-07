import { useState, useRef } from 'react';
import InputField from './components/InputField';
import SelectField from './components/SelectField';

// ── Data ───────────────────────────────────────────────────────────────────
const kursusOptions = [
  { value: 'web',    label: 'Web Development',    harga: 150000 },
  { value: 'mobile', label: 'Mobile Development', harga: 180000 },
  { value: 'data',   label: 'Data Science',        harga: 200000 },
  { value: 'ui',     label: 'UI/UX Design',        harga: 120000 },
];

const jadwalOptions = [
  { value: 'pagi',  label: 'Pagi  (08.00 – 10.00)' },
  { value: 'siang', label: 'Siang (13.00 – 15.00)' },
  { value: 'malam', label: 'Malam (19.00 – 21.00)' },
];

// ── Validasi ───────────────────────────────────────────────────────────────
function validateField(name, value) {
  switch (name) {
    case 'nama':
      if (!value.trim())           return 'Nama tidak boleh kosong.';
      if (/\d/.test(value))        return 'Nama tidak boleh mengandung angka.';
      if (value.trim().length < 3) return 'Nama minimal 3 karakter.';
      return '';
    case 'email':
      if (!value.trim()) return 'Email tidak boleh kosong.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return 'Format email tidak valid. Contoh: nama@email.com';
      return '';
    case 'noHp':
      if (!value.trim())        return 'No. HP tidak boleh kosong.';
      if (!/^\d+$/.test(value)) return 'No. HP hanya boleh berisi angka.';
      if (value.length < 10 || value.length > 13) return 'No. HP harus 10–13 digit.';
      return '';
    case 'sesi':
      if (!value)              return 'Jumlah sesi tidak boleh kosong.';
      if (!/^\d+$/.test(value)) return 'Jumlah sesi harus berupa angka.';
      if (Number(value) < 1)   return 'Minimal 1 sesi.';
      if (Number(value) > 50)  return 'Maksimal 50 sesi.';
      return '';
    case 'kursus':
      if (!value) return 'Pilih kursus terlebih dahulu.';
      return '';
    case 'jadwal':
      if (!value) return 'Pilih jadwal terlebih dahulu.';
      return '';
    default:
      return '';
  }
}

const fields = ['nama', 'email', 'noHp', 'sesi', 'kursus', 'jadwal'];
const init = (val) => Object.fromEntries(fields.map(f => [f, val]));

// ── Komponen Hasil ─────────────────────────────────────────────────────────
function HasilPendaftaran({ data, onReset }) {
  const kursus      = kursusOptions.find(k => k.value === data.kursus);
  const hargaPerSesi = kursus?.harga ?? 0;
  const jumlahSesi  = Number(data.sesi);
  const subtotal    = hargaPerSesi * jumlahSesi;
  const diskon      = 0.1;
  const potongan    = subtotal * diskon;
  const totalBayar  = subtotal - potongan;

  return (
    <div className="mt-5 p-4 rounded-lg border-l-4 border-amber-600 bg-amber-50 text-amber-900">
      <p className="font-bold text-base mb-3">✅ Pendaftaran Berhasil!</p>
      <div className="text-sm space-y-1">
        <p>Nama &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>{data.nama}</b></p>
        <p>Email &nbsp;&nbsp;&nbsp;&nbsp;: <b>{data.email}</b></p>
        <p>No. HP &nbsp;&nbsp;&nbsp;: <b>{data.noHp}</b></p>
        <p>Sesi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>{data.sesi} sesi</b></p>
        <p>Kursus &nbsp;&nbsp;&nbsp;: <b>{kursus?.label}</b></p>
        <p>Jadwal &nbsp;&nbsp;&nbsp;: <b>{jadwalOptions.find(j => j.value === data.jadwal)?.label}</b></p>
      </div>
      <div className="mt-3 pt-3 border-t border-amber-300 text-sm space-y-1">
        <p>Harga/Sesi &nbsp;: <b>Rp {hargaPerSesi.toLocaleString('id-ID')}</b></p>
        <p>Subtotal &nbsp;&nbsp;: <b>Rp {subtotal.toLocaleString('id-ID')}</b></p>
        <p>Diskon 10% : <b className="text-red-600">- Rp {potongan.toLocaleString('id-ID')}</b></p>
      </div>
      <div className="mt-3 p-3 bg-stone-700 border-l-4 border-stone-900 text-amber-100 rounded">
        <p className="font-semibold">
          Total Biaya Kursus: Rp {totalBayar.toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function FormKursus() {
  const [form,    setForm]    = useState(init(''));
  const [errors,  setErrors]  = useState(init(''));
  const [touched, setTouched] = useState(init(false));
  const [result,  setResult]  = useState(null);
  const hasilRef = useRef(null);

  const isAllValid = fields.every(f => !validateField(f, form[f]));

  // Preview harga real-time
  const kursusData   = kursusOptions.find(k => k.value === form.kursus);
  const hargaPerSesi = kursusData?.harga ?? 0;
  const jumlahSesi   = Number(form.sesi) || 0;
  const subtotal     = hargaPerSesi * jumlahSesi;
  const totalBayar   = subtotal - subtotal * 0.1;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = Object.fromEntries(fields.map(f => [f, validateField(f, form[f])]));
    setErrors(newErrors);
    setTouched(init(true));
    if (fields.every(f => !newErrors[f])) {
      setResult({ ...form });
      setTimeout(() => hasilRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }

  function handleReset() {
    setForm(init(''));
    setErrors(init(''));
    setTouched(init(false));
    setResult(null);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-5">
      <div className="bg-stone-50 p-6 rounded-2xl shadow-lg w-full max-w-md border border-amber-200">

        {/* Header */}
        <div className="text-center mb-5">
          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            Formulir Pendaftaran
          </span>
          <h2 className="text-2xl font-bold text-stone-700">Kursus Online</h2>
          <p className="text-stone-400 text-sm mt-1">Isi data diri kamu untuk mendaftar</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <InputField
            label="Nama Lengkap"
            type="text"
            name="nama"
            placeholder="Masukkan nama lengkap"
            value={form.nama}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.nama}
          />
          <InputField
            label="Alamat Email"
            type="email"
            name="email"
            placeholder="Masukkan email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <InputField
            label="Nomor HP (WhatsApp)"
            type="text"
            name="noHp"
            placeholder="Masukkan nomor HP"
            value={form.noHp}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.noHp}
          />
          <InputField
            label="Jumlah Sesi Belajar"
            type="number"
            name="sesi"
            placeholder="Masukkan jumlah sesi (1–50)"
            value={form.sesi}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.sesi}
          />
          <SelectField
            label="Pilih Kursus"
            name="kursus"
            value={form.kursus}
            onChange={handleChange}
            onBlur={handleBlur}
            options={kursusOptions}
            error={errors.kursus}
          />

          {/* Conditional rendering preview harga */}
          {form.kursus && jumlahSesi > 0 ? (
            <div className="mb-3 p-3 bg-amber-100 border-l-4 border-amber-500 text-amber-800 rounded">
              <p className="text-sm">Harga/Sesi : <b>Rp {hargaPerSesi.toLocaleString('id-ID')}</b></p>
              <p className="text-sm">Subtotal &nbsp;&nbsp;: <b>Rp {subtotal.toLocaleString('id-ID')}</b></p>
              <p className="text-sm">Diskon &nbsp;&nbsp;&nbsp;&nbsp;: <b className="text-red-600">10%</b></p>
              <p className="font-semibold text-sm">Total Bayar: Rp {totalBayar.toLocaleString('id-ID')}</p>
            </div>
          ) : (
            <div className="mb-3 p-3 bg-red-50 border-l-4 border-red-400 text-red-600 rounded">
              <p className="text-sm font-semibold">
                Silakan pilih kursus dan isi jumlah sesi untuk melihat harga.
              </p>
            </div>
          )}

          <SelectField
            label="Pilih Jadwal Belajar"
            name="jadwal"
            value={form.jadwal}
            onChange={handleChange}
            onBlur={handleBlur}
            options={jadwalOptions}
            error={errors.jadwal}
          />

          {/* Tombol submit hanya muncul jika semua field valid */}
          {isAllValid && (
            <button
              type="submit"
              className="w-full bg-stone-700 text-amber-100 font-semibold p-2 rounded-lg hover:bg-stone-800 transition mt-2"
            >
              Daftar Sekarang
            </button>
          )}
        </form>

        {/* Hasil tampil di bawah form */}
        {result && (
          <div ref={hasilRef}>
            <HasilPendaftaran data={result} />
            <button
              onClick={handleReset}
              className="w-full mt-3 border-2 border-stone-600 text-stone-600 font-semibold p-2 rounded-lg hover:bg-stone-100 transition"
            >
              ← Daftar Lagi
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
