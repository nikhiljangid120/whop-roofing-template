"use client";

import { useState } from "react";
import { Hammer, ShieldCheck, Camera, Wrench, ArrowRight, Check, Sparkles } from "lucide-react";
import { roofingConfig, ServiceItem } from "@/config/roofing.config";
import { trackWhopEvent } from "@/lib/whop-tracker";

interface ServicesProps {
  onSelectPlan: (planId: string) => void;
  onOpenEstimate: () => void;
}

export function Services({ onSelectPlan, onOpenEstimate }: ServicesProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(roofingConfig.services[0].id);

  const handleServiceClick = (service: ServiceItem) => {
    setActiveServiceId(service.id);

    // Fire required Whop Pixel event: service_viewed
    trackWhopEvent("service_viewed", {
      service_id: service.id,
      service_name: service.name,
      price: service.numericPrice,
      currency: "USD",
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "hammer":
        return <Hammer className="w-5 h-5 text-orange-400" />;
      case "shield":
        return <ShieldCheck className="w-5 h-5 text-orange-400" />;
      case "drone":
        return <Camera className="w-5 h-5 text-orange-400" />;
      default:
        return <Wrench className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-slate-950 border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <span>Specialized US Roofing Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Comprehensive Residential &amp; Commercial Systems
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From high-definition drone storm assessments to multi-day architectural tear-offs. Backed by manufacturer certifications and direct insurance-ready reporting.
          </p>
        </div>

        {/* Services 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roofingConfig.services.map((service) => {
            const isActive = activeServiceId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer border group ${
                  isActive
                    ? "bg-slate-900 border-orange-500 shadow-2xl shadow-orange-950/40 -translate-y-1.5"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                {/* Active Indicator Banner */}
                {isActive && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-orange-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    <span>Viewing &bull; Pixel Fired</span>
                  </div>
                )}

                {/* Service Card Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Floating Badges */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur">
                      {getIcon(service.iconName)}
                    </div>
                    <div className="flex gap-1.5">
                      {service.badges.map((b, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-slate-950/90 text-slate-200 border border-slate-700 backdrop-blur"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-slate-400 text-xs leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Feature Checkpoints */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase font-mono">
                        Pricing / Booking
                      </span>
                      <span className="text-sm font-bold text-white">
                        {service.priceDisplay}
                      </span>
                    </div>

                    {service.planId ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleServiceClick(service);
                          onSelectPlan(service.planId!);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-orange-600/30 transition-all"
                      >
                        <span>Checkout</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenEstimate();
                        }}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1 transition-all"
                      >
                        <span>Get Estimate</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
