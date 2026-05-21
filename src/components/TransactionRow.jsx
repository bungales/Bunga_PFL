import Badge from "./Badge";

const statusType = { Selesai: "success", Proses: "primary", Menunggu: "warning" };

export default function TransactionRow({ transaction, index }) {
  return (
    <tr className="border-b border-garis last:border-0 hover:bg-latar transition">
      <td className="py-3 font-mono text-xs text-teks-samping">{transaction.id}</td>
      <td className="py-3 font-medium text-teks">{transaction.customerName}</td>
      <td className="py-3 text-teks-samping">{transaction.service}</td>
      <td className="py-3 text-center text-teks-samping">{transaction.weight} kg</td>
      <td className="py-3 font-semibold text-teks">Rp {transaction.price?.toLocaleString()}</td>
      <td className="py-3 text-teks-samping">{transaction.date}</td>
      <td className="py-3">
        <Badge type={statusType[transaction.status]}>{transaction.status}</Badge>
      </td>
    </tr>
  );
}
