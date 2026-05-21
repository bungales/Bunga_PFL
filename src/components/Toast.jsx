import { useEffect } from "react";
import { MdCheckCircle, MdError, MdWarning, MdInfo, MdClose } from "react-icons/md";

const config = {
  success: { bg: "bg-white border-l-4 border-hijau", icon: <MdCheckCircle className="text-hijau text-xl" /> },
  danger:  { bg: "bg-white border-l-4 border-merah",  icon: <MdError className="text-merah text-xl" /> },
  warning: { bg: "bg-white border-l-4 border-kuning", icon: <MdWarning className="text-kuning text-xl" /> },
  info:    { bg: "bg-white border-l-4 border-primary", icon: <MdInfo className="text-primary text-xl" /> },
};

export default function Toast({ show, type = "success", message, onClose, duration = 3000 }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;
  const c = config[type];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`${c.bg} flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg min-w-[260px] max-w-sm`}>
        {c.icon}
        <p className="text-sm text-teks font-medium flex-1">{message}</p>
        <button onClick={onClose} className="text-teks-samping hover:text-teks transition">
          <MdClose className="text-sm" />
        </button>
      </div>
    </div>
  );
}
