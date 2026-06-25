"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/leads", label: "All Leads" },
  { href: "/admin/pipeline", label: "Pipeline" },
  { href: "/admin/tasks", label: "Tasks" },
  { href: "/admin/followups", label: "Follow-ups" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/users", label: "Team" },
  { href: "/admin/profile", label: "Profile" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-blue-950 text-white flex flex-col">
      <div className="p-6 border-b border-blue-900">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold">
            CL
          </div>
          <div>
            <p className="font-semibold text-sm">CRM Lite</p>
            <p className="text-xs text-blue-300">Admin console</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <p className="text-xs uppercase tracking-wider text-blue-400 px-3 mb-3">
          Management
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2.5 rounded-lg text-sm transition ${
                    active
                      ? "bg-blue-600 text-white font-medium"
                      : "text-blue-100 hover:bg-blue-900 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-900">
        <Link
          href="/"
          className="block text-xs text-blue-400 hover:text-blue-200 transition px-3"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
