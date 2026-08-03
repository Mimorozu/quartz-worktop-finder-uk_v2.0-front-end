"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-dark to-slate px-5">
      <div className="w-full max-w-[440px] bg-slate p-8 sm:p-12 rounded-2xl border border-border-dark shadow-2xl shadow-black/40">
        <div className="text-center mb-10">
          <div className="text-2xl font-bold text-white mb-2">
            Quartz Worktop <span className="text-gold">Finder</span>
          </div>
          <div className="text-muted-light text-sm">Admin Panel</div>
        </div>

        <h1 className="text-center text-2xl font-semibold text-white mb-7">Sign In</h1>

        {state?.error && (
          <div className="bg-danger-bg text-danger-text border border-danger-border rounded-lg px-4 py-3 mb-6 text-center text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction}>
          <label className="block mb-2 font-medium text-sm text-white">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            required
            autoFocus
            className="w-full px-4 py-3.5 mb-6 bg-slate-dark border-2 border-border-dark rounded-lg text-white placeholder:text-muted transition-all focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10"
          />

          <label className="block mb-2 font-medium text-sm text-white">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            className="w-full px-4 py-3.5 mb-6 bg-slate-dark border-2 border-border-dark rounded-lg text-white placeholder:text-muted transition-all focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10"
          />

          <button
            type="submit"
            disabled={pending}
            className="w-full py-3.5 rounded-lg font-semibold bg-gold text-white transition-all hover:bg-gold-dark hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0"
          >
            {pending ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
