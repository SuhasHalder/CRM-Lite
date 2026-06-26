import Link from "next/link";
import Logo from "./Logo";

export default function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 lg:px-10 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Logo href="/" />
          <p className="text-xs text-slate-400">© 2026 CRM Lite. All rights reserved.</p>
        </div>
        <div className="flex gap-8">
          {["Privacy", "Terms", "Contact"].map((link) => (
            <Link
              key={link}
              href="#"
              className="text-sm text-slate-500 hover:text-slate-800 transition"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
