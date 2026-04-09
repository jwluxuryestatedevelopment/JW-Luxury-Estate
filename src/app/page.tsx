import Image from "next/image";
import BrandLockup from "./components/brand-lockup";
import ContactForm from "./components/contact-form";
import Reveal from "./components/reveal";
import SiteHeader from "./components/site-header";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Owners", href: "#owners" },
  { label: "Contact", href: "#contact" },
];

const experienceBlocks = [
  {
    title: "Comfort",
    subtitle: "Spaces that feel clean, functional, and welcoming.",
    accent: true,
  },
  {
    title: "Responsiveness",
    subtitle: "Fast communication and clear support throughout the stay.",
  },
  {
    title: "Consistency",
    subtitle:
      "Standards that are maintained across operations, not improvised as problems appear.",
  },
  {
    title: "Care",
    subtitle:
      "A serious commitment to both guest experience and property condition.",
  },
];

const serviceBenefits = [
  {
    eyebrow: "Furnished",
    title: "Ready-to-Live Spaces",
    detail: "Professionally prepared residences designed to feel clean, functional, and comfortable from day one.",
  },
  {
    eyebrow: "Flexible",
    title: "Stay-Length Range",
    detail: "Short-term, mid-term, and corporate-stay options aligned to the needs of each guest or assignment.",
  },
  {
    eyebrow: "Responsive",
    title: "Clear Communication",
    detail: "Fast coordination and dependable support before arrival, during the stay, and when needs change.",
  },
  {
    eyebrow: "Operational",
    title: "Smooth Check-Ins",
    detail: "Arrival details, access, and stay logistics handled with structure and attention to detail.",
  },
  {
    eyebrow: "Standards",
    title: "Consistent Care",
    detail: "Presentation, cleanliness, and property oversight maintained with repeatable standards.",
  },
];

const audienceTabs = [
  { label: "Property Owners" },
  { label: "Corporate Clients" },
  { label: "Guests & Travelers" },
];

const clientTypes = [
  {
    eyebrow: "Corporate",
    title: "Corporate Teams",
    description:
      "Housing solutions for companies coordinating furnished stays for multiple travelers, supervisors, or project-based assignments.",
  },
  {
    eyebrow: "Professional",
    title: "Traveling Professionals",
    description:
      "Comfortable, well-managed stays for professionals who need a reliable home base while working away from home.",
  },
  {
    eyebrow: "Project-Based",
    title: "Work Crews",
    description:
      "Organized accommodations that support crews with practical housing, clean spaces, and dependable communication.",
  },
  {
    eyebrow: "Mid-Term",
    title: "Extended-Stay Guests",
    description:
      "Flexible accommodations for guests who need more than a weekend without committing to a permanent lease.",
  },
];

const aboutParagraphs = [
  "JW Luxury Estate is a housing and property operations company focused on delivering premium short-term, mid-term, and corporate rental solutions. We work with a strong emphasis on presentation, guest experience, operational control, and reliable property oversight.",
  "Our model is designed to serve both sides of the market: property owners who want dependable management and occupancy, and guests or corporate clients who need comfortable, professionally maintained accommodations.",
];

const philosophyParagraphs = [
  "At JW Luxury Estate, we believe great properties require more than furniture and nice photos. They require systems, standards, responsiveness, and accountability.",
  "We approach every property with a business mindset and a hospitality standard. That means cleaner operations, stronger communication, better guest experiences, and more consistent outcomes for owners and partners.",
  "Our goal is simple: create stays that feel elevated, operations that feel organized, and partnerships that feel dependable.",
];

const whyCards = [
  {
    number: "01",
    title: "Premium Property Presentation",
    description:
      "Every residence is positioned to feel polished, elevated, and professionally prepared.",
  },
  {
    number: "02",
    title: "Professional Guest and Client Communication",
    description:
      "Communication is handled with clarity, speed, and a business-minded level of care.",
  },
  {
    number: "03",
    title: "Structured Cleaning and Turnover Systems",
    description:
      "Turnovers follow repeatable standards that protect both presentation and performance.",
  },
  {
    number: "04",
    title: "Reliable Operational Oversight",
    description:
      "Day-to-day execution is organized to protect the property and support dependable results.",
  },
  {
    number: "05",
    title: "Flexible Rental Strategies",
    description:
      "Short-term, mid-term, and corporate housing approaches are aligned to the right use case.",
  },
  {
    number: "06",
    title: "Business-Minded Property Management",
    description:
      "Housing is treated like an operation, with structure, accountability, and operational control.",
  },
];

