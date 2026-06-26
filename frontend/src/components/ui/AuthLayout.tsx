import Link from "next/link";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
  navLinkText: string;
  navLinkHref: string;
  navPrompt: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  footerText,
  footerLinkText,
  footerLinkHref,
  navLinkText,
  navLinkHref,
  navPrompt,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-[45%] gradient-brand relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />

        <div className="relative">
          <Logo href="/" variant="light" size="lg" />
        </div>

        <div className="relative space-y-6">
          <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
            Close more deals with less friction
          </h2>
          <p className="text-blue-100 leading-relaxed">
            Manage leads, track your pipeline, and never miss a follow-up — all in one focused workspace built for small teams.
          </p>
          <div className="flex gap-6 pt-4">
            {[
              { num: "3×", label: "Faster capture" },
              { num: "85%", label: "Fewer missed calls" },
              { num: "40%", label: "Higher close rate" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-blue-200 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-xs text-blue-200">© 2026 CRM Lite</p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
        <nav className="w-full glass border-b border-slate-200/60 px-6 lg:px-10 py-4 flex justify-between items-center">
          <div className="lg:hidden">
            <Logo href="/" />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-slate-400 hidden sm:inline">{navPrompt}</span>
            <Link href={navLinkHref} className="btn-primary px-4 py-2 text-sm">
              {navLinkText}
            </Link>
          </div>
        </nav>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-8">
              {children}
            </div>

            <p className="text-center text-sm text-slate-400 mt-6">
              {footerText}{" "}
              <Link href={footerLinkHref} className="text-blue-600 hover:text-blue-700 font-medium transition">
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
