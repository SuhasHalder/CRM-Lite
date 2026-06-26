import Link from "next/link";
import MarketingNav from "@/components/ui/MarketingNav";
import MarketingFooter from "@/components/ui/MarketingFooter";

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "bg-blue-100 text-blue-600",
    title: "Lead management",
    desc: "Add, edit, and organize leads with full contact history in one unified view.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="4" height="12" rx="1" fill="currentColor" opacity="0.4" />
        <rect x="8" y="6" width="4" height="10" rx="1" fill="currentColor" opacity="0.7" />
        <rect x="14" y="2" width="4" height="14" rx="1" fill="currentColor" />
      </svg>
    ),
    iconBg: "bg-violet-100 text-violet-600",
    title: "Kanban pipeline",
    desc: "Drag deals across stages and visualize your entire sales funnel at a glance.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    iconBg: "bg-emerald-100 text-emerald-600",
    title: "Tasks & follow-ups",
    desc: "Schedule reminders and assign follow-up tasks so no opportunity slips through.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 14 L7 9 L11 11 L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "bg-amber-100 text-amber-600",
    title: "Analytics dashboard",
    desc: "Track conversion rates, pipeline health, and team performance in real time.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="7" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="13" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    iconBg: "bg-orange-100 text-orange-600",
    title: "Role-based access",
    desc: "Separate views and permissions for admins and sales reps on your team.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 6v8M6 10h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    iconBg: "bg-teal-100 text-teal-600",
    title: "Quick add",
    desc: "Add a new lead or task in under 10 seconds from anywhere in the app.",
  },
];

const testimonials = [
  {
    quote: "We replaced our spreadsheet in a day. The pipeline view alone saved us hours every week.",
    name: "Sarah Chen",
    role: "Sales Lead, TechFlow",
  },
  {
    quote: "Simple enough for our 5-person team, powerful enough to actually close more deals.",
    name: "Marcus Rivera",
    role: "Founder, GrowthLab",
  },
  {
    quote: "Follow-up reminders cut our missed callbacks by half. Our close rate went up 40%.",
    name: "Priya Sharma",
    role: "Account Exec, Nexus CRM",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      <MarketingNav />

      {/* Hero */}
      <section className="hero-bg border-b border-slate-100 px-6 lg:px-10 pt-16 pb-24 text-center relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-xs font-medium mb-8 shadow-sm animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Built for small sales teams
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight mb-6 animate-fade-in-up animate-delay-100">
            Turn leads into deals{" "}
            <span className="gradient-text">without the complexity</span>
          </h1>

          <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
            A focused CRM for small teams — manage leads, visualize your pipeline,
            assign follow-ups, and close more deals without enterprise overhead.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-16 animate-fade-in-up animate-delay-300">
            <Link href="/register" className="btn-primary px-7 py-3 text-sm inline-flex items-center justify-center gap-2">
              Start for free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/login" className="btn-secondary px-7 py-3 text-sm">
              See how it works
            </Link>
          </div>

          {/* Pipeline Preview */}
          <div className="max-w-2xl mx-auto animate-fade-in-up animate-delay-400">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-1 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/80">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs text-slate-400 ml-2">Pipeline — Live preview</span>
              </div>
              <div className="flex divide-x divide-slate-100">
                {[
                  { label: "New", count: 24, color: "bg-blue-500", bar: "h-12" },
                  { label: "Contacted", count: 18, color: "bg-violet-500", bar: "h-9" },
                  { label: "Qualified", count: 11, color: "bg-amber-500", bar: "h-7" },
                  { label: "Proposal", count: 7, color: "bg-teal-500", bar: "h-5" },
                  { label: "Won", count: 5, color: "bg-emerald-500", bar: "h-4" },
                ].map((stage) => (
                  <div key={stage.label} className="flex-1 p-4 text-center">
                    <div className={`w-full ${stage.bar} ${stage.color} rounded-lg mb-3 opacity-80 mx-auto max-w-[60px]`} />
                    <div className="text-xl font-bold text-slate-800">{stage.count}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stage.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-slate-900 px-6 lg:px-10 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "3×", label: "faster lead capture", color: "text-blue-400" },
            { number: "85%", label: "fewer missed follow-ups", color: "text-violet-400" },
            { number: "2 min", label: "avg. onboarding time", color: "text-teal-400" },
            { number: "40%", label: "higher close rates", color: "text-amber-400" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-3xl sm:text-4xl font-bold ${stat.color}`}>{stat.number}</div>
              <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-10 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs text-blue-600 uppercase tracking-widest font-semibold mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Everything you need, nothing you don&apos;t
          </h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            Six focused tools that cover the full sales cycle — from first contact to closed deal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-2xl border border-slate-100 card-hover group"
            >
              <div
                className={`w-11 h-11 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                {feature.icon}
              </div>
              <h4 className="text-base font-semibold text-slate-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-100 px-6 lg:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs text-blue-600 uppercase tracking-widest font-semibold mb-3">How it works</p>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
                Up and running in minutes
              </h2>
              <p className="text-slate-500 leading-relaxed">
                No training sessions. No setup calls. Just open and go — your team will be productive from day one.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { step: "01", title: "Create your account", desc: "Register in under a minute. Invite your team and set roles immediately." },
                { step: "02", title: "Import or add leads", desc: "Add leads manually or import a CSV. Each lead gets a full timeline view." },
                { step: "03", title: "Move deals through pipeline", desc: "Drag cards on the Kanban board as deals progress through each stage." },
                { step: "04", title: "Track performance and close", desc: "Monitor your dashboard for bottlenecks, follow-up rates, and wins." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 bg-white rounded-xl border border-slate-100 p-5 card-hover"
                >
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 lg:px-10 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-blue-600 uppercase tracking-widest font-semibold mb-3">Testimonials</p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Loved by small sales teams</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-slate-100 p-6 card-hover">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#f59e0b">
                    <path d="M8 1l2 4.5H15l-3.5 3 1.5 4.5L8 11l-5 2 1.5-4.5L1 5.5h5L8 1z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-10 py-16">
        <div className="max-w-6xl mx-auto relative overflow-hidden rounded-3xl gradient-brand px-8 py-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Start managing your sales better today
            </h2>
            <p className="text-blue-100 max-w-md mx-auto mb-8 leading-relaxed">
              Join small teams already using CRM Lite to close more deals with less friction.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/register" className="px-7 py-3 rounded-xl bg-white text-blue-700 text-sm font-semibold hover:bg-blue-50 transition shadow-lg">
                Register for free
              </Link>
              <Link href="/login" className="px-7 py-3 rounded-xl border-2 border-white/30 text-white text-sm font-medium hover:bg-white/10 transition">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </main>
  );
}
