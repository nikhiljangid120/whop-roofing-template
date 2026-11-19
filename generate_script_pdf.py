import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether

def generate_pdf():
    output_path = r"d:\123\app\whop-roofing-template\Whop_Roofing_Video_Script.pdf"
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=colors.HexColor('#EA580C'),
        spaceAfter=4
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor('#475569'),
        spaceAfter=12
    )

    h2_style = ParagraphStyle(
        'Heading2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=10,
        spaceAfter=4
    )

    action_style = ParagraphStyle(
        'ActionStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#C2410C'),
        spaceAfter=4
    )

    spoken_style = ParagraphStyle(
        'SpokenStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=10,
        leading=15,
        textColor=colors.HexColor('#1E293B'),
        spaceAfter=8
    )

    box_text_style = ParagraphStyle(
        'BoxText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#334155')
    )

    story = []

    # Title & Header
    story.append(Paragraph("Whop Bounty: US Roofing Company Template", title_style))
    story.append(Paragraph("<b>3–5 Minute Video Walkthrough Spoken Script & Submission Guide</b> &bull; Requester: @ben &bull; Reward: $17", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#EA580C'), spaceAfter=10))

    # Pre-Flight Checklist Box
    prep_data = [
        [
            Paragraph("<b>PRE-FLIGHT SETUP BEFORE YOU HIT RECORD:</b><br/>"
                      "1. Open <b>http://localhost:3000</b> in your Chrome browser.<br/>"
                      "2. Press <b>F12</b> to open DevTools &rarr; click the <b>Console</b> tab (or just rely on the bottom-right on-screen <b>Whop Pixel Verifier</b> widget).<br/>"
                      "3. Unmute your microphone on your recorder (Loom / OBS / Whop Stream).<br/>"
                      "4. Hold your phone with this script and speak naturally. Follow the bracketed <b>[ACTION]</b> cues.", box_text_style)
        ]
    ]
    t = Table(prep_data, colWidths=[530])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t)
    story.append(Spacer(1, 12))

    # SCRIPT SECTIONS
    sections = [
        (
            "PART 1: INTRO & HIGH-TICKET ROOFING OVERVIEW (0:00 - 0:45)",
            "[ACTION: Show full browser view of http://localhost:3000 at the top of the homepage]",
            "\"Hey Ben! Today I'm presenting this production-ready website template engineered specifically for high-ticket US roofing contractors, built natively on Whop Websites. "
            "Roofing is a high-ticket vertical where jobs range from ten thousand to thirty thousand dollars, so nailing the deposit-to-job-to-final-invoice flow is critical. "
            "Here we have Summit Ridge Roofing & Restoration. Notice the clean, conversion-focused design, top trust badges like GAF Master Elite and BBB A-Plus, and our 24/7 storm response banner across Dallas-Fort Worth.\""
        ),
        (
            "PART 2: BEFORE/AFTER & COST CALCULATOR (0:45 - 1:30)",
            "[ACTION: Scroll down slightly to the Before/After Visualizer, click 'Before' and 'After', then slide the Cost Calculator slider]",
            "\"Right below the hero, we have an interactive Before and After storm restoration showcase where homeowners can see hail damage transformed into an architectural system. "
            "And here is our interactive Roofing Cost and Financing Calculator. When a homeowner slides their roof size—say 35 squares—it dynamically estimates a twelve thousand dollar job, highlights our $500 Whop deposit, and shows flexible zero-percent APR monthly payments powered natively by Whop Payments through Klarna and Splitit.\""
        ),
        (
            "PART 3: SERVICES & PIXEL EVENT #1: service_viewed (1:30 - 2:15)",
            "[ACTION: Scroll down to the Services section. Click on 'Emergency Roof Repair', then click 'Full Roof Replacement']",
            "\"Now moving to the Services section: we cover Emergency Leak Repair, Full Architectural Replacement, and 21-Point Drone Inspections. "
            "Notice what happens when I click between these services: our first required custom pixel event fires automatically: whop.track('service_viewed'). "
            "You can see it right here in the browser console, and also verified live in our on-screen Whop Pixel Verifier widget at the bottom right with the exact service ID and price.\""
        ),
        (
            "PART 4: ESTIMATE FORM & WHOP LEADS API: estimate_requested (2:15 - 3:00)",
            "[ACTION: Click the orange 'Request Estimate' button in the navbar. Fill out Name: John Miller, Phone: (214) 555-0199, Address: 742 Highland Park, Dallas, TX. Click 'Submit Request']",
            "\"Next, let's look at lead generation. Homeowners can click 'Request Free Estimate'. I'll type in a homeowner name, phone, email, and property address. "
            "When I submit, this form is wired directly to the Whop Leads API via our backend route. The quote lands instantaneously as a lead on the merchant's Whop CRM account with a unique Lead ID. "
            "Simultaneously, our second custom pixel event fires: whop.track('estimate_requested').\""
        ),
        (
            "PART 5: 3 REAL WHOP PLANS, PAYMENT ELEMENTS & CARD-ON-FILE (3:00 - 3:55)",
            "[ACTION: Scroll to Pricing. Point out the $149 Inspection, $500 Deposit, and $299 Tune-up. Click 'Pay $500 Deposit & Lock Schedule'. Show Apple Pay / Google Pay, card inputs, and the required Whop BrandingElement]",
            "\"Now for our 3 real Whop Commerce plans: we have a one-time $149 Drone Inspection, a $500 Project Schedule Deposit, and a $299 Flat-Rate Tune-Up. "
            "Let's click 'Pay $500 Deposit'. Notice our third required pixel event fires: whop.track('deposit_started'). "
            "The checkout runs strictly on official Whop Payment Elements: we have the ExpressCheckoutElement for Apple Pay and Google Pay, the PaymentElement surfacing cards and financing options, and the strictly mandatory legal BrandingElement at the bottom. "
            "When we complete this sandbox checkout, notice what happens: a Whop Setup Intent stores the customer's card securely on file for subsequent balance billing.\""
        ),
        (
            "PART 6: WHOP INVOICES API BALANCE BILLING & REUSABLE CONFIG (3:55 - 4:45)",
            "[ACTION: Click 'Invoices API Demo' in the top navbar. Point out the $12,500 total job, -$500 deposit credit, and $12,000 balance. Click 'Auto-Charge Stored Card']",
            "\"Now here is the key high-ticket closing flow: the roof is installed, and the final balance must be collected. We open our Whop Invoices API billing engine. "
            "The total job is $12,500, minus the $500 deposit already paid, leaving a $12,000 balance due. "
            "We can either email an itemized Whop invoice link or instantly auto-charge the stored card-on-file from the deposit setup intent. "
            "I'll click 'Auto-Charge Stored Card'—it calls the Whop Invoices API, generates invoice inv_xxxx, and marks it paid immediately! "
            "Finally, the entire site is 100% modular in roofing.config.ts. Any contractor or agency can swap company name, phone, pricing, and service areas in 60 seconds with zero structural code changes. Thank you!\""
        )
    ]

    for title, action, speech in sections:
        sec = []
        sec.append(Paragraph(f"<b>{title}</b>", h2_style))
        sec.append(Paragraph(action, action_style))
        sec.append(Paragraph(speech, spoken_style))
        sec.append(Spacer(1, 6))
        story.append(KeepTogether(sec))

    # Submission Box
    sub_data = [
        [
            Paragraph("<b>WHAT TO SUBMIT IN THE WHOP BOUNTY FORM:</b><br/>"
                      "&bull; <b>Live URL:</b> http://localhost:3000 (or your deployed whop.app link)<br/>"
                      "&bull; <b>Source Code:</b> d:\\123\\app\\whop-roofing-template-source.zip (or GitHub repo link)<br/>"
                      "&bull; <b>Recording:</b> 3-5 minute video recorded using Loom / OBS, or this Whop Live session.<br/>"
                      "&bull; <b>Summary Paragraph:</b> Copy-paste the paragraph from README.md or bounty_submission_guide.md.", box_text_style)
        ]
    ]
    st = Table(sub_data, colWidths=[530])
    st.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#FEF3C7')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#F59E0B')),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(Spacer(1, 8))
    story.append(st)

    doc.build(story)
    print("PDF generated successfully at:", output_path)

if __name__ == "__main__":
    generate_pdf()

