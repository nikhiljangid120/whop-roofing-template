"use client";

import { Shield, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { roofingConfig } from "@/config/roofing.config";

export function Footer({
  onOpenEstimate,
  onOpenInvoices,
}: {
  onOpenEstimate: () => void;
  onOpenInvoices: () => void;
}) {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                <Shield className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                {roofingConfig.company.name}
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {roofingConfig.company.tagline}. High-ticket residential shingle systems, commercial flat roofing, and certified storm restorations across {roofingConfig.serviceArea.primaryCounty}.
            </p>
            <div className="pt-2 text-[11px] text-slate-500 font-mono space-y-1">
              <div>State License: {roofingConfig.company.licenseNumber}</div>
              <div>GAF Master Elite® Certified Contractor</div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Emergency &amp; Contact
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <a href={`tel:${roofingConfig.company.phoneRaw}`} className="hover:text-white">
                  {roofingConfig.company.phone} (24/7)
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <a href={`mailto:${roofingConfig.company.email}`} className="hover:text-white">
                  {roofingConfig.company.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>
                  {roofingConfig.company.address.street}, {roofingConfig.company.address.city}, {roofingConfig.company.address.state} {roofingConfig.company.address.zip}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <span>{roofingConfig.company.hours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Template Config */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#pricing" className="hover:text-white">Whop Plans</a></li>
              <li><a href="#financing" className="hover:text-white">Financing</a></li>
              <li><a href="#service-area" className="hover:text-white">Coverage Map</a></li>
              <li><a href="#reviews" className="hover:text-white">Testimonials</a></li>
            </ul>
          </div>

          {/* Whop Features Demo Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              Whop Template Features
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-[11px] text-slate-300">
              <div className="text-orange-400 font-bold">Whop End-to-End Demo:</div>
              <div>&bull; Payment Elements &amp; BrandingElement</div>
              <div>&bull; Setup Intent Card-on-File</div>
              <div>&bull; Leads API Quote Capture</div>
              <div>&bull; Invoices API Balance Billing</div>
              <div>&bull; whop.track Pixel Events</div>
              <button
                onClick={onOpenInvoices}
                className="w-full mt-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-orange-400 rounded font-semibold text-center block"
              >
                Launch Invoices Demo
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-12 mt-12 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {roofingConfig.company.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Whop Websites &bull; whop.app</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
