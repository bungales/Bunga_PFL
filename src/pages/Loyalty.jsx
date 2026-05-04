import PageHeader from "../components/PageHeader";
import customers from "../data/customers.json";
import { MdStar, MdEmojiEvents, MdCardGiftcard } from "react-icons/md";

const loyaltyColor = { Gold: "text-kuning bg-yellow-100 border-yellow-200", Silver: "text-gray-500 bg-gray-100 border-gray-200", Bronze: "text-orange-500 bg-orange-100 border-orange-200" };
const loyaltyIcon = { Gold: "🥇", Silver: "🥈", Bronze: "🥉" };

const tiers = [
  { name: "Bronze", min: 0, max: 499, color: "bg-orange-100 border-orange-300", textColor: "text-orange-600", count: customers.filter(c => c.loyalty === "Bronze").length },
  { name: "Silver", min: 500, max: 999, color: "bg-gray-100 border-gray-300", textColor: "text-gray-600", count: customers.filter(c => c.loyalty === "Silver").length },
  { name: "Gold", min: 1000, max: "∞", color: "bg-yellow-100 border-yellow-300", textColor: "text-yellow-600", count: customers.filter(c => c.loyalty === "Gold").length },
];

export default function Loyalty() {
  const sorted = [...customers].sort((a, b) => b.points - a.points).slice(0, 10);

  return (
    <div>
      <PageHeader title="Program Loyalitas" breadcrumb={["Dashboard", "Loyalitas"]} />

      {/* Tier Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {tiers.map(t => (
          <div key={t.name} className={`${t.color} border-2 rounded-2xl p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{loyaltyIcon[t.name]}</span>
              <span className={`text-2xl font-bold ${t.textColor}`}>{t.count}</span>
            </div>
            <p className={`font-bold text-lg ${t.textColor}`}>{t.name} Member</p>
            <p className="text-sm text-teks-samping mt-1">{t.min} – {t.max} poin</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center mb-4">
            <MdEmojiEvents className="text-kuning text-2xl mr-2" />
            <h3 className="font-semibold text-teks">Top Poin Pelanggan</h3>
          </div>
          <div className="space-y-3">
            {sorted.map((c, i) => (
              <div key={c.id} className="flex items-center space-x-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i < 3 ? "bg-primary text-white" : "bg-latar text-teks-samping"}`}>{i + 1}</span>
                <img src={`https://avatar.iran.liara.run/public/${c.id.slice(1)}`} className="w-8 h-8 rounded-full" alt="" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-teks">{c.name}</p>
                  <div className="w-full bg-latar rounded-full h-1.5 mt-1">
                    <div className="bg-primary h-1.5 rounded-full" style={{ width: `${Math.min((c.points / 2500) * 100, 100)}%` }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-primary">{c.points} pts</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${loyaltyColor[c.loyalty]}`}>{loyaltyIcon[c.loyalty]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center mb-4">
            <MdCardGiftcard className="text-primary text-2xl mr-2" />
            <h3 className="font-semibold text-teks">Daftar Reward</h3>
          </div>
          <div className="space-y-3">
            {[
              { reward: "Diskon 10%", points: 200, icon: "🎫" },
              { reward: "Cuci Gratis 2kg", points: 500, icon: "🧺" },
              { reward: "Diskon 25%", points: 800, icon: "🎁" },
              { reward: "Cuci Gratis 5kg", points: 1200, icon: "✨" },
              { reward: "Member Gold Upgrade", points: 1500, icon: "👑" },
            ].map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 border border-garis rounded-xl hover:bg-latar transition">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{r.icon}</span>
                  <p className="font-medium text-teks text-sm">{r.reward}</p>
                </div>
                <span className="text-primary font-bold text-sm">{r.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
