import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usersAPI } from "../../services/usersAPI";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await usersAPI.login(dataForm.email, dataForm.password);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userEmail", data.user.email);
      navigate("/");
    } catch (err) {
      setError(err.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-teks mb-1 text-center">Selamat Datang 👋</h2>
      <p className="text-center text-sm text-teks-samping mb-5">Masuk ke Netto Laundry</p>

      {error && (
        <div className="bg-red-50 border border-merah mb-4 p-3 text-sm text-merah rounded-lg flex items-center">
          <BsFillExclamationDiamondFill className="mr-2 flex-shrink-0" /> {error}
        </div>
      )}
      {loading && (
        <div className="bg-blue-50 border border-primary mb-4 p-3 text-sm text-primary rounded-lg flex items-center">
          <ImSpinner2 className="mr-2 animate-spin" /> Mohon tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-teks mb-1">Email</label>
          <input
            type="email" name="email" placeholder="email@domain.com"
            onChange={handleChange} value={dataForm.email}
            className="w-full px-4 py-2.5 bg-latar border border-garis rounded-xl text-sm outline-none focus:border-primary transition"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-teks mb-1">Password</label>
          <input
            type="password" name="password" placeholder="••••••••"
            onChange={handleChange} value={dataForm.password}
            className="w-full px-4 py-2.5 bg-latar border border-garis rounded-xl text-sm outline-none focus:border-primary transition"
            required
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-xl transition duration-300 disabled:opacity-60">
          Masuk
        </button>
      </form>

      <div className="flex justify-between mt-4 text-sm">
        <Link to="/forgot" className="text-primary hover:underline">Lupa password?</Link>
        <Link to="/register" className="text-primary hover:underline">Daftar akun</Link>
      </div>
    </div>
  );
}
