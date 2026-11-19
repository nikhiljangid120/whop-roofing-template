"use client";

import { useState } from "react";
import { Calculator, Sparkles, Check, ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

interface CostEstimatorProps {
  onSelectPlan: (planId: string) => void;
  onOpenEstimate: () => void;
}

export function CostEstimator({ onSelectPlan, onOpenEstimate }: CostEstimatorProps) {
  const [squares, setSquares] = useState(35); // 35 roofing squares = ~2,800 sq ft home
  const pricePerSquare = 340; // GAF Timberline HDZ installed avg in US

  const totalEstimate = squares * pricePerSquare;
  const deposit = 500;
  const finalBalance = totalEstimate - deposit;
  const monthlyBNPL = Math.round(totalEstimate / 24); // 24-month financing

  return (
    <section className="py-20 bg-slate-900/60 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Whop Financing Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Instant Roof Cost &amp; Monthly Payment Calculator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            See your estimated architectural replacement cost, lock your installation with a $500 Whop deposit, and view 0% APR financing terms.
          </p>
        </div>

        {/* Calculator Widget Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900 border border-slate-700/80 p-8 sm:p-10 shadow-2xl space-y-8">
          {/* Slider Row */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-sm font-bold text-white block">
                  Approximate Home Roof Size: <span className="text-orange-400 font-mono text-base font-extrabold">{squares} Squares</span> (~{squares * 85} sq ft floor)
                </label>
                <p className="text-xs text-slate-400">
                  Slide to match your home&apos;s footprint (average US home is 25 to 40 squares).
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">GAF HDZ Architectural</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                  Lifetime Shingle System
                </span>
              </div>
            </div>

            <input
              type="range"
              min="20"
              max="60"
              step="1"
              value={squares}
              onChange={(e) => setSquares(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-orange-500 border border-slate-800"
            />

            <div className="flex justify-between text-[11px] font-mono text-slate-500">
              <span>20 Squares (Small Bungalow)</span>
              <span>40 Squares (Standard 2-Story)</span>
              <span>60 Squares (Estate / Luxury)</span>
            </div>
          </div>

          {/* 3 Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            {/* Metric 1: Total Job Value */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Estimated Job Scope</span>
              <span className="text-3xl font-black text-white block font-mono">
                ${totalEstimate.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-500 block">Tear-off + Decking + Materials</span>
            </div>

            {/* Metric 2: Required Whop Deposit */}
            <div className="p-4 rounded-2xl bg-orange-950/40 border border-orange-500/40 text-center space-y-1">
              <span className="text-xs text-orange-300 block font-bold">Locks Schedule on Whop</span>
              <span className="text-3xl font-black text-orange-400 block font-mono">
                ${deposit}
              </span>
              <span className="text-[10px] text-orange-300/80 block">Setup Intent Card-on-File</span>
            </div>

            {/* Metric 3: Whop BNPL Financing */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 block font-medium">Whop 0% Financing</span>
              <span className="text-3xl font-black text-emerald-400 block font-mono">
                ${monthlyBNPL}<span className="text-xs font-normal text-slate-400">/mo</span>
              </span>
              <span className="text-[10px] text-slate-500 block">24 Mos via Klarna &bull; Splitit</span>
            </div>
          </div>

          {/* Invoices API Bridge Info */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-white block">Post-Installation Remaining Balance:</strong>
                <span className="text-slate-400">
                  ${finalBalance.toLocaleString()} billed post-signoff via the Whop Invoices API (or auto-charged to card on file).
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onSelectPlan("plan_deposit_500")}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Lock $500 Deposit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
