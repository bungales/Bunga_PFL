import { MdClose } from "react-icons/md";

export default function Modal({ show, onClose, title, children, size = "md" }) {
  if (!show) return null;
  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl w-full ${sizes[size]} shadow-2xl`}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-garis">
          <h3 className="font-semibold text-teks text-lg">{title}</h3>
          <button onClick={onClose} className="text-teks-samping hover:text-teks transition">
            <MdClose className="text-xl" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
