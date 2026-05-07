import Image from "next/image";
import BrandLockup from "./components/brand-lockup";
import ContactForm from "./components/contact-form";
import FloatingWhatsappChat from "./components/floating-whatsapp-chat";
import HeroVisualCarousel from "./components/hero-visual-carousel";
import LuxuryScrollEffects from "./components/luxury-scroll-effects";
import PropertyImageCarousel from "./components/property-image-carousel";
import PropertyListingRails from "./components/property-listing-rails";
import Reveal from "./components/reveal";
import SiteHeader from "./components/site-header";
import { editorialImages } from "./data/editorial-images";
import { getHomepageContent } from "./data/homepage-content";

export const dynamic = "force-dynamic";

const navigation = [
  { label: "Properties", href: "#properties" },
  { label: "Listings", href: "#listings" },
  { label: "Comparison", href: "#comparison" },
  { label: "Standards", href: "#standards" },
  { label: "Nationwide", href: "#nationwide" },
  { label: "Proof", href: "#proof" },
  { label: "Contact", href: "#contact" },
];

const hotelComparisonRows = [
  {
    feature: "Space and privacy",
    jw: "A full living environment with private rooms, shared lounges, kitchens, laundry, parking, and room to keep a weekly routine.",
    hotel:
      "Usually limited to a room, hallway traffic, and less practical day-to-day living space.",
    rental:
      "Can be larger, but quality, house rules, and roommate expectations vary.",
  },
  {
    feature: "Team coordination",
    jw: "Designed so employees, supervisors, and project teams can stay in a known, coordinated housing setup.",
    hotel:
      "Works for individual nights, but does not create a shared living base for teams.",
    rental:
      "Often mixes unrelated occupants or requires a company to manage the household itself.",
  },
  {
    feature: "Long-stay fit",
    jw: "Built around 30+ day stays with flexible weekly or monthly payment options.",
    hotel:
      "Simple to book, but expensive and repetitive for extended workforce stays.",
    rental:
      "Can force rigid leases, deposits, penalties, and move-out friction.",
  },
  {
    feature: "Daily essentials",
    jw: "Furnished bedrooms, equipped kitchens, laundry, WiFi, parking, cleaning, and maintenance support are part of the stay.",
    hotel:
      "Often adds friction around cooking, laundry, parking, and longer routines.",
    rental:
      "Depends on the landlord, furnishing level, and who is responsible for upkeep.",
  },
  {
    feature: "Operational support",
    jw: "A managed housing partner that can support crews, relocations, and changing project timelines.",
    hotel:
      "Guest service exists, but it is not structured around workforce housing logistics.",
    rental:
      "The company usually absorbs coordination, access, cleaning, and maintenance work.",
  },
];

const stayStandards = [
  {
    title: "Private Rooms",
    copy: "Furnished bedrooms give every professional a consistent place to sleep, work, and reset.",
  },
  {
    title: "Team-Based Living",
    copy: "Homes are arranged for coworkers and project teams, not unknown roommate mixes.",
  },
  {
    title: "Smart Access",
    copy: "Smart locks and controlled access reduce key handoffs and keep arrivals organized.",
  },
  {
    title: "Managed Upkeep",
    copy: "Cleaning, maintenance, laundry access, and essential support keep the stay operational.",
  },
];

const horizontalAccordions = [
  {
    title: "For Companies",
    copy: "Centralized housing for multiple employees, consistent standards, and fewer moving parts for operations teams.",
    image: editorialImages.lounge,
  },
  {
    title: "For Project Crews",
    copy: "Flexible stays close to job sites, warehouses, offices, and temporary assignments across changing timelines.",
    image: editorialImages.dining,
  },
  {
    title: "For Professionals",
    copy: "A calmer setup than nightly lodging, with private rooms and real daily-living essentials.",
    image: editorialImages.room,
  },
];

const propertyEditorialFallbacks = [
  editorialImages.arrival,
  editorialImages.room,
  editorialImages.dining,
];

const processSteps = [
  {
    title: "Tell us the assignment",
    copy: "Share the team size, market, timing, and stay requirements.",
  },
  {
    title: "We match the housing",
    copy: "JW coordinates furnished homes, private rooms, access, and practical daily-living needs.",
  },
  {
    title: "Your team moves in",
    copy: "Professionals arrive to a managed environment built for stability and project rhythm.",
  },
];

const proofSegments = [
  {
    label: "Operations teams",
    title: "One housing partner instead of scattered bookings.",
    copy: "Centralize furnished stays, room mix, arrivals, and practical support so managers are not chasing nightly reservations.",
  },
  {
    label: "Project crews",
    title: "A stable base close to the work.",
    copy: "Support crews with kitchens, laundry, private rooms, parking, and a setup that can flex with assignment timing.",
  },
  {
    label: "Relocation leaders",
    title: "A calmer landing period for professionals.",
    copy: "Give relocating employees a premium temporary home while they settle into a new market or assignment.",
  },
];

