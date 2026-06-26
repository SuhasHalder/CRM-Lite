"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "@/lib/api";
import { getApiErrorMessage } from "@/lib/api-error";
import AuthLayout from "@/components/ui/AuthLayout";

export default function LoginPage() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/user/auth/login", loginData);

      if (response.data.success) {
        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Login failed. Please try again."));
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your CRM Lite account"
      navPrompt="Don't have an account?"
      navLinkText="Register"
      navLinkHref="/register"
      footerText="New to CRM Lite?"
      footerLinkText="Create an account"
      footerLinkHref="/register"
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

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="input-field"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-semibold text-slate-600">Password</label>
            <Link href="#" className="text-xs text-blue-600 hover:text-blue-700 font-medium transition">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="input-field"
            value={loginData.password}
            onChange={handleChange}
            required
          />
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
              Signing in...
            </>
          ) : (
            "Sign in →"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
