import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import Card from "../../components/Card";
import SectionTitle from "../../components/SectionTitle";
import Badge from "../../components/Badge";
import Accordion from "../../components/Accordion";
import { MdStar, MdStarBorder, MdFormatQuote } from "react-icons/md";

const initialFeedback = [
  { id: 1, customer: "Andi Pratama", rating: 5, comment: "Pelayanan sangat memuaskan, cucian bersih dan wangi!", date: "2026-04-28", service: "Cuci Setrika" },
  { id: 2, customer: "Dian Rahayu", rating: 4, comment: "Bagus, tapi pengambilan agak lama.", date: "2026-04-30", service: "Dry Clean" },
  { id: 3, customer: "Gilang Permana", rating: 5, comment: "Selalu puas dengan hasilnya, recommended!", date: "2026-05-01", service: "Cuci Kering" },
  { id: 4, customer: "Sari Wulandari", rating: 3, comment: "Cukup baik, tapi ada baju yang kurang bersih.", date: "2026-04-22", service: "Cuci Setrika" },
  { id: 5, customer: "Budi Santoso", rating: 5, comment: "Harga terjangkau, kualitas premium!", date: "2026-04-15", service: "Cuci Kering" },
  { id: 6, customer: "Maya Indah", rating: 4, comment: "Proses cepat dan hasilnya memuaskan.", date: "2026-04-29", service: "Dry Clean" },
];

const ratingColors = { 5: "text-yellow-500", 4: "text-blue-500", 3: "text-orange-500", 2: "text-red-400", 1: "text-red-600" };
const ratingBg = { 5: "bg-yellow-50 border-yellow-200", 4: "bg-blue-50 border-blue-200", 3: "bg-orange-50 border-orange-200", 2: "bg-red-50 border-red-200", 1: "bg-red-50 border-red-200" };

function Stars({ rating, size = "text-lg" }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(i => (
        i <= rating
          ? <MdStar key={i} className={`text-yellow-400 ${size}`} />
          : <MdStarBorder key={i} className={`text-gray-300 ${size}`} />
      ))}
    </div>
  );
}

export default function Feedback() {
  const [feedbacks] = useState(initialFeedback);
  const avg = (feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map(r => ({ r, count: feedbacks.filter(f => f.rating === r).length }));

  return (
    <div>
      <PageHeader title="Feedback & Rating" breadcrumb={["Dashboard", "Feedback"]} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Average Score */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-white shadow-lg">
          <p className="text-7xl font-black">{avg}</p>
          <Stars rating={Math.round(avg)} size="text-2xl" />
          <p className="text-yellow-100 text-sm mt-2 font-medium">{feedbacks.length} ulasan pelanggan</p>
        </div>

        {/* Distribution */}
        <Card className="lg:col-span-2">
          <SectionTitle title="Distribusi Rating" />
          <div className="space-y-3 mt-2">
            {dist.map(({ r, count }) => {
              const pct = feedbacks.length ? (count / feedbacks.length) * 100 : 0;
              return (
                <div key={r} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12 flex-shrink-0">
                    <span className={`text-sm font-bold ${ratingColors[r]}`}>{r}</span>
                    <MdStar className={`text-sm ${ratingColors[r]}`} />
                  </div>
                  <div className="flex-1 bg-latar rounded-full h-2.5 overflow-hidden">
                    <div className={`h-2.5 rounded-full transition-all ${r >= 4 ? "bg-yellow-400" : r === 3 ? "bg-orange-400" : "bg-red-400"}`}
                      style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-teks-samping w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Review Cards */}
      <Card className="mb-5">
        <SectionTitle title="Semua Ulasan" subtitle={`${feedbacks.length} ulasan pelanggan`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {feedbacks.map(f => (
            <div key={f.id} className={`border rounded-2xl p-4 ${ratingBg[f.rating]} hover:shadow-sm transition-shadow`}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center font-bold text-primary text-sm">
                    {f.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-teks text-sm">{f.customer}</p>
                    <p className="text-xs text-teks-samping">{f.service} · {f.date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Stars rating={f.rating} size="text-sm" />
                  <Badge type={f.rating >= 4 ? "success" : f.rating === 3 ? "warning" : "danger"}>
                    {f.rating}/5
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <MdFormatQuote className="text-teks-samping text-xl flex-shrink-0 mt-0.5 opacity-40" />
                <p className="text-sm text-teks-samping italic leading-relaxed">{f.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* FAQ */}
      <Card>
        <SectionTitle title="FAQ Layanan" subtitle="Pertanyaan yang sering ditanyakan pelanggan" />
        <Accordion items={[
          { title: "Berapa lama proses laundry?", content: "Layanan reguler selesai dalam 1–2 hari kerja. Layanan express selesai dalam 6 jam dengan biaya tambahan.", defaultOpen: true },
          { title: "Bagaimana jika pakaian saya rusak atau hilang?", content: "Kami bertanggung jawab penuh atas kerusakan atau kehilangan yang disebabkan oleh kelalaian kami. Ganti rugi maksimal 10x harga cuci." },
          { title: "Apakah bisa request parfum tertentu?", content: "Bisa! Kami menyediakan beberapa pilihan parfum. Sampaikan preferensi Anda saat antar laundry." },
          { title: "Bagaimana cara memberikan feedback?", content: "Anda bisa memberikan rating dan komentar langsung melalui aplikasi setelah transaksi berstatus Selesai." },
        ]} />
      </Card>
    </div>
  );
}
