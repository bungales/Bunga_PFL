import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { MdStar, MdStarBorder } from "react-icons/md";

const initialFeedback = [
  { id: 1, customer: "Andi Pratama", rating: 5, comment: "Pelayanan sangat memuaskan, cucian bersih dan wangi!", date: "2026-04-28", service: "Cuci Setrika" },
  { id: 2, customer: "Dian Rahayu", rating: 4, comment: "Bagus, tapi pengambilan agak lama.", date: "2026-04-30", service: "Dry Clean" },
  { id: 3, customer: "Gilang Permana", rating: 5, comment: "Selalu puas dengan hasilnya, recommended!", date: "2026-05-01", service: "Cuci Kering" },
  { id: 4, customer: "Sari Wulandari", rating: 3, comment: "Cukup baik, tapi ada baju yang kurang bersih.", date: "2026-04-22", service: "Cuci Setrika" },
  { id: 5, customer: "Budi Santoso", rating: 5, comment: "Harga terjangkau, kualitas premium!", date: "2026-04-15", service: "Cuci Kering" },
  { id: 6, customer: "Maya Indah", rating: 4, comment: "Proses cepat dan hasilnya memuaskan.", date: "2026-04-29", service: "Dry Clean" },
];

function Stars({ rating }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map(i => (
        i <= rating
          ? <MdStar key={i} className="text-kuning text-lg" />
          : <MdStarBorder key={i} className="text-gray-300 text-lg" />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Average */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center">
          <p className="text-6xl font-bold text-primary">{avg}</p>
          <Stars rating={Math.round(avg)} />
          <p className="text-teks-samping text-sm mt-2">{feedbacks.length} ulasan</p>
        </div>

        {/* Distribution */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-semibold text-teks mb-4">Distribusi Rating</h3>
          <div className="space-y-2">
            {dist.map(({ r, count }) => (
              <div key={r} className="flex items-center space-x-3">
                <span className="text-sm text-teks-samping w-4">{r}</span>
                <MdStar className="text-kuning" />
                <div className="flex-1 bg-latar rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${feedbacks.length ? (count / feedbacks.length) * 100 : 0}%` }} />
                </div>
                <span className="text-sm text-teks-samping w-4">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-semibold text-teks mb-4">Semua Ulasan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feedbacks.map(f => (
            <div key={f.id} className="border border-garis rounded-xl p-4 hover:bg-latar transition">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-teks text-sm">{f.customer}</p>
                  <p className="text-xs text-teks-samping">{f.service} · {f.date}</p>
                </div>
                <Stars rating={f.rating} />
              </div>
              <p className="text-sm text-teks-samping italic">"{f.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
