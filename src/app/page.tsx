import BrandLockup from "./components/brand-lockup";
import ContactForm from "./components/contact-form";
import HeroImageCarousel from "./components/hero-image-carousel";
import PropertyImageCarousel from "./components/property-image-carousel";
import Reveal from "./components/reveal";
import SiteHeader from "./components/site-header";
import { getHomepageContent } from "./data/homepage-content";

export const dynamic = "force-dynamic";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Properties", href: "#properties" },
  { label: "Nationwide", href: "#nationwide" },
  { label: "Contact", href: "#contact" },
];

const experienceBlocks = [
  {
    title: "30+ Day Stays",
    subtitle:
      "Built for stability with flexible weekly or monthly payments and no rigid long-term lease.",
  },
  {
    title: "Team-Based Living",
    subtitle:
      "Stay with coworkers and project teammates instead of unknown roommates.",
  },
  {
    title: "Smart Security",
    subtitle:
      "Smart locks and controlled access create safer, more private living.",
  },
  {
    title: "Move-In Ready",
    subtitle:
      "Furnished bedrooms, kitchens, shared areas, and parking ready from day one.",
  },
];

const minimumStayChecks = [
  "Flexible payment options: weekly or monthly",
  "No long-term lease obligations",
  "No penalties if your project ends or plans change",
];

const audienceTabs = [
  { label: "Individual Professionals" },
  { label: "Companies & Teams" },
  { label: "Project-Based Stays" },
];

const clientTypes = [
  {
    eyebrow: "Individuals",
    title: "For Individual Professionals",
    description:
      "Flexible, comfortable, and fully equipped living with no long-term contracts, ideal for project-based or temporary stays.",
  },
  {
    eyebrow: "Companies",
    title: "For Companies & Teams",
    description:
      "Scalable housing solutions for multiple employees with consistent standards, simplified logistics, and centralized management.",
  },
  {
    eyebrow: "Scale",
    title: "Projects of Any Size",
    description:
      "We support relocations, workforce assignments, and long-duration work travel with the same operational consistency across markets.",
  },
  {
    eyebrow: "Partner",
    title: "Reliable Housing Partner",
    description:
      "We position ourselves as a primary housing provider for companies, capable of supporting projects of any size.",
  },
];

const aboutParagraphs = [
  "At JW Luxury Estate LLC, we redefine modern housing by offering fully managed, flexible living solutions designed for both individual professionals and companies at scale.",
  "Whether you're relocating for work or managing an entire team, we provide a secure, comfortable, and turnkey housing experience tailored to your needs.",
];

const aboutStats = [
  {
    value: "30+",
    label: "day stays",
  },
  {
    value: "Weekly",
    label: "or monthly payments",
  },
  {
    value: "Team",
    label: "oriented living",
  },
];

const philosophyParagraphs = [
  "Our stays are designed for 30 days or longer, giving you stability without long-term commitments.",
  "Flexible payment options are available weekly or monthly, making it easier to align housing with the rhythm of a project or relocation.",
  "There are no long-term lease obligations and no penalties if your project ends or plans change.",
];

const whyCards = [
  {
    number: "01",
    title: "Live With Your Team - Not With Strangers",
    description:
      "We do not offer random shared housing. Our homes are designed so occupants belong to the same company or project.",
  },
  {
    number: "02",
    title: "Smart Security & Controlled Access",
    description:
      "Smart locks on the main entrance and each individual bedroom create secure, controlled access with no physical keys.",
  },
  {
    number: "03",
    title: "Strategic Locations That Work for You",
    description:
      "Properties are selected to support daily operations with access to major job sites, main roads, and essential services.",
  },
  {
    number: "04",
    title: "Fully Furnished & Move-In Ready",
    description:
      "Private bedrooms, a fully equipped kitchen, shared living areas, entertainment spaces, outdoor areas, and parking are ready from day one.",
  },
  {
    number: "05",
    title: "Professional Cleaning & Ongoing Maintenance",
    description:
      "Bi-weekly professional cleaning of common areas, continuous maintenance, and dedicated management keep everything operational.",
  },
  {
    number: "06",
    title: "Laundry Included - No Extra Cost",
    description:
      "In-unit or on-site laundry is included with no additional fees and no extra travel or hassle.",
  },
];



