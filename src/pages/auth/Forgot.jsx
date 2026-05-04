import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-teks mb-2 text-center">Lupa Password?</h2>
      <p className="text-sm text-teks-samping mb-6 text-center">Masukkan email dan kami akan kirim link reset password.</p>
      <form>
        <div className="mb-6">
          <label className="block text-sm font-medium text-teks mb-1">Email Address</label>
          <input type="email" placeholder="you@example.com" className="w-full px-4 py-2 bg-latar border border-garis rounded-lg text-sm outline-none focus:border-primary transition" />
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 rounded-lg transition duration-300">
          Kirim Link Reset
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-teks-samping">
        Ingat password? <Link to="/login" className="text-primary hover:underline">Masuk</Link>
      </p>
    </div>
  );
}
