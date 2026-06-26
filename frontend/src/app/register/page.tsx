"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import AuthLayout from "@/components/ui/AuthLayout";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/user/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        router.push("/login");
      }
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Registration failed. Please try again."));
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join CRM Lite and start managing your pipeline"
      navPrompt="Already have an account?"
      navLinkText="Sign in"
      navLinkHref="/login"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      {error && (
        <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#dc2626" strokeWidth="1.2" />
            <path d="M7 4v3.5M7 9.5v.5" stroke="#dc2626" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p className="text-xs text-red-600 leading-relaxed">{error}</p>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full name</label>
          <input type="text" name="name" placeholder="Jane Smith" className="input-field" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email address</label>
          <input type="email" name="email" placeholder="you@example.com" className="input-field" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Password</label>
          <input type="password" name="password" placeholder="••••••••" className="input-field" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Confirm password</label>
          <input type="password" name="confirmPassword" placeholder="••••••••" className="input-field" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.5" strokeDasharray="8 8" />
              </svg>
              Creating account...
            </>
          ) : (
            "Create account →"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
