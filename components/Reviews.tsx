"use client";

import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

export function Reviews() {
  return (
    <section id="reviews" className="py-20 bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <span>Verified Homeowner Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Over {roofingConfig.trust.roofsCompleted} Texas Property Owners
          </h2>
          <div className="flex items-center justify-center gap-2 pt-2 text-sm text-slate-300">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span className="font-bold text-white">{roofingConfig.trust.googleRating} Average</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-slate-400">{roofingConfig.trust.googleReviewCount} Google Reviews</span>
            <span className="text-slate-500">&bull;</span>
            <span className="text-emerald-400 font-semibold">BBB {roofingConfig.trust.bbbRating} Accredited</span>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roofingConfig.reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500">{rev.date}</span>
                </div>

                <h4 className="font-bold text-white text-base leading-snug">
                  &ldquo;{rev.headline}&rdquo;
                </h4>

                <p className="text-slate-300 text-xs leading-relaxed">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">{rev.author}</span>
                  <span className="text-[11px] text-slate-400">{rev.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/70 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Customer</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
