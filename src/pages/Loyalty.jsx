import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import SectionTitle from "../components/SectionTitle";
import ProgressBar from "../components/ProgressBar";
import customers from "../data/customers.json";
import { MdEmojiEvents, MdCardGiftcard, MdStar } from "react-icons/md";

const segmentType = { VIP: "gold", Loyal: "silver", Regular: "primary", New: "info" };

const tiers = [
  { name: "VIP", emoji: "👑", bg: "bg-gradient-to-br from-yellow-400 to-amber-500", light: "bg-yellow-50", border: "border-yellow-300", text: "text-yellow-700", count: customers.filter(c => c.segment === "VIP").length, desc: "Pelanggan terbaik" },
  { name: "Loyal", emoji: "🥇", bg: "bg-gradient-to-br from-blue-500 to-blue-600", light: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", count: customers.filter(c => c.segment === "Loyal").length, desc: "Pelanggan setia" },
  { name: "Regular", emoji: "🥈", bg: "bg-gradient-to-br from-gray-400 to-gray-500", light: "bg-gray-50", border: "border-gray-300", text: "text-gray-700", count: customers.filter(c => c.segment === "Regular").length, desc: "Pelanggan rutin" },
  { name: "New", emoji: "🌱", bg: "bg-gradient-to-br from-green-400 to-emerald-500", light: "bg-green-50", border: "border-green-300", text: "text-green-700", count: customers.filter(c => c.segment === "New").length, desc: "Pelanggan baru" },
];

export default function Loyalty() {
  const sorted = [...customers].sort((a, b) => b.points - a.points).slice(0, 10);

  return (
    <div>
      <PageHeader title="Program Loyalitas" breadcrumb={["Dashboard", "Loyalitas"]} />

      {/* Tier Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {tiers.map(t => (
          <div key={t.name} className={`${t.light} border-2 ${t.border} rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{t.emoji}</span>
              <span className={`text-3xl font-bold ${t.text}`}>{t.count}</span>
            </div>
            <p className={`font-bold text-base ${t.text}`}>{t.name} Member</p>
            <p className="text-xs text-teks-samping mt-1">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Leaderboard */}
        <Card>
          <SectionTitle title="Top Poin Pelanggan" action={<MdEmojiEvents className="text-yellow-500 text-2xl" />} />
          <div className="space-y-4">
            {sorted.map((c, i) => {
              const maxPts = sorted[0].points;
              return (
                <div key={c.customerId} className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-white" : i === 2 ? "bg-orange-400 text-white" : "bg-latar text-teks-samping"
                  }`}>{i + 1}</span>
                  <Avatar src={`https://ui-avatars.com/api/?name=${encodeURIComponent(c.customerName)}&background=2563eb&color=fff&size=64`} name={c.customerName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-teks truncate">{c.customerName}</p>
                      <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                        <span className="text-sm font-bold text-primary">{c.points}</span>
                        <span className="text-xs text-teks-samping">pts</span>
                        <Badge type={segmentType[c.segment] || "info"}>{c.segment}</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-latar rounded-full h-1.5">
                      <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${(c.points / maxPts) * 100}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Rewards */}
        <Card>
          <SectionTitle title="Daftar Reward" action={<MdCardGiftcard className="text-primary text-2xl" />} />
          <div className="space-y-3">
            {[
              { reward: "Diskon 10%", points: 200, emoji: "🎫", desc: "Berlaku untuk semua layanan" },
              { reward: "Cuci Gratis 2kg", points: 500, emoji: "🧺", desc: "Cuci kering atau cuci setrika" },
              { reward: "Diskon 25%", points: 800, emoji: "🎁", desc: "Berlaku untuk semua layanan" },
              { reward: "Cuci Gratis 5kg", points: 1200, emoji: "✨", desc: "Termasuk layanan dry clean" },
              { reward: "Upgrade VIP Member", points: 1500, emoji: "👑", desc: "Nikmati semua benefit VIP" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 border border-garis rounded-2xl hover:bg-latar hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-latar rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {r.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-teks text-sm">{r.reward}</p>
                    <p className="text-xs text-teks-samping">{r.desc}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <span className="text-primary font-bold text-sm">{r.points}</span>
                  <p className="text-xs text-teks-samping">pts</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
