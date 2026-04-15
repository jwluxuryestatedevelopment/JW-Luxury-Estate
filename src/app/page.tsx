import Image from "next/image";
import {
  propertyShowcase,
  propertyShowcaseUsesRemoteMedia,
} from "./data/property-showcase";
import { siteImageUrls } from "./data/site-images";
import BrandLockup from "./components/brand-lockup";
import ContactForm from "./components/contact-form";
import PropertyImageCarousel from "./components/property-image-carousel";
import Reveal from "./components/reveal";
import SiteHeader from "./components/site-header";

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

const comparisonRows = [
  {
    feature: "More space, comfort, and privacy",
    jw: "A complete living environment designed for long stays",
    longTerm: "Hotels usually offer less space and daily-living comfort",
    shortTerm: "Shared homes can feel crowded or inconsistent",
  },
  {
    feature: "Full kitchens and shared living areas",
    jw: "Included as part of a move-in ready stay",
    longTerm: "Hotels rarely provide the same day-to-day setup",
    shortTerm: "Depends on the home and shared-house arrangement",
  },
  {
    feature: "Better suited for long stays",
    jw: "30+ day stays built around project timelines and flexibility",
    longTerm: "Hotels can become expensive and repetitive over time",
    shortTerm: "Traditional rentals can be rigid or unstable for changing projects",
  },
  {
    feature: "No unknown roommates",
    jw: "Team-oriented living built around the same company or project",
    longTerm: "Hotels are private, but not designed for team-based living",
    shortTerm: "Shared houses often place you with people you do not know",
  },
  {
    feature: "No complicated lease structures",
    jw: "Flexible payment terms and straightforward housing coordination",
    longTerm: "Hotels are simple, but not built for workforce housing at scale",
    shortTerm: "Traditional rentals often come with lease complexity and house rules",
  },
  {
    feature: "No penalties or rigid commitments",
    jw: "Extend or wrap up housing as project needs change",
    longTerm: "Hotels are flexible, but inefficient for long workforce stays",
    shortTerm: "Traditional rentals can create penalties and rigid commitments",
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

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <SiteHeader navigation={navigation} />

      <section className="w-full">
        <div className="grid w-full overflow-hidden lg:grid-cols-[minmax(420px,0.45fr)_minmax(0,0.55fr)]">
          <div className="flex min-h-[470px] flex-col justify-center bg-dark px-6 py-12 text-white sm:min-h-[520px] sm:px-12 sm:py-16 lg:min-h-[calc(100vh-82px)] lg:px-[4.75rem] lg:py-20">
            <div className="reveal-up max-w-[31rem] space-y-8">
              <p className="text-[10px] uppercase tracking-[0.42em] text-accent">
                Smart, Flexible Living
              </p>
              <div className="space-y-6">
                <h1 className="max-w-[26rem] font-display text-[3.25rem] leading-[0.86] tracking-[-0.05em] sm:text-[5rem] lg:text-[5.45rem]">
                  Smart, Flexible Living for Professionals & Companies
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

          <div className="hero-media-shell relative min-h-[320px] bg-[#7eb2d5] sm:min-h-[500px] lg:min-h-[calc(100vh-82px)]">
            <Image
              src={siteImageUrls.hero.featuredProperty}
              alt="JW Luxury Estate luxury residence"
              fill
              priority
              className="hero-media-image object-cover object-center"
              sizes="(min-width: 1024px) 55vw, 100vw"
              unoptimized
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
                "metric-panel group flex min-h-[168px] flex-col justify-center gap-3 px-12 py-9 sm:px-14",
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
                  "font-display text-[2.2rem] leading-none tracking-[-0.045em] transition-colors duration-200 group-hover:text-accent sm:text-[2.5rem]",
                  "text-foreground",
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

      <section className="w-full px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div
          id="about"
          className="grid items-start gap-12 lg:grid-cols-[minmax(280px,0.32fr)_minmax(0,0.68fr)] lg:gap-16"
        >
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
                Flexible Living Designed for Professionals and Companies
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
                Flexible Terms
              </p>
              <h2 className="max-w-[14rem] font-display text-[2.95rem] leading-[0.94] tracking-[-0.04em] text-foreground sm:max-w-[16rem] sm:text-[4rem]">
                Minimum 30-Day Stays - Total Flexibility
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

      <section className="bg-background">
        <div className="w-full px-6 pb-[3.25rem] pt-[5rem] sm:px-10 lg:px-16 lg:pb-[4.1rem] lg:pt-[6rem]">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-accent">
              Stay Advantages
            </p>
            <h2 className="mt-4 font-display text-[3rem] leading-[0.95] tracking-[-0.04em] text-foreground sm:text-[4.4rem]">
              Designed Around Real-World Work Stays
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[1rem] leading-8 text-muted">
              Every property is selected and operated to give professionals and
              companies a more organized, secure, and comfortable way to live
              while work keeps moving.
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
        id="properties"
        className="border-y border-border-subtle bg-surface-strong"
      >
        <div className="w-full px-6 py-[4.2rem] sm:px-10 lg:px-16 lg:py-[5rem]">
          <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(0,0.32fr)] lg:items-end">
            <div className="max-w-[40rem] space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Our Properties
              </p>
              <h2 className="font-display text-[2.95rem] leading-[0.92] tracking-[-0.045em] text-foreground sm:text-[3.45rem]">
                The Homes, Rooms, and Shared Spaces We Manage
              </h2>
            </div>
            <div className="space-y-3 lg:justify-self-end lg:text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/42">
                Selective Preview
              </p>
              <p className="max-w-[26rem] text-[0.96rem] leading-8 text-muted">
                A concise look at the type of properties we prepare for
                long-stay professionals, crews, and company teams.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-border-subtle bg-border-subtle lg:grid-cols-3">
            {propertyShowcase.map((property, index) => (
              <Reveal
                as="article"
                key={property.title}
                delay={index * 60}
                className="premium-surface group bg-surface"
              >
                <PropertyImageCarousel
                  label={property.title}
                  slides={property.slides}
                  sizes="(min-width: 1280px) 29vw, (min-width: 1024px) 31vw, 100vw"
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

      <section className="border-y border-border-subtle bg-surface">
        <Reveal className="px-8 py-8 sm:px-10 lg:px-16 lg:py-10">
          <p className="mx-auto max-w-4xl text-center font-display text-[2rem] leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[2.35rem]">
            Secure, flexible, and team-oriented living for professionals and companies.
          </p>
        </Reveal>
      </section>

      <section className="bg-background">
        <div className="w-full px-6 py-[4rem] sm:px-8 lg:px-10 lg:py-[4.75rem]">
          <div
            id="nationwide"
            className="overflow-hidden border border-border-subtle bg-surface shadow-[0_20px_44px_rgba(17,12,9,0.04)]"
          >
            <div className="grid gap-px bg-border-subtle lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
              <Reveal
                as="article"
                className="premium-surface-dark bg-dark px-8 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14"
              >
                <div className="max-w-[26rem] space-y-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                    Nationwide Support
                  </p>
                  <h2 className="font-display text-[2.8rem] leading-[0.92] tracking-[-0.04em] text-white sm:text-[3.5rem]">
                    Nationwide Accommodations for Warehouses, Offices, and Operations Across the U.S.
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

              <div className="grid gap-px bg-border-subtle sm:grid-cols-2">
                {nationwideSupportCards.map((card, index) => (
                  <Reveal
                    as="article"
                    key={card.title}
                    delay={index * 50}
                    className="grid-panel min-h-[210px] bg-surface px-7 py-9 sm:px-8 sm:py-10"
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

      <section className="bg-surface-strong">
        <div className="w-full px-6 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-24 lg:pt-18">
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
              <div className="mt-10 grid gap-6 text-left md:grid-cols-2">
                {scaleGroups.map((group) => (
                  <div
                    key={group.eyebrow}
                    className="border border-border-subtle bg-surface px-6 py-6 shadow-[0_12px_28px_rgba(17,12,9,0.04)]"
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
          <Reveal delay={80} className="mx-auto mt-16 max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
              Comparison
            </p>
            <h3 className="mt-3 font-display text-[2.55rem] leading-[0.96] tracking-[-0.04em] text-foreground sm:text-[3rem]">
              Why Choose JW Luxury Estate Over Hotels or Traditional Rentals?
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
                      Hotels
                    </th>
                    <th className="px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/80">
                      Renting With Others
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
                        Hotels:{" "}
                      </span>
                      <span className="text-muted">{row.longTerm}</span>
                    </p>
                    <p>
                      <span className="font-semibold text-muted">
                        Renting With Others:{" "}
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

      <section className="bg-dark text-white">
        <div className="w-full border-b border-white/6 px-6 py-[4.8rem] sm:px-10 lg:px-16 lg:py-[5.8rem]">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:gap-12">
            <Reveal className="max-w-[22rem] space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-accent">
                Who We Serve
              </p>
              <h2 className="font-display text-[3rem] leading-[0.92] tracking-[-0.04em] text-white sm:text-[3.55rem]">
                Built for Individual Professionals and Company Teams.
              </h2>
              <p className="text-[1rem] leading-8 text-white/58">
                Whether you&apos;re relocating for work or managing an entire
                team, we provide a secure, comfortable, and turnkey housing
                experience tailored to your needs.
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

        <div
          id="contact"
          className="grid w-full items-start gap-12 px-6 py-[5rem] sm:px-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(420px,0.84fr)] lg:px-16 lg:py-[6.5rem]"
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
            How It Works
          </p>
          <h2 className="mt-4 font-display text-[2.9rem] leading-[0.96] tracking-[-0.05em] text-foreground sm:text-[3.6rem]">
            From Move-In to Daily Operations
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
