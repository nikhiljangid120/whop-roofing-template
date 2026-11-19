"use client";

import { Check, Zap, Sparkles, ShieldCheck, ArrowRight, CreditCard } from "lucide-react";
import { roofingConfig, PricingPlan } from "@/config/roofing.config";

interface PricingPlansProps {
  onSelectPlan: (planId: string) => void;
  onOpenInvoices: () => void;
}

export function PricingPlans({ onSelectPlan, onOpenInvoices }: PricingPlansProps) {
  return (
    <section id="pricing" className="py-20 bg-slate-900/50 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <span>Transparent Whop Commerce Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certified Plans, Deposits &amp; Instant Dispatch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            No ambiguous estimates or hidden travel fees. Check out securely via Whop with support for Apple Pay, Google Pay, and flexible 0% APR financing.
          </p>
        </div>

        {/* 3 Real Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {roofingConfig.plans.map((plan) => {
            const isDeposit = plan.type === "deposit";

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 border ${
                  plan.popular
                    ? "bg-gradient-to-b from-slate-900 to-slate-950 border-orange-500 shadow-2xl shadow-orange-950/50 scale-[1.03] z-10"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Popular / High-Ticket Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-lg shadow-orange-600/40 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Most Popular &bull; High-Ticket</span>
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest block">
                      {plan.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-1">
                      {plan.title}
                    </h3>
                  </div>

                  {/* Price Tag */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white tracking-tight">
                      ${plan.price}
                    </span>
                    <span className="text-slate-400 text-xs font-semibold uppercase">
                      USD {isDeposit ? "deposit" : "one-time"}
                    </span>
                  </div>

                  {/* Card-on-File Highlight for Deposit */}
                  {isDeposit && (
                    <div className="p-3 rounded-xl bg-orange-950/50 border border-orange-500/40 text-xs text-orange-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-orange-300">
                        <CreditCard className="w-4 h-4" />
                        <span>Whop Setup Intent Included</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-orange-200/90">
                        Card is kept securely on-file. Final balance billed post-installation via Whop Invoices API.
                      </p>
                    </div>
                  )}

                  {/* Feature List */}
                  <ul className="space-y-3 pt-2 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-8 space-y-3">
                  <button
                    onClick={() => onSelectPlan(plan.planId)}
                    className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                      plan.popular
                        ? "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {isDeposit && (
                    <button
                      onClick={onOpenInvoices}
                      className="w-full text-center text-[11px] text-orange-400 hover:text-orange-300 underline font-mono block pt-1"
                    >
                      &rarr; Test Final Balance Billing Flow (Invoices API)
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
