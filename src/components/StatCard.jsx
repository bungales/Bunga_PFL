import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

export default function StatCard({ label, value, trend, isUp, icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-garis/50 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-teks-samping text-sm font-medium">{label}</p>
          <h3 className="text-2xl font-bold text-teks mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl text-2xl ${iconBg} ${iconColor}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-4 text-xs">
          <span className={`flex items-center font-bold ${isUp ? "text-hijau" : "text-merah"}`}>
            {isUp ? <MdArrowUpward className="mr-0.5" /> : <MdArrowDownward className="mr-0.5" />}
            {trend}
          </span>
          <span className="text-teks-samping ml-1">dari kemarin</span>
        </div>
      )}
    </div>
  );
}