const services = [
  {
    chip: "Corporate Housing",
    title: "Corporate Housing Solutions",
    description:
      "We provide fully furnished housing solutions for traveling professionals, work crews, and corporate stays that require comfort, flexibility, and dependable coordination. Our spaces are designed to support both short assignments and extended stays.",
    image: "/service-corporate-housing.jpg",
  },
  {
    chip: "Rental Management",
    title: "Short-Term Rental Management",
    description:
      "We manage short-term rental properties with a focus on presentation, occupancy, guest communication, cleaning coordination, and overall property performance. Every detail is handled with structure and consistency to protect the property and strengthen the guest experience.",
    image: "/service-rental-management.jpg",
    offset: true,
  },
  {
    chip: "Flexible Living",
    title: "Mid-Term Rental Stays",
    description:
      "For guests who need more than a weekend but less than a permanent lease, we offer well-managed mid-term accommodations that provide flexibility without sacrificing comfort or quality.",
    image: "/service-midterm-stays.jpg",
  },
];

const partnerService = {
  chip: "Owner Partnerships",
  title: "Property Partnership Opportunities",
  description:
    "We work with owners and partners who want a more professional approach to rental income and property utilization. Our model is built around responsible occupancy, operational oversight, and maintaining the property at a high standard.",
  cta: "Let's Discuss Your Property",
};

const corporateHighlights = [
  {
    value: "Reliable Stays",
    label:
      "Housing solutions that do not sacrifice comfort, cleanliness, or convenience.",
  },
  {
    value: "Responsive Support",
    label: "Smooth check-ins and clear communication from day one.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Property Evaluation",
    description:
      "We assess the property, the use case, and the best rental strategy based on location, condition, and operational fit.",
  },
  {
    number: "2",
    title: "Setup & Positioning",
    description:
      "We prepare the space, align presentation standards, and structure the operational workflow behind the scenes.",
  },
  {
    number: "3",
    title: "Active Management",
    description:
      "From guest communication to cleaning coordination and property oversight, we manage the day-to-day with consistency and control.",
  },
  {
    number: "4",
    title: "Ongoing Optimization",
    description:
      "We continuously refine operations and property performance to maintain standards and improve results over time.",
  },
];

const trustPillars = [
  "Responsiveness",
  "Presentation",
  "Service",
  "Standards",
];

const footerNavigationItems = [
  { label: "Properties", href: "#services" },
  { label: "For Guests", href: "#contact" },
  { label: "Corporate", href: "#contact" },
  { label: "Owners", href: "#owners" },
];

const footerLegalItems = [
  "Privacy Policy",
  "Terms of Service",
  "Fair Housing",
];

const footerContactActions = [
  {
    label: "Email JW Luxury Estate",
    href: "mailto:stays@jwluxuryestate.com",
    icon: "mail",
  },
  {
    label: "Request a callback",
    href: "#contact",
    icon: "phone",
  },
  {
    label: "Visit the contact section",
    href: "#contact",
    icon: "location",
  },
] as const;

const comparisonRows = [
  {
    feature: "Rental Strategy",
    jw: "Structured short-, mid-, and corporate-stay model",
    longTerm: "Fixed long-term use",
    shortTerm: "Mostly nightly demand",
  },
  {
    feature: "Property Oversight",
    jw: "Professional day-to-day oversight",
    longTerm: "Limited landlord visibility",
    shortTerm: "Operator dependent",
  },
  {
    feature: "Communication",
    jw: "Organized guest and owner communication",
    longTerm: "Minimal ongoing touchpoints",
    shortTerm: "Varies by manager",
  },
  {
    feature: "Presentation",
    jw: "Premium presentation standards",
    longTerm: "Lease-ready basics",
    shortTerm: "Marketing-first staging",
  },
  {
    feature: "Occupancy Approach",
    jw: "Responsible occupancy with flexibility",
    longTerm: "Single long-term tenant",
    shortTerm: "High seasonality swings",
  },
  {
    feature: "Execution",
    jw: "Structured systems and standards",
    longTerm: "Traditional leasing workflow",
    shortTerm: "Reactive, platform-driven operations",
  },
];

