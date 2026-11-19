"use client";

import { useState } from "react";
import { X, FileText, CheckCircle2, Send, Zap, CreditCard, ArrowRight, Shield } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

interface InvoiceDemoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCustomerEmail?: string;
  prefillPaymentMethodId?: string;
}

export function InvoiceDemoDrawer({
  isOpen,
  onClose,
  prefillCustomerEmail = "homeowner@example.com",
  prefillPaymentMethodId = "pm_whop_setup_intent_visa_4242",
}: InvoiceDemoDrawerProps) {
  const [customerEmail, setCustomerEmail] = useState(prefillCustomerEmail);
  const [totalJobValue, setTotalJobValue] = useState(12500);
  const [depositPaid, setDepositPaid] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
  const [invoiceResult, setInvoiceResult] = useState<any>(null);

  if (!isOpen) return null;

  const finalBalance = totalJobValue - depositPaid;

  const handleCreateInvoice = async (autoCharge: boolean) => {
    setIsLoading(true);
    setInvoiceResult(null);

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail,
          totalJobValue,
          depositAmount: depositPaid,
          finalBalance,
          storedPaymentMethodId: prefillPaymentMethodId,
          autoCharge,
          jobDescription: "Architectural Shingle Roof Replacement (45 Squares, GAF Timberline)",
        }),
      });

      const data = await res.json();
      setInvoiceResult(data);
    } catch (err: any) {
      console.error("Failed to generate invoice:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Whop Invoices API &bull; Final Job Balance
              </h3>
              <p className="text-xs text-slate-400">
                End-to-End High-Ticket Flow: Deposit &rarr; Setup Intent &rarr; Final Invoice
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-200">
          {/* Explanation Banner */}
          <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-xs text-slate-300 leading-relaxed flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">How this completes the Whop Flow:</strong>
              When the homeowner paid the <strong className="text-orange-400">$500 deposit</strong>, a Whop Setup Intent securely stored their payment method on file. Now that the roof installation is completed, this tool demonstrates billing the remaining <strong className="text-white">${finalBalance.toLocaleString()}</strong> balance.
            </div>
          </div>

          {/* Job Itemization Breakdown */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-slate-800 font-sans">
              <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                Itemized Job Calculation
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-orange-400">
                Project #ROOF-4820
              </span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Full Roof Replacement (45 Squares):</span>
              <span className="text-white font-bold">${totalJobValue.toLocaleString()}.00</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Less Pre-Paid Project Deposit (Whop Plan):</span>
              <span>-${depositPaid.toLocaleString()}.00</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-sm">
              <span className="font-sans font-bold text-white">Remaining Balance Due:</span>
              <span className="font-bold text-orange-400 text-lg">
                ${finalBalance.toLocaleString()}.00 USD
              </span>
            </div>
          </div>

          {/* Stored Payment Method Tag */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Stored Card-on-File:</span>
              <span className="font-mono text-white bg-slate-800 px-1.5 py-0.5 rounded">
                Visa •••• 4242
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Setup Intent Active
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => handleCreateInvoice(true)}
              disabled={isLoading}
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              <span>Auto-Charge Stored Card (${finalBalance.toLocaleString()})</span>
            </button>

            <button
              onClick={() => handleCreateInvoice(false)}
              disabled={isLoading}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-orange-400" />
              <span>Send Whop Invoice Link</span>
            </button>
          </div>

          {/* Result Output */}
          {invoiceResult && (
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>{invoiceResult.message}</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg overflow-x-auto text-[11px] font-mono text-slate-300 space-y-1">
                <div><strong>Invoice ID:</strong> {invoiceResult.invoice?.id}</div>
                <div><strong>Total Amount:</strong> ${(invoiceResult.invoice?.total_balance_due / 100).toLocaleString()} USD</div>
                <div><strong>Status:</strong> <span className="text-emerald-400 font-bold">{invoiceResult.invoice?.status}</span></div>
                <div><strong>Whop Payment Link:</strong> <a href="#" className="text-orange-400 underline">{invoiceResult.invoice?.payment_link}</a></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

