import { useState } from "react";
import { MdExpandMore } from "react-icons/md";

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-garis rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-latar transition text-left"
      >
        <span className="font-medium text-teks text-sm">{title}</span>
        <MdExpandMore className={`text-teks-samping text-xl transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-4 py-3 bg-latar/50 text-sm text-teks-samping border-t border-garis">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Accordion({ items }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <AccordionItem key={i} title={item.title} defaultOpen={item.defaultOpen}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
