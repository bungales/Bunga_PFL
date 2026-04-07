export default function InputField({ label, type, name, placeholder, value, onChange, onBlur, error }) {
  return (
    <div className="mb-4">
      <label className="block text-stone-600 font-semibold mb-1 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-3 py-2 rounded-lg border-2 text-stone-700 placeholder-stone-300 bg-amber-50 outline-none transition focus:ring-2 focus:ring-amber-400 focus:bg-white ${
          error
            ? 'border-red-400 bg-red-50'
            : value
            ? 'border-amber-400'
            : 'border-stone-200'
        }`}
      />
      {error && (
        <div className="mt-1 p-2 bg-red-50 border-l-4 border-red-400 text-red-600 text-xs rounded">
          ⚠ {error}
        </div>
      )}
    </div>
  );
}
