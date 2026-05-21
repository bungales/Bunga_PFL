export default function InputField({ label, type = "text", placeholder, value, onChange, required = false, icon, error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-teks">
          {label} {required && <span className="text-merah">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-teks-samping text-lg">
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full ${icon ? "pl-10" : "pl-4"} pr-4 py-2 border rounded-xl text-sm outline-none transition bg-latar
            ${error ? "border-merah focus:border-merah" : "border-garis focus:border-primary"}`}
        />
      </div>
      {error && <p className="text-xs text-merah">{error}</p>}
    </div>
  );
}
