import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-teks mb-6 text-center">Buat Akun Baru ✨</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">Nama Lengkap</label>
          <input type="text" placeholder="Nama lengkap" className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">Email</label>
          <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-teks mb-1">Konfirmasi Password</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition duration-300">
          Daftar
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-teks-samping">
        Sudah punya akun? <Link to="/login" className="text-primary hover:underline">Masuk</Link>
      </p>
    </div>
  );
}
