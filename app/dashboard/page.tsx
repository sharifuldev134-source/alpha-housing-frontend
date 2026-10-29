"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import ParentPortalView from "../components/ParentPortalView";
import DashboardPageLoading from "../components/DashboardPageLoading";
import UserProfileView from "../components/UserProfileView";
import {
  LayoutDashboard,
  MapPin,
  Map,
  Building2,
  GitCompare,
  TrendingUp,
  MessageSquare,
  FileText,
  ShieldCheck,
  Coffee,
  Eye,
  User,
  ArrowRight,
  ArrowLeft,
  Heart,
  Check,
  CheckCircle2,
  X,
  Compass,
  ShoppingBag,
  Sparkles,
  Clock,
  Calendar,
  Pencil,
  AlertCircle,
  Lock,
  BedDouble,
  Bath,
  Maximize2,
  Wifi,
  Send,
  RefreshCw,
  Layers,
  ChevronLeft,
  Download,
  Phone,
  Paperclip,
  Search,
  Plus,
  Utensils,
  Bus
} from "lucide-react";

const FlorenceSafetyMap = dynamic(
  () => import("../components/FlorenceSafetyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-80 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-slate-400 text-xs">
        Loading Florence map...
      </div>
    ),
  }
);

interface NeighborhoodItem {
  id: string;
  name: string;
  sub: string;
  commute: string;
  price: string;
  description: string;
  safety: string;
  walk: string;
  image: string;
  badge?: string;
  isSaved?: boolean;
  category: "all" | "nearest" | "students" | "space" | "quiet";
}

const NEIGHBORHOODS_LIST: NeighborhoodItem[] = [
  {
    id: "santa-croce",
    name: "Santa Croce",
    sub: "Quartiere di Santa Croce",
    commute: "12 min to program",
    price: "€3,800 – €5,500",
    description: "Vibrant, walkable, student area",
    safety: "Good",
    walk: "8 min walk",
    image: "/images/pisa_banner.jpg",
    badge: "Best Match",
    isSaved: true,
    category: "students",
  },
  {
    id: "santo-spirito",
    name: "Santo Spirito",
    sub: "Piazza Santo Spirito / Oltrarno",
    commute: "15 min to program",
    price: "€3,500 – €5,200",
    description: "Great local atmosphere",
    safety: "Good",
    walk: "14 min walk",
    image: "/images/cinque_terre_banner.jpg",
    category: "students",
  },
  {
    id: "san-frediano",
    name: "San Frediano",
    sub: "Borgo San Frediano",
    commute: "18 min to program",
    price: "€3,200 – €4,500",
    description: "Authentic, quieter",
    safety: "Excellent",
    walk: "16 min walk",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    category: "quiet",
  },
  {
    id: "campo-di-marte",
    name: "Campo di Marte",
    sub: "Quartiere 2 - Campo di Marte",
    commute: "20 min to program",
    price: "€2,800 – €4,200",
    description: "More space, good value",
    safety: "Excellent",
    walk: "20 min transit / cycle",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    category: "space",
  },
  {
    id: "duomo",
    name: "Duomo / Center",
    sub: "Centro Storico",
    commute: "10 min to program",
    price: "€4,500 – €6,000",
    description: "Central, convenient",
    safety: "Good",
    walk: "2 min walk",
    image: "https://images.unsplash.com/photo-1541370976299-4d24ebbc9077?auto=format&fit=crop&w=800&q=80",
    category: "nearest",
  },
  {
    id: "oltrarno",
    name: "Oltrarno",
    sub: "Rive Gauche Fiorentina",
    commute: "16 min to program",
    price: "€3,500 – €5,000",
    description: "Trendy and lively",
    safety: "Good",
    walk: "12 min walk",
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&w=800&q=80",
    category: "students",
  },
];

interface NeighborhoodRichDetail {
  name: string;
  tag: string;
  sub: string;
  heroImage: string;
  sideImage: string;
  about: string;
  walkToUni: string;
  restaurants: string;
  transport: string;
  grocery: string;
  atmosphere: string;
  character: string;
  considerations: string[];
  budgetRange: string;
  utilities: string;
}

const NEIGHBORHOOD_DETAIL_DATA: Record<string, NeighborhoodRichDetail> = {
  "santa-croce": {
    name: "Santa Croce",
    tag: "FLORENCE, ITALY",
    sub: "Historic, lively and popular with students.",
    heroImage: "/images/pisa_banner.jpg",
    sideImage: "/images/cinque_terre_banner.jpg",
    about: "A historic and vibrant neighborhood with cafes, restaurants, shops, and a great student atmosphere. Popular with international students and within walking distance to many university campuses.",
    walkToUni: "10–20 min",
    restaurants: "Great",
    transport: "Excellent",
    grocery: "Nearby",
    atmosphere: "Vibrant Student",
    character: "Historic",
    considerations: [
      "Lively area with nightlife",
      "Some streets can be busy at night",
      "Higher prices than other areas",
      "Very convenient location",
    ],
    budgetRange: "€700 – €1,200",
    utilities: "~€50-€80/mo per person",
  },
  "san-lorenzo": {
    name: "San Lorenzo",
    tag: "FLORENCE, ITALY",
    sub: "Central, bustling, famous market district.",
    heroImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    sideImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    about: "Central location near Florence's famous leather market and Mercato Centrale. Fast commutes and unbeatable connectivity for regional and European travel.",
    walkToUni: "10–15 min",
    restaurants: "World-Class",
    transport: "Unbeatable",
    grocery: "Mercato Centrale",
    atmosphere: "Bustling Central",
    character: "Historic Market",
    considerations: [
      "Steps from Santa Maria Novella rail hub",
      "Vibrant daily market stalls and tourists",
      "Abundant fresh food options at Mercato Centrale",
      "Convenient for weekend trips across Italy",
    ],
    budgetRange: "€650 – €1,100",
    utilities: "~€45-€75/mo per person",
  },
  "santo-spirito": {
    name: "Santo Spirito",
    tag: "FLORENCE, ITALY",
    sub: "Artisan workshops, trendy piazzas and bohemian charm.",
    heroImage: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    sideImage: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
    about: "Charming cobblestone streets, antique stores, and lively piazzas. A favorite for students seeking authentic Florentine character, local aperitivo spots, and nightlife.",
    walkToUni: "15–20 min",
    restaurants: "Artisan & Local",
    transport: "Very Good",
    grocery: "Local Bottegas",
    atmosphere: "Bohemian & Lively",
    character: "Artisan Quartiere",
    considerations: [
      "Famous evening aperitivo culture around piazza",
      "Authentic craftsman workshops and quiet lanes",
      "Slightly further walk across the Arno bridges",
      "Strong local neighborhood identity",
    ],
    budgetRange: "€700 – €1,150",
    utilities: "~€50-€80/mo per person",
  },
  "oltrarno": {
    name: "Oltrarno",
    tag: "FLORENCE, ITALY",
    sub: "Authentic, quieter streets on the south bank of the Arno.",
    heroImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    sideImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    about: "South bank of the Arno with panoramic views, craft studios, and quiet residential lanes. Ideal for students wanting a quieter, authentic Italian lifestyle within easy reach of the center.",
    walkToUni: "15–25 min",
    restaurants: "Authentic Trattorias",
    transport: "Good",
    grocery: "Local Grocers",
    atmosphere: "Peaceful & Local",
    character: "Historic Residential",
    considerations: [
      "Quieter nights with fewer tourist crowds",
      "Spacious classical apartments with high ceilings",
      "Scenic riverside walks and gardens nearby",
      "Requires crossing river for northern campuses",
    ],
    budgetRange: "€680 – €1,100",
    utilities: "~€50-€75/mo per person",
  },
  "campo-di-marte": {
    name: "Campo di Marte",
    tag: "FLORENCE, ITALY",
    sub: "Green, residential and spacious with great budget value.",
    heroImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    sideImage: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80",
    about: "A green residential district offering significantly larger bedrooms and modern amenities at the most affordable price per student. Excellent bus and train links to the center.",
    walkToUni: "20–25 min",
    restaurants: "Family Pizzerias",
    transport: "Direct Bus & Train",
    grocery: "Large Supermarkets",
    atmosphere: "Quiet Residential",
    character: "Modern Florentine",
    considerations: [
      "Best square footage and value per euro",
      "Near major sports grounds and parks",
      "10-min bus or bike ride into historic core",
      "Less immediate late-night student bustle",
    ],
    budgetRange: "€550 – €900",
    utilities: "~€40-€70/mo per person",
  },
};

interface ApartmentItem {
  id: string;
  name: string;
  badge?: string;
  badgeType?: "emerald" | "rose" | "blue";
  neighborhood: string;
  commute: string;
  beds: number;
  baths: number;
  feature?: string;
  hasBalcony?: boolean;
  distanceToUni?: string;
  bestFor?: string;
  sqft: string;
  price: number;
  pricePerStudent: number;
  priceDisplay?: string;
  type?: "Apartments" | "Shared Homes" | "Student Residences";
  status: "Available" | "Waiting for response";
  statusColor: "emerald" | "amber";
  source: string;
  tags: string[];
  fullSpecs: string[];
  images: string[];
  address: string;
  about: string;
  amenities: string[];
}

