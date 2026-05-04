import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-latar text-center px-4">
      <div className="text-8xl mb-4">🧺</div>
      <h1 className="text-6xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-teks mb-3">Halaman Tidak Ditemukan</h2>
      <p className="text-teks-samping mb-6 max-w-sm">Sepertinya cucian kamu nyasar ke tempat yang salah. Halaman yang kamu cari tidak ada.</p>
      <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-dark transition">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