export const partnerService = {
  chip: "Team-Oriented Living",
  title: "Live With Your Team — Not With Strangers",
  description:
    "Our homes are strategically designed so occupants belong to the same company or project. That means a more comfortable, familiar, and professional environment with stronger team dynamics and a better overall living experience.",
  cta: "Talk to Our Team",
};

const corporateHighlights = [
  {
    value: "30+ Day Stays",
    label: "Stable housing without long-term commitments.",
  },
  {
    value: "Weekly or Monthly",
    label: "Flexible payment options built around project timing.",
  },
];

const processSteps = [
  {
    number: "1",
    title: "Flexible Terms",
    description:
      "Choose a 30+ day stay with weekly or monthly payment options and no rigid long-term lease commitment.",
  },
  {
    number: "2",
    title: "Ready From Day One",
    description:
      "Arrive to furnished bedrooms, equipped kitchens, shared living areas, and the essentials already in place.",
  },
  {
    number: "3",
    title: "Secure Access & Support",
    description:
      "Smart locks, controlled access, cleaning, maintenance, and dedicated management support daily operations.",
  },
  {
    number: "4",
    title: "Scale or Exit With Ease",
    description:
      "Extend, rotate teams, or wrap up a project without the penalties and friction of traditional housing structures.",
  },
];

const trustPillars = [
  "Secure",
  "Flexible",
  "Scalable",
  "Fully Managed",
];

const footerNavigationItems = [
  { label: "About", href: "#about" },
  { label: "Properties", href: "#properties" },
  { label: "Nationwide", href: "#nationwide" },
  { label: "Contact", href: "#contact" },
];

const footerLegalItems = [
  "Privacy Policy",
  "Terms of Service",
  "Fair Housing",
];

