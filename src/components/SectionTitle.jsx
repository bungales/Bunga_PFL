export default function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-base font-bold text-teks">{title}</h3>
        {subtitle && <p className="text-xs text-teks-samping mt-0.5">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
