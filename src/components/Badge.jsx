export default function Badge({ children, type = "primary" }) {
  const types = {
    primary: "bg-primary-light text-primary",
    success: "bg-green-100 text-hijau",
    danger: "bg-red-100 text-merah",
    warning: "bg-yellow-100 text-kuning",
    secondary: "bg-gray-100 text-teks-samping",
    gold: "bg-yellow-100 text-yellow-600",
    silver: "bg-gray-100 text-gray-500",
    bronze: "bg-orange-100 text-orange-500",
  };
  return (
    <span className={`${types[type]} px-3 py-1 rounded-full text-xs font-semibold`}>
      {children}
    </span>
  );
}
