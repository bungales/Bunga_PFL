export default function Button({ children, type = "primary", size = "md", onClick, disabled = false, className = "" }) {
  const types = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    secondary: "bg-latar hover:bg-garis text-teks border border-garis",
    success: "bg-hijau hover:bg-emerald-600 text-white",
    danger: "bg-merah hover:bg-red-600 text-white",
    warning: "bg-kuning hover:bg-amber-600 text-white",
    ghost: "bg-transparent hover:bg-latar text-teks-samping border border-garis",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${types[type]} ${sizes[size]} rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