const proofHeadingStats = [
  {
    value: "30+",
    label: "day stays",
  },
  {
    value: "6",
    label: "fit checks",
  },
  {
    value: "1",
    label: "housing partner",
  },
];

const proofHeadingSignals = [
  "Room mix",
  "Arrival plan",
  "Access needs",
  "Payment cadence",
];

const proofChecklist = [
  "Team size and room mix",
  "Move-in date and stay length",
  "Commute radius and market needs",
  "Kitchen, laundry, parking, and access",
  "Cleaning and maintenance expectations",
  "Weekly or monthly payment cadence",
];

const contactAssurances = [
  {
    title: "Fit first",
    copy: "We confirm market, dates, headcount, and housing type before suggesting next steps.",
  },
  {
    title: "No vague handoff",
    copy: "Your request goes to the JW team with the operational details needed to evaluate the stay.",
  },
  {
    title: "Built for teams",
    copy: "The conversation starts around private rooms, daily routines, and the coordination burden hotels create.",
  },
];

const trustPoints = [
  "30+ day stays",
  "Weekly or monthly payments",
  "Private rooms",
  "Full kitchens",
  "Laundry included",
  "Smart access",
  "Cleaning support",
  "Nationwide coordination",
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 fill-none stroke-current stroke-[1.4]"
    >
      <path d="M6 14 14 6" />
      <path d="M8 6h6v6" />
    </svg>
  );
}

function CTAButton({
  children,
  href,
  tone = "primary",
}: {
  children: React.ReactNode;
  href: string;
  tone?: "primary" | "secondary";
}) {
  return (
    <a
      href={href}
      className={[
        "lux-cta group",
        tone === "primary" ? "lux-cta-primary" : "lux-cta-secondary",
      ].join(" ")}
    >
      <span>{children}</span>
      <span className="lux-cta-icon">
        <ArrowIcon />
      </span>
    </a>
  );
}

