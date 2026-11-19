"use client";

import { useState } from "react";
import { Phone, Shield, FileText, Menu, X, ArrowRight } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

interface NavbarProps {
  onOpenEstimate: () => void;
  onOpenInvoices: () => void;
}

export function Navbar({ onOpenEstimate, onOpenInvoices }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top emergency dispatch bar */}
      <div className="bg-orange-600 px-4 py-1.5 text-white text-xs font-semibold text-center flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        <span>24/7 Storm Response Dispatch Active in {roofingConfig.serviceArea.primaryCounty}</span>
        <span className="hidden sm:inline">&bull; Call Now: {roofingConfig.company.phone}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-600/30">
              <Shield className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight block">
                {roofingConfig.company.name.split(" ")[0]} <span className="text-orange-500">{roofingConfig.company.name.split(" ").slice(1).join(" ")}</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider block uppercase">
                GAF Master Elite® &bull; Lic #{roofingConfig.company.licenseNumber}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-orange-400 transition-colors">
              Services
            </a>
            <a href="#pricing" className="hover:text-orange-400 transition-colors">
              Plans &amp; Deposits
            </a>
            <a href="#financing" className="hover:text-orange-400 transition-colors">
              Financing (0% APR)
            </a>
            <a href="#service-area" className="hover:text-orange-400 transition-colors">
              Service Area
            </a>
            <a href="#reviews" className="hover:text-orange-400 transition-colors">
              Reviews
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenInvoices}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
              title="Demo of Whop Invoices API final balance billing"
            >
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              <span>Invoices API Demo</span>
            </button>

            <button
              onClick={onOpenEstimate}
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/25 transition-all flex items-center gap-1.5"
            >
              <span>Request Estimate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenEstimate}
              className="px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-xs"
            >
              Estimate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 text-sm">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-orange-400 py-1"
          >
            Services
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-orange-400 py-1"
          >
            Plans &amp; Deposits
          </a>
          <a
            href="#financing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-orange-400 py-1"
          >
            Financing (0% APR)
          </a>
          <a
            href="#service-area"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-300 hover:text-orange-400 py-1"
          >
            Service Area
          </a>
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInvoices();
              }}
              className="w-full py-2.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>Whop Invoices API Demo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

