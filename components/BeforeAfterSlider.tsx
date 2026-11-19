"use client";

import { useState } from "react";
import { Sparkles, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

export function BeforeAfterSlider({ onOpenEstimate }: { onOpenEstimate: () => void }) {
  const [viewMode, setViewMode] = useState<"after" | "before">("after");

  return (
    <section className="py-20 bg-slate-950 border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>High-Ticket Transformations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Storm Damage Mitigation &bull; Visual Proof
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            See how our crews transform aging, wind-torn roofs into engineered architectural masterpieces protected by lifetime warranties.
          </p>

          {/* Toggle Buttons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-1.5 pt-2">
            <button
              onClick={() => setViewMode("before")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === "before"
                  ? "bg-red-950/80 text-red-300 border border-red-500/50 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Before (Hail &amp; Wind Damage)</span>
            </button>
            <button
              onClick={() => setViewMode("after")}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                viewMode === "after"
                  ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>After (Summit Ridge HDZ® System)</span>
            </button>
          </div>
        </div>

        {/* Comparison Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Display */}
            <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-slate-950 overflow-hidden group">
              <img
                src={viewMode === "after" ? roofingConfig.images.afterRestored : roofingConfig.images.beforeDamage}
                alt="Roof Restoration Project"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Status Badge Tag */}
              <div className="absolute top-5 left-5">
                {viewMode === "after" ? (
                  <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 font-bold text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Completed &bull; GAF Timberline HDZ®</span>
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-xl bg-red-950/90 border border-red-500/60 text-red-300 font-bold text-xs uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span>Pre-Inspection &bull; Active Decking Leaks</span>
                  </span>
                )}
              </div>

              {/* Bottom Specs on Image */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-xs text-white">
                <div>
                  <span className="text-[11px] text-slate-400 block font-mono">Location</span>
                  <span className="font-bold">Highland Park Estate, Dallas, TX</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block font-mono">Total Project Value</span>
                  <span className="font-bold text-orange-400">$14,800 USD</span>
                </div>
              </div>
            </div>

            {/* Description & Specs Column */}
            <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-mono text-orange-400 uppercase tracking-widest block">
                  Project Case Study
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight">
                  {viewMode === "after"
                    ? "Full Lifetime Architectural Shingle Upgrade"
                    : "Severe Wind Tear-Off & Decking Rot"}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {viewMode === "after"
                    ? "Upgraded with GAF Timberline HDZ® shingles rated for 130 mph winds, Cobra® ridge ventilation, and WeatherWatch® leak barriers. Finished in 1 single day with zero yard debris left behind."
                    : "Hail impact caused granule loss across 40 squares. Water infiltrated the plywood decking near valleys. Our $149 drone thermal scan identified the structural damage for insurance approval."}
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex justify-between items-center text-xs py-2 border-b border-slate-800 text-slate-300">
                    <span>Roof Pitch &amp; Area:</span>
                    <span className="font-mono text-white font-bold">42 Squares (8/12 Pitch)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 border-b border-slate-800 text-slate-300">
                    <span>Project Schedule:</span>
                    <span className="font-mono text-emerald-400 font-bold">Completed in 1 Day</span>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2 border-b border-slate-800 text-slate-300">
                    <span>Whop Payments Flow:</span>
                    <span className="font-mono text-orange-300 font-bold">$500 Deposit &rarr; Balance Invoiced</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenEstimate}
                className="w-full py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <span>Get An Assessment On Your Roof</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

