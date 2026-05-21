export default function ProgressBar({ value = 0, max = 100, label, showPercent = true, color = "primary", size = "md" }) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  const colors = {
    primary: "bg-primary",
    success: "bg-hijau",
    warning: "bg-kuning",
    danger: "bg-merah",
    gold: "bg-yellow-400",
  };
  const heights = { sm: "h-1.5", md: "h-2.5", lg: "h-4" };

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs font-medium text-teks">{label}</span>}
          {showPercent && <span className="text-xs text-teks-samping">{value} / {max}</span>}
        </div>
      )}
      <div className={`w-full bg-latar rounded-full ${heights[size]}`}>
        <div
          className={`${colors[color]} ${heights[size]} rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
