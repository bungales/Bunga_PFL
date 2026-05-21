import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Badge from "./Badge";

const loyaltyType = { Gold: "gold", Silver: "silver", Bronze: "bronze" };

export default function CustomerCard({ customer }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-garis/50 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=2563eb&color=fff&size=64`}
          name={customer.name}
          size="lg"
        />
        <div className="flex-1 min-w-0">
          <Link to={`/customers/${customer.id}`} className="font-semibold text-teks hover:text-primary truncate block">
            {customer.name}
          </Link>
          <p className="text-xs text-teks-samping truncate">{customer.email}</p>
          <p className="text-xs text-teks-samping">{customer.phone}</p>
        </div>
        <Badge type={loyaltyType[customer.loyalty]}>{customer.loyalty}</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-garis">
        <div>
          <p className="text-xs text-teks-samping">Total Belanja</p>
          <p className="text-sm font-bold text-teks">Rp {customer.totalSpent?.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-teks-samping">Poin</p>
          <p className="text-sm font-bold text-primary">{customer.points}</p>
        </div>
      </div>
    </div>
  );
}
