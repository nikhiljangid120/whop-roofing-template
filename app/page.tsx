"use client";

import { useState } from "react";
import { roofingConfig, PricingPlan } from "@/config/roofing.config";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PricingPlans } from "@/components/PricingPlans";
import { FinancingBanner } from "@/components/FinancingBanner";
import { ServiceArea } from "@/components/ServiceArea";
import { Reviews } from "@/components/Reviews";
import { Footer } from "@/components/Footer";
import { EstimateModal } from "@/components/EstimateModal";
import { WhopCheckoutModal } from "@/components/WhopCheckoutModal";
import { InvoiceDemoDrawer } from "@/components/InvoiceDemoDrawer";
import { LivePixelMonitor } from "@/components/LivePixelMonitor";

export default function Home() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInvoicesOpen, setIsInvoicesOpen] = useState(false);

  // Stored state from checkout completion to demo invoice billing
  const [lastCheckoutResult, setLastCheckoutResult] = useState<{
    planId: string;
    customerEmail: string;
    paymentMethodId: string;
  } | null>(null);

  const handleSelectPlan = (planId: string) => {
    const plan = roofingConfig.plans.find((p) => p.planId === planId);
    if (plan) {
      setSelectedPlan(plan);
      setIsCheckoutOpen(true);
    }
  };

  const handleCheckoutSuccess = (result: {
    planId: string;
    customerEmail: string;
    paymentMethodId: string;
  }) => {
    setLastCheckoutResult(result);
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Navigation */}
      <Navbar
        onOpenEstimate={() => setIsEstimateOpen(true)}
        onOpenInvoices={() => setIsInvoicesOpen(true)}
      />

      {/* Hero Header */}
      <Hero
        onOpenEstimate={() => setIsEstimateOpen(true)}
        onSelectPlan={handleSelectPlan}
      />

      {/* Services Grid (Repair, Replacement, Inspection) */}
      <Services
        onSelectPlan={handleSelectPlan}
        onOpenEstimate={() => setIsEstimateOpen(true)}
      />

      {/* Pricing & 3 Real Whop Plans ($149 Inspection, $500 Deposit, $299 Flat-Rate) */}
      <PricingPlans
        onSelectPlan={handleSelectPlan}
        onOpenInvoices={() => setIsInvoicesOpen(true)}
      />

      {/* Financing Callout (0% APR, Klarna, Splitit) */}
      <FinancingBanner onOpenEstimate={() => setIsEstimateOpen(true)} />

      {/* Service Area Territory */}
      <ServiceArea onOpenEstimate={() => setIsEstimateOpen(true)} />

      {/* Reviews & Trust Badges */}
      <Reviews />

      {/* Contact & Footer */}
      <Footer
        onOpenEstimate={() => setIsEstimateOpen(true)}
        onOpenInvoices={() => setIsInvoicesOpen(true)}
      />

      {/* Modals & Drawers */}
      <EstimateModal
        isOpen={isEstimateOpen}
        onClose={() => setIsEstimateOpen(false)}
      />

      <WhopCheckoutModal
        plan={selectedPlan}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <InvoiceDemoDrawer
        isOpen={isInvoicesOpen}
        onClose={() => setIsInvoicesOpen(false)}
        prefillCustomerEmail={lastCheckoutResult?.customerEmail}
        prefillPaymentMethodId={lastCheckoutResult?.paymentMethodId}
      />

      {/* Real-time Visual Whop Pixel Event Monitor */}
      <LivePixelMonitor />
    </main>
  );
}
