import Link from "next/link";
import Logo from "./Logo";

interface MarketingNavProps {
  rightContent?: React.ReactNode;
}

export default function MarketingNav({ rightContent }: MarketingNavProps) {
  return (
    <nav className="w-full glass border-b border-slate-200/60 px-6 lg:px-10 py-4 flex justify-between items-center sticky top-0 z-50">
      <Logo />
      {rightContent ?? (
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-secondary px-4 py-2 text-sm">
            Log in
          </Link>
          <Link href="/register" className="btn-primary px-4 py-2 text-sm">
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}
