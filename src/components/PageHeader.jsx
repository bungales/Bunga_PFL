export default function PageHeader({ title, breadcrumb, children }) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : breadcrumb ? [breadcrumb] : [];

  return (
    <div className="flex items-center justify-between p-4 mb-2">
      <div className="flex flex-col">
        <span className="text-2xl font-semibold text-teks">{title}</span>
        {crumbs.length > 0 && (
          <div className="flex items-center font-medium space-x-2 mt-1">
            {crumbs.map((crumb, i) => (
              <span key={i} className="flex items-center space-x-2">
                <span className="text-teks-samping text-sm">{crumb}</span>
                {i < crumbs.length - 1 && <span className="text-teks-samping text-sm">/</span>}
              </span>
            ))}
          </div>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
