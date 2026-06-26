import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
  variant?: "light" | "dark";
}

export default function Logo({
  size = "md",
  showText = true,
  href = "/",
  variant = "dark",
}: LogoProps) {
  const sizes = {
    sm: { box: "w-8 h-8", icon: 18, text: "text-sm" },
    md: { box: "w-9 h-9", icon: 20, text: "text-base" },
    lg: { box: "w-11 h-11", icon: 24, text: "text-lg" },
  };
  const s = sizes[size];

  const content = (
    <div className="flex items-center gap-3">
      <div
        className={`${s.box} rounded-xl gradient-brand flex items-center justify-center shadow-md`}
      >
        <svg width={s.icon} height={s.icon} viewBox="0 0 18 18" fill="none">
          <rect x="2" y="8" width="3" height="8" rx="1" fill="white" opacity="0.6" />
          <rect x="7" y="5" width="3" height="11" rx="1" fill="white" opacity="0.8" />
          <rect x="12" y="2" width="3" height="14" rx="1" fill="white" />
        </svg>
      </div>
      {showText && (
        <span
          className={`${s.text} font-semibold tracking-tight ${
            variant === "light" ? "text-white" : "text-slate-900"
          }`}
        >
          CRM Lite
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex hover:opacity-90 transition">
        {content}
      </Link>
    );
  }

  return content;
}
