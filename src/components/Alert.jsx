import { MdCheckCircle, MdError, MdWarning, MdInfo, MdClose } from "react-icons/md";

const config = {
  success: { bg: "bg-green-50 border-green-200", text: "text-hijau", icon: <MdCheckCircle /> },
  danger:  { bg: "bg-red-50 border-red-200",   text: "text-merah",  icon: <MdError /> },
  warning: { bg: "bg-yellow-50 border-yellow-200", text: "text-kuning", icon: <MdWarning /> },
  info:    { bg: "bg-blue-50 border-blue-200",  text: "text-primary", icon: <MdInfo /> },
};

export default function Alert({ type = "info", message, onClose }) {
  const c = config[type];
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${c.bg}`}>
      <span className={`text-xl mt-0.5 ${c.text}`}>{c.icon}</span>
      <p className={`text-sm flex-1 ${c.text} font-medium`}>{message}</p>
      {onClose && (
        <button onClick={onClose} className={`${c.text} hover:opacity-70 transition`}>
          <MdClose />
        </button>
      )}
    </div>
  );
}