function FooterActionIcon({
  icon,
}: {
  icon: (typeof footerContactActions)[number]["icon"];
}) {
  if (icon === "mail") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-[0.95rem] w-[0.95rem] fill-none stroke-current stroke-[1.75]"
      >
        <path d="M4 7.5h16v9H4z" />
        <path d="m5 8 7 5 7-5" />
      </svg>
    );
  }

  if (icon === "phone") {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-[0.95rem] w-[0.95rem] fill-none stroke-current stroke-[1.75]"
      >
        <path d="M8.6 4.5h2.2l1.1 4-1.7 1.7a13.5 13.5 0 0 0 3.6 3.6l1.7-1.7 4 1.1v2.2a1.5 1.5 0 0 1-1.7 1.5 15.8 15.8 0 0 1-10.7-10.7A1.5 1.5 0 0 1 8.6 4.5Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[0.95rem] w-[0.95rem] fill-none stroke-current stroke-[1.75]"
    >
      <path d="M12 20s5.5-5.2 5.5-9a5.5 5.5 0 1 0-11 0c0 3.8 5.5 9 5.5 9Z" />
      <circle cx="12" cy="11" r="1.8" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <SiteHeader navigation={navigation} />

      <section className="w-full">
        <div className="grid w-full overflow-hidden lg:grid-cols-[minmax(420px,0.45fr)_minmax(0,0.55fr)]">
          <div className="flex min-h-[470px] flex-col justify-center bg-dark px-6 py-12 text-white sm:min-h-[520px] sm:px-12 sm:py-16 lg:min-h-[calc(100vh-82px)] lg:px-[4.75rem] lg:py-20">
            <div className="reveal-up max-w-[31rem] space-y-8">
              <p className="text-[10px] uppercase tracking-[0.42em] text-accent">
                Premium Housing Solutions
              </p>
              <div className="space-y-6">
                <h1 className="max-w-[26rem] font-display text-[3.25rem] leading-[0.86] tracking-[-0.05em] sm:text-[5rem] lg:text-[5.45rem]">
                  Premium Housing Solutions With Business-Level Execution
                </h1>
                <p className="max-w-[23rem] text-[13px] leading-7 text-white/72 sm:max-w-[24rem]">
                  JW Luxury Estate delivers furnished stays, corporate housing,
                  and rental management with the professionalism, structure, and
                  care that modern property partners expect.
                </p>
                <div className="reveal-up reveal-delay-1 mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
                  <a
                    href="#services"
                    className="button-sheen inline-flex h-12 w-full items-center justify-center bg-accent px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-transform duration-150 ease-out hover:bg-accent-strong active:scale-[0.98] sm:w-auto"
                  >
                    Explore Our Solutions
                  </a>
                  <a
                    href="#owners"
                    className="button-sheen inline-flex h-12 w-full items-center justify-center border border-white/18 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:border-white/28 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
                  >
                    Partner With Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-media-shell relative min-h-[320px] bg-[#7eb2d5] sm:min-h-[500px] lg:min-h-[calc(100vh-82px)]">
            <Image
              src="/herojwlux1.png"
              alt="JW Luxury Estate luxury residence"
              fill
              priority
              className="hero-media-image object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="w-full border-y border-border-subtle bg-surface">
        <Reveal className="border-b border-border-subtle px-8 py-12 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Experience
            </p>
            <h2 className="mt-4 font-display text-[2.6rem] leading-[0.96] tracking-[-0.045em] text-foreground sm:text-[3.2rem]">
              What You Can Expect
            </h2>
          </div>
        </Reveal>
        <div className="grid w-full md:grid-cols-2 xl:grid-cols-4">
          {experienceBlocks.map((block, index) => (
            <Reveal
              as="article"
              key={block.title}
              delay={index * 60}
              className={[
                "metric-panel flex min-h-[168px] flex-col justify-center gap-3 px-12 py-9 sm:px-14",
                index < experienceBlocks.length - 1
                  ? "xl:border-r xl:border-border-subtle"
                  : "",
                index < 2
                  ? "md:border-r md:border-border-subtle xl:border-r xl:border-border-subtle"
                  : "",
                index < 2
                  ? "md:border-b md:border-border-subtle xl:border-b-0"
                  : "",
              ].join(" ")}
            >
              <p
                className={[
                  "font-display text-[2.2rem] leading-none tracking-[-0.045em] sm:text-[2.5rem]",
                  block.accent ? "text-accent" : "text-foreground",
                ].join(" ")}
              >
                {block.title}
              </p>
              <p className="max-w-[18rem] text-[0.82rem] leading-6 text-muted">
                {block.subtitle}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about" className="w-full px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(280px,0.32fr)_minmax(0,0.68fr)] lg:gap-16">
          <Reveal className="max-w-[25rem] space-y-10">
            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-accent">
                About
              </p>
              <h2 className="max-w-[10rem] font-display text-[3.05rem] leading-[0.92] tracking-[-0.04em] text-foreground sm:max-w-[12rem] sm:text-[4.3rem]">
                Who We Are.
              </h2>
            </div>

            <div className="bg-surface px-0 py-2 shadow-[0_18px_30px_rgba(17,12,9,0.03)]">
              {audienceTabs.map((tab) => (
                <div
                  key={tab.label}
                  className="relative cursor-pointer bg-transparent px-7 py-7 text-[1.1rem] leading-none font-medium text-muted transition-[background-color,color] duration-200 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-transparent hover:bg-surface hover:font-semibold hover:text-foreground hover:before:bg-accent"
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            as="article"
            delay={90}
            className="premium-surface border border-border-subtle bg-surface px-8 py-10 shadow-[0_26px_55px_rgba(17,12,9,0.05)] sm:px-12 sm:py-12 lg:px-[3.25rem] lg:py-[3.25rem]"
          >
            <div className="max-w-[46rem] space-y-6">
              <h3 className="font-display text-[3rem] leading-[0.95] tracking-[-0.045em] text-foreground">
                A Professional Approach to Housing and Property Operations
              </h3>
              {aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[42rem] text-[1.05rem] leading-10 text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border-subtle bg-surface-strong">
        <div className="w-full px-6 py-18 sm:px-10 lg:px-16 lg:py-24">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-16">
            <Reveal className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-accent">
                Brand Philosophy
              </p>
              <h2 className="max-w-[14rem] font-display text-[2.95rem] leading-[0.94] tracking-[-0.04em] text-foreground sm:max-w-[16rem] sm:text-[4rem]">
                Built for Performance, Not Just Appearance
              </h2>
            </Reveal>

            <Reveal
              as="article"
              delay={90}
              className="premium-surface border border-border-subtle bg-surface px-8 py-10 shadow-[0_18px_40px_rgba(17,12,9,0.04)] sm:px-10 sm:py-11"
            >
              <div className="max-w-[44rem] space-y-6">
                {philosophyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[1.02rem] leading-9 text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="w-full px-6 py-[5rem] sm:px-10 lg:px-16 lg:py-[6.75rem]">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-accent">
              Operational Advantage
            </p>
            <h2 className="mt-4 font-display text-[3rem] leading-[0.95] tracking-[-0.04em] text-foreground sm:text-[4.4rem]">
              Why JW Luxury Estate
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[1rem] leading-8 text-muted">
              We do not treat housing like a side hustle. We treat it like an
              operation. Our team focuses on consistency, speed, detail, and
              standards that create better results for both guests and property
              partners.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden border border-border-subtle bg-border-subtle md:grid-cols-2 xl:grid-cols-3">
            {whyCards.map((card) => (
              <Reveal
                as="article"
                key={card.number}
                delay={card.number === "01" ? 0 : Number(card.number) * 40}
                className="grid-panel relative min-h-[205px] bg-surface px-7 py-10 sm:px-10 sm:py-11"
              >
                <span className="pointer-events-none absolute right-5 top-5 z-0 font-display text-[3.5rem] leading-none tracking-[-0.06em] text-[#ecdfc8] sm:right-8 sm:top-7 sm:text-[4.6rem]">
                  {card.number}
                </span>
                <div className="relative z-10 max-w-[13rem] space-y-5 pr-4 sm:max-w-[18rem] sm:pr-0">
                  <h3 className="font-display text-[1.9rem] leading-[0.95] tracking-[-0.04em] text-foreground sm:text-[2rem]">
                    {card.title}
                  </h3>
                  <p className="text-[1rem] leading-8 text-muted">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        className="w-full px-6 py-[5.5rem] sm:px-8 lg:px-10 lg:py-[6.5rem]"
      >
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Services
            </p>
            <h2 className="font-display text-[3rem] leading-[0.92] tracking-[-0.045em] text-foreground sm:text-[3.4rem]">
              What We Do
            </h2>
          </div>
          <a
            href="#owners"
            className="w-fit border-b border-accent pb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent transition-colors duration-200 hover:text-foreground"
          >
            For Owners & Partners
          </a>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3 xl:gap-7">
          {services.map((service) => (
            <Reveal
              as="article"
              key={service.title}
              delay={service.offset ? 140 : service.title === "Corporate Housing Solutions" ? 0 : 70}
              className={[
                "service-card group space-y-4",
                service.offset ? "md:pt-10" : "",
              ].join(" ")}
            >
              <div className="service-media reveal-mask relative aspect-[0.78] overflow-hidden border border-border-subtle bg-[#181818] shadow-[0_14px_32px_rgba(17,12,9,0.04)]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1280px) 28vw, (min-width: 768px) 32vw, 100vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute left-3 top-3 bg-surface px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-foreground shadow-[0_1px_0_rgba(0,0,0,0.06)]">
                  {service.chip}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-[2.05rem] leading-none tracking-[-0.04em] text-foreground">
                  {service.title}
                </h3>
                <p className="text-[0.92rem] leading-7 text-muted">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={95}
          className="premium-surface-dark mt-8 overflow-hidden border border-white/8 bg-[#11161d] text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)]"
        >
          <div className="border-b border-white/8 px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                Included Standards
              </p>
              <p className="max-w-[32rem] text-sm leading-7 text-white/56">
                The essentials that shape every JW Luxury Estate stay.
              </p>
            </div>
          </div>
          <div className="grid gap-px bg-white/8 md:grid-cols-2 xl:grid-cols-5">
            {serviceBenefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#11161d] px-6 py-6 sm:px-7 sm:py-7"
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent/84">
                  {benefit.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-[1.45rem] leading-[0.94] tracking-[-0.03em] text-white">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-7 text-white/58">
                  {benefit.detail}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="article"
          delay={120}
          className="premium-surface mt-8 border border-border-subtle bg-surface px-8 py-9 shadow-[0_18px_36px_rgba(17,12,9,0.04)] sm:px-10 sm:py-10"
        >
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-end">
            <div className="space-y-4">
              <p className="w-fit bg-background px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-foreground shadow-[0_1px_0_rgba(0,0,0,0.06)]">
                {partnerService.chip}
              </p>
              <h3 className="max-w-[20rem] font-display text-[2.7rem] leading-[0.96] tracking-[-0.04em] text-foreground">
                {partnerService.title}
              </h3>
            </div>
            <div className="space-y-6">
              <p className="max-w-[38rem] text-[1rem] leading-8 text-muted">
                {partnerService.description}
              </p>
              <a
                href="#owners"
                className="button-sheen inline-flex h-11 items-center justify-center bg-[#11161d] px-6 text-[10px] font-bold uppercase tracking-[0.3em] !text-white transition-transform duration-150 ease-out hover:bg-[#1c242d] active:scale-[0.98]"
              >
                {partnerService.cta}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border-subtle bg-surface">
        <Reveal className="px-8 py-10 sm:px-10 lg:px-16 lg:py-12">
          <p className="mx-auto max-w-4xl text-center font-display text-[2rem] leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[2.35rem]">
            Professional housing solutions backed by structure, standards, and
            execution.
          </p>
        </Reveal>
      </section>

      <section id="owners" className="bg-surface-strong">
        <div className="w-full px-6 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-18">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Owner Solutions
            </p>
            <h2 className="mt-3 font-display text-[2.45rem] leading-[0.98] tracking-[-0.035em] text-foreground sm:text-[3.2rem]">
              For Property Owners
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-[0.98rem] leading-8 text-muted">
              We help owners unlock more value from their properties through
              structured rental strategies and professional day-to-day
              oversight. Our approach prioritizes property condition,
              responsible use, organized communication, and dependable
              execution.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-[0.98rem] leading-8 text-muted">
              Whether the goal is short-term performance, mid-term occupancy, or
              a corporate housing strategy, we bring a polished and
              operationally disciplined model to the table.
            </p>
            <a
              href="#contact"
              className="button-sheen mt-8 inline-flex h-11 items-center justify-center bg-[#11161d] px-6 text-[10px] font-bold uppercase tracking-[0.3em] !text-white transition-transform duration-150 ease-out hover:bg-[#1c242d] active:scale-[0.98]"
            >
              Let&apos;s Discuss Your Property
            </a>
          </Reveal>
          <Reveal delay={80} className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Market Analysis
            </p>
            <h3 className="mt-3 font-display text-[2.55rem] leading-[0.96] tracking-[-0.04em] text-foreground sm:text-[3rem]">
              The JW Performance Advantage
            </h3>
          </Reveal>
          <Reveal delay={140} className="table-shell mx-auto mt-14 max-w-[910px]">
            <div className="hidden md:block">
              <table className="premium-table w-full border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
                      Feature
                    </th>
                    <th className="px-4 py-4 text-left text-[10px] font-semibold tracking-[0.01em] text-accent">
                      JW Luxury Estate
                    </th>
                    <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
                      Long-Term Lease
                    </th>
                    <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
                      Short-Term Rental
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b border-border-subtle">
                      <td className="px-4 py-5 text-[0.96rem] font-semibold text-foreground/78">
                        {row.feature}
                      </td>
                      <td className="px-4 py-5 text-[0.96rem] font-semibold text-foreground">
                        {row.jw}
                      </td>
                      <td className="px-4 py-5 text-[0.96rem] text-muted">
                        {row.longTerm}
                      </td>
                      <td className="px-4 py-5 text-[0.96rem] text-muted">
                        {row.shortTerm}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4 md:hidden">
              {comparisonRows.map((row) => (
                <div
                  key={row.feature}
                  className="border-b border-border-subtle pb-4"
                >
                  <p className="mb-2 text-sm font-semibold text-foreground/82">
                    {row.feature}
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold text-accent">
                        JW Luxury Estate:{" "}
                      </span>
                      <span className="text-foreground">{row.jw}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-muted">
                        Long-Term Lease:{" "}
                      </span>
                      <span className="text-muted">{row.longTerm}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-muted">
                        Short-Term Rental:{" "}
                      </span>
                      <span className="text-muted">{row.shortTerm}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="bg-dark text-white">
        <div className="w-full border-b border-white/6 px-6 py-[4.8rem] sm:px-10 lg:px-16 lg:py-[5.8rem]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-12">
            <Reveal className="max-w-[22rem] space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Who We Serve
              </p>
              <h2 className="font-display text-[3rem] leading-[0.92] tracking-[-0.04em] text-white sm:text-[3.55rem]">
                Housing built for real-world stays.
              </h2>
              <p className="text-[1rem] leading-8 text-white/58">
                JW Luxury Estate supports companies, traveling professionals,
                and extended-stay guests who need furnished housing with
                comfort, flexibility, and organized support.
              </p>
            </Reveal>

            <div className="grid gap-px overflow-hidden border border-white/8 bg-white/8 sm:grid-cols-2">
              {clientTypes.map((client, index) => (
                <Reveal
                  as="article"
                  key={client.title}
                  delay={index * 55}
                  className="grid-panel bg-dark-soft px-7 py-8 sm:px-9 sm:py-10"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent/88">
                    {client.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-[13rem] font-display text-[1.9rem] leading-[0.95] tracking-[-0.04em] text-white">
                    {client.title}
                  </h3>
                  <p className="mt-4 max-w-[20rem] text-[0.98rem] leading-8 text-white/58">
                    {client.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="grid w-full items-start gap-12 px-6 py-[5rem] sm:px-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,0.84fr)] lg:px-16 lg:py-[6.5rem]">
          <Reveal className="max-w-[36rem] space-y-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              For Companies
            </p>
            <div className="space-y-6">
              <h2 className="max-w-[22rem] font-display text-[3rem] leading-[0.92] tracking-[-0.04em] text-white sm:max-w-[33rem] sm:text-[4.4rem]">
                For Companies and Traveling Professionals.
              </h2>
              <p className="max-w-[28rem] text-[1.02rem] leading-9 text-white/62">
                JW Luxury Estate offers furnished housing solutions for
                professionals who need a reliable place to stay without
                sacrificing comfort, cleanliness, or convenience.
              </p>
              <p className="max-w-[28rem] text-[1.02rem] leading-9 text-white/62">
                Our properties are selected and operated to support real-life
                working stays, with an emphasis on smooth check-ins, responsive
                communication, and a comfortable living experience from day one.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-7 pt-2 sm:gap-14 sm:pt-4">
              {corporateHighlights.map((item) => (
                <div key={item.label} className="space-y-1">
                  <p className="font-display text-[2rem] leading-none text-white sm:text-[2.3rem]">
                    {item.value}
                  </p>
                  <p className="max-w-[10rem] text-[10px] font-semibold uppercase tracking-[0.28em] text-white/38">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={110}
            className="premium-surface-dark border border-white/8 bg-dark-soft px-6 py-8 shadow-[0_18px_40px_rgba(0,0,0,0.16)] sm:px-10 sm:py-10 lg:mx-auto lg:w-full lg:max-w-[25rem]"
          >
            <div className="space-y-7">
              <div className="space-y-3">
                <h3 className="font-display text-[2.15rem] leading-[0.96] tracking-[-0.04em] text-white">
                  Let&apos;s Talk
                </h3>
                <p className="max-w-[20rem] text-sm leading-7 text-white/56">
                  Whether you are a property owner, corporate client, or
                  prospective partner, JW Luxury Estate is ready to help you
                  explore the right housing solution.
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full px-6 py-[5.25rem] sm:px-8 lg:px-10 lg:py-[6rem]">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
            Process
          </p>
          <h2 className="mt-4 font-display text-[2.9rem] leading-[0.96] tracking-[-0.05em] text-foreground sm:text-[3.6rem]">
            Our Process
          </h2>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {processSteps.map((step) => (
            <Reveal
              as="article"
              key={step.number}
              delay={Number(step.number) * 50}
              className="process-card text-center"
            >
              <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center bg-foreground text-sm font-bold text-surface">
                {step.number}
              </div>
              <h3 className="font-display text-[1.55rem] leading-none tracking-[-0.035em] text-foreground">
                {step.title}
              </h3>
              <p className="mx-auto mt-3 max-w-[13rem] text-[0.84rem] leading-6 text-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border-subtle bg-surface">
        <div className="w-full px-6 py-18 sm:px-10 lg:px-16 lg:py-24">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Trust & Standards
            </p>
            <h2 className="mt-4 font-display text-[2.45rem] leading-[0.98] tracking-[-0.035em] text-foreground sm:text-[3.3rem]">
              Built on Trust, Service, and Standards
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[1rem] leading-8 text-muted">
              Our reputation is built through responsiveness, presentation, and
              consistent execution. As we continue growing, our focus remains
              the same: protect the property, serve the client well, and
              operate at a higher standard.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {trustPillars.map((pillar) => (
                <span
                  key={pillar}
                  className="text-[1rem] font-semibold text-foreground/34"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-white/6 bg-dark text-white">
        <div className="w-full px-6 py-[4rem] sm:px-10 lg:px-14 lg:py-[5.2rem]">
          <div className="grid gap-10 border-b border-white/6 pb-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.9fr)_minmax(0,0.9fr)_minmax(0,1.05fr)] lg:gap-10">
            <div className="max-w-[19rem] space-y-5">
              <BrandLockup variant="footer" />
              <p className="text-[1.02rem] leading-[1.75] text-white/58">
                Elevating the intersection of professional real estate
                operations and luxury hospitality for global fleets and guests.
              </p>
            </div>

            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/82">
                Navigation
              </p>
              <nav aria-label="Footer navigation">
                <ul className="space-y-4 text-[1rem] leading-none text-white/64 sm:text-[1.06rem]">
                  {footerNavigationItems.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="inline-flex transition-colors duration-200 hover:text-white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/82">
                Legal
              </p>
              <ul className="space-y-4 text-[1rem] leading-none text-white/64 sm:text-[1.06rem]">
                {footerLegalItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent/82">
                Contact
              </p>
              <div className="space-y-4 text-[1rem] leading-[1.7] text-white/64 sm:text-[1.06rem]">
                <p>
                  Inquiries:{" "}
                  <a
                    href="mailto:stays@jwluxuryestate.com"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    stays@jwluxuryestate.com
                  </a>
                </p>
                <p>Headquarters: Scottsdale, Arizona</p>
              </div>
              <div className="flex items-center gap-3 pt-1">
                {footerContactActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    aria-label={action.label}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/56 transition-colors duration-200 hover:border-white/20 hover:text-white active:scale-[0.97]"
                  >
                    <FooterActionIcon icon={action.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-5 text-[10px] uppercase tracking-[0.24em] text-white/32 sm:flex-row sm:items-center sm:justify-between">
            <p>Copyright 2026 JW Luxury Estate. All rights reserved.</p>
            <p>Professional housing solutions backed by structure and standards.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
