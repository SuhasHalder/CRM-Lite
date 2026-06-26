import Link from "next/link";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  color: string;
  bg: string;
  icon?: React.ReactNode;
  href?: string;
  trend?: { value: string; positive?: boolean };
}

export default function StatCard({
  label,
  value,
  hint,
  color,
  bg,
  icon,
  href,
  trend,
}: StatCardProps) {
  const inner = (
    <>
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center text-lg font-bold shadow-sm`}
        >
          {icon ?? (typeof value === "number" && value > 99 ? "99+" : value)}
        </div>
        {trend && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend.positive !== false
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
      {href && (
        <p className="text-xs text-blue-600 mt-3 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          View details →
        </p>
      )}
    </>
  );

  const className =
    "bg-white p-5 rounded-2xl border border-slate-100 shadow-sm card-hover group block";

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return <div className={className}>{inner}</div>;
}
