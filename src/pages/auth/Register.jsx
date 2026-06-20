import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usersAPI } from "../../services/usersAPI";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok");
      return;
    }
    if (form.password.length < 6) {
      setError("Password minimal 6 karakter");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await usersAPI.register(form.name, form.email, form.password);
      setSuccess("Pendaftaran berhasil! Silakan login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message || "Gagal mendaftar, coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-teks mb-1 text-center">Buat Akun Baru ✨</h2>
      <p className="text-center text-sm text-teks-samping mb-5">Daftar ke Netto Laundry</p>

      {error && (
        <div className="bg-red-50 border border-merah mb-4 p-3 text-sm text-merah rounded-lg flex items-center">
          <BsFillExclamationDiamondFill className="mr-2 flex-shrink-0" /> {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-400 mb-4 p-3 text-sm text-green-700 rounded-lg">
          ✅ {success}
        </div>
      )}
      {loading && (
        <div className="bg-blue-50 border border-primary mb-4 p-3 text-sm text-primary rounded-lg flex items-center">
          <ImSpinner2 className="mr-2 animate-spin" /> Mohon tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">Nama Lengkap</label>
          <input type="text" name="name" placeholder="Nama lengkap"
            value={form.name} onChange={handleChange} required
            className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">Email</label>
          <input type="email" name="email" placeholder="you@example.com"
            value={form.email} onChange={handleChange} required
            className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">Password</label>
          <input type="password" name="password" placeholder="••••••••"
            value={form.password} onChange={handleChange} required
            className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-teks mb-1">Konfirmasi Password</label>
          <input type="password" name="confirmPassword" placeholder="••••••••"
            value={form.confirmPassword} onChange={handleChange} required
            className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition duration-300 disabled:opacity-60">
          Daftar
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-teks-samping">
        Sudah punya akun? <Link to="/login" className="text-primary hover:underline">Masuk</Link>
      </p>
    </div>
  );
}
