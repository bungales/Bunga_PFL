import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    /* Latar belakang menggunakan gradasi biru DashStack.
       Kita menambahkan pseudo-element untuk efek gelombang (Waves) 
       seperti pada gambar yang Anda kirim.
    */
    <div className="min-h-screen flex items-center justify-center bg-[#4880FF] relative overflow-hidden font-barlow">
      
      {/* Efek Gelombang Background (Aksen Dekoratif) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-white/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[70%] rounded-full bg-[#3661FF]/50 blur-[100px]" />
        {/* SVG Gelombang halus agar mirip dengan gambar DashStack */}
        <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Card Login Utama */}
      <div className="relative z-10 w-full max-w-[480px] bg-white rounded-[24px] p-10 shadow-2xl mx-4">
        
        {/* Logo Netto Laundry */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
            <img 
              src="/img/logo Netto loundry.jpeg" 
              alt="Netto Laundry" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Konten Form (Login/Register) dari Outlet */}
        <div className="w-full">
          <Outlet />
        </div>

        {/* Copyright Footer */}
        <div className="mt-8 text-center">
          <p className="text-[11px] text-gray-400">
            © 2026 <span className="text-[#4880FF] font-bold">Netto Laundry</span>. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}