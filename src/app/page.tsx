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
    feature: "More space, comfort, and privacy",
    jw: "A complete living environment designed for long stays",
    hotel: "Hotels usually offer less space and daily-living comfort",
    renting: "Shared homes can feel crowded or inconsistent",
  },
  {
    feature: "Full kitchens and shared living areas",
    jw: "Included as part of a move-in ready stay",
    hotel: "Hotels rarely provide the same day-to-day setup",
    renting: "Depends on the home and shared-house arrangement",
  },
  {
    feature: "Better suited for long stays",
    jw: "30+ day stays built around project timelines and flexibility",
    hotel: "Hotels can become expensive and repetitive over time",
    renting: "Traditional rentals can be rigid or unstable for changing projects",
  },
  {
    feature: "No unknown roommates",
    jw: "Team-oriented living built around the same company or project",
    hotel: "Hotels are private, but not designed for team-based living",
    renting: "Shared houses often place you with people you do not know",
  },
  {
    feature: "No complicated lease structures",
    jw: "Flexible payment terms and straightforward housing coordination",
    hotel: "Hotels are simple, but not built for workforce housing at scale",
    renting: "Traditional rentals often come with lease complexity and house rules",
  },
  {
    feature: "No penalties or rigid commitments",
    jw: "Extend or wrap up housing as project needs change",
    hotel: "Hotels are flexible, but inefficient for long workforce stays",
    renting: "Traditional rentals can create penalties and rigid commitments",
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

      <section className="experience-section depth-section w-full border-b border-border-subtle">
        <div className="experience-shell mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12">
          <Reveal className="experience-intro-grid grid gap-5 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:items-end">
            <div>
              <p className="experience-kicker text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Experience
              </p>
              <h2 className="experience-heading mt-3 max-w-[24rem] font-display text-[2.55rem] leading-[0.96] tracking-[-0.045em] text-foreground sm:text-[3.25rem]">
                <span>What You Can</span>
                {" "}
                <span>Expect</span>
              </h2>
            </div>
            <p className="experience-lede max-w-[34rem] text-[0.96rem] leading-8 text-muted md:justify-self-end">
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
                    "experience-tile-title font-display text-[2rem] leading-none tracking-[-0.04em] transition-colors duration-200 group-hover:text-accent sm:text-[2.25rem]",
                    index === 0 ? "text-white" : "text-foreground",
                  ].join(" ")}
                >
                  {block.title}
                </p>
                <p
                  className={[
                    "experience-tile-copy mt-3 max-w-[21rem] text-[0.9rem] leading-7",
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
        className="hotels-section depth-section border-b border-border-subtle bg-[#f2ece4]"
      >
        <div className="hotels-shell mx-auto w-full max-w-[1280px] px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-[5.25rem]">
          <div className="hotels-layout grid gap-8 xl:grid-cols-[minmax(290px,0.34fr)_minmax(0,0.66fr)] xl:items-stretch">
            <Reveal className="hotels-copy-panel">
              <div className="space-y-5">
                <p className="hotels-kicker text-[10px] font-semibold uppercase tracking-[0.32em] text-accent">
                  Professional weekly housing
                </p>
                <h2
                  id="why-hotels-heading"
                  className="hotels-heading font-display text-[3.25rem] leading-[0.92] text-foreground sm:text-[4.45rem] lg:text-[4.9rem]"
                >
                  <span>Why Choose Us</span>
                  {" "}
                  <span>Over Hotels</span>
                </h2>
                <p className="hotels-lede max-w-[31rem] text-[1rem] leading-8 text-muted">
                  Hotels work for a night. JW Luxury Estate is made for
                  professionals who need a private room, a real kitchen, laundry,
                  parking, and a calmer weekly routine without signing a long
                  lease.
                </p>
              </div>

              <div className="hotel-value-grid">
                {hotelValuePoints.map((point) => (
                  <div key={point.label} className="hotel-value-card">
                    <p className="hotel-value-label text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
                      {point.label}
                    </p>
                    <p className="hotel-value-copy mt-3 max-w-[27rem] text-[0.95rem] leading-7 text-foreground/78">
                      {point.copy}
                    </p>
                  </div>
                ))}
              </div>

              <div className="hotel-savings-band">
                <p className="hotel-savings-value font-display text-[3rem] leading-none text-accent sm:text-[3.55rem]">
                  $125-$225
                </p>
                <p className="hotel-savings-label self-end pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-muted">
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
                    <p>
                      <span>Cost-Benefit</span>
                      {" "}
                      <span>Comparison</span>
                    </p>
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

                <div className="hotel-comparison-table-shell">
                  <div className="hotel-table-heading">
                    <div>
                      <p className="hotel-table-kicker">JW vs. hotels</p>
                      <h3>Why JW Luxury Estate works better</h3>
                    </div>
                    <p>
                      The original comparison, brought back under the graph so
                      clients can scan the practical differences between JW,
                      hotels, and shared rental arrangements.
                    </p>
                  </div>

                  <div className="hotel-table-desktop">
                    <table className="hotel-comparison-table">
                      <thead>
                        <tr>
                          <th scope="col">Feature</th>
                          <th scope="col">JW Luxury Estate</th>
                          <th scope="col">Hotels</th>
                          <th scope="col">Renting With Others</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hotelComparisonRows.map((row) => (
                          <tr key={row.feature}>
                            <th scope="row">{row.feature}</th>
                            <td className="hotel-table-jw">{row.jw}</td>
                            <td>{row.hotel}</td>
                            <td>{row.renting}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="hotel-table-mobile">
                    {hotelComparisonRows.map((row) => (
                      <article key={row.feature} className="hotel-mobile-row">
                        <p className="hotel-mobile-feature">{row.feature}</p>
                        <div>
                          <span>JW Luxury Estate</span>
                          <strong>{row.jw}</strong>
                        </div>
                        <div>
                          <span>Hotels</span>
                          <strong>{row.hotel}</strong>
                        </div>
                        <div>
                          <span>Renting With Others</span>
                          <strong>{row.renting}</strong>
                        </div>
                      </article>
                    ))}
                  </div>
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

      <section
        aria-labelledby="flexible-terms-heading"
        className="terms-section depth-section border-y border-border-subtle bg-surface-strong"
      >
        <div className="terms-shell mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[5.25rem]">
          <div className="terms-layout grid items-stretch gap-5 xl:grid-cols-[minmax(280px,0.38fr)_minmax(0,0.62fr)]">
            <Reveal className="terms-intro-panel">
              <div>
                <p className="terms-kicker text-[11px] font-semibold uppercase tracking-[0.34em] text-accent">
                  Flexible Terms
                </p>
                <h2
                  id="flexible-terms-heading"
                  aria-label="Minimum 30-Day Stays - Total Flexibility"
                  className="terms-heading mt-4 font-display text-[2.85rem] leading-[0.92] tracking-[-0.045em] text-foreground sm:text-[3.75rem] xl:text-[4.15rem]"
                >
                  <span>Minimum 30-Day Stays</span>
                  <span aria-hidden="true" className="terms-heading-rule" />
                  <span>Total Flexibility</span>
                </h2>
              </div>

              <div className="terms-metric-card">
                <span className="terms-metric-value font-display text-[3.25rem] leading-none text-accent">
                  30+
                </span>
                <span className="terms-metric-label mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                  days minimum
                </span>
              </div>
            </Reveal>

            <Reveal
              as="article"
              delay={90}
              className="terms-detail-panel"
            >
              <div className="terms-copy-stack">
                {philosophyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="terms-check-rail">
                {minimumStayChecks.map((item, index) => (
                  <div key={item} className="terms-check-row">
                    <span className="terms-check-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <p className="terms-closing">
                Stay as long as you need - without being tied down.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="stay-advantages-heading"
        className="advantages-section depth-section bg-background"
      >
        <div className="advantages-shell mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.75rem]">
          <Reveal className="advantages-intro-panel grid gap-5 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:items-end">
            <div>
              <p className="advantages-kicker text-[11px] font-semibold uppercase tracking-[0.36em] text-accent">
                Stay Advantages
              </p>
              <h2
                id="stay-advantages-heading"
                className="advantages-heading mt-3 max-w-[32rem] font-display text-[2.45rem] leading-[0.96] tracking-[-0.04em] text-foreground sm:text-[3.35rem]"
              >
                <span>Designed Around</span>
                {" "}
                <span>Real-World Work Stays</span>
              </h2>
            </div>
            <div className="advantages-intro-copy md:justify-self-end">
              <p>
                Every property is selected and operated to give professionals and
                companies a more organized, secure, and comfortable way to live
                while work keeps moving.
              </p>
              <div className="advantages-proof-pill">
                <span className="font-display">06</span>
                <span>core stay standards</span>
              </div>
            </div>
          </Reveal>

          <div className="advantages-bento mt-8">
            {whyCards.map((card) => (
              <Reveal
                as="article"
                key={card.number}
                delay={Number(card.number) * 35}
                className={[
                  "advantage-card group",
                  card.number === "01" ? "advantage-card-feature" : "",
                  card.number === "04" ? "advantage-card-dark" : "",
                ].join(" ")}
              >
                <div className="advantage-card-inner">
                  <div className="advantage-card-topline">
                    <span className="advantage-number inline-flex font-display text-[2.35rem] leading-none sm:text-[2.75rem]">
                      {card.number}
                    </span>
                    <span className="advantage-card-label">Stay standard</span>
                  </div>
                  <h3 className="advantage-title mt-5 font-display text-[1.75rem] leading-[0.98] tracking-[-0.04em] sm:text-[1.95rem]">
                    {card.title}
                  </h3>
                  <p className="advantage-copy mt-4 text-[0.95rem] leading-7">
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

      <section
        id="owners"
        aria-labelledby="scale-heading"
        className="scale-section depth-section bg-surface-strong"
      >
        <div className="scale-shell mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[5.25rem]">
          <div className="scale-layout grid gap-5 xl:grid-cols-[minmax(280px,0.42fr)_minmax(0,0.58fr)] xl:items-stretch">
            <Reveal className="scale-intro-panel">
              <div>
                <p className="scale-kicker text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Built for Scale
                </p>
                <h2
                  id="scale-heading"
                  className="scale-heading mt-4 font-display text-[2.55rem] leading-[0.95] tracking-[-0.045em] text-foreground sm:text-[3.25rem]"
                >
                  <span>Built for Individuals</span>
                  {" "}
                  <span>& Companies at Scale</span>
                </h2>
                <p className="scale-lede mt-5 text-[0.98rem] leading-8 text-muted">
                  We position ourselves as a primary housing provider for
                  companies, capable of supporting projects of any size.
                </p>
              </div>

              <div className="scale-proof-grid">
                <div>
                  <span className="font-display">2</span>
                  <p>audiences supported</p>
                </div>
                <div>
                  <span className="font-display">Any</span>
                  <p>project size</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={90} className="scale-content-column">
              <div className="scale-bento text-left">
                {scaleGroups.map((group, index) => (
                  <div
                    key={group.eyebrow}
                    className={[
                      "scale-panel",
                      index === scaleGroups.length - 1 ? "scale-panel-primary" : "",
                    ].join(" ")}
                  >
                    <p className="scale-panel-eyebrow text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
                      {group.eyebrow}
                    </p>
                    <div className="scale-point-list mt-4">
                      {group.points.map((point, pointIndex) => (
                        <div key={point} className="scale-point-row">
                          <span>{String(pointIndex + 1).padStart(2, "0")}</span>
                          <p>
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
                className="scale-cta button-sheen mt-5 inline-flex h-11 items-center justify-center bg-[#11161d] px-6 text-[10px] font-bold uppercase tracking-[0.3em] !text-white transition-transform duration-150 ease-out hover:bg-[#1c242d] active:scale-[0.98]"
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
          aria-labelledby="contact-heading"
          className="contact-section"
        >
          <Reveal className="contact-copy">
            <p className="contact-kicker text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Talk to Our Team
            </p>
            <div className="contact-heading-stack">
              <h2
                id="contact-heading"
                className="contact-title font-display text-white"
              >
                A Better Way to Stay & Operate.
              </h2>
              <p className="contact-lede text-white/62">
                At JW Luxury Estate, we don&apos;t just provide housing - we
                deliver a secure, flexible, and team-oriented living
                experience.
              </p>
              <p className="contact-lede text-white/62">
                Whether you&apos;re an individual professional or a company
                managing a workforce, we become your trusted housing solution -
                scalable, reliable, and fully managed.
              </p>
            </div>
            <div className="contact-stat-grid">
              {corporateHighlights.map((item) => (
                <div key={item.label} className="contact-stat">
                  <p className="font-display text-white">
                    {item.value}
                  </p>
                  <p className="text-white/38">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={110}
            className="contact-form-card premium-surface-dark"
          >
            <div className="space-y-7">
              <div className="contact-form-heading">
                <h3 className="font-display text-white">
                  Let&apos;s Talk
                </h3>
                <p className="text-white/56">
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

      <section
        aria-labelledby="process-heading"
        className="process-section depth-section w-full"
      >
        <div className="process-shell mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[5.25rem]">
          <Reveal className="process-intro-panel grid gap-5 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:items-end">
            <div>
              <p className="process-kicker text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                How It Works
              </p>
              <h2
                id="process-heading"
                className="process-heading mt-4 font-display text-[2.75rem] leading-[0.96] tracking-[-0.05em] text-foreground sm:text-[3.55rem]"
              >
                <span>From Move-In</span>
                {" "}
                <span>to Daily Operations</span>
              </h2>
            </div>
            <div className="process-intro-meta md:justify-self-end">
              <div className="process-proof-card">
                <span className="font-display">04</span>
                <p>steps from setup to support</p>
              </div>
              <div className="process-flow-labels">
                <span>Move-In</span>
                <span>Daily Operations</span>
              </div>
            </div>
          </Reveal>

          <div className="process-rail mx-auto mt-8 xl:mt-10">
            {processSteps.map((step) => (
              <Reveal
                as="article"
                key={step.number}
                delay={Number(step.number) * 50}
                className={[
                  "process-card process-rail-step group",
                  step.number === "1" ? "process-rail-step-feature" : "",
                ].join(" ")}
              >
                <div className="process-card-topline">
                  <div className="process-rail-number flex h-10 w-10 items-center justify-center bg-foreground text-sm font-bold text-surface">
                    {step.number}
                  </div>
                  <span className="process-step-label">Step</span>
                </div>
                <h3 className="process-step-title font-display text-[1.55rem] leading-none tracking-[-0.035em] text-foreground">
                  {step.title}
                </h3>
                <p className="process-step-copy mt-3 max-w-[15rem] text-[0.84rem] leading-6 text-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="confidence-heading"
        className="confidence-section depth-section border-t border-border-subtle bg-surface"
      >
        <div className="confidence-shell mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[5.25rem]">
          <Reveal className="confidence-intro-panel grid gap-5 md:grid-cols-[minmax(0,0.48fr)_minmax(0,0.52fr)] md:items-end">
            <div>
              <p className="confidence-kicker text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Stay Confidence
              </p>
              <h2
                id="confidence-heading"
                className="confidence-heading mt-4 font-display text-[2.45rem] leading-[0.98] tracking-[-0.035em] text-foreground sm:text-[3.3rem]"
              >
                <span>Secure, Flexible,</span>
                {" "}
                <span>and Fully Managed</span>
              </h2>
              <p className="confidence-lede mt-6 max-w-3xl text-[1rem] leading-8 text-muted">
                We create housing that feels organized, secure, and operationally
                strong for every stage of a project, relocation, or team-based
                stay.
              </p>
            </div>
            <p className="confidence-side-note md:justify-self-end">
              A clear operating standard for every stay, from access and terms
              to management and support.
            </p>
          </Reveal>

          <div className="confidence-pillar-grid mt-5">
            {trustPillars.map((pillar, index) => (
              <Reveal
                as="article"
                key={pillar}
                delay={index * 45}
                className="confidence-pillar-card group"
              >
                <span className="confidence-pillar-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.75rem] leading-none tracking-[-0.035em]">
                  {pillar}
                </h3>
              </Reveal>
            ))}
          </div>
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
