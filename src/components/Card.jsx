export default function Card({ children, className = "", padding = true }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-garis/50 ${padding ? "p-6" : ""} ${className}`}>
      {children}
    </div>
  );
}
