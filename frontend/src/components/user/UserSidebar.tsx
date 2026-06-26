"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/user/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    href: "/user/leads",
    label: "My Leads",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/user/pipeline",
    label: "Pipeline",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="4" width="4" height="10" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="7" y="6" width="4" height="8" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="13" y="2" width="4" height="12" rx="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: "/user/tasks",
    label: "Tasks",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M6 9l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/user/followups",
    label: "Follow-ups",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/user/profile",
    label: "Profile",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white flex flex-col border-r border-slate-800/50">
      <div className="p-5 border-b border-slate-800/80">
        <Link href="/user/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-xs font-bold shadow-lg group-hover:scale-105 transition-transform">
            CL
          </div>
          <div>
            <p className="font-semibold text-sm tracking-tight">CRM Lite</p>
            <p className="text-xs text-slate-400">Sales workspace</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 px-3 mb-2 font-semibold">
          Menu
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    active
                      ? "sidebar-link-active text-white font-medium"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <span className={active ? "text-white" : "text-slate-500"}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800/80">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition px-3 py-2 rounded-lg hover:bg-slate-800/40"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8 2L3 7l5 5M3 7h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to website
        </Link>
      </div>
    </aside>
  );
}
