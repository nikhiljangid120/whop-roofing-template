"use client";

import { useEffect, useState } from "react";
import { Activity, CheckCircle, ChevronDown, ChevronUp, Radio } from "lucide-react";
import { PixelEventPayload } from "@/lib/whop-tracker";

export function LivePixelMonitor() {
  const [events, setEvents] = useState<PixelEventPayload[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [recentFlash, setRecentFlash] = useState(false);

  useEffect(() => {
    const handlePixelEvent = (e: Event) => {
      const customEvent = e as CustomEvent<PixelEventPayload>;
      if (customEvent.detail) {
        setEvents((prev) => [customEvent.detail, ...prev.slice(0, 9)]);
        setRecentFlash(true);
        setTimeout(() => setRecentFlash(false), 2000);
      }
    };

    window.addEventListener("whop:pixel:event", handlePixelEvent);
    return () => {
      window.removeEventListener("whop:pixel:event", handlePixelEvent);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full font-mono text-xs shadow-2xl rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur text-slate-100 overflow-hidden transition-all duration-200">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3.5 py-2.5 bg-slate-800/80 cursor-pointer hover:bg-slate-800 select-none border-b border-slate-700/50"
      >
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${
                recentFlash ? "opacity-100 scale-125" : ""
              }`}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-semibold text-slate-200 text-xs tracking-wide flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-orange-500" />
            Whop Pixel Verifier
          </span>
          <span className="bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded text-[10px] font-bold">
            {events.length} fired
          </span>
        </div>
        <button className="text-slate-400 hover:text-white">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Body */}
      {isOpen && (
        <div className="p-3 max-h-56 overflow-y-auto space-y-2">
          {events.length === 0 ? (
            <p className="text-slate-400 italic text-[11px] py-1 text-center">
              Listening for whop.track events... Click a service, request an estimate, or start deposit.
            </p>
          ) : (
            events.map((evt, idx) => (
              <div
                key={idx}
                className="p-2 rounded bg-slate-950/70 border border-slate-800 flex flex-col gap-1 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    whop.track(&quot;{evt.eventName}&quot;)
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                {evt.data && Object.keys(evt.data).length > 0 && (
                  <pre className="text-[10px] text-slate-300 bg-black/40 p-1.5 rounded overflow-x-auto">
                    {JSON.stringify(evt.data, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

