"use client";

import { CreditCard, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

export function FinancingBanner({ onOpenEstimate }: { onOpenEstimate: () => void }) {
  return (
    <section id="financing" className="py-16 bg-gradient-to-r from-orange-950/60 via-slate-900 to-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-slate-900/90 border border-orange-500/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Homeowner Financing Solutions</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {roofingConfig.financing.headline}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                {roofingConfig.financing.subheadline} No surprise upfront burdens. Split high-ticket roof replacements into affordable monthly payments directly within the Whop Payment Elements flow.
              </p>

              {/* Supported BNPL Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold mr-1">Supported at Whop Checkout:</span>
                {roofingConfig.financing.providers.map((provider) => (
                  <span
                    key={provider}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-bold tracking-wide shadow-sm"
                  >
                    {provider}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Instant 60-Sec Decision</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Zero Prepayment Penalties</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Integrated with Whop Checkout</span>
                </div>
              </div>

              <button
                onClick={onOpenEstimate}
                className="w-full py-3.5 px-6 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all text-center"
              >
                Prequalify With Your Estimate
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