export default async function Home() {
  const {
    heroSlides,
    propertyListings,
    propertyShowcase,
    propertyShowcaseUsesRemoteMedia,
  } = await getHomepageContent();

  return (
    <main className="luxury-page w-full max-w-full overflow-x-hidden bg-[#050403] text-[#f7efe2]">
      <LuxuryScrollEffects />
      <SiteHeader navigation={navigation} />

      <section className="lux-hero" aria-labelledby="hero-heading">
        <div className="lux-hero-wash" />
        <div className="lux-shell lux-hero-grid">
          <Reveal className="lux-hero-copy">
            <div className="lux-hero-intro">
              <p className="lux-eyebrow">Corporate stays with hotel-level polish</p>
              <h1 id="hero-heading" className="lux-hero-title">
                Premium team housing that feels sharper than a hotel.
              </h1>
            </div>
            <div className="lux-hero-support">
              <p className="lux-hero-lede">
                JW Luxury Estate creates fully managed, furnished living
                environments for companies, project teams, and professionals who
                need more space, privacy, and operational support than a hotel can
                provide.
              </p>
              <div className="lux-hero-actions">
                <CTAButton href="#contact">Talk to Our Team</CTAButton>
                <CTAButton href="#properties" tone="secondary">
                  Explore Properties
                </CTAButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lux-hero-visual-reveal lux-reveal-media">
            <HeroVisualCarousel slides={heroSlides} />
          </Reveal>
        </div>
      </section>

      <section id="properties" className="lux-section lux-properties">
        <div className="lux-shell">
          <Reveal className="lux-section-heading lux-section-heading-wide lux-property-heading">
            <div className="lux-property-heading-left">
              <p className="lux-eyebrow">Curated property showcase</p>
              <div className="lux-property-brief">
                <div className="lux-property-brief-media">
                  <Image
                    src={editorialImages.lounge.src}
                    alt={editorialImages.lounge.alt}
                    fill
                    sizes="(min-width: 1024px) 18vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <span>Move-in ready standard</span>
                  <p>
                    Private rooms, shared lounges, kitchens, laundry, access,
                    and support arranged around longer professional stays.
                  </p>
                </div>
              </div>
            </div>
            <div className="lux-property-heading-copy">
              <h2>
                The homes, rooms, and lounges your team can actually live in.
              </h2>
              <p>
                A concise look at the property standard JW Luxury Estate
                prepares for long-stay professionals, crews, and company teams.
              </p>
              <div className="lux-property-heading-tags">
                <span>Team-ready homes</span>
                <span>Private rooms</span>
                <span>Full kitchens</span>
              </div>
            </div>
          </Reveal>

          <div className="lux-property-grid">
            {propertyShowcase.map((property, index) => {
              const usesDummyMedia =
                propertyShowcaseUsesRemoteMedia &&
                property.slides.every((slide) =>
                  slide.src.includes("example.supabase.co"),
                );
              const displaySlides = usesDummyMedia
                ? [propertyEditorialFallbacks[index % propertyEditorialFallbacks.length]]
                : property.slides;
              const firstSlide = displaySlides[0];

              return (
                <Reveal
                  as="article"
                  key={property.title}
                  delay={index * 70}
                  className={[
                    "lux-property-card lux-stack-card group",
                    index === 0 ? "lux-property-card-feature" : "",
                  ].join(" ")}
                >
                  <div className="lux-property-media">
                    {displaySlides.length > 0 ? (
                      <PropertyImageCarousel
                        label={property.title}
                        slides={displaySlides}
                        sizes="(min-width: 1280px) 35vw, (min-width: 768px) 48vw, 100vw"
                        intervalMs={4400 + index * 280}
                        unoptimized={
                          propertyShowcaseUsesRemoteMedia && !usesDummyMedia
                        }
                      />
                    ) : (
                      <Image
                        src={editorialImages.room.src}
                        alt={firstSlide?.alt ?? property.title}
                        fill
                        sizes="(min-width: 1280px) 35vw, 100vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="lux-property-body">
                    <p className="lux-card-kicker">{property.eyebrow}</p>
                    <h3>{property.title}</h3>
                    <p>{property.description}</p>
                    <div className="lux-chip-row">
                      {property.highlights.map((point) => (
                        <span key={point}>{point}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <PropertyListingRails collections={propertyListings} />

      <section
        id="comparison"
        className="lux-section lux-comparison"
        aria-labelledby="comparison-heading"
      >
        <div className="lux-shell lux-comparison-grid">
          <Reveal className="lux-comparison-pin">
            <p className="lux-eyebrow">Why JW over hotels</p>
            <h2 id="comparison-heading">
              More room to live, fewer details for your team to manage.
            </h2>
            <p>
              Hotels are useful for short trips. JW Luxury Estate is built for
              professionals staying long enough to need a real routine, a real
              kitchen, and a managed housing partner.
            </p>
            <div className="lux-comparison-evidence">
              <div className="lux-savings-card">
                <span>$125-$225</span>
                <p>Estimated weekly savings versus a hotel stay.</p>
              </div>
              <div className="lux-arrival-card lux-reveal-media">
                <Image
                  src={editorialImages.arrival.src}
                  alt={editorialImages.arrival.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 100vw"
                  className="object-cover"
                />
                <p>Hotel-level arrival, private-residence control.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lux-table-shell lux-stack-card">
            <div className="lux-table-header">
              <p>Decision guide</p>
              <span>JW Luxury Estate vs. hotels and conventional rentals</span>
            </div>

            <div className="lux-table-desktop">
              <table className="lux-hotel-table">
                <thead>
                  <tr>
                    <th scope="col">Decision point</th>
                    <th scope="col">JW Luxury Estate</th>
                    <th scope="col">Hotel</th>
                    <th scope="col">Conventional rental</th>
                  </tr>
                </thead>
                <tbody>
                  {hotelComparisonRows.map((row) => (
                    <tr key={row.feature}>
                      <th scope="row">{row.feature}</th>
                      <td>{row.jw}</td>
                      <td>{row.hotel}</td>
                      <td>{row.rental}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lux-table-mobile">
              {hotelComparisonRows.map((row) => (
                <article key={row.feature}>
                  <h3>{row.feature}</h3>
                  <p>
                    <span>JW Luxury Estate</span>
                    {row.jw}
                  </p>
                  <p>
                    <span>Hotel</span>
                    {row.hotel}
                  </p>
                  <p>
                    <span>Conventional rental</span>
                    {row.rental}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="standards" className="lux-section lux-standards">
        <div className="lux-shell">
          <Reveal className="lux-section-heading">
            <p className="lux-eyebrow">Stay standards</p>
            <h2>
              A housing experience shaped around the{" "}
              <span className="lux-title-accent">workweek</span>, not the
              nightly room.
            </h2>
          </Reveal>

          <div className="lux-standard-grid">
            {stayStandards.map((standard) => (
              <Reveal
                as="article"
                key={standard.title}
                className="lux-standard-card lux-stack-card"
              >
                <h3>{standard.title}</h3>
                <p>{standard.copy}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="lux-accordion" aria-label="Audience fit">
            {horizontalAccordions.map((item) => (
              <article key={item.title} className="lux-accordion-panel group">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="nationwide" className="lux-section lux-nationwide">
        <div className="lux-shell lux-nationwide-grid">
          <Reveal className="lux-reveal-media lux-nationwide-media">
            <Image
              src={editorialImages.dining.src}
              alt={editorialImages.dining.alt}
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={100} className="lux-nationwide-copy">
            <p className="lux-eyebrow">Nationwide coordination</p>
            <h2>Housing support for warehouses, offices, and operations.</h2>
            <p>
              JW Luxury Estate supports accommodations across the United States
              for teams that need to stay close to the work without rebuilding
              housing logistics in every market.
            </p>
            <div className="lux-process">
              {processSteps.map((step) => (
                <article key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="proof"
        className="lux-section lux-proof"
        aria-labelledby="proof-heading"
      >
        <div className="lux-shell">
          <Reveal className="lux-section-heading lux-section-heading-wide lux-proof-heading">
            <div className="lux-proof-heading-left">
              <p className="lux-eyebrow">Operational proof</p>
              <p>
                Clear operating details help teams understand whether JW Luxury
                Estate can support the stay before they start a housing
                conversation.
              </p>
              <div className="lux-proof-scorecard" aria-label="Operational proof markers">
                {proofHeadingStats.map((stat) => (
                  <article key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </article>
                ))}
              </div>
            </div>
            <div className="lux-proof-heading-copy">
              <h2 id="proof-heading">
                Credibility for companies that cannot afford housing friction.
              </h2>
              <div className="lux-proof-heading-tags">
                {proofHeadingSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="lux-proof-grid">
            <Reveal className="lux-proof-media lux-reveal-media">
              <Image
                src={editorialImages.arrival.src}
                alt={editorialImages.arrival.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div>
                <span>Managed arrival</span>
                <strong>Hotel polish, private-home control, team-ready logistics.</strong>
              </div>
            </Reveal>

            <div className="lux-proof-content">
              <div className="lux-proof-segments">
                {proofSegments.map((segment, index) => (
                  <Reveal
                    as="article"
                    key={segment.label}
                    delay={index * 70}
                    className="lux-proof-segment lux-stack-card"
                  >
                    <p>{segment.label}</p>
                    <h3>{segment.title}</h3>
                    <span>{segment.copy}</span>
                  </Reveal>
                ))}
              </div>

              <Reveal className="lux-proof-checklist">
                <p>What JW confirms before recommending a stay</p>
                <div>
                  {proofChecklist.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="lux-proof-strip" aria-label="JW Luxury Estate stay details">
        <div className="lux-proof-track">
          {trustPoints.map((point, index) => (
            <span key={`${point}-${index}`}>{point}</span>
          ))}
        </div>
      </section>

      <section id="contact" className="lux-section lux-contact">
        <div className="lux-shell lux-contact-grid">
          <Reveal className="lux-contact-copy">
            <p className="lux-eyebrow">Talk to our team</p>
            <h2>Give your team a better base than a hotel room.</h2>
            <p>
              Tell us where your team is going, how long they need to stay, and
              what kind of housing standard you need. We will help map the right
              furnished stay solution.
            </p>
            <div className="lux-contact-metrics">
              <div>
                <span>30+</span>
                <p>day stay model</p>
              </div>
              <div>
                <span>U.S.</span>
                <p>market support</p>
              </div>
            </div>
            <div className="lux-contact-assurance">
              {contactAssurances.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="lux-form-shell">
            <div className="lux-form-heading">
              <h3>Start the housing conversation</h3>
              <p>
                For corporate clients, project teams, individual professionals,
                and property partners.
              </p>
            </div>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer className="lux-footer">
        <div className="lux-shell lux-footer-grid">
          <div>
            <BrandLockup variant="footer" href="#" />
            <p>
              Premium furnished housing for professionals and companies that
              need comfort, flexibility, and managed execution.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="lux-footer-contact">
            <a href="mailto:juanlondono@jwluxuryestate.com">
              juanlondono@jwluxuryestate.com
            </a>
            <a href="mailto:camilasolano@jwluxuryestate.com">
              camilasolano@jwluxuryestate.com
            </a>
            <a href="tel:+17708787224">Phone Number +1 (770) 878-7224</a>
            <span>Carrollton, GA</span>
          </div>
        </div>
        <div className="lux-shell lux-footer-bottom">
          <span>Copyright 2026 JW Luxury Estate. All rights reserved.</span>
          <span>Secure, flexible living for professionals and companies.</span>
        </div>
      </footer>
      <FloatingWhatsappChat />
    </main>
  );
}
