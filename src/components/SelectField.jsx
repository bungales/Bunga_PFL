export default function SelectField({ label, value, onChange, options = [], required = false, error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-teks">
          {label} {required && <span className="text-merah">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2 border rounded-xl text-sm outline-none transition bg-latar
          ${error ? "border-merah" : "border-garis focus:border-primary"}`}
      >
        {options.map((opt, i) => (
          <option key={i} value={typeof opt === "object" ? opt.value : opt}>
            {typeof opt === "object" ? opt.label : opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-merah">{error}</p>}
    </div>
  );
}
