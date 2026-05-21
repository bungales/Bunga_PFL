export default function Table({ headers, children, empty = "Tidak ada data" }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-teks-samping text-xs border-b border-garis">
            {headers.map((h, i) => (
              <th key={i} className="text-left pb-3 font-medium px-2 first:px-0">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children || (
            <tr>
              <td colSpan={headers.length} className="text-center py-8 text-teks-samping text-sm">
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
