"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/user/dashboard", label: "Dashboard" },
  { href: "/user/leads", label: "My Leads" },
  { href: "/user/pipeline", label: "Pipeline" },
  { href: "/user/tasks", label: "Tasks" },
  { href: "/user/followups", label: "Follow-ups" },
  { href: "/user/profile", label: "Profile" },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <Link href="/user/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-sm font-bold">
            CL
          </div>
          <div>
            <p className="font-semibold text-sm">CRM Lite</p>
            <p className="text-xs text-slate-400">Sales workspace</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
          Menu
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
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Link
          href="/"
          className="block text-xs text-slate-400 hover:text-slate-200 transition px-3"
        >
          ← Back to website
        </Link>
      </div>
    </aside>
  );
}
