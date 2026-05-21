export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="text-5xl text-garis mb-4">{icon}</div>}
      <h3 className="text-base font-semibold text-teks mb-1">{title}</h3>
      {description && <p className="text-sm text-teks-samping mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
