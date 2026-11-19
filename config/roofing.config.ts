/**
 * Roofing Company Configuration Template
 * 
 * To rebrand this template for any US roofing contractor, simply update this single configuration file.
 * No structural code changes are required.
 */

export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  priceDisplay: string;
  numericPrice: number;
  planId?: string;
  iconName: "hammer" | "shield" | "drone" | "wrench" | "sun";
  badges: string[];
  features: string[];
}

export interface PricingPlan {
  id: string;
  planId: string;
  title: string;
  subtitle: string;
  price: number;
  period?: string;
  popular?: boolean;
  type: "inspection" | "deposit" | "flat_rate";
  setupIntentRequired?: boolean;
  features: string[];
  ctaText: string;
}

export const roofingConfig = {
  // Brand & Company Information
  company: {
    name: "Summit Ridge Roofing & Restoration",
    tagline: "High-Ticket Commercial & Residential Roofing Done Right",
    licenseNumber: "USA-ROOF-84920-LIC",
    phone: "(800) 555-ROOF",
    phoneRaw: "+18005557663",
    email: "estimates@summitridgeroofing.com",
    address: {
      street: "742 Evergreen Ridge Parkway, Suite 400",
      city: "Dallas",
      state: "TX",
      zip: "75201",
      country: "United States",
    },
    hours: "Mon - Sat: 7:00 AM - 7:00 PM (24/7 Emergency Tarping)",
  },

  // Trust Metrics & Social Proof
  trust: {
    yearsInBusiness: 18,
    roofsCompleted: "3,800+",
    googleRating: "4.9",
    googleReviewCount: 428,
    bbbRating: "A+",
    certifications: [
      "GAF Master Elite® Certified Contractor (Top 2% in North America)",
      "Owens Corning® Preferred Contractor",
      "CertainTeed Select ShingleMaster™",
      "Fully Bonded & Insured ($2,000,000 General Liability)",
    ],
    warranty: "Lifetime Shingle Warranty + 25-Year Workmanship Guarantee",
  },

  // Financing Callout
  financing: {
    headline: "0% APR Financing Available for 12 to 24 Months",
    subheadline: "Powered natively by Whop Payments. Prequalify in 60 seconds with zero credit score impact.",
    providers: ["Klarna", "Splitit", "Afterpay", "Affirm"],
    badge: "Flexible Payment Options Available at Checkout",
  },

  // Core Services
  services: [
    {
      id: "roof-repair",
      name: "Emergency Roof Repair & Storm Restoration",
      shortDescription: "Fast, certified leak repairs, wind damage restoration, and emergency shingle replacement.",
      fullDescription: "From hail strikes and missing architectural shingles to persistent flashing leaks around chimneys, our crews restore roof integrity before structural wood rot occurs.",
      priceDisplay: "Custom Quote or $299 Tune-Up",
      numericPrice: 299,
      planId: "plan_tuneup_299",
      iconName: "hammer",
      badges: ["24/7 Dispatch", "Insurance Approved"],
      features: [
        "Same-day emergency tarping & leak mitigation",
        "Replacement of damaged shingles & flashing",
        "Full attic & decking moisture scan",
        "Insurance claim documentation with photo proofs",
      ],
    },
    {
      id: "roof-replacement",
      name: "Full Roof Replacement & Architectural Systems",
      shortDescription: "Complete tear-off and installation of high-performance shingle, standing-seam metal, or tile systems.",
      fullDescription: "Our flagship high-ticket roofing package. Built to withstand 130 mph hurricane winds, severe hail, and intense UV radiation. Backed by manufacturer lifetime warranties.",
      priceDisplay: "$500 Project Deposit to Lock Crew",
      numericPrice: 500,
      planId: "plan_deposit_500",
      iconName: "shield",
      badges: ["High-Ticket", "Lifetime Warranty", "Deposit Plan"],
      features: [
        "Complete tear-off down to bare roof deck",
        "Ice & water protective barrier in all valleys",
        "GAF Timberline HDZ® or Owens Corning Duration® shingles",
        "Continuous ridge ventilation system for cooling efficiency",
        "$500 deposit locks installation date with stored card-on-file for final balance",
      ],
    },
    {
      id: "drone-inspection",
      name: "21-Point Drone & Storm Damage Inspection",
      shortDescription: "High-resolution 4K aerial thermal and physical inspection with a certified engineering report.",
      fullDescription: "Detailed non-invasive drone imaging of slopes, flashing, penetrations, and micro-cracks invisible from ground level. Certified report accepted by all major insurance adjusters.",
      priceDisplay: "$149 One-Time Inspection",
      numericPrice: 149,
      planId: "plan_inspection_149",
      iconName: "drone",
      badges: ["Instant Booking", "100% Credited to Work"],
      features: [
        "4K thermal and aerial roof imagery",
        "Comprehensive 21-point structural health audit",
        "Itemized repair estimate & adjuster-ready PDF report",
        "$149 fee is 100% credited toward any future repair or replacement",
      ],
    },
  ] as ServiceItem[],

  // Three Real Whop Plans
  plans: [
    {
      id: "inspection",
      planId: "plan_inspection_149",
      title: "21-Point Roof & Storm Inspection",
      subtitle: "One-Time Upfront Assessment Fee",
      price: 149,
      type: "inspection",
      features: [
        "Comprehensive 4K drone & thermal imaging",
        "Complete 21-point decking, shingle & valley report",
        "Official insurance adjuster-ready documentation",
        "Inspection fee is 100% credited toward any future repair or replacement",
        "Instant checkout confirmation via Whop",
      ],
      ctaText: "Book Inspection ($149)",
    },
    {
      id: "deposit",
      planId: "plan_deposit_500",
      title: "Roof Replacement Project Deposit",
      subtitle: "Secures Crew Schedule & Materials",
      price: 500,
      popular: true,
      type: "deposit",
      setupIntentRequired: true,
      features: [
        "Locks your installation date on our crew calendar",
        "Pre-orders manufacturer architectural materials",
        "Stores card-on-file securely via Whop Setup Intent",
        "Remaining job balance billed post-installation via Whop Invoices API",
        "Full financing availability (Klarna, Splitit) at checkout",
      ],
      ctaText: "Pay $500 Deposit & Lock Schedule",
    },
    {
      id: "tuneup",
      planId: "plan_tuneup_299",
      title: "Flat-Rate Roof Tune-Up & Tarping",
      subtitle: "Emergency Maintenance & Sealing",
      price: 299,
      type: "flat_rate",
      features: [
        "Up to 25 sq. ft. emergency leak tarping or sealing",
        "Resealing of all pipe boots, vents & flashing points",
        "Replacement of up to 5 loose or damaged shingles",
        "Gutter debris clearout at key downspouts",
        "One-time flat fee with immediate dispatch",
      ],
      ctaText: "Book Flat-Rate Tune-Up ($299)",
    },
  ] as PricingPlan[],

  // Service Area
  serviceArea: {
    state: "Texas",
    primaryCounty: "Dallas & Tarrant Counties",
    cities: [
      "Dallas", "Fort Worth", "Arlington", "Plano", "Frisco",
      "McKinney", "Irving", "Garland", "Grand Prairie", "Southlake"
    ],
    zipCodes: [
      "75201", "75001", "75024", "75034", "75035",
      "76092", "76051", "75070", "75093", "76102"
    ],
  },

  // Customer Reviews
  reviews: [
    {
      author: "David M.",
      location: "Southlake, TX",
      rating: 5,
      date: "2 weeks ago",
      headline: "Seamless deposit, financing, and flawless roof replacement!",
      content: "After hail took out our roof, Summit Ridge inspected via drone and sent an estimate in 24 hours. Paid the $500 deposit on Whop using Klarna 0% financing. They completed the 45-square roof in one day and billed the remaining balance through Whop Invoices smoothly.",
    },
    {
      author: "Sarah K.",
      location: "Frisco, TX",
      rating: 5,
      date: "1 month ago",
      headline: "The $149 inspection saved us thousands with insurance",
      content: "The insurance adjuster initially denied our wind damage claim. Summit Ridge's $149 inspection report had high-res thermal photos that overturned the denial. Best $149 we ever spent, and they even credited it back!",
    },
    {
      author: "Marcus T.",
      location: "Dallas, TX",
      rating: 5,
      date: "2 months ago",
      headline: "Emergency tarping within 3 hours during severe storm",
      content: "Water was dripping into our guest bedroom at 8 PM. Booked the $299 flat-rate emergency service on their site and a crew arrived with tarps and silicone sealant before midnight. Saved our drywall.",
    },
  ],

  // Whop Platform Configuration
  whop: {
    companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID || "biz_roofing_demo",
    stripeOrWhopTestMode: true,
  },
};

