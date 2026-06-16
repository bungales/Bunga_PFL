import { forwardRef } from "react";
import { MdSearch, MdClose } from "react-icons/md";

// forwardRef agar parent bisa akses DOM input via useRef
const SearchBar = forwardRef(function SearchBar({ value, onChange, placeholder = "Cari...", onClear }, ref) {
  return (
    <div className="relative max-w-sm">
      <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-teks-samping text-lg" />
      <input
        ref={ref}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="pl-9 pr-9 py-2 border border-garis rounded-xl text-sm w-full outline-none focus:border-primary bg-latar transition"
      />
      {value && (
        <button onClick={onClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-teks-samping hover:text-teks">
          <MdClose className="text-sm" />
        </button>
      )}
    </div>
  );
});

export default SearchBar;
