export default function Avatar({ name, src, size = "md", online = false }) {
  const sizes = {
    sm: "w-7 h-7 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
  };
  const dotSizes = { sm: "w-2 h-2", md: "w-3 h-3", lg: "w-4 h-4" };

  return (
    <div className="relative inline-flex">
      {src ? (
        <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover border-2 border-garis`} />
      ) : (
        <div className={`${sizes[size]} rounded-full bg-primary-light text-primary flex items-center justify-center font-bold`}>
          {name?.charAt(0).toUpperCase()}
        </div>
      )}
      {online && (
        <span className={`${dotSizes[size]} absolute bottom-0 right-0 bg-hijau border-2 border-white rounded-full`} />
      )}
    </div>
  );
}
