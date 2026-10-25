export interface CityDestination {
  id: string;
  name: string;
  country: string;
  avgRent: string;
  badge?: string;
  image: string;
  href: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  tag: string;
  tagColor: "red" | "green" | "purple" | "amber" | "blue" | "pink";
  stepText: string;
  bullets?: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  badgeStyle?: "popular" | "service" | "free";
  priceStudent: number;
  priceGroup: number;
  periodText: string;
  description: string;
  features: { text: string; highlight?: boolean }[];
  ctaText: string;
  ctaStyle: "default" | "primary" | "dark";
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SafetyFeature {
  id: string;
  title: string;
  categoryTag: string;
  image: string;
  description: string;
  metaPill: string;
  iconName?: string;
}

export interface NeighborhoodSafety {
  id: string;
  name: string;
  score: string;
  statusBadge: string;
  image: string;
  nightWalkability: string;
  streetLighting: string;
  description: string;
  commuteTime: string;
}

export interface HotlineItem {
  id: string;
  number: string;
  title: string;
  description: string;
  agency: string;
}

export interface DailyTimelineItem {
  id: string;
  time: string;
  title: string;
  categoryTag: string;
  image: string;
  description: string;
}

export interface DailyLifeTip {
  id: string;
  title: string;
  category: "all" | "transit" | "markets" | "study" | "sim";
  tag: string;
  image: string;
  description: string;
  tips: string[];
}

// -------------------------------------------------------------
// DATA REPOSITORIES
// -------------------------------------------------------------

export const CITIES_DATA: CityDestination[] = [
  {
    id: "florence",
    name: "Florence",
    country: "Italy",
    avgRent: "€680 - €1,200",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
    href: "/safety",
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    avgRent: "€700 - €1,250",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    avgRent: "€850 - €1,500",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    avgRent: "€650 - €1,200",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: "madrid",
    name: "Madrid",
    country: "Spain",
    avgRent: "€600 - €1,100",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    avgRent: "€550 - €1,000",
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
];

export const HOW_IT_WORKS_STEPS_HOME: StepItem[] = [
  {
    number: "01",
    title: "Group & Pooled Budget",
    description: "Add 2-5 roommates. Each person sets their uncompromised budget without awkward money conversations.",
    tag: "Group Planning",
    tagColor: "red",
    stepText: "Step 1 of 4",
  },
  {
    number: "02",
    title: "Campus & Commute",
    description: "Pin your study center (FSU Abroad, NYU, Syracuse). Set your walking or tram limit so you never miss class.",
    tag: "Commute",
    tagColor: "green",
    stepText: "Step 2 of 4",
  },
  {
    number: "03",
    title: "Verified 3-5 Bed Flats",
    description: "Explore vetted apartments for your pooled neighborhood flat (Santa Croce and Santo Spirito with zero scams).",
    tag: "Verified Flats",
    tagColor: "purple",
    stepText: "Step 3 of 4",
  },
  {
    number: "04",
    title: "Alpha Check™ AI Audit",
    description: "Inspect Italian lease conditions in seconds, transparent move-in costs, and immediate Parent Portal sign-off.",
    tag: "AI Audit",
    tagColor: "pink",
    stepText: "Step 4 of 4",
  },
];

export const HOW_IT_WORKS_FULL_STEPS: StepItem[] = [
  {
    number: "01",
    title: "Create Your Housing Group",
    description: "Add 2 to 5 study abroad friends. Each roommate sets their individual monthly budget without awkward money conversations. Our algorithm calculates combined purchasing power automatically.",
    tag: "Group Planning",
    tagColor: "red",
    stepText: "Phase 1",
    bullets: [
      "Individual budget sliders",
      "Roommate preference blending",
      "Automatic cost splitting",
    ],
  },
  {
    number: "02",
    title: "Set University Program & Commute",
    description: "Pin your study abroad center (e.g. FSU Abroad Florence, NYU, Syracuse). Set your maximum daily walking or transit limit (e.g. 20 minutes) to ensure you never miss class.",
    tag: "Commute Intelligence",
    tagColor: "green",
    stepText: "Phase 2",
    bullets: [
      "Verified university center pins",
      "Walking & transit limit timers",
      "Public transit line integration",
    ],
  },
  {
    number: "03",
    title: "Compare Vetted Neighborhoods",
    description: "Explore neighborhood safety ratings, average rent ranges, local student density, and walkability scores. Discover whether Santa Croce, Santo Spirito, or Campo di Marte suits your lifestyle.",
    tag: "City Intelligence",
    tagColor: "amber",
    stepText: "Phase 3",
    bullets: [
      "Local safety indexes",
      "Real-time price comparisons",
      "Student vibe ratings",
    ],
  },
  {
    number: "04",
    title: "Browse Verified 3-5 Bedroom Flats",
    description: "Access verified apartment listings from trusted local Italian agencies and certified partners (Spotahome, HousingAnywhere, Florence Estates). Furnished sizes, and elevator access.",
    tag: "Trusted Listings",
    tagColor: "purple",
    stepText: "Phase 4",
    bullets: [
      "100% vetted landlords",
      "High-res interior photo galleries",
      "Real availability check",
    ],
  },
  {
    number: "05",
    title: "Run 'Alpha Check' AI Lease Audit",
    description: "Our proprietary AI scans each Italian rental agreement for Italian rental regulations (Contratto Transitorio), calculates total proration required before move-in, and highlights ambiguous utility or deposit clauses.",
    tag: "AI Compliance",
    tagColor: "blue",
    stepText: "Phase 5",
    bullets: [
      "Full move-in cost projection",
      "Hidden fee detection",
      "Deposit return protocol verification",
    ],
  },
  {
    number: "06",
    title: "Parent Portal & Peace of Mind",
    description: "Keep parents informed with real-time oversight. Parents can inspect property safety ratings, review vetted contract details, and sign off without micromanaging your study abroad experience.",
    tag: "Family Visibility",
    tagColor: "pink",
    stepText: "Phase 6",
    bullets: [
      "Zero wire-scam protection",
      "University emergency liaison",
      "One-click parent approvals",
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free Starter",
    badge: "BASIC",
    badgeStyle: "free",
    priceStudent: 0,
    priceGroup: 0,
    periodText: "Free forever",
    description: "Ideal for roommates exploring study abroad destinations and setting budgets.",
    features: [
      { text: "Group budget pooling calculator" },
      { text: "University commute & transit maps" },
      { text: "Neighborhood safety & student vibe guides" },
      { text: "Browse verified partner listings" },
    ],
    ctaText: "Start for Free",
    ctaStyle: "default",
  },
  {
    id: "group-pass",
    name: "Alpha Group Pass",
    badge: "RECOMMENDED",
    badgeStyle: "popular",
    priceStudent: 19,
    priceGroup: 76,
    periodText: "student / one-time",
    description: "Complete peace of mind for roommates and parents securing your overseas flat.",
    features: [
      { text: "Everything in Free Starter" },
      { text: "Alpha Check™ AI Lease Audit (Contract & Translations)", highlight: true },
      { text: "Parent Portal read-only live safety & booking review", highlight: true },
      { text: "Anti-scam verification & deposit escrow protection" },
      { text: "Dedicated priority student communication channel" },
    ],
    ctaText: "Choose Group Pass →",
    ctaStyle: "primary",
  },
  {
    id: "white-glove",
    name: "White-Glove",
    badge: "FULL SERVICE",
    badgeStyle: "service",
    priceStudent: 99,
    priceGroup: 396,
    periodText: "student / one-time",
    description: "Dedicated in-person service in Italy for families wanting hands-on guidance.",
    features: [
      { text: "Everything in Alpha Group Pass" },
      { text: "Personal bilingual Italian housing concierge" },
      { text: "In-person move-in walk-through & key inspection" },
      { text: "Codice Fiscale & Italian utilities registration help" },
      { text: "24/7 on-street emergency support liaison" },
    ],
    ctaText: "Select White-Glove",
    ctaStyle: "dark",
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: "scams",
    question: "How does AlphaAbroad protect students from Italian rental scams?",
    answer:
      "All listings on AlphaAbroad are cross-referenced with official Italian business registers (Camera di Commercio) and accredited local rental agencies. We never allow direct, unverified wire transfers. Deposits and first month payments are held in secure escrow protection until you check into your verified property in Italy.",
  },
  {
    id: "budgets",
    question: "Can roommates have different monthly budgets in the same group?",
    answer:
      "Yes, absolutely! Each student inputs their individual budget slider (e.g. €600, €850, €1,100). Our algorithm calculates the combined group budget and matches you with 3-5 bedroom flats that fit everyone's exact portion.",
  },
  {
    id: "contratto",
    question: "What is an Italian 'Contratto Transitorio per Studenti'?",
    answer:
      "A Contratto Transitorio per Studenti is an official, legally regulated tenancy agreement recognized under Italian law (Legge 431/98) specifically designed for university students. It guarantees rent control parameters, official registration with the Agenzia delle Entrate, and protects tenants from arbitrary eviction or illegal hidden charges.",
  },
  {
    id: "parent-portal",
    question: "How does the Parent Portal work for our families?",
    answer:
      "Parents receive a private read-only dashboard link. They can review safety ratings of the neighborhood, verify the lease audit checklist, inspect street-level lighting, and confirm emergency liaison contacts without having to manage group chats.",
  },
  {
    id: "utilities",
    question: "Are utility bills (gas, electricity, Wi-Fi) included in the listed rent?",
    answer:
      "In Italy, utilities are often labeled as 'spese condominiali' (building maintenance) and 'utenze' (electricity, gas, water, internet). Alpha Check™ audits every listing to clearly mark whether utilities are all-inclusive or estimated as a monthly flat fee, preventing sudden surprise end-of-semester bills.",
  },
];

export const FLORENCE_SAFETY_FEATURES: SafetyFeature[] = [
  {
    id: "pedestrian",
    title: "Pedestrianised & Well-Lit Evening Routes",
    categoryTag: "Night Safety",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
    description: "Historic central Florence is restricted to vehicle traffic (ZTL zone). Broad piazzas and pedestrian thoroughfares are brightly lit with warm municipal lanterns and active outdoor cafe seating.",
    metaPill: "ZTL Pedestrian Zone - Constant Foot Traffic",
  },
  {
    id: "double-locks",
    title: "Double Security Locks & Keypad Access",
    categoryTag: "Apartment Security",
    image: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80",
    description: "Every AlphaAbroad verified building features heavy double-deadbolt security cylinder locks, certified electrical DiCo certificates, and safe building intercom entryways.",
    metaPill: "Double Cylinder Deadbolts - Keyram Scam",
  },
  {
    id: "healthcare",
    title: "Proximity to 24/7 English Emergency Care",
    categoryTag: "Healthcare Access",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    description: "Pronto Soccorso Santa Maria Nuova Hospital is located right in central Florence, with English-speaking triage nurses and 24/7 emergency medical staff just minutes from student housing.",
    metaPill: "Pronto Soccorso Santa Maria Nuova - 7 Min Walk",
  },
  {
    id: "university-liaison",
    title: "Dedicated University Liaison & Support",
    categoryTag: "On-Call Coordinators",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    description: "Students and parents have direct access to our verified local Italian team and university housing coordinators during maintenance emergencies, lockouts, and landlord questions.",
    metaPill: "English-Speaking Local Reps - 24/7 Dispatch",
  },
];

export const NEIGHBORHOOD_SAFETY_SCORES: NeighborhoodSafety[] = [
  {
    id: "santa-croce",
    name: "Santa Croce",
    score: "9.3/10",
    statusBadge: "Verified Student Core",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
    nightWalkability: "High visibility, busy until 1:00 AM",
    streetLighting: "Well lit pedestrian piazzas",
    description: "Lively student hub, high foot traffic even late into the evening. Deep app support for student cafes.",
    commuteTime: "12 min walk to campus",
  },
  {
    id: "san-frediano",
    name: "San Frediano",
    score: "9.2/10",
    statusBadge: "Top Safety Pick",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    nightWalkability: "Peaceful, residential florentine streets",
    streetLighting: "Calm, well-maintained lantern lamps",
    description: "Older, ultra-safe neighborhood across the Arno with an authentic local food scene and friendly neighbors.",
    commuteTime: "18 min walk to campus",
  },
  {
    id: "campo-di-marte",
    name: "Campo di Marte",
    score: "8.8/10",
    statusBadge: "Family & Student Sub",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    nightWalkability: "Quiet, wide residential avenues",
    streetLighting: "Modern bright municipal streetlights",
    description: "Extremely peaceful residential district outside the tourist core with tree-lined streets and parks.",
    commuteTime: "22 min tram to campus",
  },
  {
    id: "duomo",
    name: "Duomo / Historic Center",
    score: "8.9/10",
    statusBadge: "High Access Florence",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=800&q=80",
    nightWalkability: "Heavy pedestrian traffic & constant police patrols",
    streetLighting: "Very bright around major landmarks",
    description: "Right in the heart of the city. Cap-conscious on the weekend after 1 AM.",
    commuteTime: "9 min walk to campus",
  },
  {
    id: "santo-spirito",
    name: "Santo Spirito / Oltrarno",
    score: "8.7/10",
    statusBadge: "Popular Student Hub",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    nightWalkability: "Bustling evening piazza atmosphere",
    streetLighting: "Charming warm historic street lamps",
    description: "Artisan-dominated area. Lively in evening, quiet in morning. Great local dining and markets.",
    commuteTime: "15 min walk to campus",
  },
];

export const EMERGENCY_HOTLINES: HotlineItem[] = [
  {
    id: "112",
    number: "112",
    title: "Pan-European Emergency",
    description: "English/Italian emergency police, medical, or fire dispatch service.",
    agency: "Standard Emergency",
  },
  {
    id: "118",
    number: "118",
    title: "Medical & Ambulance",
    description: "Direct medical emergency dispatch, Servizio Sanita Nazionale.",
    agency: "Italian Ambulance",
  },
  {
    id: "113",
    number: "113",
    title: "Local Police (Polizia / Carabinieri)",
    description: "Questura di Firenze - Central Police Station ZTL & District.",
    agency: "National Police",
  },
  {
    id: "misericordia",
    number: "+39 055 266 951",
    title: "Misericordia General Florence",
    description: "24/7 historic ambulance dispatcher & clinic in central Florence.",
    agency: "Florence Medical Care",
  },
];

export const SCAM_PROOF_GUARANTEES = [
  {
    id: "escrow",
    title: "Zero Direct Wire Transfers to Private Bank Accounts",
    tag: "Escrow Protected",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80",
    description: "Never send money via Western Union, MoneyGram or personal IBAN accounts without escrow. AlphaAbroad releases your first deposit to the landlord only after check-in.",
    badgeText: "Protected on all flats",
  },
  {
    id: "codice",
    title: "Mandatory Codice Fiscale & Lease Registration",
    tag: "Tax Compliant",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    description: "Legitimate Italian leases (Contratto Transitorio) require both tenant and landlord Codice Fiscale. We guide you through registration so you can obtain your legal permesso di soggiorno.",
    badgeText: "Protected on all flats",
  },
  {
    id: "agenzia",
    title: "Agenzia delle Entrate Official Lease Registration",
    tag: "National Law #431",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    description: "Under Italian law (Law 431/98), residential contracts over 30 days must be registered with the Italian Revenue Agency within 30 days of signing.",
    badgeText: "Protected on all flats",
  },
  {
    id: "inventory",
    title: "Photographic Inventory & Pre-Move Check",
    tag: "Deposit Shield",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    description: "Always conduct a photographic inventory of appliance conditions and pre-existing wall marks to protect your full security deposit when move-out day comes.",
    badgeText: "Protected on all flats",
  },
];

export const DAILY_TIMELINE: DailyTimelineItem[] = [
  {
    id: "morning",
    time: "08:30 AM",
    title: "Morning Espresso & Cornetto",
    categoryTag: "Morning Ritual",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    description: "Step down to the local corner bar from your apartment. Enjoy a freshly pulled espresso and warm pistachio cornetto while greeting the local barista.",
  },
  {
    id: "commute",
    time: "10:15 AM",
    title: "Walking to Class through Piazzas",
    categoryTag: "Campus Commute",
    image: "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80",
    description: "A scenic 12-15 min stroll from Santa Croce past the Bargello and Piazza della Signoria to your U.S. study campus building.",
  },
  {
    id: "lunch",
    time: "01:15 PM",
    title: "Lunch at Sant'Ambrogio Market",
    categoryTag: "Lunch & Fresh Market",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    description: "Grab a warm panino or fresh bowl of schiacciata panini at da Rocco. Pick up fresh tomatoes, basil, and cheese for tonight's group dinner.",
  },
  {
    id: "study",
    time: "04:00 PM",
    title: "Rooftop Study at Oblate Library",
    categoryTag: "Study Session",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
    description: "Work on your Renaissance Art history papers on the open-air cloister rooftop café with an uninterrupted close-up panorama of the Duomo.",
  },
  {
    id: "sunset",
    time: "07:30 PM",
    title: "Sunset by the Arno River & Aperitivo",
    categoryTag: "Social & Aperitivo",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    description: "Watch the golden sun dip over the Ponte Vecchio from the riverbank in Santo Spirito while planning your upcoming weekend trip to Cinque Terre or Rome.",
  },
];

export const DAILY_LIFE_TIPS: DailyLifeTip[] = [
  {
    id: "transit",
    title: "Florentine Public Transit (Autolinee Toscane)",
    category: "transit",
    tag: "€1.70 / 90-min • T1/T2 Tram",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    description: "Florence is compact and walkable, but electric buses and sleek air-conditioned light rail lines (T1 and T2) connecting Peretola Airport to Santa Maria Novella station are fast and reliable.",
    tips: [
      "Single bus/tram tickets cost €1.70 and are valid for 90 minutes. Must validate on boarding.",
      "Buy tickets inside the 'At bus' app or contactless card tap on the onboard validator.",
      "Tram line T2 connects Santa Maria Novella train station directly to Florence Peretola Airport (FLR).",
    ],
  },
  {
    id: "biking",
    title: "Bike Sharing with RideMovi along the Arno",
    category: "transit",
    tag: "€0.25/min Electric Bikes",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80",
    description: "Dockless electric and pedal bikes are parked all across Florence. Ideal for riding along the Arno river cycle paths and arriving from Santa Croce to Oltrarno in under 10 minutes.",
    tips: [
      "Monthly student passes are around €12/month for unlimited 30-minute rides.",
      "Ride in marked bike lanes and never in crowded pedestrian zones during high peak hours.",
      "Park in designated spoked parking bays to avoid an automatic €5 unparked fine.",
    ],
  },
  {
    id: "markets",
    title: "Fresh Historic Markets vs. Supermarkets",
    category: "markets",
    tag: "Mercato Sant'Ambrogio / Conad",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    description: "Where you shop dictates your monthly food budget and health. Traditional open markets offer prime local produce without middleman markups, with staff who love to chat and help you practice Italian.",
    tips: [
      "Mercato di Sant'Ambrogio: The true local hub for vegetables, cheeses, porchetta, and fresh bread.",
      "Supermarkets: Conad City & Pam Local are inside the historic center; Esselunga (cheaper) is right on the tram line outside the center.",
      "Remember: Italian supermarket checkout bags cost 10c each. Bring your reusable tote bags!",
    ],
  },
  {
    id: "study-spots",
    title: "Best Study Cafés & Rooftop Views",
    category: "study",
    tag: "Public Views • Free High-Speed Wi-Fi",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Italian bars are standing-room espresso spots. For laptop study hours, head to historic public libraries and specialty cafes with fast internet and charging ports.",
    tips: [
      "Biblioteca delle Oblate: Public library with a breezy third-floor patio looking straight onto the Duomo dome.",
      "Ditta Artigianale: Specialty coffee roasting hubs with reliable Wi-Fi, avocado toast, and workspace.",
      "Le Murate Caffè Letterario: Reformed Renaissance convent courtyard with shaded tables and quiet afternoons.",
    ],
  },
  {
    id: "sim-cards",
    title: "Italian SIM Cards & 5G Roaming",
    category: "sim",
    tag: "€7.99/mo for 150GB 5G",
    image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
    description: "Avoid hefty $10/day US carrier roaming rates by picking up a cheap Italian SIM card (Iliad or Fastweb) within your first 48 hours of landing in Italy.",
    tips: [
      "Cost: €7.99 to €9.99/month for 150GB to 200GB 5G data plus unlimited European call/text.",
      "Self-kiosk setup near Santa Maria Novella train station with your passport in 5 minutes.",
      "Works seamlessly across Europe (Spain, France, Germany) for weekend travel with zero roaming charges.",
    ],
  },
  {
    id: "recycling",
    title: "Garbage Recycling (Raccolta Differenziata)",
    category: "markets",
    tag: "Chiavetta Smart Key • Clear Sorting",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    description: "Florence is proud of its green waste initiatives. Modern underground municipal dumpsters require an electronic digital card key ('chiavetta') to open.",
    tips: [
      "Your landlord provides the electronic digital key chiavetta for your street's smart dumpsters.",
      "Strict sorting: Organic (brown), Paper & cardboard (blue), Packaging & plastics (yellow), Non-recyclable (gray).",
      "Always break down cardboard boxes from package delivery before disposal.",
    ],
  },
];
