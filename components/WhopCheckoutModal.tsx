"use client";

import React, { useState, useEffect } from "react";
import { X, ShieldCheck, CreditCard, Lock, CheckCircle2, Sparkles, AlertCircle } from "lucide-react";
import { PricingPlan, roofingConfig } from "@/config/roofing.config";
import { trackWhopEvent } from "@/lib/whop-tracker";

// Import Whop Elements components
// In client components, Whop Elements renders native payment UI with BrandingElement
let WhopElementsReact: any = null;
try {
  WhopElementsReact = require("@whop/elements-react");
} catch (e) {
  // Graceful fallback for non-browser or compile-time environments
}

interface WhopCheckoutModalProps {
  plan: PricingPlan | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckoutSuccess?: (result: { planId: string; customerEmail: string; paymentMethodId: string }) => void;
}

export function WhopCheckoutModal({
  plan,
  isOpen,
  onClose,
  onCheckoutSuccess,
}: WhopCheckoutModalProps) {
  const [customerEmail, setCustomerEmail] = useState("homeowner@example.com");
  const [customerName, setCustomerName] = useState("Alex Harrison");
  const [customerAddress, setCustomerAddress] = useState("742 Evergreen Terrace, Dallas, TX");
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [setupIntentStored, setSetupIntentStored] = useState(false);

  useEffect(() => {
    if (isOpen && plan) {
      if (plan.type === "deposit") {
        trackWhopEvent("deposit_started", {
          plan_id: plan.planId,
          plan_title: plan.title,
          amount: plan.price,
          currency: "USD",
          setup_intent_requested: true,
        });
      }
      setCheckoutComplete(false);
    }
  }, [isOpen, plan]);

  if (!isOpen || !plan) return null;

  const isDepositPlan = plan.type === "deposit" || plan.setupIntentRequired;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutComplete(true);
      if (isDepositPlan) {
        setSetupIntentStored(true);
      }

      if (onCheckoutSuccess) {
        onCheckoutSuccess({
          planId: plan.planId,
          customerEmail,
          paymentMethodId: "pm_whop_setup_intent_visa_4242",
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-sm">
              W
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight">
                Whop Secure Checkout
              </h3>
              <p className="text-xs text-slate-400">
                Official Whop Payment Elements &bull; 256-Bit SSL Encrypted
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-200">
          {checkoutComplete ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-white">Payment Confirmed!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you! Your payment for <strong className="text-orange-400">{plan.title}</strong> (${plan.price}) has been processed successfully through Whop Payments.
              </p>

              {isDepositPlan && (
                <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 text-left text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    Card-on-File Securely Stored (Whop Setup Intent)
                  </div>
                  <p className="text-slate-300">
                    Your card ending in <strong>4242</strong> is on file for final job balance billing via the Whop Invoices API after installation.
                  </p>
                  <div className="bg-slate-900 p-2 rounded text-[11px] font-mono text-slate-400">
                    Token: <span className="text-emerald-300">pm_whop_setup_intent_visa_4242</span> &bull; Status: <span className="text-emerald-400">succeeded</span>
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/30"
              >
                Return to Site &amp; View Balance Invoice Demo
              </button>
            </div>
          ) : (
            <>
              {/* Plan Summary Header */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                    Selected Roofing Service
                  </span>
                  <h4 className="text-lg font-bold text-white">{plan.title}</h4>
                  <p className="text-xs text-slate-400">{plan.subtitle}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-white">${plan.price}</span>
                  <span className="text-xs text-slate-400 block">USD</span>
                </div>
              </div>

              {/* Deposit Card-on-File Notice */}
              {isDepositPlan && (
                <div className="p-3.5 rounded-xl bg-orange-950/40 border border-orange-500/30 flex items-start gap-3 text-xs text-orange-200">
                  <Sparkles className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-orange-300 font-bold block mb-0.5">
                      Setup Intent Enabled for High-Ticket Deposit
                    </strong>
                    Paying this $500 project deposit stores your payment method on file. Upon roof installation sign-off, the remaining balance can be auto-charged or invoiced via Whop Invoices.
                  </div>
                </div>
              )}

              {/* Express Checkout Element Slot (Apple Pay / Google Pay) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Whop Express Checkout Element
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-black hover:bg-neutral-900 border border-white/20 text-white text-xs font-semibold transition-all hover:scale-[1.01]"
                  >
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-semibold transition-all hover:scale-[1.01]"
                  >
                    <span className="font-bold">G Pay</span>
                  </button>
                </div>
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-4 text-slate-500 text-xs">Or pay with card &amp; financing</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>
              </div>

              {/* Whop Payment Element (Credit Card / BNPL Financing) */}
              <form onSubmit={handleSimulatePayment} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Homeowner Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email for Whop Receipt &amp; Invoice
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Property Address
                    </label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-orange-500 focus:outline-none"
                    />
                  </div>

                  {/* Payment Methods / Card Field Container */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                      <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-orange-500" />
                        Whop Payment Element
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                        Klarna &bull; Splitit &bull; Cards
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          readOnly
                          value="•••• •••• •••• 4242  (Whop Test Card)"
                          className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono text-emerald-400 select-none cursor-default"
                        />
                        <span className="absolute right-3 top-2.5 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                          Sandbox
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          readOnly
                          value="12 / 28"
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-slate-300"
                        />
                        <input
                          type="text"
                          readOnly
                          value="CVC •••"
                          className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 font-mono text-slate-300"
                        />
                      </div>
                    </div>

                    {/* BNPL Financing Callout */}
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-lg">
                      <span>Available at Whop Checkout:</span>
                      <span className="font-bold text-orange-300">
                        0% APR for 12 mos via Klarna/Splitit
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mandatory BrandingElement required by Whop */}
                <div className="pt-2">
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded bg-orange-600/30 text-orange-400 flex items-center justify-center font-bold text-[10px]">
                        W
                      </div>
                      <span>
                        Payments processed by <strong>Whop</strong> &bull; Merchant of Record
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px]">
                      <span>Terms</span>
                      <span>&bull;</span>
                      <span>Privacy</span>
                    </div>
                  </div>
                </div>

                {/* Submit Checkout Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Confirming with Whop...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        Complete Checkout &bull; ${plan.price}.00 USD
                      </span>
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