const footerContactActions = [
  {
    label: "Email JW Luxury Estate",
    href: "mailto:juanlondono@jwluxuryestate.com",
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

const hotelComparisonRows = [
  {
    feature: "Weekly cost",
    hotel: "$525+",
    jw: "$300-$400",
    note: "Save $125-$225 every week compared with a hotel stay.",
  },
  {
    feature: "Kitchen access",
    hotel: "None or paid extra",
    jw: "Full kitchen",
    note: "Cook real meals instead of relying on takeout or hotel add-ons.",
  },
  {
    feature: "Laundry",
    hotel: "Paid vending",
    jw: "In-unit, free",
    note: "Laundry is part of the living setup, not a separate errand.",
  },
  {
    feature: "Stay terms",
    hotel: "Nightly rate",
    jw: "Weekly pay, 1-month minimum",
    note: "Built for project timelines without a rigid long-term lease.",
  },
  {
    feature: "Community",
    hotel: "Random guests",
    jw: "Your coworkers",
    note: "No strangers, no random shared-housing arrangement.",
  },
];

const hotelValuePoints = [
  {
    label: "Private rooms",
    copy: "Furnished spaces where professionals can unpack, sleep well, and keep a real weekly routine.",
  },
  {
    label: "Included amenities",
    copy: "Kitchen access, in-unit laundry, WiFi, parking, work areas, and shared spaces are part of the stay.",
  },
  {
    label: "Known community",
    copy: "A housing setup built around co-workers and vetted guests instead of random hotel traffic.",
  },
];

type HotelChartSeriesKey = "jw" | "lease" | "manager";

const hotelChartSeries: {
  key: HotelChartSeriesKey;
  label: string;
  color: string;
}[] = [
  {
    key: "jw",
    label: "JW Luxury Estate",
    color: "#3bb9ed",
  },
  {
    key: "lease",
    label: "Long-Term Lease",
    color: "#1700a8",
  },
  {
    key: "manager",
    label: "Short-Term Manager",
    color: "#050505",
  },
];

const hotelChartRows: Array<
  { label: string } & Record<HotelChartSeriesKey, number>
> = [
  {
    label: "Smart Monitoring",
    jw: 10,
    lease: 2,
    manager: 5,
  },
  {
    label: "Included Service",
    jw: 10,
    lease: 5,
    manager: 10,
  },
  {
    label: "Vacancy Risk",
    jw: 2,
    lease: 5,
    manager: 8,
  },
  {
    label: "Management Fees",
    jw: 10,
    lease: 5,
    manager: 2,
  },
  {
    label: "Revenue Potential",
    jw: 10,
    lease: 2,
    manager: 8,
  },
  {
    label: "Property Enhancements",
    jw: 10,
    lease: 2,
    manager: 2,
  },
];

const scaleGroups = [
  {
    eyebrow: "For Individual Professionals",
    points: [
      "Flexible, comfortable, and fully equipped living",
      "No long-term contracts",
      "Ideal for project-based or temporary stays",
    ],
  },
  {
    eyebrow: "For Companies & Teams",
    points: [
      "Scalable housing solutions for multiple employees",
      "Consistent standards across all properties",
      "Simplified logistics and centralized management",
      "A reliable long-term housing partner",
    ],
  },
];

const nationwideSupportCards = [
  {
    eyebrow: "Warehouses",
    title: "Warehouse Teams",
    description:
      "Flexible accommodations for warehouse launches, logistics crews, supervisors, and shift-based operations that need organized long-stay housing.",
  },
  {
    eyebrow: "Offices",
    title: "Office Staff & Relocations",
    description:
      "Housing support for office teams, corporate relocations, training groups, and temporary assignments in new markets.",
  },
  {
    eyebrow: "Operations",
    title: "Project-Based Workforce Support",
    description:
      "A reliable housing partner for operational projects that move across markets and need consistent standards from one location to the next.",
  },
  {
    eyebrow: "Nationwide",
    title: "Coverage Across the U.S.",
    description:
      "We support accommodations in any part of the United States, helping companies stay close to the work without rebuilding housing logistics every time.",
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

export default async function Home() {
  const {
    heroSlides,
    propertyShowcase,
    propertyShowcaseUsesRemoteMedia,
  } = await getHomepageContent();

  return (
    <main className="bg-background text-foreground">
      <SiteHeader navigation={navigation} />

      <section className="w-full">
        <div className="hero-stage grid w-full overflow-hidden lg:grid-cols-[minmax(420px,0.45fr)_minmax(0,0.55fr)]">
          <div className="hero-stage-panel flex min-h-[470px] flex-col justify-center bg-dark px-6 py-12 text-white sm:min-h-[520px] sm:px-12 sm:py-16 lg:px-[clamp(3.25rem,4vw,4.75rem)] lg:py-[clamp(2.5rem,6vh,5rem)]">
            <div className="reveal-up max-w-[36rem] space-y-8">
              <p className="text-[10px] uppercase tracking-[0.42em] text-accent">
                Smart, Flexible Living
              </p>
              <div className="space-y-6">
                <h1 className="max-w-full font-display text-[2.45rem] leading-[0.9] tracking-[-0.035em] min-[390px]:text-[2.75rem] sm:max-w-[32rem] sm:text-[4.2rem] xl:max-w-[35rem] xl:text-[clamp(3.85rem,4.85vw,5.45rem)]">
                  <span className="block">Smart, Flexible</span>
                  <span className="block">Living for</span>
                  <span className="block">Professionals &</span>
                  <span className="block">Companies</span>
                </h1>
                <p className="max-w-[23rem] text-[13px] leading-7 text-white/72 sm:max-w-[24rem]">
                  At JW Luxury Estate LLC, we redefine modern housing by
                  offering fully managed, flexible living solutions designed
                  for both individual professionals and companies at scale.
                  Whether you&apos;re relocating for work or managing an entire
                  team, we provide a secure, comfortable, and turnkey housing
                  experience tailored to your needs.
                </p>
                <div className="reveal-up reveal-delay-1 mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
                  <a
                    href="#properties"
                    className="button-sheen inline-flex h-12 w-full items-center justify-center bg-accent px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-transform duration-150 ease-out hover:bg-accent-strong active:scale-[0.98] sm:w-auto"
                  >
                    See Our Properties
                  </a>
                  <a
                    href="#owners"
                    className="button-sheen inline-flex h-12 w-full items-center justify-center border border-white/18 px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:border-white/28 hover:bg-white/5 active:scale-[0.98] sm:w-auto"
                  >
                    Talk to Our Team
                  </a>
                </div>
              </div>
            </div>
          </div>

          <HeroImageCarousel slides={heroSlides} />
        </div>
      </section>

      <section className="depth-section w-full border-y border-border-subtle bg-surface">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12">
          <Reveal className="grid gap-5 border-b border-border-subtle pb-7 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Experience
              </p>
              <h2 className="mt-3 max-w-[24rem] font-display text-[2.55rem] leading-[0.96] tracking-[-0.045em] text-foreground sm:text-[3.25rem]">
                What You Can Expect
              </h2>
            </div>
            <p className="max-w-[34rem] text-[0.96rem] leading-8 text-muted md:justify-self-end">
              A more complete stay than a hotel room: stable terms, controlled
              access, furnished spaces, and a setup that works for real daily
              routines.
            </p>
          </Reveal>

          <div className="experience-bento mt-8">
            {experienceBlocks.map((block, index) => (
              <Reveal
                as="article"
                key={block.title}
                delay={index * 45}
                className={[
                  "experience-tile group",
                  index === 0 ? "experience-tile-feature" : "",
                ].join(" ")}
              >
                <span className="experience-tile-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p
                  className={[
                    "font-display text-[2rem] leading-none tracking-[-0.04em] transition-colors duration-200 group-hover:text-accent sm:text-[2.25rem]",
                    index === 0 ? "text-white" : "text-foreground",
                  ].join(" ")}
                >
                  {block.title}
                </p>
                <p
                  className={[
                    "mt-3 max-w-[21rem] text-[0.9rem] leading-7",
                    index === 0 ? "text-white/66" : "text-muted",
                  ].join(" ")}
                >
                  {block.subtitle}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-hotels-heading"
        className="depth-section border-b border-border-subtle bg-[#f2ece4]"
      >
        <div className="w-full px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-[5.25rem]">
          <div className="grid gap-10 xl:grid-cols-[minmax(280px,0.31fr)_minmax(0,0.69fr)] xl:items-start">
            <Reveal className="space-y-8">
              <div className="space-y-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
                  Professional weekly housing
                </p>
                <h2
                  id="why-hotels-heading"
                  className="max-w-[15rem] font-display text-[3.25rem] leading-[0.92] text-foreground sm:max-w-[23rem] sm:text-[4.65rem] lg:text-[5.05rem]"
                >
                  Why Choose Us Over Hotels
                </h2>
                <p className="max-w-[31rem] text-[1rem] leading-8 text-muted">
                  Hotels work for a night. JW Luxury Estate is made for
                  professionals who need a private room, a real kitchen, laundry,
                  parking, and a calmer weekly routine without signing a long
                  lease.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden border border-border-subtle bg-border-subtle">
                {hotelValuePoints.map((point) => (
                  <div key={point.label} className="bg-surface px-6 py-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                      {point.label}
                    </p>
                    <p className="mt-3 max-w-[27rem] text-[0.95rem] leading-7 text-foreground/78">
                      {point.copy}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 border-t border-border-subtle pt-6">
                <p className="font-display text-[3rem] leading-none text-accent sm:text-[3.55rem]">
                  $125-$225
                </p>
                <p className="self-end pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
                  Estimated weekly savings vs. a hotel stay
                </p>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <article className="hotel-comparison-card">
                <div className="hotel-chart-topline">
                  <p className="hotel-chart-brand">JW Luxury Estate</p>
                  <div className="hotel-chart-legend" aria-label="Chart legend">
                    {hotelChartSeries.map((series) => (
                      <span key={series.key} className="hotel-chart-legend-item">
                        <span
                          className="hotel-chart-legend-dot"
                          style={{ backgroundColor: series.color }}
                        />
                        {series.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hotel-chart-shell">
                  <div className="hotel-chart-title-pane">
                    <p>Cost-Benefit Comparison</p>
                    <span>Weekly stays for professionals</span>
                  </div>

                  <div
                    className="hotel-chart-plot"
                    role="img"
                    aria-label="Cost benefit comparison showing JW Luxury Estate against long-term leases and short-term managers across monitoring, included service, vacancy risk, management fees, revenue potential, and property enhancements."
                  >
                    <div className="hotel-chart-rows">
                      {hotelChartRows.map((row) => (
                        <div key={row.label} className="hotel-chart-row">
                          <p className="hotel-chart-label">{row.label}</p>
                          <div className="hotel-chart-bars">
                            {hotelChartSeries.map((series) => (
                              <span
                                key={series.key}
                                className="hotel-chart-bar"
                                style={{
                                  backgroundColor: series.color,
                                  width: `${row[series.key] * 10}%`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="hotel-chart-axis" aria-hidden="true">
                      {[0, 2, 4, 6, 8, 10].map((tick) => (
                        <span key={tick}>{tick}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hotel-comparison-strip">
                  {hotelComparisonRows.slice(0, 4).map((row) => (
                    <div key={row.feature} className="hotel-comparison-proof">
                      <p>{row.feature}</p>
                      <strong>{row.jw}</strong>
                      <span>Hotel: {row.hotel}</span>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="depth-section w-full px-6 py-14 sm:px-10 sm:py-16 lg:px-16 xl:py-24">
        <div
          id="about"
          className="grid items-start gap-8 xl:grid-cols-[minmax(280px,0.31fr)_minmax(0,0.69fr)] xl:gap-14"
        >
          <Reveal className="space-y-7">
            <div className="space-y-5 xl:max-w-[25rem]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-accent">
                About
              </p>
              <h2 className="max-w-[11rem] font-display text-[3.05rem] leading-[0.92] tracking-[-0.04em] text-foreground sm:max-w-[24rem] sm:text-[4.1rem] xl:max-w-[12rem] xl:text-[4.3rem]">
                Who We Are.
              </h2>
            </div>

            <div className="about-tabs bg-surface px-0 py-2 shadow-[0_18px_30px_rgba(17,12,9,0.04)] sm:grid sm:grid-cols-[1.08fr_0.98fr_0.94fr] xl:block">
              {audienceTabs.map((tab) => (
                <div
                  key={tab.label}
                  className="relative cursor-pointer bg-transparent px-5 py-5 text-[1rem] leading-snug font-medium text-muted transition-[background-color,color] duration-200 before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-transparent hover:bg-background hover:font-semibold hover:text-foreground hover:before:bg-accent sm:px-6 sm:py-6 xl:px-7 xl:py-7"
                >
                  {tab.label}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            as="article"
            delay={90}
            className="premium-surface about-story-card border border-border-subtle bg-surface px-6 py-8 shadow-[0_26px_55px_rgba(17,12,9,0.06)] sm:px-10 sm:py-10 xl:px-[3.25rem] xl:py-[3.25rem]"
          >
            <div className="max-w-[46rem] space-y-6">
              <h3 className="font-display text-[2.35rem] leading-[0.95] tracking-[-0.045em] text-foreground sm:text-[3rem]">
                Flexible Living Designed for Professionals and Companies
              </h3>
              {aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[42rem] text-[0.98rem] leading-8 text-muted sm:text-[1.05rem] sm:leading-10"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 grid gap-px border border-border-subtle bg-border-subtle sm:grid-cols-[1fr_0.86fr_1.12fr]">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="bg-background px-5 py-5">
                  <p className="font-display text-[2.1rem] leading-none text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="depth-section border-y border-border-subtle bg-surface-strong">
        <div className="w-full px-6 py-14 sm:px-10 sm:py-16 lg:px-16 xl:py-[5.5rem]">
          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] xl:gap-14">
            <Reveal className="space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-accent">
                Flexible Terms
              </p>
              <h2 className="max-w-[18rem] font-display text-[2.75rem] leading-[0.94] tracking-[-0.04em] text-foreground sm:max-w-[24rem] sm:text-[3.75rem] xl:max-w-[16rem] xl:text-[4rem]">
                Minimum 30-Day Stays - Total Flexibility
              </h2>
              <div className="inline-grid border border-border-subtle bg-background px-5 py-4 shadow-[0_14px_34px_rgba(17,12,9,0.05)]">
                <span className="font-display text-[2.4rem] leading-none text-accent">
                  30+
                </span>
                <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  days minimum
                </span>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={90}
              className="premium-surface border border-border-subtle bg-surface px-6 py-8 shadow-[0_18px_40px_rgba(17,12,9,0.05)] sm:px-10 sm:py-10"
            >
              <div className="max-w-[44rem] space-y-6">
                {philosophyParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[0.98rem] leading-8 text-muted sm:text-[1.02rem] sm:leading-9"
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="grid gap-3 pt-1 sm:grid-cols-2">
                  {minimumStayChecks.map((item) => (
                    <div key={item} className="flex gap-3">
                      <span className="mt-[0.55rem] h-2 w-2 rounded-full bg-accent" />
                      <p className="text-[0.97rem] leading-8 text-muted">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-[1rem] font-medium leading-8 text-foreground/76">
                  Stay as long as you need - without being tied down.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="depth-section bg-background">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.75rem]">
          <Reveal className="grid gap-5 border-b border-border-subtle pb-7 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-accent">
                Stay Advantages
              </p>
              <h2 className="mt-3 max-w-[24rem] font-display text-[2.45rem] leading-[0.96] tracking-[-0.04em] text-foreground sm:text-[3.35rem]">
                Designed Around Real-World Work Stays
              </h2>
            </div>
            <p className="max-w-[37rem] text-[0.98rem] leading-8 text-muted md:justify-self-end">
              Every property is selected and operated to give professionals and
              companies a more organized, secure, and comfortable way to live
              while work keeps moving.
            </p>
          </Reveal>

          <div className="advantages-bento mt-8">
            {whyCards.map((card) => (
              <Reveal
                as="article"
                key={card.number}
                delay={Number(card.number) * 35}
                className={[
                  "advantage-card",
                  card.number === "04" ? "advantage-card-dark" : "",
                ].join(" ")}
              >
                <div className="relative z-10 max-w-[23rem]">
                  <span className="advantage-number inline-flex font-display text-[2.35rem] leading-none sm:text-[2.75rem]">
                    {card.number}
                  </span>
                  <h3 className="mt-5 font-display text-[1.75rem] leading-[0.98] tracking-[-0.04em] sm:text-[1.95rem]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-7">
                    {card.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="properties"
        className="depth-section border-y border-border-subtle bg-surface-strong"
      >
        <div className="w-full px-6 py-11 sm:px-10 sm:py-16 lg:px-16 lg:py-[5rem]">
          <Reveal className="grid gap-6 xl:grid-cols-[minmax(0,0.68fr)_minmax(0,0.32fr)] xl:items-end">
            <div className="max-w-[40rem] space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Our Properties
              </p>
              <h2 className="font-display text-[2.45rem] leading-[0.95] tracking-[-0.04em] text-foreground min-[390px]:text-[2.75rem] sm:text-[3.45rem]">
                The Homes, Rooms, and Shared Spaces We Manage
              </h2>
            </div>
            <div className="space-y-3 xl:justify-self-end xl:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
                Selective Preview
              </p>
              <p className="max-w-[26rem] text-[0.96rem] leading-8 text-muted">
                A concise look at the type of properties we prepare for
                long-stay professionals, crews, and company teams.
              </p>
            </div>
          </Reveal>

          <div className="properties-bento mt-8 xl:mt-12">
            {propertyShowcase.map((property, index) => (
              <Reveal
                as="article"
                key={property.title}
                delay={index * 60}
                className={[
                  "property-showcase-card premium-surface group bg-surface",
                  index === 0 ? "property-showcase-feature" : "",
                  index === 1 ? "property-showcase-shift" : "",
                ].join(" ")}
              >
                <PropertyImageCarousel
                  label={property.title}
                  slides={property.slides}
                  sizes="(min-width: 1280px) 29vw, 100vw"
                  intervalMs={4200 + index * 260}
                  unoptimized={propertyShowcaseUsesRemoteMedia}
                />
                <div className="px-6 py-6 sm:px-7 sm:py-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent">
                    {property.eyebrow}
                  </p>
                  <h3 className="mt-3 max-w-[16rem] font-display text-[1.9rem] leading-[0.95] tracking-[-0.04em] text-foreground">
                    {property.title}
                  </h3>
                  <p className="mt-3 max-w-[21rem] text-[0.9rem] leading-7 text-muted">
                    {property.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {property.highlights.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center border border-border-subtle bg-background px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.24em] text-foreground/66"
                      >
                        {point}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-7 flex flex-col gap-3 border-t border-border-subtle/80 pt-5 sm:flex-row sm:items-start sm:justify-between">
            <p className="max-w-[31rem] text-[0.88rem] leading-7 text-muted">
              This section is meant to show the standard and type of spaces we
              manage, not to display every property in inventory.
            </p>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-foreground/42 sm:pt-1 sm:text-right">
              Curated For Landlord Review
            </p>
          </Reveal>
        </div>
      </section>

      <section className="statement-band border-y border-white/8 bg-dark text-white">
        <Reveal className="px-6 py-8 sm:px-10 lg:px-16 lg:py-10">
          <p className="mx-auto max-w-4xl text-center font-display text-[1.85rem] leading-[1.05] tracking-[-0.03em] text-white sm:text-[2.35rem]">
            Secure, flexible, and team-oriented living for professionals and companies.
          </p>
        </Reveal>
      </section>

      <section className="depth-section bg-background">
        <div className="w-full px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-[4.75rem]">
          <div
            id="nationwide"
            className="overflow-hidden border border-border-subtle bg-surface shadow-[0_20px_44px_rgba(17,12,9,0.04)]"
          >
            <div className="grid gap-px bg-border-subtle xl:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
              <Reveal
                as="article"
                className="premium-surface-dark bg-dark px-6 py-9 text-white sm:px-10 sm:py-12 xl:px-12 xl:py-14"
              >
                <div className="max-w-[26rem] space-y-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                    Nationwide Support
                  </p>
                  <h2 className="font-display text-[2.28rem] leading-[0.95] tracking-[-0.035em] text-white min-[390px]:text-[2.5rem] sm:text-[3.5rem]">
                    <span className="block">Nationwide Housing</span>
                    <span className="block">for Warehouses, Offices, and Operations</span>
                    <span className="block">Across the U.S.</span>
                  </h2>
                  <p className="text-[1rem] leading-8 text-white/62">
                    JW Luxury Estate supports companies that need housing in any
                    part of the United States, whether the need is tied to
                    warehouse activity, office teams, or operational projects on
                    the move.
                  </p>
                  <p className="text-[1rem] leading-8 text-white/62">
                    We coordinate flexible accommodations that stay consistent as
                    your footprint grows, helping teams stay close to the work
                    while simplifying housing logistics across markets.
                  </p>
                  <a
                    href="#contact"
                    className="button-sheen inline-flex h-11 items-center justify-center bg-accent px-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white transition-transform duration-150 ease-out hover:bg-accent-strong active:scale-[0.98]"
                  >
                    Discuss Nationwide Housing
                  </a>
                </div>
              </Reveal>

              <div className="grid gap-px bg-border-subtle md:grid-cols-2">
                {nationwideSupportCards.map((card, index) => (
                  <Reveal
                    as="article"
                    key={card.title}
                    delay={index * 50}
                    className="grid-panel min-h-[184px] bg-surface px-6 py-8 sm:px-8 sm:py-9"
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent/88">
                      {card.eyebrow}
                    </p>
                    <h3 className="mt-4 max-w-[15rem] font-display text-[1.75rem] leading-[0.95] tracking-[-0.035em] text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-4 max-w-[18rem] text-[0.95rem] leading-7 text-muted">
                      {card.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="depth-section bg-surface-strong">
        <div className="w-full px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-[5.25rem]">
          <div id="owners">
            <Reveal className="mx-auto max-w-4xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Built for Scale
              </p>
              <h2 className="mt-3 font-display text-[2.45rem] leading-[0.98] tracking-[-0.035em] text-foreground sm:text-[3.2rem]">
                Built for Individuals & Companies at Scale
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-[0.98rem] leading-8 text-muted">
                We position ourselves as a primary housing provider for
                companies, capable of supporting projects of any size.
              </p>
              <div className="scale-bento mt-10 text-left">
                {scaleGroups.map((group, index) => (
                  <div
                    key={group.eyebrow}
                    className={[
                      "scale-panel",
                      index === 0 ? "scale-panel-primary" : "",
                    ].join(" ")}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                      {group.eyebrow}
                    </p>
                    <div className="mt-4 space-y-3">
                      {group.points.map((point) => (
                        <div key={point} className="flex gap-3">
                          <span className="mt-[0.52rem] h-2 w-2 rounded-full bg-accent" />
                          <p className="text-[0.95rem] leading-7 text-muted">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="button-sheen mt-8 inline-flex h-11 items-center justify-center bg-[#11161d] px-6 text-[10px] font-bold uppercase tracking-[0.3em] !text-white transition-transform duration-150 ease-out hover:bg-[#1c242d] active:scale-[0.98]"
              >
                Talk to Our Team
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-dark text-white">
        <div className="w-full border-b border-white/6 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-[4.75rem]">
          <div className="mx-auto max-w-[1180px]">
            <Reveal className="grid gap-5 border-b border-white/8 pb-7 md:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] md:items-end">
              <div className="space-y-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                  Who We Serve
                </p>
                <h2 className="max-w-[34rem] font-display text-[2.55rem] leading-[0.95] tracking-[-0.04em] text-white sm:text-[3.4rem]">
                  Built for Individual Professionals and Company Teams.
                </h2>
              </div>
              <p className="max-w-[35rem] text-[1rem] leading-8 text-white/58 md:justify-self-end">
                Whether you&apos;re relocating for work or managing an entire
                team, we provide a secure, comfortable, and turnkey housing
                experience tailored to your needs.
              </p>
            </Reveal>

            <div className="serve-bento mt-8">
              {clientTypes.map((client, index) => (
                <Reveal
                  as="article"
                  key={client.title}
                  delay={index * 45}
                  className="serve-card grid-panel"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-accent/88">
                    {client.eyebrow}
                  </p>
                  <h3 className="mt-5 max-w-[15rem] font-display text-[1.85rem] leading-[0.98] tracking-[-0.04em] text-white">
                    {client.title}
                  </h3>
                  <p className="mt-4 max-w-[22rem] text-[0.95rem] leading-7 text-white/58">
                    {client.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div
          id="contact"
          className="grid w-full items-start gap-9 px-6 py-14 sm:px-10 sm:py-16 xl:grid-cols-[minmax(0,0.88fr)_minmax(420px,0.84fr)] xl:px-16 xl:py-[6rem]"
        >
          <Reveal className="max-w-[36rem] space-y-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Talk to Our Team
            </p>
            <div className="space-y-6">
              <h2 className="max-w-[22rem] font-display text-[3rem] leading-[0.92] tracking-[-0.04em] text-white sm:max-w-[33rem] sm:text-[4.4rem]">
                A Better Way to Stay & Operate.
              </h2>
              <p className="max-w-[28rem] text-[1.02rem] leading-9 text-white/62">
                At JW Luxury Estate, we don&apos;t just provide housing - we
                deliver a secure, flexible, and team-oriented living
                experience.
              </p>
              <p className="max-w-[28rem] text-[1.02rem] leading-9 text-white/62">
                Whether you&apos;re an individual professional or a company
                managing a workforce, we become your trusted housing solution -
                scalable, reliable, and fully managed.
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
            className="premium-surface-dark border border-white/8 bg-dark-soft px-6 py-8 shadow-[0_18px_40px_rgba(0,0,0,0.16)] sm:px-10 sm:py-10 xl:mx-auto xl:w-full xl:max-w-[25rem]"
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

      <section className="depth-section w-full px-6 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-[5.25rem]">
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
            How It Works
          </p>
          <h2 className="mt-4 font-display text-[2.9rem] leading-[0.96] tracking-[-0.05em] text-foreground sm:text-[3.6rem]">
            From Move-In to Daily Operations
          </h2>
        </Reveal>

        <div className="process-rail mx-auto mt-10 max-w-6xl xl:mt-14">
          {processSteps.map((step) => (
            <Reveal
              as="article"
              key={step.number}
              delay={Number(step.number) * 50}
              className="process-card process-rail-step"
            >
              <div className="process-rail-number mb-5 flex h-10 w-10 items-center justify-center bg-foreground text-sm font-bold text-surface">
                {step.number}
              </div>
              <h3 className="font-display text-[1.55rem] leading-none tracking-[-0.035em] text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[15rem] text-[0.84rem] leading-6 text-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="depth-section border-t border-border-subtle bg-surface">
        <div className="w-full px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-[5.5rem]">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Stay Confidence
            </p>
            <h2 className="mt-4 font-display text-[2.45rem] leading-[0.98] tracking-[-0.035em] text-foreground sm:text-[3.3rem]">
              Secure, Flexible, and Fully Managed
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[1rem] leading-8 text-muted">
              We create housing that feels organized, secure, and operationally
              strong for every stage of a project, relocation, or team-based
              stay.
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
                Smart, flexible living solutions for professionals and
                companies that need secure, comfortable, and fully managed
                housing.
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
                  Contact:{" "}
                  <a
                    href="mailto:juanlondono@jwluxuryestate.com"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    juanlondono@jwluxuryestate.com
                  </a>
                </p>
                <p>
                  Alternate:{" "}
                  <a
                    href="mailto:camilasolano@jwluxuryestate.com"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    camilasolano@jwluxuryestate.com
                  </a>
                </p>
                <p>Headquarters: Carrollton, GA</p>
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
            <p>Secure, flexible living built for professionals and companies.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
