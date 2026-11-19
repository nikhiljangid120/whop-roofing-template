"use client";

import { useState } from "react";
import { MapPin, CheckCircle, Search, ShieldAlert } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

export function ServiceArea({ onOpenEstimate }: { onOpenEstimate: () => void }) {
  const [zipInput, setZipInput] = useState("");
  const [lookupResult, setLookupResult] = useState<"covered" | "uncovered" | null>(null);

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanZip = zipInput.trim();
    if (!cleanZip) return;

    if (
      roofingConfig.serviceArea.zipCodes.includes(cleanZip) ||
      cleanZip.startsWith("75") ||
      cleanZip.startsWith("76")
    ) {
      setLookupResult("covered");
    } else {
      setLookupResult("uncovered");
    }
  };

  return (
    <section id="service-area" className="py-20 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Covered Cities */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Dedicated US Service Territory</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Rapid Response Crews in {roofingConfig.serviceArea.primaryCounty}
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed">
              We deploy full roofing crews, aerial drones, and emergency tarping units throughout the greater metroplex. All trucks carry emergency leak mitigation equipment.
            </p>

            {/* City Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {roofingConfig.serviceArea.cities.map((city) => (
                <div
                  key={city}
                  className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-200"
                >
                  <MapPin className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>{city}, {roofingConfig.serviceArea.state}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Zip Checker */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-5">
              <h3 className="text-xl font-bold text-white">
                Check Instant Coverage &amp; Dispatch
              </h3>
              <p className="text-xs text-slate-400">
                Enter your property zip code to verify same-day emergency inspection availability.
              </p>

              <form onSubmit={handleCheckZip} className="flex gap-2">
                <input
                  type="text"
                  maxLength={5}
                  placeholder="e.g. 75201"
                  value={zipInput}
                  onChange={(e) => {
                    setZipInput(e.target.value);
                    setLookupResult(null);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-orange-500 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Verify
                </button>
              </form>

              {lookupResult === "covered" && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    <span>Zip Code {zipInput} is in Our Priority Coverage Zone!</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/80">
                    Our drone inspection teams and roofing crews can be on-site within 24 to 48 hours.
                  </p>
                  <button
                    onClick={onOpenEstimate}
                    className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs"
                  >
                    Lock Schedule for {zipInput}
                  </button>
                </div>
              )}

              {lookupResult === "uncovered" && (
                <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-500/40 text-xs text-amber-200 space-y-2 animate-fadeIn">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Zip Code {zipInput} is Outside Primary Zone</span>
                  </div>
                  <p className="text-[11px] text-amber-200/80">
                    We can accommodate large architectural replacements on a case-by-case basis. Request a custom estimate.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