const APARTMENTS_DATA: ApartmentItem[] = [
  {
    id: "spacious-4bed",
    name: "Spacious 4-Bedroom Apartment",
    badge: "Good for Groups",
    badgeType: "emerald",
    neighborhood: "Santa Croce",
    commute: "12 min to program",
    beds: 4,
    baths: 2,
    feature: "Balcony",
    hasBalcony: true,
    distanceToUni: "15 min walk",
    bestFor: "Groups, central location",
    sqft: "125 m²",
    price: 3800,
    pricePerStudent: 950,
    priceDisplay: "~€950",
    type: "Apartments",
    status: "Available",
    statusColor: "emerald",
    source: "Alpha Verified Landlord",
    tags: ["Furnished", "Wi-Fi", "Balcony", "Good for Groups"],
    fullSpecs: ["4 bedrooms", "2 bathrooms", "Balcony", "125 m²", "Furnished", "High-speed Wi-Fi"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    ],
    address: "Via de' Benci, 18, 50122 Firenze FI, Italy",
    about: "Spacious 4-bedroom apartment in Santa Croce designed for student groups. High-speed fiber Wi-Fi, open living areas, balcony, and modern kitchen. Walking distance to historic piazzas and universities.",
    amenities: ["Furnished", "Wi-Fi", "Balcony", "Washing machine", "Dishwasher", "Air conditioning"],
  },
  {
    id: "modern-balcony",
    name: "Modern Apartment with Balcony",
    badge: "Popular with Students",
    badgeType: "rose",
    neighborhood: "Santa Croce",
    commute: "10 min to program",
    beds: 4,
    baths: 2,
    feature: "Balcony",
    hasBalcony: true,
    distanceToUni: "18 min walk",
    bestFor: "Modern, great amenities",
    sqft: "115 m²",
    price: 3520,
    pricePerStudent: 880,
    priceDisplay: "~€880",
    type: "Apartments",
    status: "Available",
    statusColor: "emerald",
    source: "Alpha Verified Partner",
    tags: ["Furnished", "Balcony", "Air Conditioning", "Popular with Students"],
    fullSpecs: ["4 bedrooms", "2 bathrooms", "Balcony", "115 m²", "Furnished", "High-speed Wi-Fi"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80",
    ],
    address: "Corso dei Tintori, 8, 50122 Firenze FI, Italy",
    about: "Sunlit modern apartment with private balcony in Santa Croce. Clean minimalist finishes, large dining table for group dinners, and quiet bedrooms.",
    amenities: ["Furnished", "Wi-Fi", "Balcony", "Air conditioning", "Elevator", "Washing machine"],
  },
  {
    id: "charming-historic",
    name: "Charming Historic Apartment",
    badge: "Historic Building",
    badgeType: "rose",
    neighborhood: "Santa Croce",
    commute: "14 min to program",
    beds: 4,
    baths: 2,
    feature: "High ceilings",
    hasBalcony: false,
    distanceToUni: "20 min walk",
    bestFor: "Historic charm, spacious",
    sqft: "120 m²",
    price: 4400,
    pricePerStudent: 1100,
    priceDisplay: "~€1,100",
    type: "Apartments",
    status: "Available",
    statusColor: "emerald",
    source: "Alpha Verified Landlord",
    tags: ["Historic", "High Ceilings", "Furnished", "Wi-Fi"],
    fullSpecs: ["4 bedrooms", "2 bathrooms", "High ceilings", "120 m²", "Furnished", "Wi-Fi"],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    ],
    address: "Via Giuseppe Verdi, 22, 50122 Firenze FI, Italy",
    about: "Authentic Tuscan apartment with grand ceilings and exposed wooden beams. Spacious double bedrooms, updated bathrooms, and classic Florentine elegance.",
    amenities: ["Furnished", "Wi-Fi", "High ceilings", "Washing machine", "Dishwasher", "Study desks"],
  },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDashboardNeighborhood, setSelectedDashboardNeighborhood] = useState<string>("santa-croce");
  const [neighborhoodViewMode, setNeighborhoodViewMode] = useState<"grid" | "detail">("grid");
  const [selectedNeighborhoodModal, setSelectedNeighborhoodModal] = useState<NeighborhoodItem | null>(null);
  const [savedFavorites, setSavedFavorites] = useState<Record<string, boolean>>({
    "santa-croce": true,
  });

  // Housing Options Tab Sub-Views State
  const [housingSubView, setHousingSubView] = useState<"list" | "detail" | "audit">("list");
  const [housingTypeFilter, setHousingTypeFilter] = useState<string>("Apartments");
  const [housingFilterTab, setHousingFilterTab] = useState<"all" | "available" | "contacted" | "saved">("all");
  const [selectedApartmentId, setSelectedApartmentId] = useState<string>("spacious-4bed");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [housingMapModalOpen, setHousingMapModalOpen] = useState<boolean>(false);
  const [availabilityRequestedModal, setAvailabilityRequestedModal] = useState<ApartmentItem | null>(null);
  const [availabilitySuccessToast, setAvailabilitySuccessToast] = useState<string | null>(null);
  const [askAdvisorModalOpen, setAskAdvisorModalOpen] = useState<boolean>(false);
  const [advisorHelpTopic, setAdvisorHelpTopic] = useState<string>("Clarify lease terms");
  const [advisorQuestion, setAdvisorQuestion] = useState<string>("");
  const [advisorSubmitted, setAdvisorSubmitted] = useState<boolean>(false);

  // Messages Tab State
  const [activeChatId, setActiveChatId] = useState<string>("marco");
  const [chatCategory, setChatCategory] = useState<string>("all");
  const [chatSearch, setChatSearch] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");
  const [messagesList, setMessagesList] = useState<Array<{
    id: string;
    sender: "marco" | "user";
    senderName: string;
    text: string;
    time: string;
    attachment?: { name: string; size: string };
  }>>([
    {
      id: "1",
      sender: "marco",
      senderName: "Marco Valenti (Agent)",
      text: "Buongiorno! Thank you for reserving Via dei Neri Apartment for your student group. The four private bedrooms and 2 bathrooms have been inspected and reserved for your spring semester.",
      time: "Yesterday 4:15 PM",
    },
    {
      id: "2",
      sender: "user",
      senderName: "You (Parent / Student)",
      text: "Hello Marco, thank you! Could you please verify the building security system and if heating is autonomous or centralized?",
      time: "Yesterday 5:30 PM",
    },
    {
      id: "3",
      sender: "marco",
      senderName: "Marco Valenti (Agent)",
      text: "Certainly! The building features an electronic keypad gate, high-security European cylinder locks, and CCTV surveillance in the entry hallway. Heating is autonomous gas, certified in September 2023 with safety stamp.",
      time: "Today 8:10 AM",
    },
    {
      id: "4",
      sender: "marco",
      senderName: "Marco Valenti (Agent)",
      text: "Standard Contratto Transitorio draft attached for parent review. We can schedule a live FaceTime video tour tomorrow at 4:30 PM Italian time (10:30 AM EST) if needed.",
      time: "Today 10:05 AM",
      attachment: {
        name: "Contratto_Transitorio_Via_dei_Neri_Draft.pdf",
        size: "1.4 MB",
      },
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;
    setMessagesList((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: "user",
        senderName: "You (Parent / Student)",
        text: text.trim(),
        time: "Just now",
      },
    ]);
    if (!textToSend) setChatInput("");
  };

  const isHousingDetail = activeTab === "housing" && housingSubView === "detail";
  const currentApartment = APARTMENTS_DATA.find((a) => a.id === selectedApartmentId) || APARTMENTS_DATA[0];

  const toggleFavorite = (id: string) => {
    setSavedFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredNeighborhoods = selectedCategory === "all"
    ? NEIGHBORHOODS_LIST
    : NEIGHBORHOODS_LIST.filter((nh) => nh.category === selectedCategory || selectedCategory === "all");

  return (
    <div className="flex flex-col w-full bg-[#FAFAFA] dark:bg-[#0B0F17] min-h-screen text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ------------------------------------------------------------- */}
          {/* LEFT SIDEBAR (3 cols) - Hidden in full Apartment Detail View */}
          {/* ------------------------------------------------------------- */}
          {!isHousingDetail && (
            <div className="lg:col-span-3 space-y-4">
              {/* Top Destination / Group Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      Florence
                    </h3>
                    <p className="text-xs text-slate-400">Spring 2027</p>
                  </div>
                  <Link
                    href="/create-plan"
                    className="text-xs font-bold text-[#DC2626] hover:underline"
                  >
                    Edit
                  </Link>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-semibold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>4 Students</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    €4,800/mo
                  </span>
                </div>
              </div>

              {/* Sidebar Navigation Items */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-2 shadow-2xs space-y-0.5 text-xs font-semibold">
                {/* Overview */}
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "overview"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>

                {/* Neighborhoods */}
                <button
                  onClick={() => setActiveTab("neighborhoods")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "neighborhoods"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Neighborhoods</span>
                </button>

                {/* Housing Options */}
                <button
                  onClick={() => {
                    setActiveTab("housing");
                    setHousingSubView("list");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "housing"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <Building2 className="w-4 h-4" />
                    <span>Housing Options</span>
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${activeTab === "housing" ? "bg-red-100 text-[#DC2626]" : "bg-slate-100 text-slate-600"
                    }`}>
                    28
                  </span>
                </button>

                {/* Compare */}
                <button
                  onClick={() => setActiveTab("compare")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "compare"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <GitCompare className="w-4 h-4" />
                  <span>Compare</span>
                </button>

                {/* Provider Communication */}
                <button
                  onClick={() => setActiveTab("communication")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "communication"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <Send className="w-4 h-4" />
                    <span>Provider Communication</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[#DC2626] text-[10px] font-bold">
                    2
                  </span>
                </button>

                {/* Group Progress */}
                <button
                  onClick={() => setActiveTab("progress")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "progress"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4" />
                    <span>Group Progress</span>
                  </span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${activeTab === "progress" ? "bg-red-100 text-[#DC2626]" : "bg-slate-100 text-slate-600"
                    }`}>
                    14
                  </span>
                </button>

                {/* Messages */}
                <button
                  onClick={() => setActiveTab("messages")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "messages"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <span className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    <span>Messages</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded-md bg-red-100 text-[#DC2626] text-[10px] font-bold">
                    2
                  </span>
                </button>

                {/* Documents */}
                <button
                  onClick={() => setActiveTab("documents")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "documents"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Documents</span>
                </button>

                {/* Safety & Hotline */}
                {/* <button
                  onClick={() => setActiveTab("safety")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "safety"
                      ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <ShieldCheck className={`w-4 h-4 ${activeTab === "safety" ? "text-[#DC2626]" : "text-emerald-600"}`} />
                  <span>Safety &amp; Hotline</span>
                </button> */}

                {/* Daily Life Guide */}
                {/* <button
                onClick={() => setActiveTab("daily-life")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                  activeTab === "daily-life"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Coffee className={`w-4 h-4 ${activeTab === "daily-life" ? "text-[#DC2626]" : "text-red-500"}`} />
                <span>Daily Life Guide</span>
              </button> */}

                {/* Parent View */}
                <button
                  onClick={() => setActiveTab("parent")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "parent"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <Eye className={`w-4 h-4 ${activeTab === "parent" ? "text-[#DC2626]" : "text-indigo-500"}`} />
                  <span>Parent View</span>
                </button>

                {/* My Profile */}
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${activeTab === "profile"
                    ? "bg-[#FFF4F4] text-[#DC2626] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <User className={`w-4 h-4 ${activeTab === "profile" ? "text-[#DC2626]" : "text-slate-500"}`} />
                  <span>My Profile</span>
                </button>
              </div>

              {/* Bottom Alpha Advisor Callout */}
              <div className="bg-[#FFF8F8] dark:bg-[#1C1318] rounded-2xl border border-red-200/80 dark:border-red-900/40 p-4 space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#DC2626]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Alpha Advisor</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Need lease contract review or university commute check?
                </p>
                <button
                  onClick={() => {
                    setActiveTab("housing");
                    setHousingSubView("audit");
                    setSelectedApartmentId("via-dei-neri");
                  }}
                  className="w-full py-2 px-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center transition-colors shadow-2xs"
                >
                  Run Alpha Check
                </button>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* MAIN CONTENT AREA */}
          {/* ------------------------------------------------------------- */}
          <div className={isHousingDetail ? "lg:col-span-12" : "lg:col-span-9"}>
            {/* ========================================================= */}
            {/* VIEW 1: OVERVIEW TAB */}
            {/* ========================================================= */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#DC2626] text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>Personalized for Emma, Sophie, Olivia, Mia</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Your Housing Plan
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Based on your group&apos;s preferences and our verified student housing data.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Column: Key Recommendations (7 cols) */}
                  <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-6">
                    <h3 className="text-base font-bold text-slate-900">
                      Key Recommendations
                    </h3>

                    <div className="space-y-5">
                      {/* Rec 1 */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          1
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">
                              Santa Croce
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10.5px] font-bold">
                              12 min walk
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Best combination of location, student life and walkability. High density of international student cafes, markets, and quick access to IES Abroad - Florence.
                          </p>
                        </div>
                      </div>

                      {/* Rec 2 */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          2
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">
                              Sant&apos;Ambrogio
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10.5px] font-bold">
                              14 min walk
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Good value and vibrant student environment. Home to the daily fresh food market and quiet residential side streets.
                          </p>
                        </div>
                      </div>

                      {/* Rec 3 */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          3
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">
                              Campo di Marte
                            </h4>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10.5px] font-bold">
                              20 min transit
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            More space, slightly longer commute. Best price-per-square-meter for 4-bedroom apartments with large terraces.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab("neighborhoods")}
                      className="py-3 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <span>View Neighborhoods</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Right Column: Florence Overview Card (5 cols) */}
                  <div className="md:col-span-5 bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      {/* Photo Header */}
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-900">
                        <Image
                          src="https://images.unsplash.com/photo-1543429776-2782fc8e1acd?auto=format&fit=crop&w=800&q=80"
                          alt="Florence Overview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Top Right Good Match Badge */}
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Good Match</span>
                        </div>

                        {/* Title overlay */}
                        <div className="absolute bottom-3 left-4 text-white">
                          <h4 className="text-base font-bold text-white leading-tight drop-shadow-sm">
                            Florence Overview
                          </h4>
                          <p className="text-[11px] text-slate-300">
                            Semester Target: Spring 2027
                          </p>
                        </div>
                      </div>

                      {/* 4 Stats Rows */}
                      <div className="p-5 space-y-3.5 text-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                            <Building2 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              AVERAGE RENT (4-BEDROOM APT)
                            </span>
                            <span className="text-sm font-black text-slate-900 block mt-0.5">
                              €3,500 – €5,000 / month
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              AVAILABILITY
                            </span>
                            <span className="text-xs font-bold text-slate-800 block mt-0.5">
                              Medium (start early)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              SAFETY RATING
                            </span>
                            <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                              Good (well-lit streets &amp; regular patrols)
                            </span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                              STUDENT ENVIRONMENT
                            </span>
                            <span className="text-xs font-bold text-slate-800 block mt-0.5">
                              High concentration of international students
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">
                        28 verified listings ready
                      </span>
                      <Link
                        href="/housing"
                        className="font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                      >
                        <span>Browse listings</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 2: NEIGHBORHOODS TAB (MATCHING SCREENSHOT EXACTLY) */}
            {/* ========================================================= */}
            {activeTab === "neighborhoods" && (() => {
              const currentNh = NEIGHBORHOOD_DETAIL_DATA[selectedDashboardNeighborhood] || NEIGHBORHOOD_DETAIL_DATA["santa-croce"];
              const isSaved = savedFavorites[selectedDashboardNeighborhood];

              return neighborhoodViewMode === "detail" ? (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Top Header Navigation Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveTab("overview")}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer self-start sm:self-auto"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Dashboard Overview</span>
                    </button>

                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <button
                        onClick={() => setNeighborhoodViewMode("grid")}
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>All Neighborhoods</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setActiveTab("housing")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Housing Options</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Hero Card for Selected Neighborhood */}
                  <div className="relative aspect-[16/7] sm:aspect-[16/5.8] w-full rounded-2xl overflow-hidden shadow-sm bg-slate-900 text-left">
                    <Image
                      src={currentNh.heroImage}
                      alt={currentNh.name}
                      fill
                      priority
                      className="object-cover object-center brightness-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 z-1" />

                    <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 text-white space-y-1">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider inline-block">
                        {currentNh.tag}
                      </span>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight drop-shadow-xs">
                        {currentNh.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/90 font-normal max-w-xl">
                        {currentNh.sub}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleFavorite(selectedDashboardNeighborhood)}
                      className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs font-bold backdrop-blur-md shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-500 text-red-500" : "text-slate-600"}`} />
                      <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                  </div>

                  {/* About Section: 2 Columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch text-left">
                    {/* Left Column (7 cols): Description + 6 Attribute Cards */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mb-1.5">
                          About {currentNh.name}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {currentNh.about}
                        </p>
                      </div>

                      {/* 6 Attribute Cards in 3x2 Grid */}
                      <div className="grid grid-cols-3 gap-2.5">
                        {/* 1. Walk to Uni */}
                        <div className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
                          <div className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 flex items-center justify-center">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {currentNh.walkToUni}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            Walk to University
                          </div>
                        </div>

                        {/* 2. Restaurants */}
                        <div className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
                          <div className="w-6 h-6 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                            <Utensils className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {currentNh.restaurants}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            Restaurants &amp; Cafes
                          </div>
                        </div>

                        {/* 3. Transport */}
                        <div className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
                          <div className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                            <Bus className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {currentNh.transport}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            Public Transport
                          </div>
                        </div>

                        {/* 4. Grocery */}
                        <div className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
                          <div className="w-6 h-6 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {currentNh.grocery}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            Nearby
                          </div>
                        </div>

                        {/* 5. Atmosphere */}
                        <div className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
                          <div className="w-6 h-6 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {currentNh.atmosphere}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            Atmosphere
                          </div>
                        </div>

                        {/* 6. Character */}
                        <div className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs space-y-1">
                          <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center">
                            <Building2 className="w-3.5 h-3.5" />
                          </div>
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {currentNh.character}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            Neighborhood
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (5 cols): Photo Card */}
                    <div className="lg:col-span-5">
                      <div className="relative aspect-[16/10] lg:h-full w-full rounded-2xl overflow-hidden shadow-xs bg-slate-100 dark:bg-slate-800 min-h-[200px]">
                        <Image
                          src={currentNh.sideImage}
                          alt={currentNh.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Two Boxes Section: Things to Consider & Typical Budget Range */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {/* Left: Things to Consider */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-3">
                        Things to Consider
                      </h4>
                      <div className="space-y-2">
                        {currentNh.considerations.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Typical Budget Range */}
                    <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            Typical Budget Range
                          </h4>
                          <span className="text-[11px] text-slate-400 font-normal">
                            (per student / month)
                          </span>
                        </div>
                        <div className="text-xl sm:text-2xl font-extrabold text-[#DC2626] my-2">
                          {currentNh.budgetRange}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Based on recent similar group inquiries.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <span className="text-slate-500">Utilities estimate:</span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">
                          {currentNh.utilities}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      onClick={() => router.push("/create-plan")}
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Preferences</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("housing")}
                      className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/25 flex items-center gap-2 transition-all cursor-pointer self-stretch sm:self-auto justify-center"
                    >
                      <span>View Housing Options in {currentNh.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Grid of All Neighborhoods when user clicks "All Neighborhoods" */
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Explore Neighborhoods
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Compare areas based on commute, prices, safety, and student life.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: "all", label: "All" },
                      { id: "nearest", label: "Nearest to Program" },
                      { id: "students", label: "Best for Students" },
                      { id: "space", label: "More Space" },
                      { id: "quiet", label: "More Quiet" },
                    ].map((filter) => {
                      const isSelected = selectedCategory === filter.id;
                      return (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedCategory(filter.id)}
                          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${isSelected
                            ? "bg-[#DC2626] text-white shadow-xs"
                            : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* 6 Neighborhood Cards in 3x2 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredNeighborhoods.map((nh) => {
                      const isSavedNh = savedFavorites[nh.id];
                      return (
                        <div
                          key={nh.id}
                          className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div>
                            {/* Card Image - clicking opens quick guide modal */}
                            <div
                              onClick={() => setSelectedNeighborhoodModal(nh)}
                              className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 cursor-pointer group"
                            >
                              <Image
                                src={nh.image}
                                alt={nh.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                              {nh.badge && (
                                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#059669] text-white font-bold text-[10px] uppercase tracking-wider shadow-xs">
                                  {nh.badge}
                                </div>
                              )}

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(nh.id);
                                }}
                                className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-colors cursor-pointer ${isSavedNh
                                  ? "bg-red-500 text-white"
                                  : "bg-black/40 text-white hover:bg-black/60"
                                  }`}
                              >
                                <Heart className={`w-3.5 h-3.5 ${isSavedNh ? "fill-white" : ""}`} />
                              </button>

                              <div className="absolute bottom-2.5 left-3 text-white">
                                <h4 className="text-sm font-bold text-white drop-shadow-xs">
                                  {nh.name}
                                </h4>
                                <p className="text-[10px] text-slate-300">
                                  {nh.sub}
                                </p>
                              </div>
                            </div>

                            <div className="p-3.5 space-y-2 text-xs">
                              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-100 dark:border-slate-800">
                                <span className="text-slate-500 font-medium flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span>{nh.commute}</span>
                                </span>
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {nh.price}
                                </span>
                              </div>

                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                                {nh.description}
                              </p>

                              <div className="flex items-center gap-1.5 pt-1">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                                  Safety: {nh.safety}
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium">
                                  {nh.walk}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Footer with 2 Buttons matching Screenshot: Detail Page & View Flats */}
                          <div className="p-3.5 pt-0 grid grid-cols-2 gap-2">
                            <button
                              onClick={() => {
                                setSelectedDashboardNeighborhood(nh.id);
                                setNeighborhoodViewMode("detail");
                              }}
                              className="py-1.5 px-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Compass className="w-3.5 h-3.5 text-slate-500" />
                              <span>Detail Page</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveTab("housing");
                              }}
                              className="py-1.5 px-2.5 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-50 dark:hover:bg-red-950/40 text-[#DC2626] dark:text-red-400 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                            >
                              <Building2 className="w-3.5 h-3.5 text-[#DC2626]" />
                              <span>View Flats (3) →</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* ========================================================= */}
            {/* VIEW 3: HOUSING OPTIONS TAB */}
            {/* ========================================================= */}
            {activeTab === "housing" && (
              <div className="space-y-6">
                {/* ------------------------------------------------------- */}
                {/* SUB-VIEW 1: HOUSING LIST VIEW */}
                {/* ------------------------------------------------------- */}
                {housingSubView === "list" && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    {/* Top Action Navigation Bar */}
                    <div className="flex items-center justify-between pb-1">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Overview</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedDashboardNeighborhood("santa-croce");
                          setActiveTab("neighborhoods");
                          setNeighborhoodViewMode("detail");
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        <span>View Neighborhood Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Title & View on Map Row */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                      <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                          Housing Options in Santa Croce
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                          These are potential options based on your group&apos;s preferences. We will contact the providers to check current availability and details.
                        </p>
                      </div>

                      <button
                        onClick={() => setHousingMapModalOpen(true)}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 shadow-2xs hover:shadow-xs transition-all cursor-pointer shrink-0 self-start sm:self-auto"
                      >
                        <Map className="w-3.5 h-3.5 text-[#DC2626]" />
                        <span>View on Map</span>
                      </button>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {[
                        { id: "all", label: "All Types" },
                        { id: "apartments", label: "Apartments" },
                        { id: "shared", label: "Shared Homes" },
                        { id: "residences", label: "Student Residences" },
                      ].map((pill) => {
                        const isSelected =
                          housingTypeFilter === pill.label ||
                          (pill.id === "apartments" && housingTypeFilter === "Apartments");
                        return (
                          <button
                            key={pill.id}
                            onClick={() => setHousingTypeFilter(pill.label)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#DC2626] text-white shadow-xs"
                                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            }`}
                          >
                            {pill.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* 3 Apartment Cards in exact screenshot horizontal layout */}
                    <div className="space-y-4 pt-1">
                      {APARTMENTS_DATA.map((apt) => {
                        const isSaved = savedFavorites[apt.id];
                        return (
                          <div
                            key={apt.id}
                            className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-2xs hover:shadow-md transition-all p-3.5 sm:p-4.5 flex flex-col md:flex-row gap-5 items-stretch text-left group"
                          >
                            {/* Left Side: Apartment Image */}
                            <div
                              onClick={() => {
                                setSelectedApartmentId(apt.id);
                                setSelectedPhotoIndex(0);
                                setHousingSubView("detail");
                              }}
                              className="relative w-full md:w-[320px] lg:w-[360px] aspect-[16/10] md:aspect-auto md:h-auto min-h-[190px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 cursor-pointer"
                            >
                              <Image
                                src={apt.images[0]}
                                alt={apt.name}
                                fill
                                className="object-cover group-hover:scale-102 transition-transform duration-300"
                              />

                              {/* Heart Save Button on Image */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(apt.id);
                                }}
                                className="absolute top-2.5 right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 dark:bg-slate-900/90 hover:bg-white shadow-xs flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                                aria-label="Save"
                              >
                                <Heart
                                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                                    isSaved ? "fill-[#DC2626] text-[#DC2626]" : "text-slate-400"
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Right Side: Information Column */}
                            <div className="flex-1 flex flex-col justify-between py-1">
                              {/* Top Block: Title, Badge, Location, Specs */}
                              <div>
                                {/* Row 1: Title & Badge */}
                                <div className="flex items-start justify-between gap-3">
                                  <h3
                                    onClick={() => {
                                      setSelectedApartmentId(apt.id);
                                      setSelectedPhotoIndex(0);
                                      setHousingSubView("detail");
                                    }}
                                    className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-[#DC2626] transition-colors"
                                  >
                                    {apt.name}
                                  </h3>

                                  {apt.badge && (
                                    <span
                                      className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 border ${
                                        apt.badgeType === "emerald"
                                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-900/50"
                                          : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200/80 dark:border-rose-900/50"
                                      }`}
                                    >
                                      {apt.badge}
                                    </span>
                                  )}
                                </div>

                                {/* Row 2: Location Subtitle */}
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>{apt.neighborhood}</span>
                                </div>

                                {/* Row 3: Specs with Bed, Bath, Feature */}
                                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 font-medium mt-3">
                                  <span className="flex items-center gap-1.5">
                                    <BedDouble className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{apt.beds} bedrooms</span>
                                  </span>
                                  <span className="flex items-center gap-1.5">
                                    <Bath className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{apt.baths} bathrooms</span>
                                  </span>
                                  {apt.feature && (
                                    <span className="flex items-center gap-1.5">
                                      <span>{apt.feature}</span>
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Bottom Block: Price and Request Availability CTA */}
                              <div className="flex items-end justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                                <div>
                                  <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                                    ~€{apt.pricePerStudent.toLocaleString()}
                                  </div>
                                  <div className="text-[11px] text-slate-400 mt-1">
                                    per student / month (estimated)
                                  </div>
                                </div>

                                <button
                                  onClick={() => setAvailabilityRequestedModal(apt)}
                                  className="py-2.5 px-5 sm:px-6 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer"
                                >
                                  Request Availability
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Bottom Comparison Banner */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                      <div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          Ready to compare these 3 Santa Croce apartments?
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Side-by-side comparison of rent, bedrooms, bathrooms, and walk distance to university.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab("compare")}
                        className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-red-600/20 transition-all cursor-pointer shrink-0"
                      >
                        <GitCompare className="w-4 h-4" />
                        <span>Compare Selected Options →</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------- */}
                {/* SUB-VIEW 2: APARTMENT DETAIL VIEW (SCREENSHOT 2) */}
                {/* ------------------------------------------------------- */}
                {housingSubView === "detail" && (
                  <div className="space-y-6">
                    {/* Top Action Row */}
                    <div className="flex items-center justify-between pb-1">
                      <button
                        onClick={() => setHousingSubView("list")}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to Results</span>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setHousingSubView("audit")}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-200 bg-red-50/50 hover:bg-red-50 text-[#DC2626] text-xs font-bold transition-all shadow-2xs"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
                          <span>View Alpha Check</span>
                        </button>
                        <button
                          onClick={() => toggleFavorite(currentApartment.id)}
                          className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-[#DC2626] shadow-2xs transition-colors"
                          aria-label="Save"
                        >
                          <Heart className={`w-4 h-4 ${savedFavorites[currentApartment.id] ? "fill-[#DC2626]" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Title & Price Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {currentApartment.name}
                          </h1>
                          {currentApartment.status === "Available" ? (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px] flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Available</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[11px] flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>Waiting for response</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{currentApartment.neighborhood}, Florence</span>
                          </span>
                          <span>•</span>
                          <span className="text-[#DC2626] font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{currentApartment.commute}</span>
                          </span>
                          <span>•</span>
                          <span>Source: {currentApartment.source}</span>
                        </div>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                          €{currentApartment.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500"> / month</span>
                        <div className="text-xs text-slate-500 font-medium">
                          €{currentApartment.pricePerStudent} / month per student (4 students)
                        </div>
                      </div>
                    </div>

                    {/* Photo Gallery Switcher */}
                    <div className="space-y-3">
                      {/* Main Hero Photo */}
                      <div className="relative aspect-[16/9] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-sm">
                        <Image
                          src={currentApartment.images[selectedPhotoIndex] || currentApartment.images[0]}
                          alt={currentApartment.name}
                          fill
                          priority
                          className="object-cover"
                        />
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-semibold shadow-xs">
                          Photo {selectedPhotoIndex + 1} of {currentApartment.images.length}
                        </div>
                      </div>

                      {/* Thumbnails Row */}
                      <div className="grid grid-cols-6 gap-2 sm:gap-3">
                        {currentApartment.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedPhotoIndex(idx)}
                            className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${selectedPhotoIndex === idx
                              ? "border-[#DC2626] ring-2 ring-red-500/20"
                              : "border-transparent opacity-75 hover:opacity-100"
                              }`}
                          >
                            <Image src={img} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Specs Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                        <BedDouble className="w-3.5 h-3.5 text-slate-500" />
                        <span>{currentApartment.beds} beds</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                        <Bath className="w-3.5 h-3.5 text-slate-500" />
                        <span>{currentApartment.baths} bathrooms</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-2xs">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{currentApartment.sqft}</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-xs font-bold text-emerald-800 flex items-center gap-1.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Furnished</span>
                      </span>
                      <span className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-2xs">
                        Utilities not included
                      </span>
                      <span className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-2xs">
                        High-speed Wi-Fi
                      </span>
                      <span className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-600 shadow-2xs">
                        Elevator
                      </span>
                    </div>

                    {/* Two-Column Detail Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
                      {/* Left Column (7 cols) */}
                      <div className="lg:col-span-7 space-y-5">
                        {/* About This Property */}
                        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                          <div>
                            <h3 className="text-base font-bold text-slate-900">About This Property</h3>
                            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                              {currentApartment.about}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100">
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                              AMENITIES &amp; FURNISHINGS
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700">
                              {currentApartment.amenities.map((item, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl border border-rose-200/90 bg-rose-50/30 flex items-start gap-2.5">
                            <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                            <div className="text-xs">
                              <span className="font-bold text-slate-900 block">Verified Study Abroad Listing</span>
                              <span className="text-[11px] text-slate-600 leading-snug block mt-0.5">
                                Landlord is verified with legitimate Italian tax code and rental contract compliant with student visa requirements.
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Review Alpha Check Report Banner Card */}
                        <div className="bg-gradient-to-br from-[#991B1B] via-[#881337] to-[#7F1D1D] rounded-2xl p-5 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1.5 relative z-10 max-w-lg">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider">
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span>AI HOUSING AUDIT</span>
                            </div>
                            <h3 className="text-lg font-bold text-white">Review Alpha Check Report</h3>
                            <p className="text-xs text-white/80 leading-relaxed">
                              Inspect move-in cost breakdown, hidden fees, lease clause warnings, and group fit score.
                            </p>
                          </div>
                          <button
                            onClick={() => setHousingSubView("audit")}
                            className="px-4 py-2.5 rounded-xl bg-white text-[#991B1B] hover:bg-slate-100 font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <span>View Report</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Right Column (5 cols) */}
                      <div className="lg:col-span-5 space-y-4">
                        {/* Map Preview Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs space-y-0">
                          <div className="relative h-44 w-full bg-[#E8ECF2] overflow-hidden flex items-center justify-center">
                            <svg className="w-full h-full" viewBox="0 0 360 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="360" height="176" fill="#EAEFF5" />
                              <path d="M-10 120 Q 90 110, 180 130 T 370 125 L 370 176 L -10 176 Z" fill="#D3E2F2" />
                              <path d="M 40 0 L 70 176" stroke="#FFFFFF" strokeWidth="6" />
                              <path d="M 120 0 L 140 176" stroke="#FFFFFF" strokeWidth="8" />
                              <path d="M 240 0 L 220 176" stroke="#FFFFFF" strokeWidth="5" />
                              <path d="M 0 50 L 360 70" stroke="#FFFFFF" strokeWidth="7" />
                              <path d="M 0 110 L 360 115" stroke="#FFFFFF" strokeWidth="6" />
                              <path d="M 80 40 L 280 140" stroke="#DC2626" strokeWidth="2.5" strokeDasharray="4 3" />
                            </svg>

                            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs shadow-xs text-[10.5px] font-bold text-[#DC2626] flex items-center gap-1 border border-slate-100">
                              <Clock className="w-3 h-3" />
                              <span>12 min Walk to IES</span>
                            </div>

                            {/* Pin 1: Apartment */}
                            <div className="absolute top-[32%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-md border-2 border-white">
                                <Building2 className="w-3 h-3" />
                              </div>
                              <span className="mt-0.5 px-1.5 py-0.5 rounded bg-slate-900/90 text-white font-bold text-[9px]">
                                Apartment
                              </span>
                            </div>

                            {/* Pin 2: IES Abroad */}
                            <div className="absolute top-[68%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                              <div className="w-6 h-6 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-md border-2 border-white">
                                <Sparkles className="w-3 h-3 text-amber-200" />
                              </div>
                              <span className="mt-0.5 px-1.5 py-0.5 rounded bg-slate-900/90 text-white font-bold text-[9px]">
                                IES Abroad - Florence
                              </span>
                            </div>
                          </div>

                          <div className="p-3 bg-white text-slate-600 text-[11px] flex items-center gap-1.5 border-t border-slate-100">
                            <span className="font-semibold text-slate-700">Address:</span>
                            <span className="text-slate-500">{currentApartment.address}</span>
                          </div>
                        </div>

                        {/* Contact Options Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                          <h3 className="text-sm font-bold text-slate-900">Contact Options</h3>
                          <div className="space-y-2">
                            <button
                              onClick={() => setAskAdvisorModalOpen(true)}
                              className="w-full py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Contact / Ask Alpha</span>
                            </button>
                            <button
                              onClick={() => setAskAdvisorModalOpen(true)}
                              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5 text-slate-400" />
                              <span>Request Availability</span>
                            </button>
                            <button
                              onClick={() => toggleFavorite(currentApartment.id)}
                              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                              <span>Save to Compare</span>
                            </button>
                          </div>
                          <p className="text-[10.5px] text-slate-400 text-center pt-1 leading-snug">
                            No booking fee until lease contract is finalized and verified.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------- */}
                {/* SUB-VIEW 3: ALPHA CHECK REPORT (SCREENSHOT 3) */}
                {/* ------------------------------------------------------- */}
                {housingSubView === "audit" && (
                  <div className="space-y-5">
                    {/* Top Back Link */}
                    <div className="flex items-center justify-between pb-1">
                      <button
                        onClick={() => setHousingSubView("detail")}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-950 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Back to {currentApartment.name}</span>
                      </button>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                      <div>
                        <div className="inline-flex items-center gap-1.5 text-[#DC2626] text-xs font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Automated Housing Audit</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                          Alpha Check
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          See if the option fits your group, with total cost and key details.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-400">Audited for:</span>
                        <span className="px-3 py-1 rounded-lg border border-slate-200 bg-white font-bold text-slate-800 shadow-2xs">
                          {currentApartment.name}
                        </span>
                      </div>
                    </div>

                    {/* 3-Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
                      {/* Column 1: Good Fit for Your Group */}
                      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                        <div className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold inline-flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" />
                          <span>Good Fit for Your Group</span>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-800">
                            We reviewed this option based on your group&apos;s plan.
                          </h4>

                          <div className="space-y-3 pt-3">
                            {[
                              {
                                title: "Fits 4 students",
                                desc: "4 independent bedrooms matching group headcount",
                              },
                              {
                                title: "Within group budget",
                                desc: "€4800 is under total budget (€5,200)",
                              },
                              {
                                title: "12 minutes to program",
                                desc: "Quick walk to IES Abroad - Florence",
                              },
                              {
                                title: "Furnished",
                                desc: "Complete desks, mattresses, wardrobes & kitchen gear",
                              },
                              {
                                title: "Dates appear available",
                                desc: "Jan 8, 2027 – May 15, 2027",
                              },
                              {
                                title: "Housing source identified",
                                desc: "Verified vendor: Spotahome",
                              },
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-slate-900 block leading-tight">
                                    {item.title}
                                  </span>
                                  <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                                    {item.desc}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl border border-rose-200/90 bg-rose-50/30 flex items-center gap-2 text-xs text-slate-800">
                          <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0" />
                          <span className="font-semibold text-[11px]">
                            Matches 100% of non-negotiable student filters
                          </span>
                        </div>
                      </div>

                      {/* Column 2: Cost Breakdown [estimated] */}
                      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-bold text-slate-900">Cost Breakdown</h3>
                            <span className="text-xs text-slate-400 font-medium">[estimated]</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Full financial projection before signing lease.
                          </p>
                        </div>

                        <div className="space-y-2 text-xs border-t border-b border-slate-100 py-3">
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Monthly rent</span>
                            <span className="font-bold text-slate-900">€4,800</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Security deposit</span>
                            <span className="font-bold text-slate-900">€4,800</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>First month&apos;s rent</span>
                            <span className="font-bold text-slate-900">€4,800</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600">
                            <span>Provider fee (Spotahome)</span>
                            <span className="font-bold text-slate-900">€650</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-600 pt-1">
                            <span>Utilities</span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-bold text-[10px]">
                              Not included
                            </span>
                          </div>
                        </div>

                        {/* Dark highlight card */}
                        <div className="bg-[#0B132B] rounded-2xl p-4 text-white text-center space-y-1 shadow-sm">
                          <span className="text-[10px] tracking-wider text-slate-400 font-bold uppercase block">
                            ESTIMATED AMOUNT BEFORE MOVE-IN
                          </span>
                          <div className="text-2xl sm:text-3xl font-extrabold text-white">
                            €10,250
                          </div>
                          <div className="text-xs text-slate-300">
                            €2,563 per student
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 leading-tight">
                          Important: Final terms and availability must be confirmed with the housing provider.
                        </p>
                      </div>

                      {/* Column 3: Still Need to Know & Ask Alpha */}
                      <div className="space-y-4">
                        {/* Still Need to Know */}
                        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                          <h3 className="text-sm font-bold text-slate-900">Still Need to Know</h3>
                          <div className="space-y-2">
                            {[
                              "Cancellation terms",
                              "Utility estimate (heating/AC)",
                              "Deposit return procedure",
                            ].map((item, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/50 flex items-center gap-2 text-xs font-semibold text-amber-900"
                              >
                                <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Ask Alpha to Help */}
                        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-3">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#DC2626]">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Ask Alpha to Help</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            We can contact the housing source, clarify terms, or help with Italian lease questions.
                          </p>
                          <button
                            onClick={() => setAskAdvisorModalOpen(true)}
                            className="w-full py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                          >
                            <span>Request Assistance</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 4: COMPARE TAB */}
            {/* ========================================================= */}
            {activeTab === "compare" && (
              <div className="space-y-6 animate-in fade-in duration-200 text-left">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    Compare Selected Options
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Keep track of options you like and compare key details.
                  </p>
                </div>

                <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-x-auto shadow-2xs">
                  <table className="w-full text-left border-collapse min-w-[720px]">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800">
                        <th className="p-4 sm:p-5 align-top text-[10.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider w-[22%]">
                          PROPERTY
                        </th>
                        {APARTMENTS_DATA.map((apt) => {
                          const isSaved = savedFavorites[apt.id];
                          return (
                            <th key={apt.id} className="p-4 sm:p-5 align-top w-[26%] font-normal">
                              {/* Apartment Thumbnail Card */}
                              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-2xs mb-2.5">
                                <Image
                                  src={apt.images[0]}
                                  alt={apt.name}
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  onClick={() => toggleFavorite(apt.id)}
                                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/95 dark:bg-slate-900/90 shadow-xs flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                                  aria-label="Save"
                                >
                                  <Heart
                                    className={`w-3.5 h-3.5 ${
                                      isSaved ? "fill-[#DC2626] text-[#DC2626]" : "text-slate-400"
                                    }`}
                                  />
                                </button>
                              </div>
                              <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm leading-snug">
                                {apt.name}
                              </h4>
                              <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span>{apt.neighborhood}</span>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                      {/* Row 1: Est. Monthly Rent (per student) */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400 font-medium">
                          <div className="text-slate-700 dark:text-slate-300 font-bold text-xs">Est. Monthly Rent</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">(per student)</div>
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5">
                            <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
                              €{apt.pricePerStudent.toLocaleString()}
                            </span>
                          </td>
                        ))}
                      </tr>

                      {/* Row 2: Bedrooms */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                          Bedrooms
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm">
                            {apt.beds}
                          </td>
                        ))}
                      </tr>

                      {/* Row 3: Bathrooms */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                          Bathrooms
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm">
                            {apt.baths}
                          </td>
                        ))}
                      </tr>

                      {/* Row 4: Furnished */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                          Furnished
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5">
                            <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                          </td>
                        ))}
                      </tr>

                      {/* Row 5: Balcony */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                          Balcony
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5">
                            {apt.hasBalcony ? (
                              <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                            ) : (
                              <span className="text-slate-400 font-bold text-sm">—</span>
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* Row 6: Distance to University */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                          Distance to University
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5 text-slate-800 dark:text-slate-200 font-medium text-xs sm:text-sm">
                            {apt.distanceToUni || "15 min walk"}
                          </td>
                        ))}
                      </tr>

                      {/* Row 7: Best For */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                          Best For
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5 text-slate-600 dark:text-slate-400 text-xs">
                            {apt.bestFor || "Groups, central location"}
                          </td>
                        ))}
                      </tr>

                      {/* Row 8: Actions */}
                      <tr>
                        <td className="p-4 sm:p-5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                          Actions
                        </td>
                        {APARTMENTS_DATA.map((apt) => (
                          <td key={apt.id} className="p-4 sm:p-5">
                            <button
                              onClick={() => {
                                setActiveTab("communication");
                              }}
                              className="w-full py-2.5 px-3 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Contact Provider</span>
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Bottom Center Proceed Button */}
                <div className="flex justify-center pt-2 pb-2">
                  <button
                    onClick={() => setActiveTab("communication")}
                    className="py-3 px-8 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/25 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Proceed to Provider Communication</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 4B: PROVIDER COMMUNICATION TAB (SCREENSHOT) */}
            {/* ========================================================= */}
            {activeTab === "communication" && (
              <div className="space-y-6 animate-in fade-in duration-200 text-left">
                {/* Top Action Row: Back to Compare */}
                <div>
                  <button
                    onClick={() => setActiveTab("compare")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Compare</span>
                  </button>
                </div>

                {/* Step Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/50 text-[11px] font-bold text-[#DC2626]">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <span>Step 7 of 8: Provider Communication</span>
                </div>

                {/* Heading & Subtitle */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    We Handle the Communication
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                    Our team will contact the property managers, request availability, and keep you updated. You can see all communication here.
                  </p>
                </div>

                {/* 3 Inquiry Tracker Cards */}
                <div className="space-y-4">
                  {[
                    {
                      id: "spacious-4bed",
                      name: "Spacious 4-Bedroom Apartment",
                      neighborhood: "Santa Croce",
                      image: APARTMENTS_DATA[0].images[0],
                      status: "Response Received",
                      statusType: "emerald",
                      statusDate: "Oct 24, 2026",
                      timeline: [
                        { label: "Inquiry sent to property manager", date: "Oct 21, 2026", status: "done" },
                        { label: "Received response with availability and details", date: "Oct 24, 2026", status: "done" },
                        { label: "Our team reviewing information", date: "In progress", status: "in-progress" },
                        { label: "Next: Send full details to your group", date: "—", status: "pending" },
                      ],
                    },
                    {
                      id: "modern-balcony",
                      name: "Modern Apartment with Balcony",
                      neighborhood: "Santa Croce",
                      image: APARTMENTS_DATA[1].images[0],
                      status: "Awaiting Reply",
                      statusType: "amber",
                      statusDate: "Oct 23, 2026",
                      timeline: [
                        { label: "Inquiry sent to property manager", date: "Oct 22, 2026", status: "done" },
                        { label: "Follow-up sent", date: "Oct 24, 2026", status: "done" },
                        { label: "Waiting for response", date: "—", status: "in-progress" },
                        { label: "Next: Our team will follow up again", date: "—", status: "pending" },
                      ],
                    },
                    {
                      id: "charming-historic",
                      name: "Charming Historic Apartment",
                      neighborhood: "Santa Croce",
                      image: APARTMENTS_DATA[2].images[0],
                      status: "No Response Yet",
                      statusType: "slate",
                      statusDate: "Oct 20, 2026",
                      timeline: [
                        { label: "Inquiry sent to property manager", date: "Oct 20, 2026", status: "done" },
                        { label: "Follow-up sent", date: "Oct 23, 2026", status: "done" },
                        { label: "No response yet", date: "—", status: "in-progress" },
                        { label: "Next: Final follow-up this week", date: "—", status: "pending" },
                      ],
                    },
                  ].map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs p-4 sm:p-5 space-y-4"
                    >
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        {/* Left: Thumbnail & Name */}
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                            <Image
                              src={inquiry.image}
                              alt={inquiry.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                              {inquiry.name}
                            </h3>
                            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{inquiry.neighborhood}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Status Badge & View Messages Button */}
                        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                          <div className="text-right">
                            <div className="inline-flex">
                              {inquiry.statusType === "emerald" && (
                                <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-900/50 text-xs font-bold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <span>{inquiry.status}</span>
                                </span>
                              )}
                              {inquiry.statusType === "amber" && (
                                <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-900/50 text-xs font-bold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  <span>{inquiry.status}</span>
                                </span>
                              )}
                              {inquiry.statusType === "slate" && (
                                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                  <span>{inquiry.status}</span>
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {inquiry.statusDate}
                            </div>
                          </div>

                          <button
                            onClick={() => setActiveTab("messages")}
                            className="px-3.5 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 hover:bg-rose-100 dark:hover:bg-rose-950/40 text-[#DC2626] dark:text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>View Messages</span>
                          </button>
                        </div>
                      </div>

                      {/* Timeline Steps */}
                      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 space-y-2 text-xs">
                        {inquiry.timeline.map((step, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-0.5 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              {step.status === "done" && (
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                              )}
                              {step.status === "in-progress" && (
                                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                              )}
                              {step.status === "pending" && (
                                <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shrink-0" />
                              )}
                              <span
                                className={`${
                                  step.status === "pending"
                                    ? "text-slate-400 dark:text-slate-500"
                                    : "text-slate-700 dark:text-slate-300 font-medium"
                                }`}
                              >
                                {step.label}
                              </span>
                            </div>

                            <span
                              className={`text-[11px] shrink-0 ${
                                step.date === "In progress"
                                  ? "text-amber-600 dark:text-amber-400 font-semibold"
                                  : "text-slate-400 dark:text-slate-500"
                              }`}
                            >
                              {step.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Parent Portal Banner */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      Keep your parents in the loop effortlessly
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Parents can track inquiry statuses, review verified apartment details, and sign off safely.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab("parent")}
                    className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/20 transition-all cursor-pointer shrink-0"
                  >
                    <span>Go to Parent Dashboard (Housing Progress) →</span>
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 5: GROUP PROGRESS TAB (SCREENSHOT 2) */}
            {/* ========================================================= */}
            {activeTab === "progress" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626] mb-1">
                      GROUP COLLABORATION
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Group Progress
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Track where each option stands.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab("housing");
                      setHousingSubView("list");
                    }}
                    className="py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all w-fit"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Find More Options</span>
                  </button>
                </div>

                {/* 5 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-blue-500">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900">14</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 mt-2">All Options</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-[#DC2626]">
                      <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900">7</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 mt-2">Contacted</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900">4</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 mt-2">Waiting for Response</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900">2</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 mt-2">Availability Confirmed</span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-rose-500">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="text-xl sm:text-2xl font-extrabold text-slate-900">1</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 mt-2">Not Available</span>
                  </div>
                </div>

                {/* Two Columns: Recent Activity & Group Approvals */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left (8 cols): Recent Activity */}
                  <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
                      <span className="text-[11px] text-slate-400">Last updated 5 mins ago</span>
                    </div>

                    <div className="space-y-4">
                      {/* Event 1 */}
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-slate-900">Response received - Via dei Neri Apartment</h4>
                            <span className="text-[10.5px] text-slate-400 shrink-0">Today 10:14 AM</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">
                            Landlord confirmed availability for Spring 2027 semester (Jan 8 – May 15). Video tour offered.
                          </p>
                          <button
                            onClick={() => {
                              setSelectedApartmentId("via-dei-neri");
                              setActiveTab("housing");
                              setHousingSubView("detail");
                            }}
                            className="text-[#DC2626] font-bold text-[11px] hover:underline mt-1 inline-flex items-center gap-1"
                          >
                            <span>Inspect listing &amp; contact</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Event 2 */}
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-rose-50 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-slate-900">Contacted - Santa Croce Apartment</h4>
                            <span className="text-[10.5px] text-slate-400 shrink-0">Yesterday 4:12 PM</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">
                            Inquiry submitted through HousingAnywhere. Lease duration matches 4.5 months.
                          </p>
                          <button
                            onClick={() => {
                              setSelectedApartmentId("santa-croce-apt");
                              setActiveTab("housing");
                              setHousingSubView("detail");
                            }}
                            className="text-[#DC2626] font-bold text-[11px] hover:underline mt-1 inline-flex items-center gap-1"
                          >
                            <span>Inspect listing &amp; contact</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Event 3 */}
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-rose-50 text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-slate-900">Contacted - Campo di Marte Residence</h4>
                            <span className="text-[10.5px] text-slate-400 shrink-0">Oct 2, 9:20 AM</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">
                            Requested contract details and utility breakdown from Uniplaces agent.
                          </p>
                          <button
                            onClick={() => {
                              setActiveTab("housing");
                              setHousingSubView("list");
                            }}
                            className="text-[#DC2626] font-bold text-[11px] hover:underline mt-1 inline-flex items-center gap-1"
                          >
                            <span>Inspect listing &amp; contact</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Event 4 */}
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex-1 text-xs">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="font-bold text-slate-900">Alpha Check Completed</h4>
                            <span className="text-[10.5px] text-slate-400 shrink-0">Sep 29, 2:45 PM</span>
                          </div>
                          <p className="text-slate-600 mt-0.5 leading-relaxed">
                            Automated compliance scan passed: budget verified, short-term lease permitted, scam risk 0%.
                          </p>
                          <button
                            onClick={() => {
                              setSelectedApartmentId("via-dei-neri");
                              setActiveTab("housing");
                              setHousingSubView("audit");
                            }}
                            className="text-[#DC2626] font-bold text-[11px] hover:underline mt-1 inline-flex items-center gap-1"
                          >
                            <span>Inspect listing &amp; contact</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 text-center">
                      <button className="text-[#DC2626] text-xs font-bold hover:underline inline-flex items-center gap-1">
                        <span>View All Activity</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right (4 cols): Group Member Approvals */}
                  <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 pb-1 border-b border-slate-100">
                      Group Member Approvals
                    </h3>

                    <div className="space-y-3">
                      {[
                        { name: "Emma", price: "$1200/mo", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
                        { name: "Sophie", price: "$1200/mo", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80" },
                        { name: "Olivia", price: "$1400/mo", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" },
                        { name: "Mia", price: "$1300/mo", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80" },
                      ].map((member, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 shrink-0">
                              <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-900 block">{member.name}</span>
                              <span className="text-[10px] text-slate-400 block">{member.price}</span>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Ready</span>
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveTab("parent")}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-300" />
                      <span>Open Parent Portal</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 6: MESSAGES & INBOX TAB (SCREENSHOT 3) */}
            {/* ========================================================= */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626]">COMMUNICATIONS</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <button
                        onClick={() => setActiveTab("parent")}
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold"
                      >
                        View in Parent Portal →
                      </button>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Messages &amp; Inbox
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      Direct conversations with Italian rental agencies, landlords, roommates, and your Alpha AI advisor.
                    </p>
                  </div>
                </div>

                {/* 2-Column Chat Box */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
                  {/* Left Column (5 cols): Conversations list */}
                  <div className="lg:col-span-5 border-r border-slate-200 flex flex-col">
                    {/* List Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">Messages &amp; Chats</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#DC2626] text-white text-[10px] font-bold">
                          4 new
                        </span>
                      </div>
                      <button className="text-[11px] text-slate-500 hover:text-slate-800 font-semibold">
                        Mark all read
                      </button>
                    </div>

                    {/* Search */}
                    <div className="p-3 border-b border-slate-100">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={chatSearch}
                          onChange={(e) => setChatSearch(e.target.value)}
                          placeholder="Search conversations or messages..."
                          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#DC2626]"
                        />
                      </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                      {[
                        { id: "all", label: "All" },
                        { id: "agency", label: "Agency" },
                        { id: "advisor", label: "AI Advisor" },
                        { id: "roommates", label: "Roommates" },
                        { id: "support", label: "Support" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setChatCategory(cat.id)}
                          className={`px-2.5 py-1 rounded-full font-semibold transition-all shrink-0 ${chatCategory === cat.id
                            ? "bg-slate-900 text-white"
                            : "text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Conversation Items */}
                    <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
                      {/* Chat 1: Marco Valenti */}
                      <button
                        onClick={() => setActiveChatId("marco")}
                        className={`w-full p-3 text-left transition-colors flex items-start gap-3 ${activeChatId === "marco" ? "bg-rose-50/40" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                          <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Marco" fill className="object-cover" />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 truncate flex items-center gap-1">
                              <span>Marco Valenti (Agency)</span>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">10:05 AM</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            Standard Contratto Transitorio draft attached for...
                          </p>
                        </div>
                        <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center shrink-0 self-center">
                          2
                        </span>
                      </button>

                      {/* Chat 2: Alpha Advisor (AI) */}
                      <button
                        onClick={() => setActiveChatId("advisor")}
                        className={`w-full p-3 text-left transition-colors flex items-start gap-3 ${activeChatId === "advisor" ? "bg-rose-50/40" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-rose-50 text-[#DC2626] flex items-center justify-center shrink-0 border border-rose-200">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 truncate flex items-center gap-1">
                              <span>Alpha Advisor (AI)</span>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">8:46 AM</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            100% of deposit safeguarded in EU escrow until ke...
                          </p>
                        </div>
                        <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center shrink-0 self-center">
                          1
                        </span>
                      </button>

                      {/* Chat 3: Roommates Group */}
                      <button
                        onClick={() => setActiveChatId("roommates")}
                        className={`w-full p-3 text-left transition-colors flex items-start gap-3 ${activeChatId === "roommates" ? "bg-rose-50/40" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200 font-bold text-xs">
                          RG
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 truncate">Roommates Group</span>
                            <span className="text-[10px] text-slate-400 shrink-0">10:15 AM</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            Let&apos;s ask Marco for video walk-through tomorrow at 4:30
                          </p>
                        </div>
                      </button>

                      {/* Chat 4: Parent Escrow Support */}
                      <button
                        onClick={() => setActiveChatId("escrow")}
                        className={`w-full p-3 text-left transition-colors flex items-start gap-3 ${activeChatId === "escrow" ? "bg-rose-50/40" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 truncate">Parent Escrow Support</span>
                            <span className="text-[10px] text-slate-400 shrink-0">9:30 AM</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            Transaction hold #IT-5928-ESCROW active and re...
                          </p>
                        </div>
                        <span className="w-4 h-4 rounded-full bg-[#DC2626] text-white text-[10px] font-bold flex items-center justify-center shrink-0 self-center">
                          1
                        </span>
                      </button>

                      {/* Chat 5: IES Housing Office */}
                      <button
                        onClick={() => setActiveChatId("ies")}
                        className={`w-full p-3 text-left transition-colors flex items-start gap-3 ${activeChatId === "ies" ? "bg-rose-50/40" : "hover:bg-slate-50"
                          }`}
                      >
                        <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200 font-bold text-xs">
                          IES
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900 truncate flex items-center gap-1">
                              <span>IES Housing Office</span>
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">Oct 7</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            Orientation desk will assist students with Codice Fis...
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Right Column (7 cols): Active Chat Feed */}
                  <div className="lg:col-span-7 flex flex-col justify-between bg-slate-50/30">
                    {/* Active Chat Header */}
                    <div className="p-3.5 sm:p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
                          <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Marco" fill className="object-cover" />
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900">Marco Valenti (Agency)</h3>
                            <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-0.5">
                              <Check className="w-2.5 h-2.5 text-emerald-600" />
                              <span>Verified</span>
                            </span>
                          </div>
                          <div className="text-[10.5px] text-emerald-600 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Online now</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages Scroll Area */}
                    <div className="p-4 space-y-4 overflow-y-auto max-h-[460px] flex-1">
                      {messagesList.map((msg) => {
                        const isUser = msg.sender === "user";
                        return (
                          <div
                            key={msg.id}
                            className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {!isUser && (
                                <div className="relative w-5 h-5 rounded-full overflow-hidden bg-slate-200 shrink-0">
                                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80" alt="Marco" fill className="object-cover" />
                                </div>
                              )}
                              <span className="text-[10.5px] font-bold text-slate-700">{msg.senderName}</span>
                              {!isUser && <span className="text-[9px] text-slate-400">Licensed Broker #FI-4082</span>}
                              <span className="text-[10px] text-slate-400">{msg.time}</span>
                            </div>

                            <div
                              className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed shadow-2xs ${isUser
                                ? "bg-[#DC2626] text-white rounded-br-xs"
                                : "bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
                                }`}
                            >
                              <p>{msg.text}</p>

                              {msg.attachment && (
                                <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-slate-800">
                                  <div className="flex items-center gap-2 truncate">
                                    <FileText className="w-4 h-4 text-[#DC2626] shrink-0" />
                                    <div className="truncate">
                                      <span className="font-bold text-[11px] block truncate">{msg.attachment.name}</span>
                                      <span className="text-[10px] text-slate-400 block">{msg.attachment.size}</span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => alert("Downloading PDF preview...")}
                                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-[10.5px] font-bold text-slate-700 shrink-0"
                                  >
                                    View PDF
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Quick Replies Strip */}
                    <div className="px-4 py-2 border-t border-slate-200 bg-white/80 backdrop-blur-xs flex items-center gap-1.5 overflow-x-auto text-[10.5px]">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9.5px] shrink-0">QUICK:</span>
                      {[
                        "Confirm move-in date Jan 8",
                        "Request live video walk-through",
                        "Ask about utility & heating bills",
                        "Verify Escrow deposit guarantee",
                      ].map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(reply)}
                          className="px-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 shrink-0 transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>

                    {/* Chat Input Bar */}
                    <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                      <button
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Attach file"
                      >
                        <Paperclip className="w-4 h-4" />
                      </button>
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSendMessage();
                        }}
                        placeholder="Message Marco Valenti (Agency)..."
                        className="flex-1 py-2 px-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        className="p-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white transition-colors shadow-2xs"
                        aria-label="Send message"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 7: DOCUMENTS & LEGAL COMPLIANCE TAB (SCREENSHOT 4) */}
            {/* ========================================================= */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Documents &amp; Legal Compliance
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Verified Italian student rental contracts, roommate agreements, and tax documents.
                  </p>
                </div>

                {/* 4 Document Cards */}
                <div className="space-y-3">
                  {[
                    {
                      title: "Italian Standard Student Lease Agreement (Contratto Transitorio)",
                      badge: "Ready for Review",
                      badgeColor: "emerald",
                      size: "1.4 MB",
                      updated: "Updated today",
                    },
                    {
                      title: "Codice Fiscale (Italian Tax Code) Application Guide",
                      badge: "Required for Lease",
                      badgeColor: "emerald",
                      size: "420 KB",
                      updated: "Step-by-step instructions",
                    },
                    {
                      title: "Roommate Expense & Quiet Hours Agreement",
                      badge: "Signed by 4/4 students",
                      badgeColor: "emerald",
                      size: "280 KB",
                      updated: "Signed Oct 5",
                    },
                    {
                      title: "Move-in Inspection & Damage Checklist (Florence)",
                      badge: "Template Ready",
                      badgeColor: "emerald",
                      size: "890 KB",
                      updated: "Print for Jan 8 move-in",
                    },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#DC2626] border border-rose-200/80 flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {doc.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>{doc.badge}</span>
                            </span>
                            <span>•</span>
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.updated}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => alert(`Downloading ${doc.title}...`)}
                        className="py-2 px-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-2xs"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* VIEW 8: PARENT PORTAL / PARENTS VIEW */}
            {/* ========================================================= */}
            {activeTab === "parent" && (
              <ParentPortalView
                onBackToStudentView={() => setActiveTab("overview")}
                onOpenAdvisorChat={(topic) => {
                  setAdvisorHelpTopic(topic);
                  setAskAdvisorModalOpen(true);
                }}
              />
            )}

            {/* ========================================================= */}
            {/* UNPROVIDED / PENDING MODULES: LOADING VIEWS */}
            {/* ========================================================= */}
            {activeTab === "safety" && (
              <DashboardPageLoading
                pageTitle="Safety & Hotline"
                categoryName="CAMPUS & POLICE PROTOCOLS"
                onBackToOverview={() => setActiveTab("overview")}
              />
            )}

            {activeTab === "daily-life" && (
              <DashboardPageLoading
                pageTitle="Daily Life Guide"
                categoryName="FLORENCE LOCAL ESSENTIALS"
                onBackToOverview={() => setActiveTab("overview")}
              />
            )}

            {/* ========================================================= */}
            {/* VIEW 9: MY PROFILE */}
            {/* ========================================================= */}
            {activeTab === "profile" && (
              <UserProfileView
                onBackToOverview={() => setActiveTab("overview")}
                onOpenParentPortal={() => setActiveTab("parent")}
              />
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* NEIGHBORHOOD DETAIL MODAL (COMPACT & FULLY RESPONSIVE) */}
      {/* ------------------------------------------------------------- */}
      {selectedNeighborhoodModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-[24px] max-w-[600px] w-full max-h-[90vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 flex flex-col relative">
            {/* Header Image (Compact height) */}
            <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-slate-900 shrink-0">
              <Image
                src={selectedNeighborhoodModal.image}
                alt={selectedNeighborhoodModal.name}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Badges on Top Left */}
              <div className="absolute top-3 left-3 sm:top-3.5 sm:left-4 flex items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#059669] text-white font-bold text-[10px] sm:text-[11px] flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  <span>Best Match</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#DC2626] text-white font-bold text-[10px] sm:text-[11px] flex items-center gap-1 shadow-sm">
                  <Compass className="w-3 h-3" />
                  <span>Neighborhood Guide</span>
                </span>
              </div>

              {/* Close Button Top Right */}
              <button
                onClick={() => setSelectedNeighborhoodModal(null)}
                className="absolute top-3 right-3 sm:top-3.5 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/60 backdrop-blur-md flex items-center justify-center text-white/90 hover:bg-slate-900/80 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-4 sm:bottom-3.5 sm:left-5 text-white">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight drop-shadow-sm">
                  {selectedNeighborhoodModal.name}
                </h3>
                <p className="text-[11px] text-slate-200 mt-0.5">
                  {selectedNeighborhoodModal.sub} • Florence, Italy
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-3.5 sm:p-5 space-y-3 overflow-y-auto text-xs flex-1">
              {/* Row of 4 Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Stat 1: Campus Commute */}
                <div className="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <span className="text-[9.5px] text-slate-400 font-medium block">
                    Campus Commute
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                    <span className="font-bold text-slate-900 text-[11px] sm:text-xs">
                      {selectedNeighborhoodModal.commute}
                    </span>
                  </div>
                </div>

                {/* Stat 2: Safety Score */}
                <div className="p-2 sm:p-2.5 rounded-xl border border-emerald-300 bg-white shadow-2xs">
                  <span className="text-[9.5px] text-slate-400 font-medium block">
                    Safety Score
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-bold text-slate-900 text-[11px] sm:text-xs">
                      Good (8.8/10)
                    </span>
                  </div>
                </div>

                {/* Stat 3: Monthly Flat Avg */}
                <div className="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <span className="text-[9.5px] text-slate-400 font-medium block">
                    Monthly Flat Avg
                  </span>
                  <div className="mt-0.5">
                    <span className="font-bold text-slate-900 text-[11px] sm:text-xs">
                      {selectedNeighborhoodModal.price}
                    </span>
                  </div>
                </div>

                {/* Stat 4: Available Flats */}
                <div className="p-2 sm:p-2.5 rounded-xl border border-rose-200 bg-white shadow-2xs">
                  <span className="text-[9.5px] text-rose-500 font-medium block">
                    Available Flats
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                    <span className="font-bold text-[#DC2626] text-[11px] sm:text-xs">
                      2 Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Vibe & Area Character */}
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Compass className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Student Vibe &amp; Area Character</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Vibrant, walkable student area with countless trattorias, historic piazza, and lively evening cafes.
                  </p>
                </div>
                <p className="text-[10.5px] text-slate-500 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[#DC2626]" />
                  <span>High concentration of international students &amp; study programs</span>
                </p>
              </div>

              {/* 2 Info Cards: Student Hangouts & Groceries */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Hangouts */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
                    <Coffee className="w-3.5 h-3.5 text-amber-500" />
                    <span>Student Hangouts &amp; Cafes</span>
                  </div>
                  <ul className="space-y-1 text-[10.5px] text-slate-600 leading-relaxed">
                    <li>• Local study-friendly espresso bars with WiFi</li>
                    <li>• Historic piazzas for evening spritz &amp; chat</li>
                    <li>• Authentic trattorias with student lunch menus</li>
                  </ul>
                </div>

                {/* Groceries */}
                <div className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
                    <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Groceries &amp; Practical Living</span>
                  </div>
                  <ul className="space-y-1 text-[10.5px] text-slate-600 leading-relaxed">
                    <li>• Walking distance to Conad &amp; Pam markets</li>
                    <li>• Local fresh fruit, cheese, &amp; bakeries</li>
                    <li>• Laundromats &amp; pharmacy within 3 blocks</li>
                  </ul>
                </div>
              </div>

              {/* Alpha Safety Guarantee Box */}
              <div className="p-2.5 rounded-xl border border-rose-200/90 bg-rose-50/25 space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
                  <span>Alpha Safety™ Neighborhood Guarantee</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed">
                  Santa Croce is verified for well-lit streets, active evening foot traffic, high student density, and direct pedestrian routes to campuses.
                </p>
              </div>
            </div>

            {/* Modal Sticky Footer (Always in view) */}
            <div className="p-3 sm:p-4 bg-white border-t border-slate-100 flex items-center justify-between shrink-0 shadow-xs">
              <button
                onClick={() => setSelectedNeighborhoodModal(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors px-2 py-1"
              >
                Close Guide
              </button>
              <button
                onClick={() => {
                  setSelectedNeighborhoodModal(null);
                  setActiveTab("housing");
                }}
                className="py-2.5 px-5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-600/25 transition-all cursor-pointer"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>View Verified Flats in {selectedNeighborhoodModal.name} (2 Listings)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ASK ALPHA ADVISOR MODAL (SCREENSHOT 4) */}
      {/* ------------------------------------------------------------- */}
      {askAdvisorModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-[20px] max-w-[480px] w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150 flex flex-col relative">
            {/* Red Header Banner */}
            <div className="bg-[#B91C1C] px-5 py-4 text-white relative">
              <button
                onClick={() => {
                  setAskAdvisorModalOpen(false);
                  setAdvisorSubmitted(false);
                }}
                className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1.5 text-white/90 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Alpha Housing Concierge</span>
              </div>
              <h3 className="text-lg font-bold text-white">Ask Alpha Advisor</h3>
              <p className="text-[11px] text-white/80 mt-0.5">
                Inquiring about {currentApartment.name} ({currentApartment.neighborhood})
              </p>
            </div>

            {/* Modal Body */}
            {advisorSubmitted ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900">Request Sent Successfully!</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Our Florence-based advisors have received your inquiry. We typically reply within 2 hours with verified answers.
                </p>
                <button
                  onClick={() => {
                    setAskAdvisorModalOpen(false);
                    setAdvisorSubmitted(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="p-5 space-y-4 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    WHAT DO YOU NEED HELP WITH?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Clarify lease terms",
                      "Contact housing source",
                      "Request video tour",
                      "Parent safety packet",
                    ].map((topic) => {
                      const isSelected = advisorHelpTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => setAdvisorHelpTopic(topic)}
                          className={`py-2 px-3 rounded-xl text-[11px] font-semibold border transition-all text-center ${isSelected
                            ? "border-[#DC2626] bg-[#FFF5F5] text-[#DC2626] shadow-xs"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    SPECIFIC QUESTIONS OR DATES
                  </label>
                  <textarea
                    rows={3}
                    value={advisorQuestion}
                    onChange={(e) => setAdvisorQuestion(e.target.value)}
                    placeholder="e.g. Can we confirm if air conditioning is in all 4 bedrooms? Are utilities capped at a fixed monthly rate?"
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#DC2626] transition-all resize-none"
                  />
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-2 text-emerald-800 text-[10.5px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero spam guarantee. Handled directly by certified advisors in Florence.</span>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setAskAdvisorModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvisorSubmitted(true)}
                    className="px-5 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
                  >
                    <Send className="w-3 h-3" />
                    <span>Submit Request</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* ------------------------------------------------------------- */}
      {/* REQUEST AVAILABILITY MODAL */}
      {/* ------------------------------------------------------------- */}
      {availabilityRequestedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 text-left">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Request Availability
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {availabilityRequestedModal.name}
                </p>
              </div>
              <button
                onClick={() => setAvailabilityRequestedModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-3.5 text-xs">
              {/* Apartment Preview Row */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-slate-200">
                  <Image
                    src={availabilityRequestedModal.images[0]}
                    alt={availabilityRequestedModal.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">
                    {availabilityRequestedModal.name}
                  </h4>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{availabilityRequestedModal.neighborhood}</span>
                  </div>
                  <div className="font-bold text-[#DC2626] text-xs mt-0.5">
                    ~€{availabilityRequestedModal.pricePerStudent}/month per student
                  </div>
                </div>
              </div>

              {/* Group Summary Box */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-1.5 text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Requesting Group:</span>
                  <span className="font-bold">Emma&apos;s Florence Group (4 Students)</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Program Semester:</span>
                  <span className="font-bold">Spring 2027</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Target Bedrooms:</span>
                  <span className="font-bold">4 bedrooms • 2 baths</span>
                </div>
              </div>

              {/* Alpha Safety Guarantee Notice */}
              <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 flex items-start gap-2 text-emerald-800 dark:text-emerald-300 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Our local Florence team contacts the verified landlord directly to confirm move-in dates and lock rates. You will receive live status updates in Provider Communication.
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setAvailabilityRequestedModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const aptName = availabilityRequestedModal.name;
                  setAvailabilityRequestedModal(null);
                  setAvailabilitySuccessToast(`Availability request sent for ${aptName}! Check Provider Communication for updates.`);
                  setTimeout(() => setAvailabilitySuccessToast(null), 5000);
                }}
                className="px-5 py-2 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
              >
                Confirm Availability Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* HOUSING MAP MODAL */}
      {/* ------------------------------------------------------------- */}
      {housingMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#111827] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col text-left">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Santa Croce Apartments on Map
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing 3 verified options near campus and grocery corridors
                </p>
              </div>
              <button
                onClick={() => setHousingMapModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-[400px] w-full relative">
              <FlorenceSafetyMap
                selectedId="santa-croce"
                onSelectNeighborhood={() => {}}
              />
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* AVAILABILITY SUCCESS TOAST */}
      {/* ------------------------------------------------------------- */}
      {availabilitySuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl bg-slate-900 text-white p-4 shadow-2xl border border-slate-800 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold">Request Sent</p>
            <p className="text-slate-300 mt-0.5 leading-snug">{availabilitySuccessToast}</p>
          </div>
          <button
            onClick={() => setAvailabilitySuccessToast(null)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-xs text-slate-400">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
