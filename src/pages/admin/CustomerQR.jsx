import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { MdArrowBack, MdDownload } from "react-icons/md";
import customersData from "../../data/customers.json";

export default function CustomerQR() {
  const { id } = useParams();
  const customer = customersData.find(c => c.customerId === id);
  const qrUrl = `${window.location.origin}/scan/${id}`;

  const handleDownload = () => {
    const svg = document.getElementById("qr-svg");
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const a = document.createElement("a");
      a.download = `QR-${id}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgStr)));
  };

  if (!customer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-teks-samping">Pelanggan tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-5">
        <Link to="/admin/customers" className="flex items-center gap-1 text-sm text-teks-samping hover:text-primary transition">
          <MdArrowBack /> Kembali ke Pelanggan
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-garis/50 p-8 text-center">
        {/* Logo / nama laundry */}
        <div className="mb-4">
          <p className="text-xs uppercase tracking-widest text-teks-samping mb-1">QR Check-In</p>
          <h2 className="text-xl font-bold text-teks">{customer.customerName}</h2>
          <p className="text-sm text-teks-samping">{customer.phone} · {customer.segment}</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-white border-2 border-garis rounded-2xl inline-block">
            <QRCodeSVG
              id="qr-svg"
              value={qrUrl}
              size={200}
              includeMargin={false}
              level="M"
            />
          </div>
        </div>

        <p className="text-xs text-teks-samping mb-6 break-all">{qrUrl}</p>

        <div className="space-y-2">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition text-sm"
          >
            <MdDownload className="text-lg" /> Download QR
          </button>
          <Link
            to={`/scan/${id}`}
            target="_blank"
            className="block w-full text-center border border-garis text-teks-samping font-medium py-3 rounded-xl text-sm hover:bg-latar transition"
          >
            Preview Halaman
          </Link>
        </div>
      </div>

      <p className="text-center text-xs text-teks-samping mt-4">
        Cetak dan tempel QR ini di konter laundry. Pelanggan scan untuk check-in otomatis.
      </p>
    </div>
  );
}
