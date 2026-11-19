"use client";

import { Shield, CheckCircle, ArrowRight, Star, Award, Zap, Sparkles } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

interface HeroProps {
  onOpenEstimate: () => void;
  onSelectPlan: (planId: string) => void;
}

export function Hero({ onOpenEstimate, onSelectPlan }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 lg:py-24 border-b border-slate-800">
      {/* Background glow & subtle roof lattice pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>America&apos;s High-Ticket Roofing Specialist</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-slate-300">Whop Websites Native</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Architectural Roofing Built to Outlast the Storm.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Serving {roofingConfig.serviceArea.primaryCounty} with certified drone inspections, lifetime shingle replacements, and rapid storm repair. Transparent pricing, instant deposit scheduling, and 0% APR financing powered by Whop.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenEstimate}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-orange-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectPlan("plan_inspection_149")}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-orange-500/50 transition-all flex items-center justify-center gap-2"
              >
                <span>Book $149 Drone Inspection</span>
              </button>
            </div>

            {/* Quick Trust Checks */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>GAF Master Elite® (Top 2%)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>$2M Liability Insured</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>25-Yr Workmanship Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Ticket Roofing Proof Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                <div>
                  <span className="text-xs font-mono text-orange-400 uppercase tracking-widest block">
                    Verified Contractor
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {roofingConfig.company.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  <span>{roofingConfig.trust.googleRating}</span>
                  <span className="text-amber-200/60">({roofingConfig.trust.googleReviewCount})</span>
                </div>
              </div>

              {/* High Ticket Value Pillars */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Typical Replacement Scope</span>
                    <span className="text-sm font-bold text-white">Architectural 30-Yr HDZ Shingles</span>
                  </div>
                  <span className="text-xs font-bold text-orange-400 bg-orange-950/60 px-2.5 py-1 rounded border border-orange-900">
                    High-Ticket
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Project Schedule Commitment</span>
                    <span className="text-sm font-bold text-white">$500 Whop Deposit Locks Crew</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400">Card-on-File</span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Financing via Whop Elements</span>
                    <span className="text-sm font-bold text-white">0% APR for 12–24 Mos</span>
                  </div>
                  <span className="text-[10px] text-slate-300 font-mono bg-slate-800 px-2 py-0.5 rounded">
                    Klarna &bull; Splitit
                  </span>
                </div>
              </div>

              {/* Bottom Card CTA */}
              <button
                onClick={() => onSelectPlan("plan_deposit_500")}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span>Start Project Deposit ($500)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

