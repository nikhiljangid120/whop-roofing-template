"use client";

import React, { useState } from "react";
import { X, CheckCircle, Send, HardHat, Sparkles } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";
import { trackWhopEvent } from "@/lib/whop-tracker";

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EstimateModal({ isOpen, onClose }: EstimateModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [roofAge, setRoofAge] = useState("10-15 years");
  const [serviceType, setServiceType] = useState("Full Roof Replacement");
  const [notes, setNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // 1. Send to our backend Whop Leads API route
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          roofAge,
          serviceType,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit estimate lead");
      }

      // 2. Fire the required Whop Pixel event: estimate_requested
      trackWhopEvent("estimate_requested", {
        customer_name: name,
        customer_email: email,
        service_type: serviceType,
        property_address: address,
        lead_id: data.lead?.id || "lead_whop",
        estimated_value: 12500, // typical high-ticket replacement value
      });

      setSubmittedLead(data.lead);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setNotes("");
    setSubmittedLead(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
              <HardHat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Request a Free Roofing Estimate</h3>
              <p className="text-xs text-slate-400">
                Wired directly to Whop Leads CRM &bull; Instant Response
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-200">
          {submittedLead ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white">Estimate Request Received!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Our certified estimator has received your details and will call you within 15 minutes.
              </p>

              {/* Whop Lead Proof Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-slate-800 font-sans">
                  <span className="font-bold text-orange-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Whop Leads API Record
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                    Status: Created
                  </span>
                </div>
                <div><strong>Lead ID:</strong> {submittedLead.id}</div>
                <div><strong>Name:</strong> {submittedLead.name}</div>
                <div><strong>Email:</strong> {submittedLead.email}</div>
                <div><strong>Pixel Event:</strong> <span className="text-orange-400 font-bold">whop.track(&quot;estimate_requested&quot;) Fired</span></div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {errorMessage && (
                <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 rounded-xl">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Property Street Address &amp; Zip Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="1234 Highland Park Blvd, Dallas, TX 75201"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    Service Required
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Full Roof Replacement">Full Roof Replacement</option>
                    <option value="Emergency Leak Repair">Emergency Leak Repair</option>
                    <option value="Storm / Hail Damage Inspection">Storm / Hail Damage Inspection</option>
                    <option value="Commercial Flat Roofing">Commercial Flat Roofing</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-300 mb-1">
                    Approx. Roof Age
                  </label>
                  <select
                    value={roofAge}
                    onChange={(e) => setRoofAge(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                  >
                    <option value="Under 5 years">Under 5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10-15 years">10-15 years</option>
                    <option value="15-20 years">15-20 years</option>
                    <option value="20+ years (Needs Replacement)">20+ years (Needs Replacement)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-300 mb-1">
                  Additional Notes / Damage Symptoms
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe leaks, missing shingles, storm dates, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-orange-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting to Whop Leads...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Request (Fires Whop Lead)</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

