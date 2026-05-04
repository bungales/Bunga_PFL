import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-poppins font-extrabold text-teks">
            Netto Laundry
          </h1>
        </div>
        <Outlet />
        <p className="text-center text-xs text-teks-samping mt-6">
          © 2026 Netto Laundry. All rights reserved.
        </p>
      </div>
    </div>
  );
}
